import { NextResponse } from 'next/server'
import { dispatchLead, LeadIntent, LeadPayload } from '@/lib/email'

const requests = new Map<string, { count: number; reset: number }>()
const requiredFields = ['name', 'restaurant', 'phone'] as const
const MAX_BODY_BYTES = 65_536 // 64 KB

/**
 * Rate Limiting & Client IP Trust Boundary:
 *
 * Checks platform-authenticated headers first:
 * - `cf-connecting-ip` (Cloudflare edge)
 * - `x-vercel-forwarded-for` (Vercel edge)
 * - `x-real-ip` (Standard reverse proxy)
 * - `x-forwarded-for` (Leftmost client address)
 */
function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip')?.trim()
  if (cfIp) return cfIp

  const vercelIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (vercelIp) return vercelIp

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (forwarded) return forwarded

  return 'unknown'
}

/**
 * Byte-based Request Body Reader & JSON Parser:
 * Protects against oversized payloads (>64KB) and chunked stream exhaustion.
 */
async function readJsonWithByteLimit(
  request: Request,
  maxBytes: number = MAX_BODY_BYTES
): Promise<
  | { success: true; data: Record<string, unknown> }
  | { success: false; status: 413; message: string }
  | { success: false; status: 400; message: string }
> {
  const headerLength = parseInt(request.headers.get('content-length') || '', 10)
  if (!Number.isNaN(headerLength) && headerLength > maxBytes) {
    return { success: false, status: 413, message: 'Request payload too large.' }
  }

  if (!request.body) {
    return { success: false, status: 400, message: 'Please check the form and try again.' }
  }

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

  // 5. Required core fields check (name, restaurant, phone)
  for (const field of requiredFields) {
    if (typeof body[field] !== 'string' || !body[field].trim()) {
      return NextResponse.json({ message: 'Please complete all required fields.' }, { status: 400 })
    }
  }

  // 6. Intent normalization
  let normalizedIntent: LeadIntent = 'demo'
  if (typeof body.intent === 'string') {
    const rawIntent = body.intent.trim().toLowerCase()
    if (rawIntent === 'contact' || rawIntent === 'inquiry' || rawIntent === 'contact-us') {
      normalizedIntent = 'contact'
    } else if (rawIntent === 'free-trial' || rawIntent === 'trial' || rawIntent === 'freetrial') {
      normalizedIntent = 'free-trial'
    } else if (rawIntent === 'demo' || rawIntent === 'product-demo') {
      normalizedIntent = 'demo'
    }
  }

  // 7. For Contact Us inquiry, require a meaningful message
  if (normalizedIntent === 'contact') {
    if (typeof body.message !== 'string' || body.message.trim().length < 5) {
      return NextResponse.json({ message: 'Please enter a meaningful message.' }, { status: 400 })
    }
  }

  // 8. Field length and format validations
  if (String(body.name).trim().length > 80) {
    return NextResponse.json({ message: 'Please shorten your name.' }, { status: 400 })
  }
  if (String(body.restaurant).trim().length > 100) {
    return NextResponse.json({ message: 'Please shorten the restaurant name.' }, { status: 400 })
  }
  if (typeof body.city === 'string' && body.city.trim().length > 80) {
    return NextResponse.json({ message: 'Please shorten the city name.' }, { status: 400 })
  }
  if (!/^\+?[0-9 ()-]{7,20}$/.test(String(body.phone).trim())) {
    return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 })
  }

  // 9. Optional fields validations
  if (typeof body.pos === 'string' && body.pos.length > 100) {
    return NextResponse.json({ message: 'Please shorten the POS software name.' }, { status: 400 })
  }
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

  // 10. Construct standardized lead payload
  const leadPayload: LeadPayload = {
    submittedAt: new Date().toISOString(),
    source: typeof body.source === 'string' && body.source ? String(body.source).trim().slice(0, 50) : (normalizedIntent === 'contact' ? 'homepage_contact' : 'book-demo'),
    intent: normalizedIntent,
    name: String(body.name).trim(),
    restaurant: String(body.restaurant).trim(),
    phone: String(body.phone).trim(),
    city: typeof body.city === 'string' && body.city.trim() ? body.city.trim() : undefined,
    pos: typeof body.pos === 'string' && body.pos.trim() ? body.pos.trim() : undefined,
    type: typeof body.type === 'string' && body.type.trim() ? body.type.trim() : undefined,
    volume: typeof body.volume === 'string' && body.volume.trim() ? body.volume.trim() : undefined,
    interests: typeof body.interests === 'string' && body.interests.trim() ? body.interests.trim() : undefined,
    billing: typeof body.billing === 'string' && body.billing.trim() ? body.billing.trim() : undefined,
    challenge: typeof body.challenge === 'string' && body.challenge.trim() ? body.challenge.trim() : undefined,
    message: typeof body.message === 'string' && body.message.trim() ? body.message.trim() : undefined,
  }

  // 11. Dispatch email delivery
  try {
    const deliveryResult = await dispatchLead(leadPayload)
    const deliveryConfig = deliveryResult.channel !== 'unconfigured'

    if (!deliveryConfig) {
      console.warn('[lead-delivery] Delivery provider unconfigured. Missing RESEND_API_KEY or LEAD_DELIVERY_WEBHOOK_URL.')
      return NextResponse.json(
        { message: 'Email delivery is not configured yet. Your details were not stored. Please contact OrderPilot directly at contact@orderpilot.pk.' },
        { status: 503 }
      )
    }

    if (!deliveryResult.success) {
      console.error(`[lead-delivery] Delivery failed via ${deliveryResult.channel}:`, deliveryResult.error)
      return NextResponse.json(
        { message: 'We were unable to deliver your request due to a delivery service error. Please try again or reach out to us directly.' },
        { status: 502 }
      )
    }

    console.info(
      `[lead-delivery] Lead successfully delivered via ${deliveryResult.channel} (source: ${leadPayload.source}, intent: ${leadPayload.intent}, restaurant: ${leadPayload.restaurant})`
    )

    let successMessage = 'Your request was sent. Our team will get in touch to agree the next step.'
    if (normalizedIntent === 'contact') {
      successMessage = 'Your message was received. Our team will get in touch shortly.'
    } else if (normalizedIntent === 'free-trial') {
      successMessage = 'Your 14-day free trial request was received. Our team will contact you to arrange setup and activate your account.'
    }

    return NextResponse.json(
      { success: true, message: successMessage, intent: normalizedIntent },
      { status: 200 }
    )
  } catch (error) {
    console.error('[lead-delivery] Unexpected error during delivery:', error)
    return NextResponse.json(
      { message: 'We were unable to deliver your request. Please check your connection and try again, or reach out to us directly.' },
      { status: 502 }
    )
  }
}
