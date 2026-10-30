'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/track'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { label: 'How It Works', href: '/#how' },
  { label: 'Product', href: '/#product' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Talk to Us', href: '/#contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-forest/10 dark:border-white/10 transition-colors duration-300 ${
        isScrolled
          ? 'bg-cream/95 dark:bg-[#0b140d]/95 backdrop-blur-md shadow-sm'
          : 'bg-cream/90 dark:bg-[#0b140d]/90 backdrop-blur-xl'
      }`}
    >
      <div
        className={`site-shell flex items-center justify-between transition-all duration-300 ease-out ${
          isScrolled ? 'h-16 sm:h-18' : 'h-24'
        }`}
      >
        <Link href="/" className="flex min-h-12 items-center py-1" aria-label="OrderPilot home">
          <Image
            src="/assets/orderpilot-logo.webp"
            alt="OrderPilot.pk — Smart Orders Simplified"
            width={560}
            height={225}
            priority
            sizes="(min-width: 640px) 210px, 180px"
            className={`w-auto object-contain transition-all duration-300 ease-out dark:brightness-0 dark:invert ${
              isScrolled ? 'h-12' : 'h-20'
            }`}
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'text-brand' : ''}`}>{link.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/book-demo"
            onClick={() => trackEvent('demo_cta_click', { location: 'header_desktop' })}
            className="button-primary desktop-cta"
          >
            Book a Demo <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="grid size-11 place-items-center rounded-full border border-forest/15 dark:border-white/15 text-ink dark:text-white"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-forest/10 dark:border-white/10 bg-cream dark:bg-[#0e1910] p-5 lg:hidden" aria-label="Mobile navigation">
          <div className="site-shell flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-mint dark:text-white dark:hover:bg-[#15271a]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-demo"
              onClick={() => {
                setOpen(false)
                trackEvent('demo_cta_click', { location: 'header_mobile' })
              }}
              className="button-primary mt-3 justify-center"
            >
              Book a Demo <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
