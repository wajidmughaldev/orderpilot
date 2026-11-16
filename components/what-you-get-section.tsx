'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Monitor, CreditCard, ChefHat, QrCode, RefreshCw, Users } from 'lucide-react'

const whatYouGetTiles = [
  {
    icon: Monitor,
    number: '01',
    title: 'Live kitchen display.',
    copy: 'Track incoming tickets through New, Preparing, and Ready stages with audio chimes.',
  },
  {
    icon: ChefHat,
    number: '02',
    title: 'Kitchen screen pairing.',
    copy: 'Connect kitchen tablets with a secure pairing code without sharing account passwords.',
  },
  {
    icon: QrCode,
    number: '03',
    title: 'Table QR ordering.',
    copy: 'Dine-in guests view photo menus and order from their table without waiting for staff.',
  },
  {
    icon: CreditCard,
    number: '04',
    title: 'Local payment verification.',
    copy: 'Accept Cash on Delivery, JazzCash, EasyPaisa, or bank transfer with staff receipt review.',
  },
  {
    icon: RefreshCw,
    number: '05',
    title: 'Delivery & order controls.',
    copy: 'Configure delivery fees, minimum order amounts, and sold-out items directly in settings.',
  },
  {
    icon: Users,
    number: '06',
    title: 'Customer contact directory.',
    copy: 'Retain guest phone numbers and order histories in your private dashboard.',
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
            <span>CORE CAPABILITIES</span>
            <span>DAILY OPERATIONS</span>
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
            <span>STANDARD WEB BROWSER</span>
            <span>NO APP REQUIRED</span>
          </div>
        </div>
      </div>
    </section>
  )
}

