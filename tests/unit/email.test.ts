import { describe, it, expect, afterEach, vi } from 'vitest'
import {
  getEmailSubject,
  generateEmailText,
  generateEmailHtml,
  escapeHtml,
  LeadPayload,
} from '@/lib/email'

describe('Unit: Transactional Email Generation & Escaping', () => {
  const basePayload: LeadPayload = {
    submittedAt: '2026-11-06T12:00:00.000Z',
    source: 'book-demo',
    intent: 'demo',
    name: 'Tariq Butt',
    restaurant: 'Lahore Shinwari & BBQ',
    phone: '+92 300 1234567',
    city: 'Lahore',
    pos: 'Candela POS',
    type: 'Fine Dining',
    volume: '100–300 orders',
    interests: 'Table QR, Kitchen board',
    billing: 'Monthly',
    challenge: 'Long wait times during dinner rush',
  }

  describe('Email Subject Generation', () => {
    it('generates correct subject for Demo requests', () => {
      const subject = getEmailSubject({ ...basePayload, intent: 'demo' })
      expect(subject).toBe('[OrderPilot] New Demo Request — Lahore Shinwari & BBQ')
    })

    it('generates correct subject for Free Trial requests', () => {
      const subject = getEmailSubject({ ...basePayload, intent: 'free-trial' })
      expect(subject).toBe('[OrderPilot] New Free Trial Request — Lahore Shinwari & BBQ')
    })

    it('generates correct subject for Contact inquiries', () => {
      const subject = getEmailSubject({
        ...basePayload,
        intent: 'contact',
        source: 'homepage_contact',
        message: 'Interested in partnering with OrderPilot.',
      })
      expect(subject).toBe('[OrderPilot] New Contact Inquiry — Lahore Shinwari & BBQ')
    })

    it('trims leading and trailing whitespace from restaurant name in subject', () => {
      const subject = getEmailSubject({
        ...basePayload,
        restaurant: '   Karachi Biryani Center   ',
      })
      expect(subject).toBe('[OrderPilot] New Demo Request — Karachi Biryani Center')
    })
  })

  describe('Plain Text Email Template Generation', () => {
    it('generates complete text body for Demo requests with profile fields', () => {
      const text = generateEmailText(basePayload)

      expect(text).toContain('ORDERPILOT — DEMO REQUEST')
      expect(text).toContain('[OrderPilot] New Demo Request — Lahore Shinwari & BBQ')
      expect(text).toContain('Restaurant Name:  Lahore Shinwari & BBQ')
      expect(text).toContain('Contact Person:   Tariq Butt')
      expect(text).toContain('Phone / WhatsApp: +92 300 1234567')
      expect(text).toContain('City:             Lahore')
      expect(text).toContain('Current POS:      Candela POS')
      expect(text).toContain('Restaurant Type:  Fine Dining')
      expect(text).toContain('Daily Order Vol:  100–300 orders')
      expect(text).toContain('Interested In:    Table QR, Kitchen board')
      expect(text).toContain('Billing Option:   Monthly')
      expect(text).toContain('BIGGEST CHALLENGE')
      expect(text).toContain('Long wait times during dinner rush')
      expect(text).toContain('contact@orderpilot.pk')
      expect(text).toContain('PKT')
    })

    it('generates complete text body for Contact inquiries with message', () => {
      const contactPayload: LeadPayload = {
        submittedAt: '2026-11-06T12:00:00.000Z',
        source: 'homepage_contact',
        intent: 'contact',
        name: 'Usman Ghani',
        restaurant: 'Islamabad Coffee Roasters',
        phone: '03335557788',
        city: 'Islamabad',
        message: 'We are expanding to 3 locations and need POS hardware and software.',
      }

      const text = generateEmailText(contactPayload)

      expect(text).toContain('ORDERPILOT — CONTACT INQUIRY')
      expect(text).toContain('[OrderPilot] New Contact Inquiry — Islamabad Coffee Roasters')
      expect(text).toContain('INQUIRY MESSAGE')
      expect(text).toContain('We are expanding to 3 locations and need POS hardware and software.')
      expect(text).toContain('Source: Homepage Contact Us')
      expect(text).not.toContain('Current POS:')
    })

    it('generates complete text body for 14-Day Free Trial requests', () => {
      const trialPayload: LeadPayload = {
        ...basePayload,
        intent: 'free-trial',
        billing: 'Pay-per-Order',
      }

      const text = generateEmailText(trialPayload)

      expect(text).toContain('ORDERPILOT — 14-DAY FREE TRIAL REQUEST')
      expect(text).toContain('[OrderPilot] New Free Trial Request — Lahore Shinwari & BBQ')
      expect(text).toContain('Billing Option:   Pay-per-Order')
    })
  })

  describe('Responsive HTML Email Template Generation', () => {
    it('generates valid HTML with DEMO REQUEST badge and WhatsApp link', () => {
      const html = generateEmailHtml(basePayload)

      expect(html).toContain('<!DOCTYPE html>')
      expect(html).toContain('DEMO REQUEST')
      expect(html).toContain('background-color: #e6f4ea') // Green badge bg
      expect(html).toContain('color: #005f00') // Green badge text
      expect(html).toContain('Lahore Shinwari &amp; BBQ') // Escaped ampersand
      expect(html).toContain('Candela POS')
      expect(html).toContain('https://wa.me/923001234567')
      expect(html).toContain('tel:+923001234567')
      expect(html).toContain('contact@orderpilot.pk')
    })

    it('generates HTML with CONTACT INQUIRY badge and message block', () => {
      const contactPayload: LeadPayload = {
        submittedAt: '2026-11-06T12:00:00.000Z',
        source: 'homepage_contact',
        intent: 'contact',
        name: 'Sara Khan',
        restaurant: 'Karachi Bakery <North>',
        phone: '03123456789',
        city: 'Karachi',
        message: 'Looking forward to trying your WhatsApp bot <beta>.',
      }

      const html = generateEmailHtml(contactPayload)

      expect(html).toContain('CONTACT INQUIRY')
      expect(html).toContain('background-color: #e8f0fe') // Blue badge bg
      expect(html).toContain('color: #1a73e8') // Blue badge text
      expect(html).toContain('Karachi Bakery &lt;North&gt;') // Escaped brackets
      expect(html).toContain('Looking forward to trying your WhatsApp bot &lt;beta&gt;.')
      expect(html).toContain('Inquiry Message')
    })

    it('generates HTML with 14-DAY FREE TRIAL badge and styling', () => {
      const trialPayload: LeadPayload = {
        ...basePayload,
        intent: 'free-trial',
      }

      const html = generateEmailHtml(trialPayload)

      expect(html).toContain('14-DAY FREE TRIAL')
      expect(html).toContain('background-color: #fef7e0') // Amber badge bg
      expect(html).toContain('color: #b06000') // Amber badge text
    })
  })

  describe('HTML Escaping & Boundary Cases', () => {
    it('escapes all standard HTML special characters', () => {
      expect(escapeHtml('&')).toBe('&amp;')
      expect(escapeHtml('<')).toBe('&lt;')
      expect(escapeHtml('>')).toBe('&gt;')
      expect(escapeHtml('"')).toBe('&quot;')
      expect(escapeHtml("'")).toBe('&#039;')
    })

    it('escapes complex script injection and attribute escape payloads', () => {
      const xss1 = '<script>alert("XSS")</script>'
      expect(escapeHtml(xss1)).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;')

      const xss2 = '"><svg onload=alert(document.cookie)>'
      expect(escapeHtml(xss2)).toBe('&quot;&gt;&lt;svg onload=alert(document.cookie)&gt;')

      const xss3 = "'; DROP TABLE leads; --"
      expect(escapeHtml(xss3)).toBe('&#039;; DROP TABLE leads; --')
    })

    it('handles business strings with quotes and ampersands cleanly', () => {
      expect(escapeHtml("McDonald's & Wendy's")).toBe('McDonald&#039;s &amp; Wendy&#039;s')
      expect(escapeHtml('Salt & Pepper "Village"')).toBe('Salt &amp; Pepper &quot;Village&quot;')
    })

    it('handles empty strings and strings without special characters unchanged', () => {
      expect(escapeHtml('')).toBe('')
      expect(escapeHtml('Normal Restaurant Name 123')).toBe('Normal Restaurant Name 123')
    })
  })

  describe('dispatchLead Delivery Channels & Mocking', () => {
    const originalEnv = { ...process.env }
    const originalFetch = globalThis.fetch

    afterEach(() => {
      process.env = { ...originalEnv }
      globalThis.fetch = originalFetch
    })

    it('returns unconfigured status when no email provider or webhook is set', async () => {
      delete process.env.RESEND_API_KEY
      delete process.env.POSTMARK_SERVER_TOKEN
      delete process.env.SENDGRID_API_KEY
      delete process.env.LEAD_DELIVERY_WEBHOOK_URL
      delete process.env.LEAD_WEBHOOK_URL

      const { dispatchLead } = await import('@/lib/email')
      const result = await dispatchLead(basePayload)
      expect(result.success).toBe(false)
      expect(result.channel).toBe('unconfigured')
      expect(result.error).toContain('No email provider')
    })

    it('delivers via Resend when RESEND_API_KEY is configured', async () => {
      process.env.RESEND_API_KEY = 're_test_mock_12345'
      delete process.env.POSTMARK_SERVER_TOKEN
      delete process.env.SENDGRID_API_KEY
      delete process.env.LEAD_DELIVERY_WEBHOOK_URL
      delete process.env.LEAD_WEBHOOK_URL

      let capturedUrl = ''
      let capturedHeaders: any = {}
      let capturedBody: any = {}

      globalThis.fetch = vi.fn().mockImplementation(async (url, init) => {
        capturedUrl = String(url)
        capturedHeaders = init?.headers
        capturedBody = JSON.parse(init?.body as string)
        return new Response(JSON.stringify({ id: 'msg_resend_abc123' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      })

      const { dispatchLead } = await import('@/lib/email')
      const result = await dispatchLead(basePayload)

      expect(result.success).toBe(true)
      expect(result.channel).toBe('resend')
      expect(result.messageId).toBe('msg_resend_abc123')
      expect(capturedUrl).toBe('https://api.resend.com/emails')
      expect(capturedHeaders['Authorization']).toBe('Bearer re_test_mock_12345')
      expect(capturedBody.to).toEqual(['contact@orderpilot.pk'])
      expect(capturedBody.subject).toBe('[OrderPilot] New Demo Request — Lahore Shinwari & BBQ')
    })

    it('handles Resend API upstream error properly', async () => {
      process.env.RESEND_API_KEY = 're_test_mock_12345'
      delete process.env.LEAD_DELIVERY_WEBHOOK_URL
      delete process.env.LEAD_WEBHOOK_URL

      globalThis.fetch = vi.fn().mockImplementation(async () => {
        return new Response(JSON.stringify({ message: 'Domain verification required' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        })
      })

      const { dispatchLead } = await import('@/lib/email')
      const result = await dispatchLead(basePayload)

      expect(result.success).toBe(false)
      expect(result.channel).toBe('resend')
      expect(result.error).toBe('Domain verification required')
    })

    it('delivers via Postmark when POSTMARK_SERVER_TOKEN is configured', async () => {
      delete process.env.RESEND_API_KEY
      process.env.POSTMARK_SERVER_TOKEN = 'pm_server_token_xyz'
      delete process.env.SENDGRID_API_KEY
      delete process.env.LEAD_DELIVERY_WEBHOOK_URL
      delete process.env.LEAD_WEBHOOK_URL

      globalThis.fetch = vi.fn().mockImplementation(async (url, init) => {
        return new Response(JSON.stringify({ MessageID: 'pm_msg_789' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      })

      const { dispatchLead } = await import('@/lib/email')
      const result = await dispatchLead(basePayload)

      expect(result.success).toBe(true)
      expect(result.channel).toBe('postmark')
      expect(result.messageId).toBe('pm_msg_789')
    })

    it('delivers via SendGrid when SENDGRID_API_KEY is configured', async () => {
      delete process.env.RESEND_API_KEY
      delete process.env.POSTMARK_SERVER_TOKEN
      process.env.SENDGRID_API_KEY = 'SG.mock_key_456'
      delete process.env.LEAD_DELIVERY_WEBHOOK_URL
      delete process.env.LEAD_WEBHOOK_URL

      globalThis.fetch = vi.fn().mockImplementation(async (url, init) => {
        return new Response('', { status: 202 })
      })

      const { dispatchLead } = await import('@/lib/email')
      const result = await dispatchLead(basePayload)

      expect(result.success).toBe(true)
      expect(result.channel).toBe('sendgrid')
    })

    it('delivers via Webhook Relay with auth header and payload', async () => {
      delete process.env.RESEND_API_KEY
      delete process.env.POSTMARK_SERVER_TOKEN
      delete process.env.SENDGRID_API_KEY
      process.env.LEAD_DELIVERY_WEBHOOK_URL = 'https://crm.orderpilot.pk/webhook'
      process.env.LEAD_DELIVERY_WEBHOOK_SECRET = 'secret_token_abc'

      let webhookHeaders: any = {}
      let webhookBody: any = {}

      globalThis.fetch = vi.fn().mockImplementation(async (url, init) => {
        webhookHeaders = init?.headers
        webhookBody = JSON.parse(init?.body as string)
        return new Response(JSON.stringify({ ok: true }), { status: 200 })
      })

      const { dispatchLead } = await import('@/lib/email')
      const result = await dispatchLead(basePayload)

      expect(result.success).toBe(true)
      expect(result.channel).toBe('webhook')
      expect(webhookHeaders['Authorization']).toBe('Bearer secret_token_abc')
      expect(webhookHeaders['X-Lead-Secret']).toBe('secret_token_abc')
      expect(webhookBody.emailSubject).toBe('[OrderPilot] New Demo Request — Lahore Shinwari & BBQ')
      expect(webhookBody.emailRecipient).toBe('contact@orderpilot.pk')
    })
  })
})
