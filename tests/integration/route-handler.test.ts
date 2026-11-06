import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { POST } from '@/app/api/demo-request/route'

describe('Integration: Next.js API Route Handler (app/api/demo-request/route.ts)', () => {
  const originalEnv = { ...process.env }
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    process.env = { ...originalEnv }
    // Clean environment to prevent unintended side effects
    delete process.env.RESEND_API_KEY
    delete process.env.POSTMARK_SERVER_TOKEN
    delete process.env.SENDGRID_API_KEY
    delete process.env.LEAD_DELIVERY_WEBHOOK_URL
    delete process.env.LEAD_WEBHOOK_URL
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    globalThis.fetch = originalFetch
  })

  function createJsonRequest(body: any, headers: Record<string, string> = {}) {
    const raw = JSON.stringify(body)
    return new Request('http://localhost:3000/api/demo-request', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': String(Buffer.byteLength(raw)),
        ...headers,
      },
      body: raw,
    })
  }

  describe('Provider Configuration & HTTP 503 Handling', () => {
    it('returns HTTP 503 when no email provider or delivery webhook is configured', async () => {
      const req = createJsonRequest(
        {
          name: 'Ahmed Khan',
          restaurant: 'Karachi Biryani House',
          phone: '03001234567',
          city: 'Karachi',
        },
        { 'x-forwarded-for': '10.5.1.1' }
      )

      const res = await POST(req)
      expect(res.status).toBe(503)

      const data = await res.json()
      expect(data.message).toContain('Email delivery is not configured yet')
      expect(data.message).toContain('contact@orderpilot.pk')
    })
  })

  describe('Resend API Delivery via Mocks (Success, Timeout, Failure)', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = 're_mock_test_key_12345'
    })

    it('returns HTTP 200 with message on Resend API success', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: 'resend_msg_test_001' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      const req = createJsonRequest(
        {
          source: 'book-demo',
          intent: 'demo',
          name: 'Usman Ali',
          restaurant: 'Lahore BBQ',
          phone: '+92 300 9876543',
          city: 'Lahore',
          pos: 'Candela POS',
        },
        { 'x-forwarded-for': '10.5.2.1' }
      )

      const res = await POST(req)
      expect(res.status).toBe(200)

      const data = await res.json()
      expect(data.success).toBe(true)
      expect(data.intent).toBe('demo')
      expect(data.message).toContain('agree the next step')
    })

    it('returns HTTP 502 with friendly user message when Resend times out', async () => {
      globalThis.fetch = vi.fn().mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new DOMException('The operation was aborted', 'TimeoutError')), 10)
        })
      })

      const req = createJsonRequest(
        {
          name: 'Hamza',
          restaurant: 'Islamabad Grill',
          phone: '03331112233',
        },
        { 'x-forwarded-for': '10.5.2.2' }
      )

      const res = await POST(req)
      expect(res.status).toBe(502)

      const data = await res.json()
      expect(data.message).toContain('unable to deliver your request')
    })

    it('returns HTTP 502 when Resend returns upstream HTTP 500', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Internal server error at provider' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )

      const req = createJsonRequest(
        {
          name: 'Hamza',
          restaurant: 'Islamabad Grill',
          phone: '03331112233',
        },
        { 'x-forwarded-for': '10.5.2.3' }
      )

      const res = await POST(req)
      expect(res.status).toBe(502)

      const data = await res.json()
      expect(data.message).toContain('unable to deliver your request due to a delivery service error')
    })
  })

  describe('Email Intent Routing & Distinct Responses', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = 're_mock_test_key_12345'
      globalThis.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: 'resend_ok' }), { status: 200 })
      )
    })

    it('routes Contact inquiry with message and returns contact confirmation', async () => {
      const req = createJsonRequest(
        {
          source: 'homepage_contact',
          intent: 'contact',
          name: 'Zeeshan',
          restaurant: 'Peshawar Shinwari',
          phone: '03121234567',
          message: 'Interested in franchise pricing and hardware requirements.',
        },
        { 'x-forwarded-for': '10.5.3.1' }
      )

      const res = await POST(req)
      expect(res.status).toBe(200)

      const data = await res.json()
      expect(data.success).toBe(true)
      expect(data.intent).toBe('contact')
      expect(data.message).toContain('Your message was received')
    })

    it('routes Free Trial request and returns activation message', async () => {
      const req = createJsonRequest(
        {
          source: 'book-demo',
          intent: 'trial',
          name: 'Bilal',
          restaurant: 'Quetta Cafe',
          phone: '03451234567',
          billing: 'Pay-per-Order',
        },
        { 'x-forwarded-for': '10.5.3.2' }
      )

      const res = await POST(req)
      expect(res.status).toBe(200)

      const data = await res.json()
      expect(data.success).toBe(true)
      expect(data.intent).toBe('free-trial')
      expect(data.message).toContain('14-day free trial request was received')
    })
  })

  describe('Duplicate Submissions & Rate Limiting Enforcement', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = 're_mock_test_key_12345'
      globalThis.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: 'resend_ok' }), { status: 200 })
      )
    })

    it('allows rapid duplicate submissions up to the 5-request rate limit', async () => {
      const testIp = '198.51.100.99'
      const payload = {
        name: 'Rapid Submitter',
        restaurant: 'Fast Food Express',
        phone: '03001234567',
      }

      for (let i = 1; i <= 5; i++) {
        const req = createJsonRequest(payload, { 'x-forwarded-for': testIp })
        const res = await POST(req)
        expect(res.status).toBe(200)
      }

      // 6th duplicate submission must hit 429 rate limit
      const blockedReq = createJsonRequest(payload, { 'x-forwarded-for': testIp })
      const blockedRes = await POST(blockedReq)
      expect(blockedRes.status).toBe(429)

      const data = await blockedRes.json()
      expect(data.message).toContain('Too many requests')
    })
  })

  describe('Proxy Trust Boundaries & Spoofed Header Evaluation', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = 're_mock_test_key_12345'
      process.env.TRUST_CLOUDFLARE_PROXY = 'true'
      globalThis.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: 'resend_ok' }), { status: 200 })
      )
    })

    afterEach(() => {
      delete process.env.TRUST_CLOUDFLARE_PROXY
    })

    it('isolates rate limits by edge-authenticated cf-connecting-ip regardless of x-forwarded-for', async () => {
      const cfIp = '203.0.113.50'
      const payload = { name: 'Edge Client', restaurant: 'Edge Cafe', phone: '03001234567' }

      // Fill 5 requests using cf-connecting-ip
      for (let i = 0; i < 5; i++) {
        const req = createJsonRequest(payload, {
          'cf-connecting-ip': cfIp,
          'x-forwarded-for': `10.0.0.${i}, 192.168.1.1`,
        })
        const res = await POST(req)
        expect(res.status).toBe(200)
      }

      // 6th request with different spoofed x-forwarded-for but same cf-connecting-ip is rejected
      const blockedReq = createJsonRequest(payload, {
        'cf-connecting-ip': cfIp,
        'x-forwarded-for': '127.0.0.1, 10.0.0.99',
      })
      const blockedRes = await POST(blockedReq)
      expect(blockedRes.status).toBe(429)
    })
  })

  describe('Payload Size & Chunked Streaming Protection', () => {
    it('returns HTTP 413 when Content-Length exceeds 64KB', async () => {
      const oversizedReq = new Request('http://localhost:3000/api/demo-request', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': '70000',
        },
        body: JSON.stringify({ padding: 'x'.repeat(70000) }),
      })

      const res = await POST(oversizedReq)
      expect(res.status).toBe(413)

      const data = await res.json()
      expect(data.message).toContain('payload too large')
    })

    it('returns HTTP 413 when stream body exceeds 64KB without Content-Length', async () => {
      const stream = new ReadableStream({
        start(controller) {
          const chunk = new TextEncoder().encode('x'.repeat(20000))
          controller.enqueue(chunk)
          controller.enqueue(chunk)
          controller.enqueue(chunk)
          controller.enqueue(chunk) // Total 80,000 bytes > 65,536 limit
          controller.close()
        },
      })

      const streamedReq = new Request('http://localhost:3000/api/demo-request', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        // @ts-ignore
        body: stream,
        // @ts-ignore
        duplex: 'half',
      })

      const res = await POST(streamedReq)
      expect(res.status).toBe(413)

      const data = await res.json()
      expect(data.message).toContain('payload too large')
    })
  })
})

