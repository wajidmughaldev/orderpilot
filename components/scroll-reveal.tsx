'use client'

import { motion, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function ScrollReveal({ children, className = '', delay = 0, y = 20 }: ScrollRevealProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

