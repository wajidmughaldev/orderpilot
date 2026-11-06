import { describe, it, expect } from 'vitest'
import { LeadIntent } from '@/lib/email'

export const PHONE_REGEX = /^\+?[0-9 ()-]{7,20}$/

export function normalizeIntent(rawIntent?: unknown): LeadIntent {
  if (typeof rawIntent === 'string') {
    const trimmed = rawIntent.trim().toLowerCase()
    if (trimmed === 'contact' || trimmed === 'inquiry' || trimmed === 'contact-us') {
      return 'contact'
    }
    if (trimmed === 'free-trial' || trimmed === 'trial' || trimmed === 'freetrial') {
      return 'free-trial'
    }
    if (trimmed === 'demo' || trimmed === 'product-demo') {
      return 'demo'
    }
  }
  return 'demo'
}

export interface ValidationInput {
  name?: unknown
  restaurant?: unknown
  phone?: unknown
  city?: unknown
  pos?: unknown
  challenge?: unknown
  message?: unknown
  type?: unknown
  volume?: unknown
  billing?: unknown
  interests?: unknown
  website?: unknown
  intent?: unknown
}

export function validateLeadForm(input: ValidationInput): { valid: boolean; error?: string; status?: number } {
  // Honeypot check
  if (input.website) {
    return { valid: false, error: 'Request rejected.', status: 400 }
  }

  // Required fields check
  const required = ['name', 'restaurant', 'phone'] as const
  for (const field of required) {
    const val = input[field]
    if (typeof val !== 'string' || !val.trim()) {
      return { valid: false, error: 'Please complete all required fields.', status: 400 }
    }
  }

  const intent = normalizeIntent(input.intent)

  // Message check for contact inquiries
  if (intent === 'contact') {
    if (typeof input.message !== 'string' || input.message.trim().length < 5) {
      return { valid: false, error: 'Please enter a meaningful message.', status: 400 }
    }
  }

  // Core field lengths & patterns
  if (String(input.name).trim().length > 80) {
    return { valid: false, error: 'Please shorten your name.', status: 400 }
  }
  if (String(input.restaurant).trim().length > 100) {
    return { valid: false, error: 'Please shorten the restaurant name.', status: 400 }
  }
  if (typeof input.city === 'string' && input.city.trim().length > 80) {
    return { valid: false, error: 'Please shorten the city name.', status: 400 }
  }
  if (!PHONE_REGEX.test(String(input.phone).trim())) {
    return { valid: false, error: 'Please enter a valid phone number.', status: 400 }
  }

  // Optional fields limits
  if (typeof input.pos === 'string' && input.pos.length > 100) {
    return { valid: false, error: 'Please shorten the POS software name.', status: 400 }
  }
  if (typeof input.challenge === 'string' && input.challenge.length > 400) {
    return { valid: false, error: 'Please shorten the challenge description.', status: 400 }
  }
  if (typeof input.message === 'string' && input.message.length > 600) {
    return { valid: false, error: 'Please shorten the message.', status: 400 }
  }
  if (typeof input.type === 'string' && input.type.length > 80) {
    return { valid: false, error: 'Please select a valid restaurant type.', status: 400 }
  }
  if (typeof input.volume === 'string' && input.volume.length > 80) {
    return { valid: false, error: 'Please select a valid order volume.', status: 400 }
  }
  if (typeof input.billing === 'string' && input.billing.length > 80) {
    return { valid: false, error: 'Please select a valid billing option.', status: 400 }
  }
  if (typeof input.interests === 'string' && input.interests.length > 200) {
    return { valid: false, error: 'Please shorten selected interests.', status: 400 }
  }

  return { valid: true }
}

describe('Unit: Form Validation Logic', () => {
  const baseValid = {
    name: 'Ahmed Khan',
    restaurant: 'Karachi Biryani House',
    phone: '03001234567',
    city: 'Karachi',
  }

  describe('Required Fields & Whitespace Handling', () => {
    it('accepts completely valid required fields', () => {
      const result = validateLeadForm(baseValid)
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('rejects missing or empty name', () => {
      expect(validateLeadForm({ ...baseValid, name: '' }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, name: '   ' }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, name: undefined }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, name: null }).error).toBe('Please complete all required fields.')
    })

    it('rejects missing or empty restaurant', () => {
      expect(validateLeadForm({ ...baseValid, restaurant: '' }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, restaurant: '   ' }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, restaurant: undefined }).error).toBe('Please complete all required fields.')
    })

    it('rejects missing or empty phone', () => {
      expect(validateLeadForm({ ...baseValid, phone: '' }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, phone: '   ' }).error).toBe('Please complete all required fields.')
      expect(validateLeadForm({ ...baseValid, phone: undefined }).error).toBe('Please complete all required fields.')
    })
  })

  describe('Phone Number Pattern Validation', () => {
    it('accepts standard Pakistani mobile formats', () => {
      const validPakNumbers = [
        '03001234567',
        '03361815141',
        '+92 336 1815141',
        '+92-300-1234567',
        '+923001234567',
        '0321 9876543',
        '+92 (300) 1234567',
      ]
      for (const phone of validPakNumbers) {
        expect(PHONE_REGEX.test(phone)).toBe(true)
        expect(validateLeadForm({ ...baseValid, phone }).valid).toBe(true)
      }
    })

    it('accepts valid international numbers within 7-20 chars', () => {
      const validIntl = [
        '+44 20 7946 0958',
        '+1 (555) 234-5678',
        '+971 4 123 4567',
        '+966 11 234 5678',
        '1234567', // Exactly 7 digits
        '+1234567890123456789', // Exactly 20 chars
      ]
      for (const phone of validIntl) {
        expect(PHONE_REGEX.test(phone)).toBe(true)
        expect(validateLeadForm({ ...baseValid, phone }).valid).toBe(true)
      }
    })

    it('rejects invalid characters, letters, and symbols', () => {
      const invalidPhones = [
        '0300-CALL-ME',
        'abc-def-ghij',
        '0300 123 456@',
        '0300$1234567',
        '<script>alert(1)</script>',
        '++923001234567', // double plus not allowed at start
        '+92 300 1234567#',
      ]
      for (const phone of invalidPhones) {
        expect(PHONE_REGEX.test(phone)).toBe(false)
        expect(validateLeadForm({ ...baseValid, phone }).error).toBe('Please enter a valid phone number.')
      }
    })

    it('rejects numbers shorter than 7 characters', () => {
      const shortPhones = ['123', '12345', '123456', '+92']
      for (const phone of shortPhones) {
        expect(PHONE_REGEX.test(phone)).toBe(false)
        expect(validateLeadForm({ ...baseValid, phone }).error).toBe('Please enter a valid phone number.')
      }
    })

    it('rejects numbers longer than 20 characters', () => {
      const longPhone = '+92 300 123456789012345'
      expect(PHONE_REGEX.test(longPhone)).toBe(false)
      expect(validateLeadForm({ ...baseValid, phone: longPhone }).error).toBe('Please enter a valid phone number.')
    })
  })

  describe('Honeypot Validation', () => {
    it('rejects spam submissions when honeypot website field is populated', () => {
      const result = validateLeadForm({
        ...baseValid,
        website: 'https://spam-seo.example.com',
      })
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Request rejected.')
      expect(result.status).toBe(400)
    })
  })

  describe('Intent Classification & Normalization', () => {
    it('classifies contact inquiries accurately', () => {
      expect(normalizeIntent('contact')).toBe('contact')
      expect(normalizeIntent('inquiry')).toBe('contact')
      expect(normalizeIntent('contact-us')).toBe('contact')
      expect(normalizeIntent('CONTACT')).toBe('contact')
      expect(normalizeIntent('  contact  ')).toBe('contact')
    })

    it('classifies free trial requests accurately', () => {
      expect(normalizeIntent('trial')).toBe('free-trial')
      expect(normalizeIntent('free-trial')).toBe('free-trial')
      expect(normalizeIntent('freetrial')).toBe('free-trial')
      expect(normalizeIntent('FREE-TRIAL')).toBe('free-trial')
      expect(normalizeIntent('  trial  ')).toBe('free-trial')
    })

    it('defaults unknown or demo intents to demo', () => {
      expect(normalizeIntent('demo')).toBe('demo')
      expect(normalizeIntent('product-demo')).toBe('demo')
      expect(normalizeIntent(undefined)).toBe('demo')
      expect(normalizeIntent(null)).toBe('demo')
      expect(normalizeIntent('random-value')).toBe('demo')
      expect(normalizeIntent('')).toBe('demo')
    })
  })

  describe('Contact Inquiry Message Requirements', () => {
    it('requires at least 5 non-whitespace characters for contact inquiries', () => {
      expect(
        validateLeadForm({
          ...baseValid,
          intent: 'contact',
          message: 'Hi',
        }).error
      ).toBe('Please enter a meaningful message.')

      expect(
        validateLeadForm({
          ...baseValid,
          intent: 'contact',
          message: '    ',
        }).error
      ).toBe('Please enter a meaningful message.')

      expect(
        validateLeadForm({
          ...baseValid,
          intent: 'contact',
          message: 'Hello, I have an inquiry regarding your POS integrations.',
        }).valid
      ).toBe(true)
    })

    it('allows demo requests without a message', () => {
      const result = validateLeadForm({
        ...baseValid,
        intent: 'demo',
      })
      expect(result.valid).toBe(true)
    })
  })

  describe('Field Length Boundaries', () => {
    it('enforces name length <= 80', () => {
      expect(validateLeadForm({ ...baseValid, name: 'a'.repeat(80) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, name: 'a'.repeat(81) }).error).toBe('Please shorten your name.')
    })

    it('enforces restaurant length <= 100', () => {
      expect(validateLeadForm({ ...baseValid, restaurant: 'a'.repeat(100) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, restaurant: 'a'.repeat(101) }).error).toBe('Please shorten the restaurant name.')
    })

    it('enforces city length <= 80', () => {
      expect(validateLeadForm({ ...baseValid, city: 'a'.repeat(80) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, city: 'a'.repeat(81) }).error).toBe('Please shorten the city name.')
    })

    it('enforces POS length <= 100', () => {
      expect(validateLeadForm({ ...baseValid, pos: 'a'.repeat(100) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, pos: 'a'.repeat(101) }).error).toBe('Please shorten the POS software name.')
    })

    it('enforces challenge length <= 400', () => {
      expect(validateLeadForm({ ...baseValid, challenge: 'a'.repeat(400) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, challenge: 'a'.repeat(401) }).error).toBe('Please shorten the challenge description.')
    })

    it('enforces message length <= 600', () => {
      expect(validateLeadForm({ ...baseValid, intent: 'contact', message: 'a'.repeat(600) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, intent: 'contact', message: 'a'.repeat(601) }).error).toBe('Please shorten the message.')
    })

    it('enforces interests length <= 200', () => {
      expect(validateLeadForm({ ...baseValid, interests: 'a'.repeat(200) }).valid).toBe(true)
      expect(validateLeadForm({ ...baseValid, interests: 'a'.repeat(201) }).error).toBe('Please shorten selected interests.')
    })
  })
})

