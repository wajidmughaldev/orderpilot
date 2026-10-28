import { NextResponse } from 'next/server'

const requests = new Map<string, { count: number; reset: number }>()
const requiredFields = ['name', 'restaurant', 'phone', 'city'] as const
const MAX_BODY_BYTES = 65_536 // 64 KB

/**
 * Rate Limiting & Client IP Trust Boundary:
 *
 * 1. Client-Controllable IP Headers:
 *    Headers like `x-forwarded-for` and `x-real-ip` can be spoofed by any HTTP client
 *    unless an upstream reverse proxy (e.g. Vercel Edge, Cloudflare, AWS CloudFront, or Nginx)
 *    is explicitly configured to overwrite or sanitize them.
 *    In our resolver, we check platform-authenticated headers first:
 *    - `cf-connecting-ip` (Cloudflare edge authenticated)
 *    - `x-vercel-forwarded-for` (Vercel edge authenticated)
 *    - `x-real-ip` (Standard reverse proxy)
 *    - `x-forwarded-for` (Leftmost client address, sanitized)
 *
 * 2. In-Memory Rate Limiting Limitations:
 *    - Process-local: In multi-instance, serverless (e.g. Vercel Serverless / AWS Lambda),
 *      or containerized deployments (Docker / Kubernetes), each node or cold-started instance
 *      maintains its own isolated memory Map. Rate limits are not synchronized across instances.
 *    - Ephemeral: In-memory counters reset on every container restart, redeploy, or worker recycling.
 *    - Production recommendation: For distributed production deployments with strict guarantees,
 *      use an edge rate limiter (Cloudflare Rate Limiting / Vercel Firewall) or an external
 *      centralized store (Redis / Upstash).
 *      In-memory rate limiting is maintained here as a temporary single-process baseline safeguard
 *      without adding unapproved external infrastructure dependencies.
 */
function getClientIp(request: Request): string {
  // 1. Cloudflare edge
  const cfIp = request.headers.get('cf-connecting-ip')?.trim()
  if (cfIp) return cfIp

  // 2. Vercel edge
  const vercelIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (vercelIp) return vercelIp

  // 3. Reverse proxy real IP
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  // 4. Standard forwarded-for (leftmost client IP)
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (forwarded) return forwarded

  return 'unknown'
}

function getDeliveryConfig(): { url: string; secret?: string } | null {
  const rawUrl = (process.env.LEAD_DELIVERY_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL || '').trim()
  if (!rawUrl) return null
  try {
    const parsed = new URL(rawUrl)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
    const secret = (process.env.LEAD_DELIVERY_WEBHOOK_SECRET || process.env.LEAD_WEBHOOK_SECRET || '').trim()
    return { url: parsed.toString(), secret: secret || undefined }
  } catch {
    return null
  }
}

/**
 * Byte-based Request Body Reader & JSON Parser:
 *
 * Protects against:
 * - Missing Content-Length header
 * - Falsified/incorrect Content-Length header
 * - Transfer-Encoding: chunked streams
 * - Arbitrarily large payloads exceeding 64KB (memory exhaustion / DoS)
 *
 * Halts and cancels stream reading as soon as accumulated bytes exceed MAX_BODY_BYTES,
 * returning HTTP 413 without loading oversized bodies into memory.
 */
async function readJsonWithByteLimit(
  request: Request,
  maxBytes: number = MAX_BODY_BYTES
): Promise<
  | { success: true; data: Record<string, unknown> }
  | { success: false; status: 413; message: string }
  | { success: false; status: 400; message: string }
> {
  // 1. Header-based fast check if client provided Content-Length
  const headerLength = parseInt(request.headers.get('content-length') || '', 10)
  if (!Number.isNaN(headerLength) && headerLength > maxBytes) {
    return { success: false, status: 413, message: 'Request payload too large.' }
  }

  // 2. Body existence check
  if (!request.body) {
    return { success: false, status: 400, message: 'Please check the form and try again.' }
  }

  // 3. Incremental chunk-by-chunk stream reader with early cancellation
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        totalBytes += value.byteLength
        if (totalBytes > maxBytes) {
          // Immediately abort stream consumption to prevent memory exhaustion
          await reader.cancel('payload_too_large').catch(() => {})
          return { success: false, status: 413, message: 'Request payload too large.' }
        }
        chunks.push(value)
      }
    }
  } catch {
    return { success: false, status: 400, message: 'Please check the form and try again.' }
  } finally {
    try {
      reader.releaseLock()
    } catch {}
  }

  if (totalBytes === 0) {
    return { success: false, status: 400, message: 'Please check the form and try again.' }
  }

  try {
    const concatenated = new Uint8Array(totalBytes)
    let offset = 0
    for (const chunk of chunks) {
      concatenated.set(chunk, offset)
      offset += chunk.byteLength
    }
    const text = new TextDecoder('utf-8').decode(concatenated)
    const data = JSON.parse(text)
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { success: false, status: 400, message: 'Please check the form and try again.' }
    }
    return { success: true, data: data as Record<string, unknown> }
  } catch {
    return { success: false, status: 400, message: 'Please check the form and try again.' }
  }
}

export async function POST(request: Request) {
  // 1. Fast-path check: Content-Length header if provided
  const contentLength = parseInt(request.headers.get('content-length') || '', 10)
  if (!Number.isNaN(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'Request payload too large.' }, { status: 413 })
  }

  // 2. Rate limiting (in-memory, single-instance)
  const ip = getClientIp(request)
  const now = Date.now()

  // Clean expired rate limit entries to prevent memory leak
  if (requests.size > 500) {
    for (const [k, v] of requests.entries()) {
      if (v.reset <= now) requests.delete(k)
    }
  }

  const current = requests.get(ip)
  if (current && current.reset > now && current.count >= 5) {
    return NextResponse.json({ message: 'Too many requests. Please wait before trying again.' }, { status: 429 })
  }
  requests.set(ip, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 15 * 60_000 })

  // 3. Streaming body size verification and JSON parsing
  const readResult = await readJsonWithByteLimit(request, MAX_BODY_BYTES)
  if (!readResult.success) {
    return NextResponse.json({ message: readResult.message }, { status: readResult.status })
  }
  const body = readResult.data

  // 4. Honeypot check
  if (body.website) {
    return NextResponse.json({ message: 'Request rejected.' }, { status: 400 })
  }

  // 5. Required fields check
  for (const field of requiredFields) {
    if (typeof body[field] !== 'string' || !body[field].trim()) {
      return NextResponse.json({ message: 'Please complete all required fields.' }, { status: 400 })
    }
  }

  // 6. Length and format validation
  if (String(body.name).trim().length > 80) {
    return NextResponse.json({ message: 'Please shorten your name.' }, { status: 400 })
  }
  if (String(body.restaurant).trim().length > 100) {
    return NextResponse.json({ message: 'Please shorten the restaurant name.' }, { status: 400 })
  }
  if (String(body.city).trim().length > 80) {
    return NextResponse.json({ message: 'Please shorten the city name.' }, { status: 400 })
  }
  if (!/^\+?[0-9 ()-]{7,20}$/.test(String(body.phone).trim())) {
    return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 })
  }

  // 7. Optional fields validation
  if (typeof body.challenge === 'string' && body.challenge.length > 400) {
    return NextResponse.json({ message: 'Please shorten the challenge description.' }, { status: 400 })
  }
  if (typeof body.message === 'string' && body.message.length > 600) {
    return NextResponse.json({ message: 'Please shorten the message.' }, { status: 400 })
  }
  if (typeof body.type === 'string' && body.type.length > 80) {
    return NextResponse.json({ message: 'Please select a valid restaurant type.' }, { status: 400 })
  }
  if (typeof body.volume === 'string' && body.volume.length > 80) {
    return NextResponse.json({ message: 'Please select a valid order volume.' }, { status: 400 })
  }
  if (typeof body.billing === 'string' && body.billing.length > 80) {
    return NextResponse.json({ message: 'Please select a valid billing option.' }, { status: 400 })
  }
  if (typeof body.interests === 'string' && body.interests.length > 200) {
    return NextResponse.json({ message: 'Please shorten selected interests.' }, { status: 400 })
  }

  // 8. Verify delivery destination configuration
  const deliveryConfig = getDeliveryConfig()
  if (!deliveryConfig) {
    console.warn('[lead-delivery] Delivery provider unconfigured. Missing LEAD_DELIVERY_WEBHOOK_URL.')
    return NextResponse.json(
      { message: 'Demo delivery is not configured yet. Your details were not stored. Please contact OrderPilot after the official form destination is connected.' },
      { status: 503 }
    )
  }

  const leadPayload = {
    submittedAt: new Date().toISOString(),
    source: typeof body.source === 'string' && body.source ? String(body.source).trim().slice(0, 50) : 'unknown',
    name: String(body.name).trim(),
    restaurant: String(body.restaurant).trim(),
    phone: String(body.phone).trim(),
    city: String(body.city).trim(),
    type: typeof body.type === 'string' && body.type.trim() ? body.type.trim() : undefined,
    volume: typeof body.volume === 'string' && body.volume.trim() ? body.volume.trim() : undefined,
    interests: typeof body.interests === 'string' && body.interests.trim() ? body.interests.trim() : undefined,
    billing: typeof body.billing === 'string' && body.billing.trim() ? body.billing.trim() : undefined,
    challenge: typeof body.challenge === 'string' && body.challenge.trim() ? body.challenge.trim() : undefined,
    message: typeof body.message === 'string' && body.message.trim() ? body.message.trim() : undefined,
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'OrderPilot-LeadDelivery/1.0',
    }
    if (deliveryConfig.secret) {
      headers['Authorization'] = `Bearer ${deliveryConfig.secret}`
      headers['X-Lead-Secret'] = deliveryConfig.secret
    }

    const response = await fetch(deliveryConfig.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(leadPayload),
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.error(`[lead-delivery] Upstream delivery service responded with HTTP status ${response.status}`)
      return NextResponse.json(
        { message: 'We were unable to deliver your demo request due to a delivery service error. Please try again or reach out to us directly.' },
        { status: 502 }
      )
    }

    console.info(`[lead-delivery] Lead successfully delivered to configured destination (source: ${leadPayload.source})`)
    return NextResponse.json(
      { success: true, message: 'Your request was sent. Our team will get in touch to agree the next step.' },
      { status: 200 }
    )
  } catch {
    console.error('[lead-delivery] Delivery network error or timeout')
    return NextResponse.json(
      { message: 'We were unable to deliver your demo request. Please check your connection and try again, or reach out to us directly.' },
      { status: 502 }
    )
  }
}
