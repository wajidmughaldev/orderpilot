'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Monitor, CreditCard, ChefHat, QrCode, RefreshCw, Users } from 'lucide-react'

const whatYouGetTiles = [
  {
    icon: Monitor,
    number: '01',
    title: 'Live order board.',
    copy: 'WhatsApp, web and table QR orders land on one kitchen board.',
  },
  {
    icon: CreditCard,
    number: '02',
    title: 'Pay the way Pakistan pays.',
    copy: 'Cash on delivery, JazzCash, EasyPaisa or bank transfer. Customers upload payment receipts so managers verify payment before preparation starts.',
  },
  {
    icon: ChefHat,
    number: '03',
    title: 'A screen for your kitchen.',
    copy: 'Pair a kitchen display with a code so cooks see tickets without logging into your account.',
  },
  {
    icon: QrCode,
    number: '04',
    title: 'Table QR ordering.',
    copy: 'Guests scan at their table to browse and order directly. Floor staff spend less time writing notes.',
  },
  {
    icon: RefreshCw,
    number: '05',
    title: 'Order status tracking.',
    copy: 'Move orders through New, Preparing, and Ready so the whole team sees what’s next.',
  },
  {
    icon: Users,
    number: '06',
    title: 'Your customer list.',
    copy: 'Names, phone numbers, and past orders in one account. Easy to recognize your repeat guests.',
  },
]

export function WhatYouGetSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="what-you-get" className="section-pad scroll-mt-20 bg-mint">
      <div className="site-shell">
        <motion.header
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-heading"
        >
          <p className="eyebrow section-heading-eyebrow">WHAT YOU GET</p>
          <h2 className="section-title">The tools that keep orders moving.</h2>
          <p className="section-description mt-4">Use all of it, or only the parts you need.</p>
        </motion.header>

        <div className="ops-board mt-10">
          {/* Panel top labels fade in last */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: prefersReduced ? 0 : 0.55 }}
            className="ops-board-head"
          >
            <span>YOUR SCREEN</span>
            <span>ALL ORDERS IN ONE PLACE</span>
          </motion.div>

          <div className="ops-board-grid">
            {whatYouGetTiles.map((tile, index) => {
              const Icon = tile.icon
              return (
                <motion.article
                  key={tile.title}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
                  whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className="ops-card transition-shadow duration-200 hover:shadow-xl"
                >
                  <span className="ops-number">{tile.number}</span>
                  <Icon />
                  <h3>{tile.title}</h3>
                  <p>{tile.copy}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="ops-board-foot">
            <span>3 WAYS TO ORDER</span>
            <span>1 SCREEN</span>
          </div>
        </div>
      </div>
    </section>
  )
}

