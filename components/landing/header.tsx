'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="OrderPilot home">
            <img src="/logo.png" alt="OrderPilot" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href="/book-demo">Book a Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-[60]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu className={`absolute w-5 h-5 transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
            <X className={`absolute w-5 h-5 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
          </Button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 top-16 z-[55] h-[calc(100dvh-4rem)] overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="mobile-menu-glass-backdrop absolute inset-0"
        />

        <div className="mobile-menu-glass-scrim absolute inset-0" />

        <div
          className={`relative h-full px-4 pb-5 transition-all duration-300 ease-out ${
            mobileOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-4 scale-[0.98] opacity-0'
          }`}
        >
          <nav className="h-full flex flex-col items-center justify-center gap-3 pb-36">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="mobile-menu-glass-item w-full max-w-xs rounded-2xl px-6 py-4 text-center text-lg font-semibold text-foreground transition-all hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu-glass-tray absolute inset-x-4 bottom-5 rounded-3xl p-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="mobile-menu-glass-secondary h-12 rounded-2xl" onClick={handleNavClick}>
                Sign In
              </Button>
              <Button asChild className="h-12 rounded-2xl bg-primary/95 shadow-lg shadow-primary/20 hover:bg-primary">
                <Link href="/book-demo" onClick={handleNavClick}>
                  Book a Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
