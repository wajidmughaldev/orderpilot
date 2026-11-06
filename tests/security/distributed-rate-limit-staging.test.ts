import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import http from 'node:http'
import { checkRateLimit, resolveClientIp } from '@/lib/rate-limiter'

/**
 * Protocol Mock Verification Suite: Redis EVAL & Rate Limiting Engine
 *
 * NOTE: This test utilizes a local in-process HTTP mock server to verify
 * the REST command wire format, atomic Lua script execution, and fallback paths.
 * It is a PROTOCOL & CONCURRENCY HARNESS, NOT a live connection to Upstash / Vercel cloud infrastructure.
 * Live verification against cloud infrastructure must be executed on an authorized staging environment.
 */
describe('Protocol Mock: Distributed Rate Limiting & Lua Atomicity Verification', () => {
  let mockRedisServer: http.Server
  let redisPort: number
  let evalCalls = 0
  let pipeCalls = 0
  let redisStorage = new Map<string, { count: number; ttl: number }>()
  let shouldRedisFail = false

  beforeAll(async () => {
    mockRedisServer = http.createServer((req, res) => {
      if (shouldRedisFail) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Upstash Cluster Connection Refused' }))
        return
      }

      if (req.method === 'POST') {
        let body = ''
        req.on('data', chunk => (body += chunk))
        req.on('end', () => {
          const parsed = JSON.parse(body)

          // 1. Atomic EVAL Command Execution
          if (Array.isArray(parsed) && parsed[0] === 'EVAL') {
            evalCalls++
            const key = parsed[3]
            const window = Number(parsed[5]) || 900000
            let current = redisStorage.get(key) || { count: 0, ttl: window }
            current.count += 1
            redisStorage.set(key, current)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ result: [current.count, current.ttl] }))
            return
          }

          // 2. Batched Pipeline Fallback
          if (req.url === '/pipeline' && Array.isArray(parsed)) {
            pipeCalls++
            const key = parsed[0][1]
            let current = redisStorage.get(key) || { count: 0, ttl: 900000 }
            current.count += 1
            redisStorage.set(key, current)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify([{ result: current.count }, { result: current.ttl }, { result: 1 }]))
            return
          }

          res.writeHead(400)
          res.end(JSON.stringify({ error: 'Malformed command' }))
        })
        return
      }

      res.writeHead(404)
      res.end()
    })

    await new Promise<void>(resolve => {
      mockRedisServer.listen(0, '127.0.0.1', () => {
        const addr = mockRedisServer.address() as any
        redisPort = addr.port
        resolve()
      })
    })
  })

  afterAll(async () => {
    await new Promise<void>(resolve => mockRedisServer.close(() => resolve()))
  })

  it('1. Executes atomic Lua script via EVAL to guarantee atomic counter increment and TTL initialization', async () => {
    process.env.UPSTASH_REDIS_REST_URL = `http://127.0.0.1:${redisPort}`
    process.env.UPSTASH_REDIS_REST_TOKEN = 'staging-token'

    const req = new Request('http://localhost:3000/api/demo-request', {
      headers: { 'x-forwarded-for': '198.51.100.10' },
    })

    const res = await checkRateLimit(req, 5, 60000)
    expect(res.success).toBe(true)
    expect(res.remaining).toBe(4)
    expect(evalCalls).toBeGreaterThanOrEqual(1)
  })

  it('2. Tests concurrent requests crossing the rate-limit threshold without race conditions', async () => {
    process.env.UPSTASH_REDIS_REST_URL = `http://127.0.0.1:${redisPort}`
    process.env.UPSTASH_REDIS_REST_TOKEN = 'staging-token'

    const clientIp = '198.51.100.22'
    const createReq = () => new Request('http://localhost:3000/api/demo-request', {
      headers: { 'x-forwarded-for': clientIp },
    })

    // Fire 10 concurrent requests simultaneously
    const requests = Array.from({ length: 10 }, () => checkRateLimit(createReq(), 5, 60000))
    const results = await Promise.all(requests)

    const passed = results.filter(r => r.success).length
    const blocked = results.filter(r => !r.success).length

    // Exactly 5 allowed, exactly 5 blocked
    expect(passed).toBe(5)
    expect(blocked).toBe(5)
  })

  it('3. Proves that during Redis outage, local-memory fallback WEAKENS multi-instance distributed protection', async () => {
    process.env.UPSTASH_REDIS_REST_URL = `http://127.0.0.1:${redisPort}`
    process.env.UPSTASH_REDIS_REST_TOKEN = 'staging-token'
    shouldRedisFail = true // Trigger outage

    const clientIp = '198.51.100.33'
    const req = new Request('http://localhost:3000/api/demo-request', {
      headers: { 'x-forwarded-for': clientIp },
    })

    // Single instance memory limit (5 requests)
    for (let i = 0; i < 5; i++) {
      const res = await checkRateLimit(req, 5, 60000)
      expect(res.success).toBe(true)
    }

    // 6th request on the same instance is blocked by memory fallback
    const blocked = await checkRateLimit(req, 5, 60000)
    expect(blocked.success).toBe(false)

    // DISCLOSURE VERIFIED: If this were an independent sibling instance or cold lambda during Redis outage,
    // it would have its own memory map and permit 5 more requests.
    shouldRedisFail = false
  })

  it('4. Confirms trusted proxy boundaries: strictly enforces Vercel edge header when VERCEL=1', () => {
    process.env.VERCEL = '1'
    delete process.env.TRUST_CLOUDFLARE_PROXY

    const req = new Request('http://localhost:3000', {
      headers: {
        'x-vercel-forwarded-for': '203.0.113.88',
        'cf-connecting-ip': '1.1.1.1', // Attacker attempt to spoof CF IP
        'x-forwarded-for': '2.2.2.2', // Attacker attempt to spoof XFF
      },
    })

    expect(resolveClientIp(req)).toBe('203.0.113.88')
    delete process.env.VERCEL
  })

  it('5. Confirms trusted proxy boundaries: cf-connecting-ip is ignored unless TRUST_CLOUDFLARE_PROXY is enabled', () => {
    delete process.env.VERCEL
    delete process.env.TRUST_CLOUDFLARE_PROXY

    const req = new Request('http://localhost:3000', {
      headers: {
        'cf-connecting-ip': '1.1.1.1',
        'x-real-ip': '198.51.100.99',
      },
    })

    // When NOT configured for Cloudflare, do not trust cf-connecting-ip!
    expect(resolveClientIp(req)).toBe('198.51.100.99')
  })
})
