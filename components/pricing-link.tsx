'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { trackEvent } from '@/lib/track'

interface PricingLinkProps extends ComponentProps<typeof Link> {
  planName: string
}

export function PricingLink({ planName, onClick, children, ...props }: PricingLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent('pricing_model_select', { plan: planName })
        onClick?.(e)
      }}
    >
      {children}
    </Link>
  )
}
