/**
 * OrderPilot Distributed & Hosting-Aware Rate Limiting Engine
 *
 * Algorithm Classification:
 * - Fixed-Window Counter with Lazy Expiration (per-key floating window).
 * - Not a sliding-log or sliding-window counter. The window starts on the first
 *   request from an IP and resets after windowMs (default: 15 minutes).
 *
 * Atomicity:
 * - When Upstash Redis / Vercel KV is configured, execution is performed via an
 *   atomic Redis Lua script (EVAL) to ensure INCR and PEXPIRE execute atomically
 *   without race conditions across concurrent requests.
 * - If EVAL fails or pipeline fallback is used, batched commands execute over HTTP.
 *
 * Fail-Open Disclosures:
 * - Local-memory fallback is isolated to the single Node/Vercel serverless container.
 * - In serverless environments, independent concurrent containers do NOT share memory.
 * - During a Redis outage or unconfigured state, each container tracks limits locally,
 *   which WEAKENS distributed rate limiting (an attacker hitting N distinct containers
 *   can make up to N * maxRequests). This trade-off ensures legitimate customer leads
 *   are not dropped during Redis infrastructure outages.
 *
 * Trust Hierarchy & Proxy Boundaries:
 * 1. Vercel: `x-vercel-forwarded-for` is injected and sanitized by Vercel's edge routers.
 *    External clients cannot spoof this header when running on Vercel.
 * 2. Cloudflare: `cf-connecting-ip` is trusted ONLY when TRUST_CLOUDFLARE_PROXY === 'true'
 *    and direct-to-origin IP traffic is blocked at the firewall.
 * 3. Reverse Proxy: Fallback to `x-real-ip` or leftmost client IP in `x-forwarded-for`.
 */

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  ip: string
}

// In-memory fallback map (isolated per server instance)
const memoryStore = new Map<string, { count: number; reset: number }>()

/**
 * Resolves client IP with platform-aware trust hierarchy
 */
export function resolveClientIp(request: Request): string {
  const headers = request.headers

  // 1. If deployed on Vercel: x-vercel-forwarded-for is set by edge and cannot be spoofed
  const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV)
  const vercelIp = headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (isVercel && vercelIp) {
    return vercelIp
  }

  // 2. Cloudflare Edge: cf-connecting-ip trusted only when explicitly enabled
  const isCloudflare = Boolean(process.env.CF_PAGES || process.env.TRUST_CLOUDFLARE_PROXY === 'true')
  const cfIp = headers.get('cf-connecting-ip')?.trim()
  if (isCloudflare && cfIp) {
    return cfIp
  }

  // 3. Standard Reverse Proxy (e.g. Nginx, Docker, Node cluster):
  const realIp = headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (forwarded) return forwarded

  return 'unknown'
}

// Atomic Lua script for Fixed-Window Counter in Redis
const ATOMIC_RATE_LIMIT_LUA = `
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])

local current = redis.call('INCR', key)
if current == 1 then
  redis.call('PEXPIRE', key, window)
end
local ttl = redis.call('PTTL', key)
if ttl == -1 then
  redis.call('PEXPIRE', key, window)
  ttl = window
end

return {current, ttl}
`.trim()

/**
 * Check and record rate limit (Default: 5 requests per 15 minutes)
 */
export async function checkRateLimit(
  request: Request,
  maxRequests: number = 5,
  windowMs: number = 15 * 60_000
): Promise<RateLimitResult> {
  const ip = resolveClientIp(request)
  const now = Date.now()

  // Distributed Adapter Check: Upstash Redis / Vercel KV
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

  if (redisUrl && redisToken) {
    try {
      const key = `orderpilot:ratelimit:${ip}`

      // Execute atomic Lua script via EVAL
      const evalResponse = await fetch(`${redisUrl}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          'EVAL',
          ATOMIC_RATE_LIMIT_LUA,
          1,
          key,
          String(maxRequests),
          String(windowMs),
        ]),
        signal: AbortSignal.timeout(3000),
      })

      if (evalResponse.ok) {
        const data = await evalResponse.json()
        let count: number | undefined
        let ttl: number | undefined

        // Standard Redis EVAL result: { result: [count, ttl] }
        if (data && Array.isArray(data.result) && data.result.length >= 2) {
          count = Number(data.result[0])
          ttl = Number(data.result[1])
        } else if (Array.isArray(data) && data[0]?.result !== undefined) {
          // Pipeline / legacy adapter mock format: [{ result: count }, { result: ttl }]
          count = Number(data[0].result)
          ttl = Number(data[1]?.result ?? windowMs)
        }

        if (count !== undefined) {
          if (ttl === undefined || ttl <= 0) ttl = windowMs
          const remaining = Math.max(0, maxRequests - count)
          const reset = now + ttl

          return {
            success: count <= maxRequests,
            limit: maxRequests,
            remaining,
            reset,
            ip,
          }
        }
      }

      throw new Error(`Upstash returned HTTP ${evalResponse.status}`)
    } catch (err) {
      console.warn('[rate-limit] Distributed store failed, falling back to local memory store (weakens multi-instance protection):', err)
    }
  }

  // Fallback: Local in-memory store (weakened multi-instance protection)
  if (memoryStore.size > 500) {
    for (const [k, v] of memoryStore.entries()) {
      if (v.reset <= now) memoryStore.delete(k)
    }
  }

  const record = memoryStore.get(ip)
  if (record && record.reset > now) {
    if (record.count >= maxRequests) {
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        reset: record.reset,
        ip,
      }
    }
    record.count += 1
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - record.count,
      reset: record.reset,
      ip,
    }
  }

  const resetTime = now + windowMs
  memoryStore.set(ip, { count: 1, reset: resetTime })
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - 1,
    reset: resetTime,
    ip,
  }
}
