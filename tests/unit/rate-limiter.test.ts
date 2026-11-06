import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { resolveClientIp, checkRateLimit } from '@/lib/rate-limiter'

describe('Unit: Distributed Rate Limiter & IP Trust Hierarchy', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    process.env = { ...originalEnv }
    delete process.env.VERCEL
    delete process.env.VERCEL_ENV
    delete process.env.CF_PAGES
    delete process.env.TRUST_CLOUDFLARE_PROXY
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  describe('resolveClientIp Trust Boundaries', () => {
    it('prioritizes x-vercel-forwarded-for over spoofed cf-connecting-ip on Vercel', () => {
      process.env.VERCEL = '1'
      const req = new Request('http://localhost', {
        headers: {
          'cf-connecting-ip': '1.1.1.1', // Spoofed
          'x-vercel-forwarded-for': '203.0.113.195, 10.0.0.1', // Real edge header
        },
      })
      expect(resolveClientIp(req)).toBe('203.0.113.195')
    })

    it('prioritizes cf-connecting-ip when Cloudflare proxy trust is verified', () => {
      process.env.TRUST_CLOUDFLARE_PROXY = 'true'
      const req = new Request('http://localhost', {
        headers: {
          'cf-connecting-ip': '198.51.100.4',
          'x-forwarded-for': '127.0.0.1, 10.0.0.2',
        },
      })
      expect(resolveClientIp(req)).toBe('198.51.100.4')
    })

    it('falls back to x-real-ip or leftmost x-forwarded-for on generic hosts', () => {
      const reqReal = new Request('http://localhost', {
        headers: { 'x-real-ip': '198.51.100.22' },
      })
      expect(resolveClientIp(reqReal)).toBe('198.51.100.22')

      const reqForwarded = new Request('http://localhost', {
        headers: { 'x-forwarded-for': '198.51.100.33, 10.0.0.5' },
      })
      expect(resolveClientIp(reqForwarded)).toBe('198.51.100.33')
    })

    it('returns unknown when no client IP headers are present', () => {
      const req = new Request('http://localhost')
      expect(resolveClientIp(req)).toBe('unknown')
    })
  })

  describe('checkRateLimit Sliding Window & Fallbacks', () => {
    it('allows 5 requests per IP and rejects the 6th', async () => {
      const testIp = '10.200.1.5'
      const makeReq = () => new Request('http://localhost', { headers: { 'x-real-ip': testIp } })

      for (let i = 1; i <= 5; i++) {
        const res = await checkRateLimit(makeReq(), 5, 60_000)
        expect(res.success).toBe(true)
        expect(res.remaining).toBe(5 - i)
      }

      // 6th request fails
      const blocked = await checkRateLimit(makeReq(), 5, 60_000)
      expect(blocked.success).toBe(false)
      expect(blocked.remaining).toBe(0)
    })

    it('handles distributed Upstash Redis responses when configured', async () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://fake-redis.upstash.io'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'mock_token'

      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ result: [3, 45000] }), { status: 200 })
      )
      globalThis.fetch = fetchMock

      const req = new Request('http://localhost', { headers: { 'x-real-ip': '10.200.2.1' } })
      const res = await checkRateLimit(req, 5, 60_000)

      expect(res.success).toBe(true)
      expect(res.remaining).toBe(2)
      expect(fetchMock).toHaveBeenCalledWith(
        'https://fake-redis.upstash.io',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('falls back to memory store when distributed Redis call fails', async () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://broken-redis.upstash.io'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'broken_token'

      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Connection refused'))

      const req = new Request('http://localhost', { headers: { 'x-real-ip': '10.200.3.1' } })
      const res = await checkRateLimit(req, 5, 60_000)

      expect(res.success).toBe(true)
      expect(res.remaining).toBe(4)
    })
  })
})
