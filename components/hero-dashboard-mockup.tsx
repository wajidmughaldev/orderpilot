'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useInView } from 'motion/react'
import { MessageCircle, Globe, QrCode, ChefHat } from 'lucide-react'

export function HeroDashboardMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(containerRef, { margin: '-40px' })
  const [mounted, setMounted] = useState(false)
  const [isTabHidden, setIsTabHidden] = useState(false)

  // Simulation state
  const [phase, setPhase] = useState<number>(0)
  const [ordersToday, setOrdersToday] = useState<number>(24)

  useEffect(() => {
    setMounted(true)
    const onVisibilityChange = () => {
      setIsTabHidden(document.hidden)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  // 8-second loop timeline
  useEffect(() => {
    if (!mounted || prefersReduced || !isInView || isTabHidden) return

    const timeouts: NodeJS.Timeout[] = []

    const runLoop = () => {
      setPhase(0)
      setOrdersToday(24)

      timeouts.push(
        setTimeout(() => {
          setPhase(1)
          setOrdersToday(25)
        }, 800),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(2)
          setOrdersToday(26)
        }, 2200),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(3)
          setOrdersToday(27)
        }, 3600),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(4)
        }, 5000),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(5)
        }, 6400),
      )

      timeouts.push(
        setTimeout(() => {
          runLoop()
        }, 8200),
      )
    }

    runLoop()

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
  }, [mounted, prefersReduced, isInView, isTabHidden])

  // Reduced motion or fallback
  if (prefersReduced) {
    return (
      <figure className="image-frame">
        <Image
          src="/assets/orderpilot_restaurant_dashboard_showcase.webp"
          alt="OrderPilot restaurant dashboard beside a WhatsApp ordering conversation"
          width={1456}
          height={1092}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full scale-[1.03]"
        />
      </figure>
    )
  }

  // Base state before phase 1
  const order1Status = phase >= 5 ? 'Ready' : phase >= 4 ? 'Preparing' : phase >= 1 ? 'New' : 'Incoming'
  const order1Col = phase >= 5 ? 'ready' : phase >= 4 ? 'preparing' : phase >= 1 ? 'new' : 'incoming'

  const order2Col = phase >= 2 ? 'new' : 'incoming'
  const order3Col = phase >= 3 ? 'new' : 'incoming'

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'WhatsApp':
        return <MessageCircle className="size-3 text-brand dark:text-leaf" />
      case 'Web':
        return <Globe className="size-3 text-sky-600 dark:text-sky-400" />
      case 'Table 7 QR':
        return <QrCode className="size-3 text-emerald-600 dark:text-emerald-300" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: 'New' | 'Preparing' | 'Ready' | 'Incoming') => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center rounded-md bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 px-2 py-0.5 text-[11px] font-bold">
            New
          </span>
        )
      case 'Preparing':
        return (
          <span className="inline-flex items-center rounded-md bg-orange-100 text-orange-800 dark:bg-orange-500/25 dark:text-orange-300 px-2 py-0.5 text-[11px] font-bold">
            Preparing
          </span>
        )
      case 'Ready':
        return (
          <span className="inline-flex items-center rounded-md bg-mint text-forest dark:bg-leaf/25 dark:text-leaf px-2 py-0.5 text-[11px] font-bold">
            Ready
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-md bg-ink/10 text-ink/70 dark:bg-white/10 dark:text-white/70 px-2 py-0.5 text-[11px] font-bold">
            Incoming
          </span>
        )
    }
  }

  return (
    <figure
      ref={containerRef}
      className="image-frame relative overflow-hidden bg-white text-ink border border-forest/15 dark:bg-[#0c1810] dark:text-white dark:border-white/5 shadow-2xl transition-colors duration-300"
    >
      {/* Fallback image for no-js / SSR crawl */}
      <noscript>
        <Image
          src="/assets/orderpilot_restaurant_dashboard_showcase.webp"
          alt="OrderPilot restaurant dashboard beside a WhatsApp ordering conversation"
          width={1456}
          height={1092}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full scale-[1.03]"
        />
      </noscript>

      {/* Interactive Mockup Component */}
      <div className="relative flex flex-col p-4 sm:p-6 w-full min-h-[380px] sm:min-h-[440px] select-none justify-between">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-mint text-brand dark:bg-leaf/20 dark:text-leaf">
              <ChefHat className="size-4 sm:size-5" />
            </span>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand dark:text-leaf">Kitchen Board</span>
              <p className="text-xs text-ink/60 dark:text-white/60 hidden sm:block">Live Order Stream</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-forest/15 bg-cream/80 dark:border-white/5 dark:bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5">
            <span className="text-xs font-medium text-ink/75 dark:text-white/75">Orders today</span>
            <span className="font-mono text-sm sm:text-base font-bold text-brand dark:text-leaf">{ordersToday}</span>
          </div>
        </div>

        {/* Incoming Orders Stream Strip (Left / Top alert) */}
        <div className="my-3 min-h-[42px] flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ink/60 dark:text-white/50 shrink-0">Incoming:</span>
          {/* Incoming Chip 1 */}
          {phase === 0 && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-1.5 rounded-full border border-leaf/40 bg-mint px-3 py-1 text-xs font-semibold text-forest dark:border-leaf/30 dark:bg-leaf/10 dark:text-white shrink-0 shadow-sm"
            >
              {getChannelIcon('WhatsApp')}
              <span>WhatsApp: 1 Zinger Burger + Fries</span>
              <span className="font-mono text-[10px] text-forest/70 dark:text-white/60">PKR 850</span>
            </motion.div>
          )}

          {/* Incoming Chip 2 */}
          {phase === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-white shrink-0 shadow-sm"
            >
              {getChannelIcon('Web')}
              <span>Web: 2 Chicken Wraps</span>
              <span className="font-mono text-[10px] text-sky-800/70 dark:text-white/60">PKR 1,200</span>
            </motion.div>
          )}

          {/* Incoming Chip 3 */}
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-white shrink-0 shadow-sm"
            >
              {getChannelIcon('Table 7 QR')}
              <span>Table 7 QR: 1 Beef Burger</span>
              <span className="font-mono text-[10px] text-emerald-800/70 dark:text-white/60">PKR 950</span>
            </motion.div>
          )}

          {phase >= 3 && (
            <span className="text-xs font-medium text-brand dark:text-leaf flex items-center gap-1.5 font-semibold">
              <span className="inline-block size-2 rounded-full bg-brand dark:bg-leaf animate-pulse" /> All orders captured
            </span>
          )}
        </div>

        {/* 3 Kitchen Board Columns */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 flex-1">
          {/* COLUMN: NEW */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl border border-forest/12 bg-cream/60 dark:border-white/5 dark:bg-white/[0.03] p-2.5 sm:p-3.5 shadow-sm">
            <div className="mb-2.5 flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink dark:text-white">New</span>
              </div>
              <span className="rounded-full bg-forest/10 dark:bg-white/5 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink/70 dark:text-white/70">
                {(order1Col === 'new' ? 1 : 0) + (order2Col === 'new' ? 1 : 0) + (order3Col === 'new' ? 1 : 0)}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {/* Order 1 Card if in New */}
              {order1Col === 'new' && (
                <motion.div
                  layoutId="order-card-1"
                  initial={{ opacity: 0, y: -12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="rounded-xl border border-forest/12 bg-white dark:border-white/5 dark:bg-[#132317] p-2.5 sm:p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-ink/80 dark:text-white/80">
                      {getChannelIcon('WhatsApp')} WhatsApp
                    </span>
                    {getStatusBadge('New')}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white">1 Zinger Burger + Fries</p>
                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink/60 dark:text-white/60">
                    <span>#1042</span>
                    <span className="font-semibold text-brand dark:text-leaf">PKR 850</span>
                  </div>
                </motion.div>
              )}

              {/* Order 2 Card if in New */}
              {order2Col === 'new' && (
                <motion.div
                  layoutId="order-card-2"
                  initial={{ opacity: 0, y: -12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="rounded-xl border border-forest/12 bg-white dark:border-white/5 dark:bg-[#132317] p-2.5 sm:p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-ink/80 dark:text-white/80">
                      {getChannelIcon('Web')} Web
                    </span>
                    {getStatusBadge('New')}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white">2 Chicken Wraps</p>
                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink/60 dark:text-white/60">
                    <span>#1043</span>
                    <span className="font-semibold text-brand dark:text-leaf">PKR 1,200</span>
                  </div>
                </motion.div>
              )}

              {/* Order 3 Card if in New */}
              {order3Col === 'new' && (
                <motion.div
                  layoutId="order-card-3"
                  initial={{ opacity: 0, y: -12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="rounded-xl border border-forest/12 bg-white dark:border-white/5 dark:bg-[#132317] p-2.5 sm:p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-ink/80 dark:text-white/80">
                      {getChannelIcon('Table 7 QR')} Table 7 QR
                    </span>
                    {getStatusBadge('New')}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white">1 Beef Burger</p>
                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink/60 dark:text-white/60">
                    <span>#1044</span>
                    <span className="font-semibold text-brand dark:text-leaf">PKR 950</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* COLUMN: PREPARING */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl border border-forest/12 bg-cream/60 dark:border-white/5 dark:bg-white/[0.03] p-2.5 sm:p-3.5 shadow-sm">
            <div className="mb-2.5 flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-orange-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink dark:text-white">Preparing</span>
              </div>
              <span className="rounded-full bg-forest/10 dark:bg-white/5 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink/70 dark:text-white/70">
                {order1Col === 'preparing' ? 1 : 0}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {/* Order 1 Card if in Preparing */}
              {order1Col === 'preparing' && (
                <motion.div
                  layoutId="order-card-1"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="rounded-xl border border-orange-200 bg-orange-50/70 dark:border-orange-400/30 dark:bg-orange-500/10 p-2.5 sm:p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-ink/80 dark:text-white/80">
                      {getChannelIcon('WhatsApp')} WhatsApp
                    </span>
                    {getStatusBadge('Preparing')}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white">1 Zinger Burger + Fries</p>
                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink/60 dark:text-white/60">
                    <span>#1042</span>
                    <span className="font-semibold text-brand dark:text-leaf">PKR 850</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* COLUMN: READY */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl border border-forest/12 bg-cream/60 dark:border-white/5 dark:bg-white/[0.03] p-2.5 sm:p-3.5 shadow-sm">
            <div className="mb-2.5 flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-leaf" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink dark:text-white">Ready</span>
              </div>
              <span className="rounded-full bg-forest/10 dark:bg-white/5 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink/70 dark:text-white/70">
                {order1Col === 'ready' ? 1 : 0}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {/* Order 1 Card if in Ready */}
              {order1Col === 'ready' && (
                <motion.div
                  layoutId="order-card-1"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="rounded-xl border border-leaf/40 bg-mint/50 dark:border-leaf/30 dark:bg-leaf/10 p-2.5 sm:p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-ink/80 dark:text-white/80">
                      {getChannelIcon('WhatsApp')} WhatsApp
                    </span>
                    {getStatusBadge('Ready')}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white">1 Zinger Burger + Fries</p>
                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink/60 dark:text-white/60">
                    <span>#1042</span>
                    <span className="font-semibold text-brand dark:text-leaf">PKR 850</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Status bar */}
        <div className="mt-3 flex items-center justify-between border-t border-forest/10 dark:border-white/5 pt-2 text-[11px] text-ink/60 dark:text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-brand dark:bg-leaf animate-pulse" /> Live Kitchen Display Connected
          </span>
          <span className="font-mono text-[10px] font-semibold text-brand dark:text-leaf">OrderPilot.pk</span>
        </div>
      </div>
    </figure>
  )
}
