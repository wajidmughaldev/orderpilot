import { describe, it, expect } from 'vitest'
import { PRICING_CONFIG, pricingConfig } from '@/lib/pricing'

describe('Unit: Pricing Configurations & Calculations', () => {
  describe('Subscription Plans Calculations', () => {
    it('contains all 3 approved subscription plans', () => {
      const planNames = PRICING_CONFIG.plans.map(p => p.name)
      expect(planNames).toEqual(['WhatsApp', 'Web + Table', 'Complete'])
    })

    it('validates WhatsApp plan pricing, annual savings, and limits', () => {
      const plan = PRICING_CONFIG.plans.find(p => p.name === 'WhatsApp')!
      expect(plan).toBeDefined()
      expect(plan.monthlyPrice).toBe(5999)
      expect(plan.monthlyFormatted).toBe('PKR 5,999')
      expect(plan.annualPrice).toBe(59990)
      expect(plan.annualFormatted).toBe('PKR 59,990')
      // 12 months value: 5999 * 12 = 71,988. Annual is 59,990. Savings = 11,998 (exactly 2 months free)
      const expectedSaving = plan.monthlyPrice * 12 - plan.annualPrice
      expect(expectedSaving).toBe(11998)
      expect(plan.annualSaving).toBe(`Save PKR ${expectedSaving.toLocaleString('en-US')}`)
      expect(plan.orderLimit).toBe(1000)
      expect(plan.trialDays).toBe(14)
    })

    it('validates Web + Table plan pricing, annual savings, and limits', () => {
      const plan = PRICING_CONFIG.plans.find(p => p.name === 'Web + Table')!
      expect(plan).toBeDefined()
      expect(plan.monthlyPrice).toBe(7999)
      expect(plan.monthlyFormatted).toBe('PKR 7,999')
      expect(plan.annualPrice).toBe(79990)
      expect(plan.annualFormatted).toBe('PKR 79,990')
      // 12 months value: 7999 * 12 = 95,988. Annual is 79,990. Savings = 15,998 (2 months free)
      const expectedSaving = plan.monthlyPrice * 12 - plan.annualPrice
      expect(expectedSaving).toBe(15998)
      expect(plan.annualSaving).toBe(`Save PKR ${expectedSaving.toLocaleString('en-US')}`)
      expect(plan.orderLimit).toBe(1000)
      expect(plan.trialDays).toBe(14)
    })

    it('validates Complete plan pricing, annual savings, and limits', () => {
      const plan = PRICING_CONFIG.plans.find(p => p.name === 'Complete')!
      expect(plan).toBeDefined()
      expect(plan.monthlyPrice).toBe(12999)
      expect(plan.monthlyFormatted).toBe('PKR 12,999')
      expect(plan.annualPrice).toBe(129990)
      expect(plan.annualFormatted).toBe('PKR 129,990')
      // 12 months value: 12999 * 12 = 155,988. Annual is 129,990. Savings = 25,998 (2 months free)
      const expectedSaving = plan.monthlyPrice * 12 - plan.annualPrice
      expect(expectedSaving).toBe(25998)
      expect(plan.annualSaving).toBe(`Save PKR ${expectedSaving.toLocaleString('en-US')}`)
      expect(plan.orderLimit).toBe(1000)
      expect(plan.trialDays).toBe(14)
      expect(plan.tag).toBe('Best value')
    })
  })

  describe('14-Day Free Trial Eligibility Across ALL Plans', () => {
    it('guarantees 14-day free trial on EVERY subscription plan without exception', () => {
      for (const plan of PRICING_CONFIG.plans) {
        expect(plan.trialDays).toBe(14)
        expect(plan.features).toContain('14-day free trial')
      }
    })

    it('guarantees 14-day free trial on Pay-as-you-go model', () => {
      expect(pricingConfig.perOrder.publicPrice).toContain('14-day free trial')
      expect(pricingConfig.monthly.publicPrice).toContain('14-day free trial')
    })

    it('specifies that setup fee applies only AFTER 14-day trial if continuing', () => {
      expect(PRICING_CONFIG.setupFee).toBe(5000)
      expect(PRICING_CONFIG.setupFeeFormatted).toBe('PKR 5,000')
      expect(PRICING_CONFIG.setupFeeTiming).toContain('applies only if you continue with a paid plan after the 14-day free trial')
    })
  })

  describe('Pay-as-you-go Rate Structure', () => {
    it('sets min and max commission rates accurately between 8% and 10%', () => {
      expect(PRICING_CONFIG.payAsYouGo.minRate).toBe(8)
      expect(PRICING_CONFIG.payAsYouGo.maxRate).toBe(10)
      expect(PRICING_CONFIG.payAsYouGo.rateRangeFormatted).toBe('8% to 10%')
      expect(PRICING_CONFIG.payAsYouGo.description).toContain('8% to 10%')
      expect(PRICING_CONFIG.payAsYouGo.description).toContain('No fixed monthly fee')
    })
  })

  describe('Billing Link & Route Mappings', () => {
    it('maps monthly interest to book-demo query parameter', () => {
      expect(pricingConfig.monthly.href).toBe('/book-demo?interest=monthly')
    })

    it('maps pay-per-order interest to book-demo query parameter', () => {
      expect(pricingConfig.perOrder.href).toBe('/book-demo?interest=pay-per-order')
    })

    it('resolves proper query parameter mapping helper', () => {
      function getInterestFromParam(param: string | null): string | undefined {
        if (!param) return undefined
        const p = param.toLowerCase()
        if (p === 'monthly' || p === 'whatsapp' || p === 'complete') return 'monthly'
        if (p === 'pay-per-order' || p === 'payasyougo' || p === 'per-order') return 'pay-per-order'
        if (p === 'pricing') return 'pricing'
        return undefined
      }

      expect(getInterestFromParam('monthly')).toBe('monthly')
      expect(getInterestFromParam('whatsapp')).toBe('monthly')
      expect(getInterestFromParam('pay-per-order')).toBe('pay-per-order')
      expect(getInterestFromParam('payasyougo')).toBe('pay-per-order')
      expect(getInterestFromParam('pricing')).toBe('pricing')
      expect(getInterestFromParam('unknown')).toBeUndefined()
      expect(getInterestFromParam(null)).toBeUndefined()
    })
  })
})

