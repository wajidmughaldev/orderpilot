import { describe, it, expect, vi } from 'vitest'

describe('Security Audit: Rate Limiting & Proxy Trust Boundaries', () => {
  it('PROVES rate limit failure across multiple independent server instances (In-Memory Map Isolation)', async () => {
    // Simulate two independent application instances by dynamically re-importing the route module
    // in isolated module contexts
    const instanceA = await vi.importActual<typeof import('@/app/api/demo-request/route')>('@/app/api/demo-request/route')
    
    // Reset module registry to get a truly independent instance with its own memory Map
    vi.resetModules()
    const instanceB = await vi.importActual<typeof import('@/app/api/demo-request/route')>('@/app/api/demo-request/route')

    process.env.RESEND_API_KEY = 're_mock_test_key'
    globalThis.fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'ok' }), { status: 200 }))

    const clientIp = '198.51.100.55'
    const payload = {
      name: 'Spammer Across Nodes',
      restaurant: 'Multi Node Bistro',
      phone: '03001234567',
    }

    function makeRequest(ip: string) {
      return new Request('http://localhost:3000/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': ip,
        },
        body: JSON.stringify(payload),
      })
    }

    // Send 5 requests to Instance A
    for (let i = 0; i < 5; i++) {
      const resA = await instanceA.POST(makeRequest(clientIp))
      expect(resA.status).toBe(200)
    }

    // 6th request to Instance A is blocked by Instance A's local memory Map
    const blockedA = await instanceA.POST(makeRequest(clientIp))
    expect(blockedA.status).toBe(429)

    // CRITICAL VULNERABILITY PROOF:
    // When request goes to Instance B (e.g. serverless cold start, round-robin container, or sibling node),
    // Instance B has no shared state with Instance A.
    // The exact same client IP is ALLOWED 5 MORE REQUESTS!
    const resB1 = await instanceB.POST(makeRequest(clientIp))
    expect(resB1.status).toBe(200) // IN-MEMORY MAP FAILS TO ENFORCE RATE LIMIT ACROSS INSTANCES!

    const resB2 = await instanceB.POST(makeRequest(clientIp))
    expect(resB2.status).toBe(200)
  })

  it('PROVES spoofed cf-connecting-ip is rejected and blocked with 429 when behind Vercel edge', async () => {
    process.env.VERCEL = '1'
    const { POST } = await import('@/app/api/demo-request/route')
    process.env.RESEND_API_KEY = 're_mock_test_key'
    globalThis.fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'ok' }), { status: 200 }))

    const realClientIp = '203.0.113.88'
    const payload = { name: 'Spoofer', restaurant: 'Spoofed Cafe', phone: '03001234567' }

    // Attacker sends 5 requests with spoofed cf-connecting-ip = 1.1.1.1
    for (let i = 0; i < 5; i++) {
      const req = new Request('http://localhost:3000/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cf-connecting-ip': '1.1.1.1',
          'x-vercel-forwarded-for': realClientIp, // Vercel sets real IP
        },
        body: JSON.stringify(payload),
      })
      const res = await POST(req)
      expect(res.status).toBe(200)
    }

    // Attacker rotates spoofed cf-connecting-ip to 1.1.1.2 on request 6
    // Because resolveClientIp prioritizes x-vercel-forwarded-for on Vercel,
    // the spoofed cf-connecting-ip is ignored and the real IP remains rate-limited!
    const reqBypass = new Request('http://localhost:3000/api/demo-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cf-connecting-ip': '1.1.1.2', // Spoofed attempt
        'x-vercel-forwarded-for': realClientIp, // Real IP
      },
      body: JSON.stringify(payload),
    })
    const resBypass = await POST(reqBypass)
    
    // Proves that spoofed header evasion is completely defeated
    expect(resBypass.status).toBe(429)
  })
})

