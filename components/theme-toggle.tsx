'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const darkActive = stored === 'dark' || document.documentElement.classList.contains('dark')
    setIsDark(darkActive)
  }, [])

  function toggleTheme() {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative inline-flex size-10 items-center justify-center rounded-full border border-forest/15 bg-cream/80 text-forest transition-all duration-200 hover:border-brand/40 hover:bg-mint/60 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/15 dark:bg-white/5 dark:text-leaf dark:hover:border-leaf/40 dark:hover:bg-white/10 dark:hover:text-leaf ${className}`}
    >
      <span className="sr-only">{label}</span>
      {mounted ? (
        isDark ? (
          <Sun className="size-5 transition-transform duration-300 rotate-0 hover:rotate-45" aria-hidden="true" />
        ) : (
          <Moon className="size-5 transition-transform duration-300 -rotate-12 hover:rotate-0" aria-hidden="true" />
        )
      ) : (
        <span className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}

