'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'

export function PricingSectionView() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="pricing" className="section-pad scroll-mt-20 bg-cream">
      <div className="site-shell site-shell-1200">
        <motion.header
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-heading-centered mb-12"
        >
          <p className="eyebrow section-heading-eyebrow">PRICING</p>
          <h2 className="section-title">Two ways to pay.</h2>
          <p className="section-description mt-4">
            Choose a predictable subscription or pay as orders come in. See the full plan comparison on our pricing page.
          </p>
        </motion.header>

        {/* Two cards: Subscription and Pay as you go */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
          {/* Card 1: Subscription */}
          <motion.article
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px', amount: 0.05 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
            whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="group relative overflow-hidden flex h-full flex-col rounded-[2rem] border border-forest/15 bg-white p-8 sm:p-9 shadow-sm transition-all duration-300 hover:border-brand/35 hover:shadow-xl dark:border-white/5 dark:bg-[#121e15] dark:hover:border-leaf/30"
          >
            {/* Ambient background shade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-gradient-to-br from-mint via-leaf/25 to-transparent blur-2xl opacity-60 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 group-hover:from-mint group-hover:via-leaf/40 dark:from-emerald-900/30 dark:via-leaf/10 dark:to-transparent dark:opacity-30 dark:group-hover:opacity-60 dark:group-hover:from-emerald-900/40 dark:group-hover:via-leaf/20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -bottom-10 size-36 rounded-full bg-cream blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 dark:bg-transparent dark:group-hover:bg-transparent"
            />

            {/* Subtle decorative geometric shapes */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 size-36 text-brand/10 dark:text-leaf/10 transition-all duration-500 ease-out group-hover:scale-115 group-hover:rotate-12 group-hover:text-brand/25 dark:group-hover:text-leaf/25"
              viewBox="0 0 120 120"
              fill="none"
            >
              <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.75" strokeDasharray="6 6" />
              <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1.25" />
              <circle cx="60" cy="60" r="22" fill="currentColor" fillOpacity="0.3" />
            </svg>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col">
              <h3 className="text-3xl font-bold dark:text-white">Monthly subscription</h3>
              <p className="mt-4 text-2xl sm:text-3xl font-extrabold text-brand">
                From PKR 5,999 <span className="text-base font-medium text-ink/70">/ month</span>
              </p>
              <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                {[
                  '14-day free trial on all plans',
                  'Up to 1,000 orders per month',
                  'Choose WhatsApp, Web + Table, or Complete',
                  'Predictable monthly billing',
                  'Annual billing: 2 months included',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85 dark:text-white/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing#monthly"
                className="button-primary mt-8 self-start"
              >
                Compare subscription plans <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.article>

          {/* Card 2: Pay as you go */}
          <motion.article
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px', amount: 0.05 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
            whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="group relative overflow-hidden flex h-full flex-col rounded-[2rem] border border-forest/15 bg-white p-8 sm:p-9 shadow-sm transition-all duration-300 hover:border-brand/35 hover:shadow-xl dark:border-white/5 dark:bg-[#121e15] dark:hover:border-leaf/30"
          >
            {/* Ambient background shade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-gradient-to-br from-leaf/25 via-mint/45 to-transparent blur-2xl opacity-60 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 group-hover:from-leaf/35 group-hover:via-mint/70 dark:from-leaf/20 dark:via-emerald-900/20 dark:to-transparent dark:opacity-30 dark:group-hover:opacity-60 dark:group-hover:from-leaf/30 dark:group-hover:via-emerald-900/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -bottom-10 size-36 rounded-full bg-cream blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 dark:bg-transparent dark:group-hover:bg-transparent"
            />

            {/* Subtle decorative geometric shapes */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 size-36 text-brand/10 dark:text-leaf/10 transition-all duration-500 ease-out group-hover:scale-115 group-hover:-rotate-12 group-hover:text-brand/25 dark:group-hover:text-leaf/25"
              viewBox="0 0 120 120"
              fill="none"
            >
              <rect x="25" y="25" width="70" height="70" rx="20" stroke="currentColor" strokeWidth="1.75" strokeDasharray="5 5" transform="rotate(45 60 60)" />
              <rect x="36" y="36" width="48" height="48" rx="14" stroke="currentColor" strokeWidth="1.25" transform="rotate(45 60 60)" />
              <circle cx="60" cy="60" r="14" fill="currentColor" fillOpacity="0.3" />
            </svg>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col">
              <h3 className="text-3xl font-bold dark:text-white">Pay as you go</h3>
              <p className="mt-4 text-2xl sm:text-3xl font-extrabold text-brand">
                8% to 10% <span className="text-base font-medium text-ink/70">of each order</span>
              </p>
              <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                {[
                  'Everything in Complete',
                  'No fixed monthly fee',
                  'Pay only when you receive orders',
                  'Rate confirmed before you start',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85 dark:text-white/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing#pay-per-order"
                className="button-primary mt-8 self-start"
              >
                See pay-per-order details <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.article>
        </div>
        <p className="mt-8 max-w-2xl mx-auto text-center text-xs sm:text-sm font-medium text-ink/70 dark:text-white/70">
          Try OrderPilot for 14 days. The one-time PKR 5,000 setup fee applies only if you continue with a paid plan. Prices exclude applicable taxes. Monthly plans cover up to 1,000 orders per month.
        </p>
      </div>
    </section>
  )
}
