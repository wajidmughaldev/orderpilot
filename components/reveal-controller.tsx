'use client'

import { useEffect } from 'react'

const revealSelector = [
  'body > header',
  'main > section',
  'main .panel',
  'main .image-frame',
  'main .ops-board',
  'main form',
  'body > footer',
].join(',')

export function RevealController() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let elements: HTMLElement[] = []

    const handle = requestAnimationFrame(() => {
      elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))

      elements.forEach((element, index) => {
        element.dataset.reveal = ''
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`)
      })

      document.documentElement.classList.add('reveal-ready')

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-revealed')
            observer?.unobserve(entry.target)
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )

      elements.forEach((element) => observer?.observe(element))
    })

    return () => {
      cancelAnimationFrame(handle)
      observer?.disconnect()
      document.documentElement.classList.remove('reveal-ready')
      elements.forEach((element) => {
        delete element.dataset.reveal
        element.classList.remove('is-revealed')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [])

  return null
}
