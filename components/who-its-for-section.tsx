'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  UtensilsCrossed,
  Soup,
  Coffee,
  Sandwich,
  Cloud,
  Building2,
  Croissant,
  Martini,
} from 'lucide-react'

const restaurantTypes = [
  {
    icon: UtensilsCrossed,
    title: 'Fine Dining',
    copy: 'Table orders reach the kitchen without anyone running back and forth.',
  },
  {
    icon: Soup,
    title: 'Casual Dining',
    copy: 'Dine-in, takeaway and delivery in one list.',
  },
  {
    icon: Coffee,
    title: 'Cafés',
    copy: 'Counter, table and repeat orders in one queue.',
  },
  {
    icon: Sandwich,
    title: 'Quick Service / Fast Food',
    copy: 'Lots of orders, fast. Everyone sees what’s next.',
  },
  {
    icon: Cloud,
    title: 'Cloud Kitchens',
    copy: 'WhatsApp and website orders on one screen.',
  },
  {
    icon: Building2,
    title: 'Food Courts',
    copy: 'A small team handling a big rush.',
  },
  {
    icon: Croissant,
    title: 'Bakeries',
    copy: 'Pre-orders, custom cakes and pickups, written down.',
  },
  {
    icon: Martini,
    title: 'Juice Bars / Lounges',
    copy: 'Guests order, staff keep serving.',
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
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-heading"
        >
          <p className="eyebrow section-heading-eyebrow">WHO IT&apos;S FOR</p>
          <h2 className="section-title">From cafés to cloud kitchens.</h2>
          <p className="section-description mt-4">Whatever you serve, orders come from the same places.</p>
        </motion.header>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {restaurantTypes.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
                whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="group relative overflow-hidden panel flex min-h-[15rem] flex-col justify-start p-6 sm:p-7 transition-all duration-300 hover:border-brand/30 hover:shadow-xl dark:hover:border-leaf/30"
              >
                {/* Ambient corner shade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -bottom-6 size-24 rounded-full bg-mint/40 blur-xl transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-mint/80 dark:bg-leaf/10 dark:group-hover:bg-leaf/20"
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

                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-mint text-brand transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white dark:bg-emerald-950/60 dark:text-leaf dark:group-hover:bg-leaf dark:group-hover:text-forest">
                  <Icon className="size-7" />
                </span>
                <div className="relative z-10">
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink/80">{item.copy}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
