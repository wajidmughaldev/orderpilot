'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { MessageCircle, Files, RefreshCw } from 'lucide-react'

const problemItems = [
  {
    icon: MessageCircle,
    num: '01',
    title: 'Orders get buried in chats.',
    copy: 'A message comes in at 8:40, another at 8:42. By 9:00 you’re scrolling up to find the first one.',
    jitter: { y: 35, x: 18, rotate: -3 },
  },
  {
    icon: Files,
    num: '02',
    title: 'The kitchen hears it late.',
    copy: 'Someone reads the order out, someone writes it down, and something gets missed.',
    jitter: { y: -10, x: -14, rotate: 2.5 },
  },
  {
    icon: RefreshCw,
    num: '03',
    title: 'Customers keep calling.',
    copy: '“Bhai, mera order kahan hai?” Your staff stop what they’re doing to check.',
    jitter: { y: -50, x: 12, rotate: -2 },
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const closingLineRef = useRef<HTMLParagraphElement>(null)
  const prefersReduced = useReducedMotion()

  const isClosingLineInView = useInView(closingLineRef, {
    once: true,
    margin: '-80px',
  })

  return (
    <section ref={sectionRef} className="section-pad bg-cream">
      <div className="site-shell">
        <header className="section-heading">
          <p className="eyebrow section-heading-eyebrow">THE PROBLEM</p>
          <h2 className="section-title">Orders come from too many places.</h2>
          <p className="section-description mt-4">On a busy night, that gets messy.</p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problemItems.map((item, index) => {
            const Icon = item.icon
            // If reduced motion: no jitter or transform
            // If closing line is in view: neat position (x: 0, y: 0, rotate: 0)
            // If initial scroll-in: stacked and overlapping with jitter
            const targetTransform = prefersReduced || isClosingLineInView
              ? { x: 0, y: 0, rotate: 0, opacity: 1 }
              : { ...item.jitter, opacity: 1 }

            return (
              <motion.article
                key={item.title}
                initial={prefersReduced ? false : { opacity: 0, ...item.jitter }}
                animate={targetTransform}
                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                  delay: isClosingLineInView ? index * 0.07 : 0,
                }}
                className="group relative overflow-hidden panel flex h-full flex-col p-7 sm:p-8 transition-all duration-300 hover:border-brand/30 hover:shadow-xl"
              >
                {/* Ambient corner shade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-mint/35 blur-xl transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-mint/80"
                />

                {/* Subtle decorative geometric shape */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-3 size-24 text-brand/5 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 group-hover:text-brand/15"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <rect x="20" y="20" width="60" height="60" rx="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>

                <div className="relative z-10">
                  <Icon className="size-9 text-brand transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-8 font-mono text-xs font-bold text-brand">{item.num}</p>
                  <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-ink/80">{item.copy}</p>
                </div>
              </motion.article>
            )
          })}
        </div>

        <p ref={closingLineRef} className="mt-8 max-w-4xl text-lg font-semibold text-brand">
          You&apos;re not doing anything wrong. There are just too many places to look. OrderPilot puts them in one.
        </p>
      </div>
    </section>
  )
}
