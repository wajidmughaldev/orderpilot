'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  UtensilsCrossed,
  Sandwich,
  Cloud,
} from 'lucide-react'

const restaurantScenarios = [
  {
    icon: UtensilsCrossed,
    tag: 'Table QR & Floor Service',
    title: 'Dine-In Restaurants & Cafés',
    summary: 'Orders reach the kitchen without floor staff shouting across the hall.',
    copy: 'Guests scan table QR codes to view food photos, choose spice levels, and send tickets straight to the kitchen. Waiters spend less time writing paper notes and more time attending to guests.',
  },
  {
    icon: Sandwich,
    tag: 'Counter & Takeaway Rush',
    title: 'Fast Food & Takeaway Spots',
    summary: 'Clear prep queues during the 8 PM to 11 PM dinner rush.',
    copy: 'Walk-in orders, phone pickups, and direct delivery requests appear in organized New, Preparing, and Ready columns. Cooks see what is next so customers and riders aren’t crowding your counter.',
  },
  {
    icon: Cloud,
    tag: 'WhatsApp & Direct Delivery',
    title: 'Delivery-First & Cloud Kitchens',
    summary: 'WhatsApp chats and web orders organized for fast rider dispatch.',
    copy: 'Turn messy chat messages into structured kitchen tickets with customer phone numbers, delivery addresses, and payment receipts. Fulfill direct orders without giving up steep aggregator commissions.',
  },
]

export function WhoItsForSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="section-pad bg-cream">
      <div className="site-shell">
        <motion.header
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-heading-centered mb-12"
        >
          <p className="eyebrow section-heading-eyebrow">WHO IT&apos;S FOR</p>
          <h2 className="section-title">Built for how Pakistani restaurants actually operate.</h2>
          <p className="section-description mt-4">Whether you seat fifty guests or dispatch eighty deliveries a night.</p>
        </motion.header>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {restaurantScenarios.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px', amount: 0.05 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
                whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="group relative overflow-hidden panel flex flex-col justify-start p-7 sm:p-8 transition-all duration-300 hover:border-brand/30 hover:shadow-xl dark:hover:border-leaf/30"
              >
                {/* Ambient corner shade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -bottom-6 size-28 rounded-full bg-mint/40 blur-xl transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-mint/80 dark:bg-leaf/10 dark:group-hover:bg-leaf/20"
                />

                {/* Subtle decorative geometric shape */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -bottom-3 size-20 text-brand/5 dark:text-leaf/10 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-45 group-hover:text-brand/15 dark:group-hover:text-leaf/20"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="40" cy="40" r="18" fill="currentColor" fillOpacity="0.2" />
                </svg>

                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mint text-brand transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white dark:bg-emerald-950/60 dark:text-leaf dark:group-hover:bg-leaf dark:group-hover:text-forest">
                    <Icon className="size-7" />
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand dark:text-leaf">
                    {item.tag}
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <h3 className="text-xl font-bold dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-brand dark:text-leaf leading-snug">
                    {item.summary}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-white/75">{item.copy}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
