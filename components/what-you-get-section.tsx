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
    title: 'Kitchen screen pairing.',
    copy: 'Connect kitchen tablets or displays using a secure pairing code without sharing account passwords.',
  },
  {
    icon: QrCode,
    number: '03',
    title: 'Table QR ordering.',
    copy: 'Let dine-in guests browse photos and place orders from their table without waiting for paper menus.',
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
    title: 'Delivery & order controls.',
    copy: 'Set your restaurant delivery fees, minimum order amounts, and store hours directly in settings.',
  },
  {
    icon: Users,
    number: '06',
    title: 'Customer contact directory.',
    copy: 'Retain your customer names, phone numbers, and order histories directly in your private dashboard.',
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

