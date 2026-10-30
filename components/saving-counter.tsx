'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'motion/react'

export function SavingCounter({ target = 4999 }: { target?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const [value, setValue] = useState(prefersReduced ? target : 0)

  useEffect(() => {
    if (prefersReduced || !isInView) {
      if (prefersReduced) setValue(target)
      return
    }

    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setValue(Math.round(latest))
      },
    })

    return () => controls.stop()
  }, [isInView, prefersReduced, target])

  return (
    <span ref={ref} className="font-semibold text-brand">
      {value.toLocaleString()}
    </span>
  )
}

