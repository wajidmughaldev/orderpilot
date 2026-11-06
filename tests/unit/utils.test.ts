import { describe, it, expect, vi } from 'vitest'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/track'

describe('Unit: Helper Utilities & Tracking', () => {
  describe('cn utility (Tailwind merge + clsx)', () => {
    it('merges class names correctly', () => {
      expect(cn('class-a', 'class-b')).toBe('class-a class-b')
    })

    it('resolves conflicting Tailwind classes properly', () => {
      expect(cn('p-4', 'p-6')).toBe('p-6')
      expect(cn('text-red-500', 'text-green-500')).toBe('text-green-500')
    })

    it('handles falsy values and conditions cleanly', () => {
      const condition = false
      expect(cn('base', condition && 'hidden', null, undefined, false)).toBe('base')
    })
  })

  describe('trackEvent utility', () => {
    it('does nothing when executed in SSR environment (window is undefined)', () => {
      // In node environment, window is undefined
      expect(() => trackEvent('demo_cta_click', { plan: 'WhatsApp' })).not.toThrow()
    })
  })
})

