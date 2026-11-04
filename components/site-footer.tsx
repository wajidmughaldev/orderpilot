import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-forest/10 bg-[#f4f6f3] text-ink transition-colors duration-300 dark:border-white/5 dark:bg-[#070e09] dark:text-[#f2f5f1]">
      <div className="site-shell pt-14 sm:pt-20 pb-24 sm:pb-16 flex flex-col justify-between">
        {/* ROW 1 — Utility / Legal Navigation (Rebalanced without redundant small logo) */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 sm:pb-12 border-b border-forest/10 dark:border-white/5"
        >
          {/* Core product & action links */}
          <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-medium">
            <Link href="/pricing" className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors">
              FAQs
            </Link>
            <Link href="/#how" className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors">
              How It Works
            </Link>
            <Link href="/#contact" className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors">
              Contact
            </Link>
          </div>

          {/* Legal & compliance links */}
          <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 text-xs sm:text-[13px] font-medium text-ink/65 dark:text-white/65">
            <Link href="/privacy" className="hover:text-brand dark:hover:text-leaf transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand dark:hover:text-leaf transition-colors">
              Terms
            </Link>
            <Link href="/data-deletion" className="hover:text-brand dark:hover:text-leaf transition-colors">
              Data Deletion
            </Link>
            <Link href="/cookie-policy" className="hover:text-brand dark:hover:text-leaf transition-colors">
              Cookie Policy
            </Link>
          </div>
        </nav>

        {/* ROW 2 — Large Brand Sign-Off (Official Logo Hierarchy: subdued order, restrained green pilot, subdued .pk) */}
        <div className="py-12 sm:py-16 lg:py-20 select-none">
          <Link
            href="/"
            aria-label="OrderPilot home"
            className="group font-heading text-[clamp(2.45rem,11.5vw,10.75rem)] font-extrabold tracking-[-0.04em] leading-[0.88] block text-center sm:text-left transition-colors duration-300"
          >
            <span className="text-forest/[0.13] transition-colors duration-300 group-hover:text-forest/[0.22] dark:text-white/[0.08] dark:group-hover:text-white/[0.15]">
              order
            </span>
            <span className="text-brand/40 transition-colors duration-300 group-hover:text-brand/65 dark:text-leaf/35 dark:group-hover:text-leaf/55">
              pilot
            </span>
            <span className="text-forest/[0.13] transition-colors duration-300 group-hover:text-forest/[0.22] dark:text-white/[0.08] dark:group-hover:text-white/[0.15]">
              .pk
            </span>
          </Link>

          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-ink dark:text-white">
              Smart Orders. <span className="text-brand dark:text-leaf">Simplified.</span>
            </p>

            {/* Static status indicator (pulsing effect removed for calm composition) */}
            <div className="flex items-center gap-2 rounded-full border border-forest/15 bg-white/80 dark:border-white/10 dark:bg-white/[0.04] px-3.5 py-1.5 w-fit">
              <span className="size-1.5 rounded-full bg-brand dark:bg-leaf" />
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-forest dark:text-leaf">
                Multi-Channel Restaurant Software
              </span>
            </div>
          </div>
        </div>

        {/* ROW 3 — Business / Disclosure Area */}
        <div className="pt-8 sm:pt-12 border-t border-forest/10 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 text-xs sm:text-[13px] leading-relaxed text-ink/70 dark:text-white/65">
            {/* Column 1: Platform & Company */}
            <div className="space-y-2">
              <p className="font-semibold text-ink dark:text-white">Restaurant ordering software</p>
              <p>
                Multi-channel restaurant ordering software engineered for Pakistani restaurants. Connect WhatsApp, online web menus, and table QR orders directly into one live kitchen board.
              </p>
              <p className="text-ink/55 dark:text-white/50 text-[11px] sm:text-xs">
                A product of Digipex Solutions LLC.
              </p>
            </div>

            {/* Column 2: Ecosystem & Disclosures */}
            <div className="space-y-2">
              <p className="font-semibold text-ink dark:text-white">Incubation & Ecosystem</p>
              <p>
                Incubated at NIC Hyderabad · Ministry of IT & Telecom · Ignite National Technology Fund.
              </p>
              <p className="text-ink/55 dark:text-white/50 text-[11px] sm:text-xs">
                Prices in PKR exclude applicable taxes. 14-day free trial on subscription plans.
              </p>
            </div>

            {/* Column 3: Direct Contact & Copyright */}
            <div className="space-y-3 lg:text-right pb-8 sm:pb-0">
              <p className="font-semibold text-ink dark:text-white">Direct Restaurant Support</p>
              <div className="flex flex-col lg:items-end gap-1.5">
                <a
                  href="mailto:contact@orderpilot.pk"
                  className="inline-flex items-center gap-2 hover:text-brand dark:hover:text-leaf transition-colors font-medium text-ink/80 dark:text-white/80"
                >
                  <Mail className="size-3.5 text-brand dark:text-leaf" />
                  <span>contact@orderpilot.pk</span>
                </a>
                <a
                  href="https://wa.me/923361815141"
                  className="inline-flex items-center gap-2 hover:text-brand dark:hover:text-leaf transition-colors font-medium text-ink/80 dark:text-white/80"
                >
                  <MessageCircle className="size-3.5 text-brand dark:text-leaf" />
                  <span>WhatsApp: +92 336 1815141</span>
                </a>
              </div>
              <p className="pt-2 text-ink/50 dark:text-white/45 text-[11px]">
                © {currentYear} OrderPilot. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
