import Link from 'next/link'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-forest/10 bg-[#f4f6f3] text-ink transition-colors duration-300 dark:border-white/5 dark:bg-[#070e09] dark:text-[#f2f5f1]">
      <div className="site-shell pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col justify-between">
        {/* ROW 1 — Utility / Legal Navigation (4 Links on Left, 4 Links on Right; Centered on mobile) */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-forest/10 dark:border-white/5"
        >
          {/* Core product & action links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-medium">
            <Link
              href="/whatsapp-ordering"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              WhatsApp Ordering
            </Link>
            <Link
              href="/qr-table-ordering"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              Table QR
            </Link>
            <Link
              href="/online-ordering"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              Online Ordering
            </Link>
            <Link
              href="/pricing"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              FAQs
            </Link>
            <Link
              href="/#how"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#contact"
              className="text-ink/75 dark:text-white/75 hover:text-brand dark:hover:text-leaf transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Legal & compliance links (4 on the right, centered on mobile) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 sm:gap-x-6 gap-y-2 text-xs sm:text-[13px] font-medium text-ink/65 dark:text-white/65">
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

        {/* ROW 2 — Brand Wordmark (Symmetrical container alignment matching header margins, natural kerning, half-faded) */}
        <div className="w-full [container-type:inline-size] select-none py-6 sm:py-10 lg:py-12 text-center overflow-hidden">
          <Link
            href="/"
            aria-label="OrderPilot home"
            className="group block w-full text-center whitespace-nowrap leading-[0.88] tracking-[-0.04em] font-extrabold text-[16.34cqw] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] transition-opacity hover:opacity-95"
          >
            <span className="text-[#111827] dark:text-[#ffffff] transition-colors">order</span>
            <span className="text-[#377B2F] transition-colors">pilot</span>
            <span className="text-[#111827] dark:text-[#ffffff] transition-colors">.pk</span>
          </Link>
        </div>

        {/* ROW 3 — Divider, Copyright, Socials & Disclosures */}
        <div>
          {/* Horizontal Divider Line */}
          <div className="w-full border-t border-forest/10 dark:border-white/10" />

          {/* Copyright on Left, Social Media on Right */}
          <div className="py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px]">
            <p className="text-center sm:text-left text-ink/65 dark:text-white/60">
              © {currentYear} OrderPilot. All rights reserved.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 sm:gap-3.5 text-ink/70 dark:text-white/70">
              {/* Instagram */}
              <a
                href="https://instagram.com/orderpilot.pk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OrderPilot on Instagram"
                className="p-1.5 rounded-lg hover:text-brand dark:hover:text-leaf hover:bg-forest/5 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="size-4 sm:size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://x.com/orderpilot_pk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OrderPilot on X"
                className="p-1.5 rounded-lg hover:text-brand dark:hover:text-leaf hover:bg-forest/5 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="size-4 sm:size-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/orderpilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OrderPilot on LinkedIn"
                className="p-1.5 rounded-lg hover:text-brand dark:hover:text-leaf hover:bg-forest/5 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="size-4 sm:size-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0-.01-2.92 1.46 1.46 0 0 0 .01 2.92M7.86 18.5v-8.37H5.07v8.37h2.79z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@orderpilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OrderPilot on YouTube"
                className="p-1.5 rounded-lg hover:text-brand dark:hover:text-leaf hover:bg-forest/5 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="size-4 sm:size-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/orderpilot.pk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OrderPilot on Facebook"
                className="p-1.5 rounded-lg hover:text-brand dark:hover:text-leaf hover:bg-forest/5 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="size-4 sm:size-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Business Ownership & Disclosures Area */}
          <div className="pt-4 text-center text-[11px] sm:text-xs leading-relaxed text-ink/60 dark:text-white/50 max-w-4xl mx-auto space-y-2.5">
            <p>
              <span className="font-semibold text-ink/80 dark:text-white/75">Business Ownership &amp; Identity Disclosure:</span> Multi-channel restaurant ordering software engineered for Pakistani restaurants. Connect WhatsApp, online web menus, and table QR orders directly into one live kitchen board. Incubated at NIC Hyderabad · Ministry of IT &amp; Telecom · Ignite National Technology Fund. A product of Digipex Solutions LLC. Prices in PKR exclude applicable taxes. 14-day free trial on all plans.
            </p>
            <p>
              For questions regarding our company, ownership, or services, please contact us at{' '}
              <a
                href="mailto:contact@orderpilot.pk"
                className="underline hover:text-brand dark:hover:text-leaf transition-colors font-medium text-ink/75 dark:text-white/70"
              >
                contact@orderpilot.pk
              </a>{' '}
              or WhatsApp{' '}
              <a
                href="https://wa.me/923361815141"
                className="underline hover:text-brand dark:hover:text-leaf transition-colors font-medium text-ink/75 dark:text-white/70"
              >
                +92 336 1815141
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
