'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'

export function PricingSectionView() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="pricing" className="section-pad scroll-mt-20 bg-cream dark:bg-[#0c150f]">
      <div className="site-shell site-shell-1200">
        <motion.header
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-heading-centered mb-12 sm:mb-14"
        >
          <p className="eyebrow section-heading-eyebrow">PRICING</p>
          <h2 className="section-title">Pay as you go. Add more when you need it.</h2>
          <p className="section-description mt-4">
            No fixed monthly platform subscriptions. Pay a simple 5% commission only on completed WhatsApp AI orders, with full kitchen tools included from day one.
          </p>
        </motion.header>

        {/* Confident Single PAYG Presentation */}
        <div className="mx-auto max-w-3xl">
          <motion.article
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px', amount: 0.05 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="group relative overflow-hidden flex flex-col rounded-[2.25rem] border border-forest/15 bg-white p-8 sm:p-12 shadow-sm transition-all duration-300 hover:border-brand/35 hover:shadow-xl dark:border-white/5 dark:bg-[#121e15] dark:hover:border-leaf/30"
          >
            {/* Ambient background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-gradient-to-br from-mint via-leaf/25 to-transparent blur-3xl opacity-60 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 dark:from-emerald-900/30 dark:via-leaf/10 dark:to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 -bottom-12 size-48 rounded-full bg-mint/20 blur-2xl opacity-60 dark:bg-transparent"
            />

            {/* Subtle decorative geometric shape */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 size-44 text-brand/10 dark:text-leaf/10 transition-all duration-500 ease-out group-hover:scale-115 group-hover:rotate-12 group-hover:text-brand/20 dark:group-hover:text-leaf/20"
              viewBox="0 0 120 120"
              fill="none"
            >
              <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.75" strokeDasharray="6 6" />
              <circle cx="60" cy="60" r="36" stroke="currentColor" strokeWidth="1.25" />
              <circle cx="60" cy="60" r="18" fill="currentColor" fillOpacity="0.3" />
            </svg>

            {/* Content */}
            <div className="relative z-10 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-leaf px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-forest dark:bg-leaf/20 dark:text-leaf">
                  Pay As You Go
                </span>
                <span className="font-mono text-xs font-semibold text-ink/65 dark:text-white/60">
                  Zero monthly platform fee
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-brand">5%</p>
                <p className="text-xl sm:text-2xl font-bold text-ink/80 dark:text-white/80">
                  per completed WhatsApp order
                </p>
              </div>

              <p className="mt-3 text-sm text-ink/65 dark:text-white/60">
                Calculated on discounted food items only. Delivery charges and taxes are 100% exempt. AI costs are covered by OrderPilot.
              </p>

              <div className="my-8 border-t border-forest/10 dark:border-white/5" />

              <ul className="grid gap-3.5 sm:grid-cols-2">
                {[
                  '14-day free trial on approval',
                  'PKR 0 platform subscription',
                  'Full kitchen display board included',
                  'Interactive digital menu & order queue',
                  'Customer phone & order list export',
                  'Optional add-ons for custom domains',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85 dark:text-white/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo?intent=trial"
                  className="button-primary !py-3.5 !px-7 font-bold shadow-sm"
                >
                  Start 14-Day Free Trial <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="button-secondary !py-3.5 !px-6 font-semibold"
                >
                  See Pricing Details
                </Link>
              </div>

              <p className="mt-6 text-xs text-ink/55 dark:text-white/50">
                Trial starts at restaurant approval. Orders during trial incur 0% commission. Minimum wallet top-up after trial is PKR 500. Taxes excluded.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
