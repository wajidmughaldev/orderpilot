export interface SubscriptionPlan {
  name: string
  monthlyPrice: number
  monthlyFormatted: string
  annualPrice: number
  annualFormatted: string
  annualSaving: string
  trialDays: number
  orderLimit: number
  orderLimitFormatted: string
  tag?: string
  intro?: string
  features: string[]
}

export const PRICING_CONFIG = {
  currency: 'PKR',
  setupFee: 5000,
  setupFeeFormatted: 'PKR 5,000',
  setupFeeTiming: 'The one-time PKR 5,000 setup fee applies only if you continue with a paid plan after the 14-day free trial.',
  taxDisclaimer: 'Prices exclude applicable taxes.',
  trialDays: 14,
  trialFormatted: '14-day free trial',
  orderLimitPerPlan: 1000,
  orderLimitFormatted: 'Up to 1,000 orders / month',
  annualBillingTerms: 'Annual billing covers 12 months of access for the price of 10 months (2 months included).',
  payAsYouGo: {
    minRate: 8,
    maxRate: 10,
    rateRangeFormatted: '8% to 10%',
    description: '8% to 10% of each order. No fixed monthly fee. Includes everything in Complete.',
  },
  plans: [
    {
      name: 'WhatsApp',
      monthlyPrice: 5999,
      monthlyFormatted: 'PKR 5,999',
      annualPrice: 59990,
      annualFormatted: 'PKR 59,990',
      annualSaving: 'Save PKR 11,998',
      trialDays: 14,
      orderLimit: 1000,
      orderLimitFormatted: 'Up to 1,000 orders / month',
      features: [
        '14-day free trial',
        'Up to 1,000 orders / month',
        'WhatsApp ordering',
        'Kitchen board',
        'Customer list export',
      ],
    },
    {
      name: 'Web + Table',
      monthlyPrice: 7999,
      monthlyFormatted: 'PKR 7,999',
      annualPrice: 79990,
      annualFormatted: 'PKR 79,990',
      annualSaving: 'Save PKR 15,998',
      trialDays: 14,
      orderLimit: 1000,
      orderLimitFormatted: 'Up to 1,000 orders / month',
      features: [
        '14-day free trial',
        'Up to 1,000 orders / month',
        'Web menu',
        'Table QR, with split bill and pay',
        'Kitchen board',
        'Customer list export',
      ],
    },
    {
      name: 'Complete',
      monthlyPrice: 12999,
      monthlyFormatted: 'PKR 12,999',
      annualPrice: 129990,
      annualFormatted: 'PKR 129,990',
      annualSaving: 'Save PKR 25,998',
      trialDays: 14,
      orderLimit: 1000,
      orderLimitFormatted: 'Up to 1,000 orders / month',
      tag: 'Best value',
      intro: 'Everything in WhatsApp and Web + Table, plus:',
      features: [
        '14-day free trial',
        'Up to 1,000 orders / month',
        'Broadcasting',
        'Win-back offers, loyalty and referrals',
        'Google review requests',
      ],
    },
  ] as SubscriptionPlan[],
} as const

export const pricingConfig = {
  monthly: {
    publicPrice: 'From PKR 5,999 / month (14-day free trial)',
    href: '/book-demo?interest=monthly',
  },
  perOrder: {
    publicPrice: '8% to 10% per order (14-day free trial)',
    href: '/book-demo?interest=pay-per-order',
  },
} as const
