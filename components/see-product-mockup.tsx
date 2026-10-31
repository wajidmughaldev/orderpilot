'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { MessageCircle, Globe, QrCode } from 'lucide-react'

export function SeeProductMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const [isTabHidden, setIsTabHidden] = useState(false)

  useEffect(() => {
    const onVisibilityChange = () => setIsTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const shouldAnimateDrift = !prefersReduced && isInView && !isTabHidden

  return (
    <div ref={containerRef} className="relative mt-10">
      {/* Scaled and faded-in kitchen dashboard image */}
      <motion.figure
        initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="image-frame relative overflow-hidden"
      >
        <Image
          src="/assets/orderpilot_kitchen_dashboard.webp"
          alt="Kitchen board with new, preparing, and ready order columns"
          width={1456}
          height={1092}
          loading="lazy"
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full"
        />
      </motion.figure>

      {/* Floating Cards (Desktop only, hidden on mobile) */}
      {/* Card 1: WhatsApp Order */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        animate={shouldAnimateDrift ? { y: [-4, 5, -4] } : { y: 0 }}
        transition={
          shouldAnimateDrift
            ? { y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } }
            : { duration: 0.5, ease: 'easeOut' }
        }
        className="pointer-events-none absolute -left-6 top-10 z-20 hidden lg:flex flex-col gap-1 rounded-2xl border border-forest/15 bg-white/95 p-4 shadow-xl backdrop-blur-md w-64 dark:border-white/5 dark:bg-[#121f15]/95"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-forest dark:text-leaf">
            <MessageCircle className="size-3.5 text-brand" /> WhatsApp order
          </span>
          <span className="rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold">
            New
          </span>
        </div>
        <p className="text-sm font-bold text-ink dark:text-white">1 Zinger Burger + Fries</p>
        <span className="font-mono text-xs font-semibold text-brand dark:text-leaf">PKR 850</span>
      </motion.div>

      {/* Card 2: Web Order */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        animate={shouldAnimateDrift ? { y: [5, -5, 5] } : { y: 0 }}
        transition={
          shouldAnimateDrift
            ? { y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' } }
            : { duration: 0.5, ease: 'easeOut' }
        }
        className="pointer-events-none absolute -right-6 top-1/3 z-20 hidden lg:flex flex-col gap-1 rounded-2xl border border-forest/15 bg-white/95 p-4 shadow-xl backdrop-blur-md w-64 dark:border-white/5 dark:bg-[#121f15]/95"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-forest dark:text-leaf">
            <Globe className="size-3.5 text-sky-600" /> Web order
          </span>
          <span className="rounded-md bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 px-2 py-0.5 text-[10px] font-bold">
            Preparing
          </span>
        </div>
        <p className="text-sm font-bold text-ink dark:text-white">2 Chicken Wraps</p>
        <span className="font-mono text-xs font-semibold text-brand dark:text-leaf">PKR 1,200</span>
      </motion.div>

      {/* Card 3: Table QR Order */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        animate={shouldAnimateDrift ? { y: [-5, 4, -5] } : { y: 0 }}
        transition={
          shouldAnimateDrift
            ? { y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' } }
            : { duration: 0.5, ease: 'easeOut' }
        }
        className="pointer-events-none absolute -bottom-6 left-12 z-20 hidden lg:flex flex-col gap-1 rounded-2xl border border-forest/15 bg-white/95 p-4 shadow-xl backdrop-blur-md w-64 dark:border-white/5 dark:bg-[#121f15]/95"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-forest dark:text-leaf">
            <QrCode className="size-3.5 text-emerald-600" /> Table 7 QR order
          </span>
          <span className="rounded-md bg-mint text-forest dark:bg-emerald-950/60 dark:text-leaf px-2 py-0.5 text-[10px] font-bold">
            Ready
          </span>
        </div>
        <p className="text-sm font-bold text-ink dark:text-white">1 Beef Burger</p>
        <span className="font-mono text-xs font-semibold text-brand dark:text-leaf">PKR 950</span>
      </motion.div>
    </div>
  )
}

