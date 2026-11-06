'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { HeroDashboardMockup } from '@/components/hero-dashboard-mockup'

interface CinematicHeroProps {
  whatsappHeroUrl: string
}

// 5 engineered vertical descending light trails
const trails = [
  { left: '10%', height: '180px', duration: '6.4s', delay: '0s', colorVar: 'var(--hero-trail-1)', mobileHidden: true, tabletHidden: false },
  { left: '28%', height: '240px', duration: '8.2s', delay: '1.4s', colorVar: 'var(--hero-trail-2)', mobileHidden: false, tabletHidden: false },
  { left: '50%', height: '190px', duration: '5.8s', delay: '3.1s', colorVar: 'var(--hero-trail-3)', mobileHidden: false, tabletHidden: false },
  { left: '72%', height: '220px', duration: '7.6s', delay: '0.8s', colorVar: 'var(--hero-trail-1)', mobileHidden: false, tabletHidden: false },
  { left: '90%', height: '170px', duration: '6.9s', delay: '2.4s', colorVar: 'var(--hero-trail-2)', mobileHidden: true, tabletHidden: false },
]

export function CinematicHero({ whatsappHeroUrl }: CinematicHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Deepened multi-layered parallax (disabled when user prefers reduced motion)
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 68])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], prefersReduced ? [1, 1] : [1, 0.15])
  const trailsY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 130])
  const mockupY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -45])

  return (
    <section
      ref={containerRef}
      className="hero-section relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28"
    >
      {/* Background Layer: Ambient radial glow and vertical light trails */}
      <motion.div
        style={{ y: trailsY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Diffused ambient aura */}
        <div
          className="absolute left-1/2 top-4 sm:top-8 -translate-x-1/2 h-[340px] sm:h-[420px] w-[min(1100px,94%)] rounded-full blur-[72px] pointer-events-none transition-opacity duration-500 opacity-60 dark:opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 30%, rgba(94, 212, 79, 0.32), rgba(221, 244, 219, 0.18) 55%, transparent 75%)',
          }}
        />

        {/* Vertical guide tracks and descending light trails */}
        <div className="absolute inset-0 flex justify-between px-[6%] sm:px-[10%] opacity-80 dark:opacity-60">
          {trails.map((t, idx) => (
            <div
              key={idx}
              className={`relative h-full w-px bg-forest/[0.05] dark:bg-white/[0.04] ${
                t.mobileHidden ? 'hidden sm:block' : ''
              } ${t.tabletHidden ? 'hidden lg:block' : ''}`}
            >
              <span
                className="hero-light-trail"
                style={{
                  height: t.height,
                  animationDuration: t.duration,
                  animationDelay: t.delay,
                  background: `linear-gradient(180deg, transparent, ${t.colorVar}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Container */}
      <div className="site-shell relative z-10 flex flex-col items-center">
        {/* Foreground Content */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto flex max-w-[800px] flex-col items-center text-center"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/80 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05]">
            <span className="size-1.5 rounded-full bg-brand dark:bg-leaf animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-forest dark:text-leaf">
              ORDERING SOFTWARE FOR PAKISTANI RESTAURANTS
            </span>
          </div>

          {/* Confident, oversized headline */}
          <h1 className="mt-6 sm:mt-8 text-balance text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[1.04] text-ink dark:text-white">
            Every order, <span className="text-brand dark:text-leaf">on one screen.</span>
          </h1>

          {/* High-contrast, breathable supporting text */}
          <p className="mt-6 sm:mt-7 max-w-[680px] text-base sm:text-lg md:text-xl leading-relaxed text-ink/75 dark:text-white/80 font-normal">
            Customers order on WhatsApp, your website or at the table. Every order shows up on one screen, so your kitchen knows what&apos;s next.
          </p>

          {/* Action CTAs: 14-Day Free Trial -> Sign In/App, Live Demo -> /book-demo */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="https://app.orderpilot.pk"
              className="button-primary text-base px-6 sm:px-7 py-3.5 shadow-lg shadow-forest/15 dark:shadow-black/50"
            >
              Start 14-Day Free Trial <ArrowRight className="size-4" />
            </a>
            <Link
              href={whatsappHeroUrl}
              className="button-secondary text-base px-6 sm:px-7 py-3.5"
            >
              Chat on WhatsApp
            </Link>
          </div>

          {/* Subtext pricing note */}
          <p className="mt-4 sm:mt-5 text-center text-xs sm:text-sm font-medium text-ink/70 dark:text-white/65 isolate relative z-10 print:transform-none print:opacity-100">
            Plans from PKR 5,999 a month with a 14-day free trial. We&apos;ll show it with your menu.
          </p>
        </motion.div>

        {/* Product Preview Mockup anchored at the base with subtle parallax depth */}
        <motion.div
          style={{ y: mockupY }}
          className="relative z-10 mx-auto mt-12 sm:mt-16 lg:mt-20 w-full max-w-[1280px]"
        >
          <HeroDashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}

