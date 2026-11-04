'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useInView } from 'motion/react'
import { MessageCircle, Globe, QrCode, ChefHat } from 'lucide-react'

interface SimulatedOrder {
  id: string
  number: string
  channel: 'WhatsApp' | 'Web' | 'Table 7 QR'
  items: string
  amount: string
}

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

  // 8.2-second loop timeline
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
        }, 1100),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(2)
          setOrdersToday(25)
        }, 2500),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(3)
          setOrdersToday(26)
        }, 4000),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(4)
          setOrdersToday(26)
        }, 5600),
      )

      timeouts.push(
        setTimeout(() => {
          setPhase(5)
          setOrdersToday(26)
        }, 7000),
      )

      timeouts.push(
        setTimeout(() => {
          runLoop()
        }, 8400),
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

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'WhatsApp':
        return <MessageCircle className="size-3 text-brand dark:text-leaf shrink-0" />
      case 'Web':
        return <Globe className="size-3 text-sky-600 dark:text-sky-400 shrink-0" />
      case 'Table 7 QR':
        return <QrCode className="size-3 text-emerald-600 dark:text-emerald-300 shrink-0" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: 'New' | 'Preparing' | 'Ready' | 'Incoming') => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center rounded-md bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            New
          </span>
        )
      case 'Preparing':
        return (
          <span className="inline-flex items-center rounded-md bg-orange-100 text-orange-800 dark:bg-orange-500/25 dark:text-orange-300 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            <span className="hidden sm:inline">Preparing</span>
            <span className="sm:hidden">Prep</span>
          </span>
        )
      case 'Ready':
        return (
          <span className="inline-flex items-center rounded-md bg-mint text-forest dark:bg-leaf/25 dark:text-leaf px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            Ready
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-md bg-ink/10 text-ink/70 dark:bg-white/10 dark:text-white/70 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
            Incoming
          </span>
        )
    }
  }

  // Active tickets in simulation pipeline
  const order1039: SimulatedOrder = { id: 'order-1039', number: '#1039', channel: 'Table 7 QR', items: '1 Beef Burger', amount: 'PKR 950' }
  const order1040: SimulatedOrder = { id: 'order-1040', number: '#1040', channel: 'Web', items: '2 Chicken Wraps', amount: 'PKR 1,200' }
  const order1041: SimulatedOrder = { id: 'order-1041', number: '#1041', channel: 'WhatsApp', items: '1 Zinger Burger + Fries', amount: 'PKR 850' }
  const order1042: SimulatedOrder = { id: 'order-1042', number: '#1042', channel: 'WhatsApp', items: '1 Club Sandwich + Drink', amount: 'PKR 1,100' }
  const order1043: SimulatedOrder = { id: 'order-1043', number: '#1043', channel: 'Web', items: '2 Classic Shawarmas', amount: 'PKR 900' }

  // Dynamic placement per phase - Guarantees populated columns across all phases
  const newOrders: { order: SimulatedOrder; isInitial: boolean }[] = []
  const prepOrders: { order: SimulatedOrder; isInitial: boolean }[] = []
  const readyOrders: { order: SimulatedOrder; isInitial: boolean }[] = []

  // Order 1039: Starts Ready, clears in Phase 3
  if (phase < 3) {
    readyOrders.push({ order: order1039, isInitial: phase === 0 })
  }

  // Order 1040: Starts Preparing, moves to Ready in Phase 2, clears in Phase 4
  if (phase < 2) {
    prepOrders.push({ order: order1040, isInitial: phase === 0 })
  } else if (phase < 4) {
    readyOrders.push({ order: order1040, isInitial: false })
  }

  // Order 1041: Starts New, moves to Preparing in Phase 2, moves to Ready in Phase 3
  if (phase < 2) {
    newOrders.push({ order: order1041, isInitial: phase === 0 })
  } else if (phase === 2) {
    prepOrders.push({ order: order1041, isInitial: false })
  } else {
    readyOrders.push({ order: order1041, isInitial: false })
  }

  // Order 1042: Starts Incoming (Phase 0), moves to New (Phase 1-2), Preparing (Phase 3-4), Ready (Phase 5)
  if (phase === 1 || phase === 2) {
    newOrders.push({ order: order1042, isInitial: false })
  } else if (phase === 3 || phase === 4) {
    prepOrders.push({ order: order1042, isInitial: false })
  } else if (phase >= 5) {
    readyOrders.push({ order: order1042, isInitial: false })
  }

  // Order 1043: Lands in New in Phase 4-5
  if (phase >= 4) {
    newOrders.push({ order: order1043, isInitial: false })
  }

  const renderCard = (item: { order: SimulatedOrder; isInitial: boolean }, status: 'New' | 'Preparing' | 'Ready') => {
    const { order, isInitial } = item
    const borderBg =
      status === 'Ready'
        ? 'border-leaf/40 bg-mint/50 dark:border-leaf/30 dark:bg-leaf/10'
        : status === 'Preparing'
          ? 'border-orange-200 bg-orange-50/70 dark:border-orange-400/30 dark:bg-orange-500/10'
          : 'border-forest/12 bg-white dark:border-white/5 dark:bg-[#132317]'

    return (
      <motion.div
        key={`${order.id}-${status}`}
        initial={isInitial ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`rounded-xl border ${borderBg} p-2 sm:p-3 shadow-sm`}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-ink/80 dark:text-white/80">
            {getChannelIcon(order.channel)}
            <span className="hidden sm:inline">{order.channel}</span>
          </span>
          {getStatusBadge(status)}
        </div>
        <p className="mt-1 text-[11px] sm:text-xs md:text-sm font-bold text-ink dark:text-white leading-snug">
          {order.items}
        </p>
        <div className="mt-1 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-ink/60 dark:text-white/60">
          <span>{order.number}</span>
          <span className="font-semibold text-brand dark:text-leaf">{order.amount}</span>
        </div>
      </motion.div>
    )
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
      <div className="relative flex flex-col p-3 sm:p-6 w-full min-h-[380px] sm:min-h-[440px] select-none justify-between">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-2.5 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-mint text-brand dark:bg-leaf/20 dark:text-leaf">
              <ChefHat className="size-4 sm:size-5" />
            </span>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand dark:text-leaf">Kitchen Board</span>
              <p className="text-xs text-ink/60 dark:text-white/60 hidden sm:block">Interactive Simulation</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-forest/15 bg-cream/80 dark:border-white/5 dark:bg-white/5 px-2.5 py-1 sm:px-4 sm:py-1.5">
            <span className="text-[11px] sm:text-xs font-medium text-ink/75 dark:text-white/75">Orders today</span>
            <span className="font-mono text-xs sm:text-base font-bold text-brand dark:text-leaf">{ordersToday}</span>
          </div>
        </div>

        {/* Incoming Orders Stream Strip (Left / Top alert) */}
        <div className="my-2.5 sm:my-3 min-h-[38px] sm:min-h-[42px] flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink/60 dark:text-white/50 shrink-0">Incoming:</span>
          {phase === 0 && (
            <motion.div
              key="incoming-1042"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 rounded-full border border-leaf/40 bg-mint px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-forest dark:border-leaf/30 dark:bg-leaf/10 dark:text-white shrink-0 shadow-sm"
            >
              {getChannelIcon('WhatsApp')}
              <span>WhatsApp: 1 Club Sandwich + Drink</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-forest/70 dark:text-white/60">PKR 1,100</span>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="incoming-1043"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-white shrink-0 shadow-sm"
            >
              {getChannelIcon('Web')}
              <span>Web: 2 Classic Shawarmas</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-sky-800/70 dark:text-white/60">PKR 900</span>
            </motion.div>
          )}

          {phase !== 0 && phase !== 3 && (
            <span className="text-[11px] sm:text-xs font-medium text-brand dark:text-leaf flex items-center gap-1.5 font-semibold">
              <span className="inline-block size-1.5 sm:size-2 rounded-full bg-brand dark:bg-leaf animate-pulse" /> Live order sync active
            </span>
          )}
        </div>

        {/* 3 Kitchen Board Columns */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4 flex-1">
          {/* COLUMN: NEW */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl border border-forest/12 bg-cream/60 dark:border-white/5 dark:bg-white/[0.03] p-1.5 sm:p-3.5 shadow-sm">
            <div className="mb-2 sm:mb-2.5 flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-1.5 sm:pb-2">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="size-1.5 sm:size-2 rounded-full bg-amber-500" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink dark:text-white">New</span>
              </div>
              <span className="rounded-full bg-forest/10 dark:bg-white/5 px-1 sm:px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-ink/70 dark:text-white/70">
                {newOrders.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
              {newOrders.map((item) => renderCard(item, 'New'))}
            </div>
          </div>

          {/* COLUMN: PREPARING */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl border border-forest/12 bg-cream/60 dark:border-white/5 dark:bg-white/[0.03] p-1.5 sm:p-3.5 shadow-sm">
            <div className="mb-2 sm:mb-2.5 flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-1.5 sm:pb-2">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="size-1.5 sm:size-2 rounded-full bg-orange-500" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink dark:text-white">
                  <span className="hidden sm:inline">Preparing</span>
                  <span className="sm:hidden">Prep</span>
                </span>
              </div>
              <span className="rounded-full bg-forest/10 dark:bg-white/5 px-1 sm:px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-ink/70 dark:text-white/70">
                {prepOrders.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
              {prepOrders.map((item) => renderCard(item, 'Preparing'))}
            </div>
          </div>

          {/* COLUMN: READY */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl border border-forest/12 bg-cream/60 dark:border-white/5 dark:bg-white/[0.03] p-1.5 sm:p-3.5 shadow-sm">
            <div className="mb-2 sm:mb-2.5 flex items-center justify-between border-b border-forest/10 dark:border-white/5 pb-1.5 sm:pb-2">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="size-1.5 sm:size-2 rounded-full bg-leaf" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink dark:text-white">Ready</span>
              </div>
              <span className="rounded-full bg-forest/10 dark:bg-white/5 px-1 sm:px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-ink/70 dark:text-white/70">
                {readyOrders.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
              {readyOrders.map((item) => renderCard(item, 'Ready'))}
            </div>
          </div>
        </div>

        {/* Bottom Status bar */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-forest/10 dark:border-white/5 pt-2 text-[10px] sm:text-[11px] text-ink/60 dark:text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 sm:size-2 rounded-full bg-brand dark:bg-leaf animate-pulse" /> Kitchen Board Preview (Simulation)
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-brand dark:text-leaf">OrderPilot.pk</span>
        </div>
      </div>
    </figure>
  )
}
