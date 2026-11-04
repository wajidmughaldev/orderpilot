import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PricingLink } from '@/components/pricing-link'

export const metadata: Metadata = {
  title: 'Pricing Plans — Transparent Subscription & Pay-Per-Order Options',
  description:
    'Transparent OrderPilot pricing in PKR for Pakistani restaurants. Monthly subscriptions from PKR 5,999/mo with a 14-day free trial (up to 1,000 orders/mo) or flexible pay-per-order (8%–10%). Setup fee: PKR 5,000. Prices exclude applicable taxes.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'OrderPilot Pricing Plans — Transparent Options in PKR',
    description:
      'Monthly subscriptions from PKR 5,999/mo with 14-day free trial (up to 1,000 orders/mo) or flexible pay-per-order (8%–10%). Setup fee: PKR 5,000. Prices exclude applicable taxes.',
    url: '/pricing',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot pricing plans' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrderPilot Pricing Plans — Transparent Options in PKR',
    description:
      'Monthly subscriptions from PKR 5,999/mo with 14-day free trial (up to 1,000 orders/mo) or flexible pay-per-order (8%–10%). Setup fee: PKR 5,000. Prices exclude applicable taxes.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const whatsapp = 'https://wa.me/923361815141'

const plans = [
  {
    name: 'WhatsApp',
    monthly: 'PKR 5,999',
    annual: 'PKR 59,990',
    saving: 'Save PKR 11,998',
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
    monthly: 'PKR 7,999',
    annual: 'PKR 79,990',
    saving: 'Save PKR 15,998',
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
    monthly: 'PKR 12,999',
    annual: 'PKR 129,990',
    saving: 'Save PKR 25,998',
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
]

function planLink(plan: string) {
  return `${whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${plan} plan for my restaurant.`)}`
}

export default function PricingPage() {
  return (
    <AppShell>
      <main>
        <section className="hero-section !pb-16">
          <div className="site-shell max-w-4xl">
            <p className="eyebrow">Pricing</p>
            <h1 className="display mt-6">Pick the plan that fits <span className="text-brand">how customers order.</span></h1>
            <p className="lede mt-6 max-w-2xl">
              All prices are in PKR. Monthly plans include a 14-day free trial and cover up to 1,000 orders per month. The one-time PKR 5,000 setup fee applies only if you continue with a paid plan. Prices exclude applicable taxes. Pay monthly, save with annual billing, or choose pay per order while your volume is lower.
            </p>
          </div>
        </section>

        <section id="monthly" className="section-pad scroll-mt-24 bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="section-heading">
              <p className="eyebrow section-heading-eyebrow">Subscriptions</p>
              <h2 className="section-title">Monthly plans with 14-day free trial.</h2>
              <p className="section-description text-ink/75">
                Choose the channels you need. Every subscription plan includes a 14-day free trial, up to 1,000 orders per month, the kitchen board, and direct access to your customer list. The one-time PKR 5,000 setup fee applies only if you continue with a paid plan. Prices exclude applicable taxes.
              </p>
            </div>
            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
              {plans.map(plan => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-ink/65">
              WhatsApp (PKR 5,999) and Web + Table (PKR 7,999) cost PKR 13,998 together. Complete gives you both, plus marketing and review tools, for PKR 12,999 (saves PKR 999 a month). Includes a 14-day free trial and up to 1,000 orders/mo. The one-time PKR 5,000 setup fee applies only if you continue with a paid plan. Prices exclude applicable taxes.
            </p>
          </div>
        </section>

        <section id="annual" className="section-pad scroll-mt-24 bg-white overflow-x-clip dark:bg-[#0c150f]">
          <div className="site-shell">
            <div className="section-heading">
              <p className="eyebrow section-heading-eyebrow">Pay yearly</p>
              <h2 className="section-title">Annual plans.</h2>
              <p className="section-description text-ink/75">
                Pay for ten months and use OrderPilot for twelve. That means two full months are included (12 months of access). Covers up to 1,000 orders per month. One-time setup fee of PKR 5,000 applies when you continue on a paid annual subscription. Prices exclude applicable taxes.
              </p>
            </div>
            <div className="mt-10 max-w-full overflow-hidden rounded-[2rem] border border-forest/15 bg-white dark:border-white/5 dark:bg-[#121e15]">
              <div className="overflow-x-auto max-w-full" tabIndex={0} role="region" aria-label="Annual plans comparison table">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-forest text-white">
                    <tr>
                      <th className="p-5 sm:p-6">Plan</th>
                      <th className="p-5 sm:p-6">Monthly billing</th>
                      <th className="p-5 sm:p-6">Annual billing</th>
                      <th className="p-5 sm:p-6">You save</th>
                      <th className="p-5 sm:p-6"><span className="sr-only">Choose plan</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={plan.name} className={index < plans.length - 1 ? 'border-b border-forest/10' : ''}>
                        <th className="p-5 sm:p-6 text-lg">{plan.name}</th>
                        <td className="p-5 sm:p-6 text-ink/70">{plan.monthly} / month</td>
                        <td className="p-5 sm:p-6 font-bold text-brand">{plan.annual} / year</td>
                        <td className="p-5 sm:p-6 text-ink/70">{plan.saving}</td>
                        <td className="p-5 sm:p-6">
                          <PricingLink planName={`${plan.name} annual`} className="font-bold text-brand underline underline-offset-4" href={planLink(`${plan.name} annual`)}>
                            Choose annual
                          </PricingLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink/65">
              Annual plans billed upfront for 12 months. Covers up to 1,000 orders per month. One-time setup fee of PKR 5,000 applies with paid subscription. Prices exclude applicable taxes.
            </p>
          </div>
        </section>

        <section id="pay-per-order" className="section-pad scroll-mt-24 bg-mint dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="rounded-[2rem] border border-brand/20 bg-white p-8 sm:p-12 dark:border-white/5 dark:bg-[#121e15]">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="eyebrow">Flexible option</p>
                    <span className="rounded-full bg-mint px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-forest dark:bg-emerald-900/40 dark:text-leaf">
                      No Monthly Fee
                    </span>
                  </div>
                  <h2 className="section-title mt-5">Pay per order</h2>
                  <p className="mt-4 text-2xl font-bold text-brand">8% to 10% of each order</p>
                  <div className="mt-2 flex flex-wrap gap-x-2 text-xs font-semibold uppercase tracking-wider text-ink/70 dark:text-white/70">
                    <span>Setup fee: PKR 5,000</span>
                    <span>•</span>
                    <span>Prices exclude applicable taxes</span>
                    <span>•</span>
                    <span>No monthly subscription fee</span>
                  </div>
                  <p className="mt-4 max-w-3xl leading-7 text-ink/75">
                    Your percentage rate (between 8% and 10%) depends on your order volume and restaurant profile. We confirm it with you before you start. Setup fee of PKR 5,000 applies to onboarding. Prices exclude applicable taxes. It includes everything in Complete and is a good fit when you&apos;re starting out or your order volume is lower. Pay per order is an independent billing model—you do not pay a monthly subscription fee alongside it.
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    <li className="flex gap-3"><Check className="mt-1 size-4 text-brand" />No fixed monthly subscription fee</li>
                    <li className="flex gap-3"><Check className="mt-1 size-4 text-brand" />Everything in Complete</li>
                    <li className="flex gap-3"><Check className="mt-1 size-4 text-brand" />Pay only on orders received</li>
                    <li className="flex gap-3"><Check className="mt-1 size-4 text-brand" />Direct customer payment collection</li>
                  </ul>
                </div>
                <PricingLink planName="Pay per order" href={planLink('Pay per order')} className="button-primary">
                  Start pay per order <ArrowRight className="size-4" />
                </PricingLink>
              </div>
              <div className="mt-8 border-t border-forest/10 pt-6 text-sm leading-6 text-ink/65">
                <p>
                  <strong className="text-ink">Which option is right for you?</strong> Choosing between pay-per-order and a fixed subscription depends on your monthly order volume, your agreed percentage rate, and the features your restaurant needs. Fixed subscriptions start at PKR 5,999/month, include a 14-day free trial, and cap your monthly software cost for up to 1,000 orders per month (the one-time PKR 5,000 setup fee applies only if you continue on a paid plan). Pay-per-order (8% to 10% per order) avoids fixed monthly fees when order volume is lower or seasonal. Prices exclude applicable taxes. Contact us with your estimated orders and we will help you compare options.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-forest text-white">
          <div className="site-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Not sure which fits?</h2>
              <p className="mt-2 text-white/75">
                Talk to our team or message us on WhatsApp and we&apos;ll work it out with your numbers. Setup fee: PKR 5,000. Prices exclude applicable taxes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/book-demo?interest=pricing&intent=demo" className="button-primary !bg-leaf !text-forest">
                Request a Pricing Demo <ArrowRight className="size-4" />
              </Link>
              <Link href={`${whatsapp}?text=${encodeURIComponent("Hi, I'd like help choosing an OrderPilot plan for my restaurant.")}`} className="button-secondary !border-white/35 !bg-transparent !text-white">
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}

function PlanCard({ plan }: { plan: typeof plans[number] }) {
  return (
    <article className={`relative flex h-full min-w-0 flex-col rounded-[2rem] border bg-white p-6 sm:p-9 dark:bg-[#121e15] ${plan.tag ? 'border-brand shadow-xl shadow-forest/10 dark:border-leaf/50' : 'border-forest/15 dark:border-white/5'}`}>
      {plan.tag && <span className="absolute right-5 top-5 rounded-full bg-leaf px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-forest">{plan.tag}</span>}
      <h3 className="pr-16 sm:pr-24 text-3xl font-bold">{plan.name}</h3>
      <p className="mt-4 text-xl font-bold text-brand">{plan.monthly} <span className="text-sm font-medium text-ink/60">/ month</span></p>
      <div className="mt-2 flex flex-wrap gap-x-2 text-xs font-semibold uppercase tracking-wider text-ink/70 dark:text-white/70">
        <span>14-day free trial</span>
        <span>•</span>
        <span>Up to 1,000 orders/mo</span>
        <span>•</span>
        <span>Excludes taxes</span>
      </div>
      {plan.name === 'Complete' && (
        <p className="mt-3 text-sm font-semibold text-ink/65">
          WhatsApp and Web + Table cost PKR 13,998 together. Complete saves PKR 999 a month.
        </p>
      )}
      {plan.intro && <p className="mt-5 text-sm leading-6 text-ink/70">{plan.intro}</p>}
      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map(feature => (
          <li key={feature} className="flex gap-3 text-sm leading-6">
            <Check className="mt-1 size-4 shrink-0 text-brand" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-2">
        <PricingLink planName={plan.name} href={planLink(plan.name)} className="button-primary self-start">
          Get {plan.name} plan <ArrowRight className="size-4" />
        </PricingLink>
        <p className="text-[11px] text-ink/60 dark:text-white/60">
          Includes 14-day free trial. PKR 5,000 setup fee applies only if you continue.
        </p>
      </div>
    </article>
  )
}
