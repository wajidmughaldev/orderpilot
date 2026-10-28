'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { trackEvent } from '@/lib/track'

interface DemoLinkProps extends ComponentProps<typeof Link> {
  location: string
}

export function DemoLink({ location, onClick, children, ...props }: DemoLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent('demo_cta_click', { location })
        onClick?.(e)
      }}
    >
      {children}
    </Link>
  )
}
