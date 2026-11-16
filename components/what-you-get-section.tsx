'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Monitor, CreditCard, ChefHat, QrCode, RefreshCw, Users } from 'lucide-react'

const whatYouGetTiles = [
  {
    icon: Monitor,
    number: '01',
    title: 'Live kitchen display.',
    copy: 'Track tickets through New, Preparing, and Ready stages with an audible chime so cooks never miss an order.',
  },
  {
    icon: ChefHat,
    number: '02',
    title: 'Dedicated kitchen screen pairing.',
    copy: 'Pair any tablet or display in your kitchen using a simple 6-digit code. Cooks view tickets without sharing passwords.',
  },
  {
    icon: QrCode,
    number: '03',
    title: 'Three channels, one queue.',
    copy: 'WhatsApp chats, table QR scans, and your direct web menu flow into a single live screen. No juggling multiple phones.',
  },
  {
    icon: CreditCard,
    number: '04',
    title: 'Local payment verification.',
    copy: 'Accept Cash on Delivery, JazzCash, EasyPaisa, or bank transfer with customer receipt verification before cooking starts.',
  },
  {
    icon: RefreshCw,
    number: '05',
    title: 'Neighborhood delivery routing.',
    copy: 'Capture complete street addresses, customer phone numbers, and cooking notes on every ticket for fast rider dispatch.',
  },
  {
    icon: Users,
    number: '06',
    title: '100% customer list ownership.',
    copy: 'Retain customer names, phone numbers, and past orders in your private dashboard. Never masked by third-party apps.',
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
          viewport={{ once: true, margin: '0px', amount: 0.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-heading-centered mb-12"
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
            viewport={{ once: true, margin: '0px', amount: 0.05 }}
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
                  viewport={{ once: true, margin: '0px', amount: 0.05 }}
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

