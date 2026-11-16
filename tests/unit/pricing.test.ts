import { describe, it, expect } from 'vitest'
import { PAYG_CONFIG, PRICING_CONFIG, pricingConfig } from '@/lib/pricing'

describe('Unit: Pay As You Go Pricing Configuration & Terms', () => {
  describe('Core PAYG Terms & Rates', () => {
    it('configures exactly 5% commission on completed WhatsApp AI orders', () => {
      expect(PAYG_CONFIG.commissionRate).toBe(5)
      expect(PAYG_CONFIG.commissionRateFormatted).toBe('5%')
      expect(PAYG_CONFIG.eligibleChannel).toBe('Completed WhatsApp AI orders')
    })

    it('calculates commission on discounted food items subtotal only and exempts delivery & tax', () => {
      expect(PAYG_CONFIG.commissionBasis).toContain('Discounted food item subtotal only')
      expect(PAYG_CONFIG.commissionBasis).toContain('excludes delivery fees, taxes, and tips')
    })

    it('guarantees PKR 0 extra AI provider computing expense', () => {
      expect(PAYG_CONFIG.aiProviderCost).toContain('Rs. 0 extra to restaurant')
      expect(PAYG_CONFIG.aiProviderCost).toContain('Included in OrderPilot commission')
    })

    it('sets PKR 0 platform fee and PKR 0 onboarding/setup fee', () => {
      expect(PAYG_CONFIG.platformFee).toBe(0)
      expect(PAYG_CONFIG.setupFee).toBe(0)
      expect(PAYG_CONFIG.platformFeeFormatted).toBe('PKR 0 / month')
      expect(PAYG_CONFIG.setupFeeFormatted).toBe('PKR 0 setup fee')
    })

    it('enforces PKR 500 minimum wallet top-up requirement', () => {
      expect(PAYG_CONFIG.minimumWalletTopup).toBe(500)
      expect(PAYG_CONFIG.minimumWalletTopupFormatted).toBe('PKR 500')
    })
  })

  describe('14-Day Free Trial Terms', () => {
    it('sets 14-day free trial on restaurant approval with 0% commission', () => {
      expect(PAYG_CONFIG.trialDays).toBe(14)
      expect(PAYG_CONFIG.trialFormatted).toBe('14-day free trial')
      expect(PAYG_CONFIG.trialCondition).toContain('Starts when your restaurant is approved')
      expect(PAYG_CONFIG.trialCondition).toContain('0% commission on all orders created during the trial')
    })
  })

  describe('Meta / WhatsApp Messaging Policy', () => {
    it('discloses transparent at-cost Meta pass-through and zero markup', () => {
      expect(PAYG_CONFIG.metaMessaging).toContain('At-cost pass-through only')
      expect(PAYG_CONFIG.metaMessaging).toContain('1,000 free service conversations/month')
      expect(PAYG_CONFIG.metaMessaging).toContain('Zero OrderPilot markup')
    })
  })

  describe('Transparent Calculation Example (PKR 2,000 Order)', () => {
    it('computes exact PKR 100 commission on a PKR 2,000 order food subtotal', () => {
      const example = PAYG_CONFIG.calculationExample
      expect(example.orderItemsSubtotal).toBe(2000)
      expect(example.ratePercent).toBe(5)
      expect((example.orderItemsSubtotal * example.ratePercent) / 100).toBe(example.commissionCharged)
      expect(example.commissionCharged).toBe(100)
      expect(example.deliveryFee).toBe(200)
      expect(example.tax).toBe(320)
      expect(example.restaurantKeeps).toBe(2420)
      expect(example.explanation).toContain('incurs exactly PKR 100 commission')
    })
  })

  describe('Optional Monthly Add-ons Catalog', () => {
    it('includes all 3 verified provisional monthly add-ons with exact rates', () => {
      expect(PAYG_CONFIG.addons).toHaveLength(3)

      const webStorefront = PAYG_CONFIG.addons.find(a => a.name === 'Branded Web Storefront & Custom Domain')!
      expect(webStorefront).toBeDefined()
      expect(webStorefront.price).toBe(2000)
      expect(webStorefront.priceFormatted).toBe('PKR 2,000 / month')
      expect(webStorefront.provisional).toBe(true)

      const kitchenRouting = PAYG_CONFIG.addons.find(a => a.name === 'Multi-Station Kitchen Routing (Advanced KDS)')!
      expect(kitchenRouting).toBeDefined()
      expect(kitchenRouting.price).toBe(500)
      expect(kitchenRouting.priceFormatted).toBe('PKR 500 / month')
      expect(kitchenRouting.provisional).toBe(true)

      const analytics = PAYG_CONFIG.addons.find(a => a.name === 'Advanced Analytics & Data Exports')!
      expect(analytics).toBeDefined()
      expect(analytics.price).toBe(999)
      expect(analytics.priceFormatted).toBe('PKR 999 / month')
      expect(analytics.provisional).toBe(true)
    })
  })

  describe('Compatibility Exports', () => {
    it('mirrors PAYG config in PRICING_CONFIG and pricingConfig', () => {
      expect(PRICING_CONFIG.commissionRate).toBe(5)
      expect(PRICING_CONFIG.setupFee).toBe(0)
      expect(PRICING_CONFIG.payAsYouGo.rate).toBe(5)
      expect(PRICING_CONFIG.payAsYouGo.rateRangeFormatted).toBe('5%')
      expect(pricingConfig.payg.href).toBe('/book-demo?intent=trial')
      expect(pricingConfig.monthly.href).toBe('/book-demo?intent=trial')
      expect(pricingConfig.perOrder.href).toBe('/book-demo?intent=trial')
    })
  })
})
