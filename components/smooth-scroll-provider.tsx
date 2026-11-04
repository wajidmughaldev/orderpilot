'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    // Initialize Lenis with gentle, premium inertia
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      syncTouch: false, // Let mobile touch scroll remain 100% native
    })

    lenisRef.current = lenis
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle hash anchors smoothly with header offset (-80px)
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return

      try {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          event.preventDefault()
          lenis.scrollTo(targetElement as HTMLElement, { offset: -80, duration: 1.1 })
          if (window.history.pushState) {
            window.history.pushState(null, '', href)
          }
        }
      } catch {
        // Selector may be invalid, allow browser default
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Handle initial hash in URL if present
    if (window.location.hash) {
      try {
        const initialTarget = document.querySelector(window.location.hash)
        if (initialTarget) {
          setTimeout(() => {
            lenis.scrollTo(initialTarget as HTMLElement, { offset: -80, immediate: true })
          }, 120)
        }
      } catch {}
    }

    // Media query listener for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.destroy()
        cancelAnimationFrame(rafId)
        lenisRef.current = null
      }
    }
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  // On route change, reset scroll to top
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [pathname])

  return <>{children}</>
}

