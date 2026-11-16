import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles, Wallet, Clock, ShieldCheck } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PAYG_CONFIG } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Restaurant Ordering Software Pricing in Pakistan',
  description:
    'Transparent Pay As You Go pricing for Pakistani restaurants. 5% commission on completed WhatsApp AI orders with a 14-day free trial. No monthly platform fee.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Restaurant Ordering Software Pricing in Pakistan | OrderPilot',
    description:
      'Transparent Pay As You Go pricing for Pakistani restaurants. 5% commission on completed WhatsApp AI orders with a 14-day free trial. No monthly platform fee.',
    url: '/pricing',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot pricing plans' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Ordering Software Pricing in Pakistan | OrderPilot',
    description:
      'Transparent Pay As You Go pricing for Pakistani restaurants. 5% commission on completed WhatsApp AI orders with a 14-day free trial. No monthly platform fee.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const whatsappUrl = 'https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20OrderPilot%20Pay%20As%20You%20Go%20pricing.'

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OrderPilot',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, WhatsApp',
  url: 'https://www.orderpilot.pk/pricing',
  description: 'Pay As You Go restaurant ordering software for Pakistan. 5% commission on completed WhatsApp AI orders. 14-day free trial.',
  offers: {
    '@type': 'Offer',
    name: 'Pay As You Go',
    price: '0',
    priceCurrency: 'PKR',
    url: 'https://www.orderpilot.pk/pricing',
    description: '14-day free trial on approval, followed by 5% commission on eligible completed WhatsApp AI orders. Zero monthly platform subscription. Taxes excluded.',
  },
}

export default function PricingPage() {
  const example = PAYG_CONFIG.calculationExample

  return (
    <AppShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />

        {/* 1. HERO: One plan. Pay as you go. */}
        <section className="hero-section !pb-14 sm:!pb-18">
          <div className="site-shell max-w-4xl text-center flex flex-col items-center">
            <p className="eyebrow">Pricing</p>
            <h1 className="display mt-6 text-balance">
              One plan. <span className="text-brand">Pay as you go.</span>
            </h1>
            <p className="lede mt-6 max-w-2xl text-balance">
              No monthly platform subscriptions and no setup fees. Pay a simple 5% commission only on completed WhatsApp AI orders, with kitchen display tools included from day one.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-ink/75 dark:text-white/70">
              <span className="rounded-full bg-mint px-3.5 py-1 text-forest dark:bg-emerald-900/40 dark:text-leaf">
                14-Day Free Trial
              </span>
              <span>•</span>
              <span>PKR 0 Platform Fee</span>
              <span>•</span>
              <span>PKR 0 Setup Fee</span>
              <span>•</span>
              <span>Excludes Taxes</span>
            </div>
          </div>
        </section>

        {/* 2. CORE PAYG: Verified commission and what's included */}
        <section id="payg" className="section-pad scroll-mt-24 bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              {/* Left Column: Core Plan Overview & Inclusions */}
              <article className="flex flex-col justify-between rounded-[2.25rem] border border-forest/15 bg-white p-7 sm:p-11 shadow-sm dark:border-white/5 dark:bg-[#121e15]">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-leaf px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-forest dark:bg-leaf/20 dark:text-leaf">
                      Core Offering
                    </span>
                    <span className="font-mono text-xs font-semibold text-ink/65 dark:text-white/60">
                      Zero monthly fee
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-baseline gap-3">
                    <p className="text-5xl sm:text-6xl font-extrabold text-brand">5%</p>
                    <p className="text-xl sm:text-2xl font-bold text-ink/80 dark:text-white/80">
                      per completed WhatsApp order
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-ink/70 dark:text-white/65">
                    Charged only when a customer order placed via WhatsApp is completed by your kitchen. QR and web ordering do not carry extra order commissions.
                  </p>

                  <div className="my-7 border-t border-forest/10 dark:border-white/5" />

                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest dark:text-leaf">
                    What is included in Core:
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {PAYG_CONFIG.coreFeatures.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink/85 dark:text-white/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-forest/10 pt-6 dark:border-white/5">
                  <Link href="/book-demo?intent=trial" className="button-primary w-full justify-center !py-3.5 font-bold">
                    Start 14-Day Free Trial <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>

              {/* Right Column: Exact Commission Calculation Example */}
              <article className="flex flex-col justify-between rounded-[2.25rem] border border-forest/15 bg-[#f6faf4] p-7 sm:p-11 dark:border-white/5 dark:bg-[#0c170e]">
                <div>
                  <div className="flex items-center gap-2 text-forest dark:text-leaf">
                    <Sparkles className="size-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">How the 5% calculation works</h3>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                    Commission applies strictly to the <strong>discounted food items subtotal</strong>. Delivery charges, government taxes, and rider tips are 100% exempt.
                  </p>

                  {/* Calculation Box */}
                  <div className="mt-6 rounded-2xl border border-forest/10 bg-white p-5 dark:border-white/5 dark:bg-[#121e15]">
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between text-ink/75 dark:text-white/70">
                        <span>Food subtotal</span>
                        <span className="font-semibold text-ink dark:text-white">{`PKR ${example.orderItemsSubtotal.toLocaleString()}`}</span>
                      </div>
                      <div className="flex justify-between text-brand font-bold dark:text-leaf">
                        <span>OrderPilot 5% commission</span>
                        <span>{`- PKR ${example.commissionCharged.toLocaleString()}`}</span>
                      </div>
                      <div className="border-t border-forest/10 pt-2 flex justify-between font-bold text-forest dark:text-mint">
                        <span>Food sales after OrderPilot fee</span>
                        <span>{`PKR ${example.foodSalesAfterFee.toLocaleString()}`}</span>
                      </div>
                      <div className="border-t border-forest/10 pt-2.5 space-y-1.5 text-xs text-ink/65 dark:text-white/60">
                        <div className="flex justify-between">
                          <span>Customer delivery fee (exempt)</span>
                          <span>{`+ PKR ${example.deliveryFee.toLocaleString()}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sales tax collected (exempt)</span>
                          <span>{`+ PKR ${example.tax.toLocaleString()}`}</span>
                        </div>
                        <p className="mt-2 text-[11px] leading-relaxed text-ink/55 dark:text-white/50">
                          Delivery fees and taxes pass through to riders and tax authorities. Delivery fees, taxes, and operating expenses are separate from the platform commission.
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-ink/70 dark:text-white/60 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="size-4 shrink-0 text-brand mt-0.5" />
                      <span><strong>AI Costs Included:</strong> All backend AI provider computing costs are absorbed by OrderPilot. Rs. 0 extra charge to your restaurant.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="size-4 shrink-0 text-brand mt-0.5" />
                      <span><strong>No Hidden Caps:</strong> Transparent 5% calculation on all orders with no hidden surcharges.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 rounded-xl bg-mint/40 p-4 text-xs font-medium text-forest dark:bg-leaf/10 dark:text-leaf">
                  Cancelled or rejected orders incur PKR 0. Held commission is automatically released back to your wallet.
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. HOW BILLING WORKS: Trial → Wallet → Completed Order */}
        <section id="how-billing-works" className="section-pad scroll-mt-24 bg-white dark:bg-[#0c150f]">
          <div className="site-shell">
            <div className="section-heading-centered mb-12 sm:mb-16">
              <p className="eyebrow section-heading-eyebrow">WORKFLOW</p>
              <h2 className="section-title">How billing works.</h2>
              <p className="section-description mt-4 max-w-xl mx-auto">
                Straightforward billing designed around how Pakistani kitchens operate. No surprises.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="panel p-6 sm:p-8 flex flex-col justify-between dark:bg-[#121e15]">
                <div>
                  <div className="size-10 rounded-xl bg-mint flex items-center justify-center text-forest dark:bg-leaf/20 dark:text-leaf">
                    <Clock className="size-5" />
                  </div>
                  <p className="mt-5 font-mono text-xs font-bold text-brand uppercase tracking-wider">Step 01</p>
                  <h3 className="mt-2 text-xl font-bold">14-Day Free Trial</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                    Your trial starts when your restaurant is approved. Every core operational feature is active. All orders created during the 14 days incur <strong>0% commission</strong>.
                  </p>
                </div>
                <p className="mt-6 text-xs text-ink/55 dark:text-white/50">No card required to start.</p>
              </div>

              <div className="panel p-6 sm:p-8 flex flex-col justify-between dark:bg-[#121e15]">
                <div>
                  <div className="size-10 rounded-xl bg-mint flex items-center justify-center text-forest dark:bg-leaf/20 dark:text-leaf">
                    <Wallet className="size-5" />
                  </div>
                  <p className="mt-5 font-mono text-xs font-bold text-brand uppercase tracking-wider">Step 02</p>
                  <h3 className="mt-2 text-xl font-bold">Prepaid Wallet Top-up</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                    Before your trial ends, fund your private balance with as little as <strong>PKR 500</strong>. Top up anytime via standard Bank Transfer, JazzCash, EasyPaisa, or Raast.
                  </p>
                </div>
                <p className="mt-6 text-xs text-ink/55 dark:text-white/50">Funds remain yours until orders complete.</p>
              </div>

              <div className="panel p-6 sm:p-8 flex flex-col justify-between dark:bg-[#121e15]">
                <div>
                  <div className="size-10 rounded-xl bg-mint flex items-center justify-center text-forest dark:bg-leaf/20 dark:text-leaf">
                    <Check className="size-5" />
                  </div>
                  <p className="mt-5 font-mono text-xs font-bold text-brand uppercase tracking-wider">Step 03</p>
                  <h3 className="mt-2 text-xl font-bold">Deducted on Completion</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                    When a WhatsApp AI order is successfully fulfilled, 5% of the food items subtotal settles from your wallet. If an order is cancelled or rejected, no fee is deducted.
                  </p>
                </div>
                <p className="mt-6 text-xs text-ink/55 dark:text-white/50">Full ledger history in your dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OPTIONAL ADD-ONS: Planned extensions with provisional pricing */}
        <section id="add-ons" className="section-pad scroll-mt-24 bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="section-heading mb-10 sm:mb-12">
              <p className="eyebrow section-heading-eyebrow">PLANNED EXTENSIONS</p>
              <h2 className="section-title">Optional add-ons. Available as your needs grow.</h2>
              <p className="section-description text-ink/75 max-w-2xl">
                Core order management, live kitchen displays, and digital menus are included with zero monthly fee. Additional capabilities below are planned extensions with provisional monthly pricing; they are not yet activated as purchasable add-ons.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {PAYG_CONFIG.addons.map((addon) => (
                <div
                  key={addon.name}
                  className="panel p-6 sm:p-7 flex flex-col justify-between dark:bg-[#121e15]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest dark:text-leaf">
                        Planned Add-on
                      </span>
                      <span className="rounded-full bg-forest/5 px-2 py-0.5 text-[10px] font-semibold text-ink/60 dark:bg-white/10 dark:text-white/60">
                        Provisional Rate
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold">{addon.name}</h3>
                    <p className="mt-3 text-2xl font-extrabold text-brand">
                      {addon.priceFormatted}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70 dark:text-white/65">
                      {addon.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-forest/10 pt-4 dark:border-white/5">
                    <p className="text-xs text-ink/55 dark:text-white/50">
                      Provisional launch rate. Add-on purchases are pending commercial activation; core features are active during trial.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TRANSPARENT CHARGES: Meta fees & Zero setup conditions */}
        <section id="transparent-charges" className="section-pad scroll-mt-24 bg-white dark:bg-[#0c150f]">
          <div className="site-shell max-w-4xl">
            <div className="section-heading-centered mb-10">
              <p className="eyebrow section-heading-eyebrow">TRANSPARENCY</p>
              <h2 className="section-title">Clear terms. No hidden surprises.</h2>
              <p className="section-description mt-3">
                Everything you need to know about fees, messaging costs, and wallet balance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-forest/10 bg-[#fbfcfb] p-6 dark:border-white/5 dark:bg-[#121e15]">
                <h3 className="text-base font-bold text-ink dark:text-white">PKR 0 Setup Fee</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                  We don&apos;t charge onboarding or setup fees. Getting your menu configured and previewing your live kitchen screen is free during your trial.
                </p>
              </div>

              <div className="rounded-2xl border border-forest/10 bg-[#fbfcfb] p-6 dark:border-white/5 dark:bg-[#121e15]">
                <h3 className="text-base font-bold text-ink dark:text-white">WhatsApp &amp; Meta Messaging</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                  Includes 1,000 free service messages per business phone number per month under Meta&apos;s October 2026 policy. Template-message charges (marketing, utility, authentication) apply separately per Meta rates. Meta fees are passed through at exact cost only if OrderPilot is the party actually billed, without markup or double charging.
                </p>
              </div>

              <div className="rounded-2xl border border-forest/10 bg-[#fbfcfb] p-6 dark:border-white/5 dark:bg-[#121e15]">
                <h3 className="text-base font-bold text-ink dark:text-white">PKR 500 Minimum Top-up</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                  After your 14-day free trial, you can top up your wallet with as little as PKR 500 at a time. Unused funds never expire as long as your account is active.
                </p>
              </div>

              <div className="rounded-2xl border border-forest/10 bg-[#fbfcfb] p-6 dark:border-white/5 dark:bg-[#121e15]">
                <h3 className="text-base font-bold text-ink dark:text-white">Taxes &amp; Statutory Compliance</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/70">
                  All listed prices exclude provincial and federal sales taxes where applicable by Pakistani law. Clean business invoices are generated in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA: Start Free Trial / Book Demo */}
        <section className="section-pad bg-forest text-white">
          <div className="site-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Ready to run your restaurant on OrderPilot?</h2>
              <p className="mt-2 text-white/75 max-w-xl">
                Start your 14-day free trial today. We&apos;ll configure your kitchen display with your actual menu items. Zero monthly platform subscription.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/book-demo?intent=trial" className="button-primary !bg-leaf !text-forest hover:!bg-white font-bold">
                Start 14-Day Free Trial <ArrowRight className="size-4" />
              </Link>
              <Link href="/book-demo" className="button-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10 font-semibold">
                Book a Live Demo
              </Link>
              <a href={whatsappUrl} className="button-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
