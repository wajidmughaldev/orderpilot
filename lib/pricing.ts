export interface AddonFeature {
  name: string
  price: number
  priceFormatted: string
  period: string
  description: string
  provisional?: boolean
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
  metaMessaging: 'At-cost pass-through only when billed via OrderPilot. 1,000 free service conversations/month per Meta policy. Zero OrderPilot markup.',
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
      period: 'Monthly',
      description: 'Run your online ordering on your own domain (e.g. order.yourbrand.pk) with custom restaurant branding.',
      provisional: true,
    },
    {
      name: 'Multi-Station Kitchen Routing (Advanced KDS)',
      price: 500,
      priceFormatted: 'PKR 500 / month',
      period: 'Monthly',
      description: 'Route orders across dedicated grill, fryer, beverage, and packing screens in high-volume kitchens.',
      provisional: true,
    },
    {
      name: 'Advanced Analytics & Data Exports',
      price: 999,
      priceFormatted: 'PKR 999 / month',
      period: 'Monthly',
      description: 'Export customer data, sales breakdowns, peak-hour heatmaps, and item profitability CSVs.',
      provisional: true,
    },
  ] as AddonFeature[],
  calculationExample: {
    orderItemsSubtotal: 2000,
    deliveryFee: 200,
    tax: 320,
    eligibleSubtotal: 2000,
    ratePercent: 5,
    commissionCharged: 100,
    restaurantKeeps: 2420,
    explanation: 'A PKR 2,000 food order with PKR 200 delivery and PKR 320 tax incurs exactly PKR 100 commission (5% on food items). Delivery and tax are 100% exempt. AI provider fees are absorbed by OrderPilot.',
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
