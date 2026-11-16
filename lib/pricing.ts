export interface AddonFeature {
  name: string
  price: number
  priceFormatted: string
  period: string
  description: string
  provisional?: boolean
  status?: 'planned' | 'approved'
}

export const PAYG_CONFIG = {
  currency: 'PKR',
  commissionRate: 5,
  commissionRateFormatted: '5%',
  commissionBasis: 'Discounted food item subtotal only (excludes delivery fees, taxes, and tips)',
  trialDays: 14,
  trialFormatted: '14-day free trial',
  trialCondition: 'Starts when your restaurant is approved. 0% commission on all orders created during the trial.',
  platformFee: 0,
  platformFeeFormatted: 'PKR 0 / month',
  setupFee: 0,
  setupFeeFormatted: 'PKR 0 setup fee',
  minimumWalletTopup: 500,
  minimumWalletTopupFormatted: 'PKR 500',
  eligibleChannel: 'Completed WhatsApp AI orders',
  aiProviderCost: 'Included in OrderPilot commission (Rs. 0 extra to restaurant)',
  metaMessaging: 'Pass-through at exact cost only if Meta bills OrderPilot directly (no pass-through if your restaurant is billed directly). Includes 1,000 free service messages per business phone number per month under Meta’s October 2026 policy. Template-message charges (marketing, utility, authentication) apply separately per Meta rates. Zero OrderPilot markup, no double charging.',
  coreFeatures: [
    'WhatsApp AI ordering & order intake',
    'Interactive digital menu & catalog',
    'Live kitchen display & order queue board',
    'Table QR & web ordering channel access',
    'Customer contact list & private order history',
    'Cash on delivery & direct payment receipt verification',
    'Basic analytics & daily order summaries',
  ],
  addons: [
    {
      name: 'Branded Web Storefront & Custom Domain',
      price: 2000,
      priceFormatted: 'PKR 2,000 / month',
      period: 'Monthly (provisional)',
      description: 'Run your online ordering on your own domain (e.g. order.yourbrand.pk) with custom restaurant branding. Planned extension; not yet active in billing.',
      provisional: true,
      status: 'planned',
    },
    {
      name: 'Multi-Station Kitchen Routing (Advanced KDS)',
      price: 500,
      priceFormatted: 'PKR 500 / month',
      period: 'Monthly (provisional)',
      description: 'Route orders across dedicated grill, fryer, beverage, and packing screens in high-volume kitchens. Planned extension; not yet active in billing.',
      provisional: true,
      status: 'planned',
    },
    {
      name: 'Advanced Analytics & Data Exports',
      price: 999,
      priceFormatted: 'PKR 999 / month',
      period: 'Monthly (provisional)',
      description: 'Export customer data, sales breakdowns, peak-hour heatmaps, and item profitability CSVs. Planned extension; not yet active in billing.',
      provisional: true,
      status: 'planned',
    },
  ] as AddonFeature[],
  calculationExample: {
    orderItemsSubtotal: 2000,
    deliveryFee: 200,
    tax: 320,
    eligibleSubtotal: 2000,
    ratePercent: 5,
    commissionCharged: 100,
    foodSalesAfterFee: 1900,
    explanation: 'A PKR 2,000 food order incurs exactly PKR 100 OrderPilot commission (5% on the food subtotal), leaving PKR 1,900 in food sales after the fee. Delivery fees (PKR 200) and sales taxes (PKR 320) are 100% exempt from commission. Delivery fees, taxes, and kitchen operating expenses are separate.',
  },
} as const

// Legacy compatibility exports pointing cleanly to PAYG
export const PRICING_CONFIG = {
  ...PAYG_CONFIG,
  setupFee: 0,
  setupFeeFormatted: 'PKR 0 setup fee',
  setupFeeTiming: 'No mandatory onboarding or setup fees. Getting started is free.',
  taxDisclaimer: 'Prices exclude applicable taxes.',
  orderLimitFormatted: 'No artificial order caps',
  payAsYouGo: {
    rate: 5,
    rateFormatted: '5%',
    minRate: 5,
    maxRate: 5,
    rateRangeFormatted: '5%',
    description: '5% commission on eligible completed WhatsApp AI orders. No mandatory monthly platform fee. 14-day free trial on approval.',
  },
} as const

export const pricingConfig = {
  payg: {
    publicPrice: '5% per completed WhatsApp order (14-day free trial)',
    href: '/book-demo?intent=trial',
  },
  monthly: {
    publicPrice: '5% per completed WhatsApp order (14-day free trial)',
    href: '/book-demo?intent=trial',
  },
  perOrder: {
    publicPrice: '5% per completed WhatsApp order (14-day free trial)',
    href: '/book-demo?intent=trial',
  },
} as const
