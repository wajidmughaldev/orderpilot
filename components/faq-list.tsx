'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export type FaqItem = { question: string; answer: string }

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const prefersReduced = useReducedMotion()

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="w-full divide-y divide-forest/15 border-y border-forest/15 dark:divide-white/5 dark:border-white/5">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.question} className="py-1">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-bold dark:text-white"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`shrink-0 transition-transform duration-300 dark:text-leaf ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.35, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="w-full max-w-none pb-6 pr-6 sm:pr-10 text-base leading-7 text-ink/80">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
