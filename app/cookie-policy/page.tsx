import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Cookie Policy — OrderPilot',
  description:
    'This Cookie Policy explains how OrderPilot, backed by Digipex Solutions LLC, uses cookies and similar technologies on our website, product pages, and dashboard experiences.',
  alternates: {
    canonical: '/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy — OrderPilot',
    description:
      'This policy explains how OrderPilot uses cookies and similar technologies on our website and product pages.',
    url: '/cookie-policy',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot Cookie Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy — OrderPilot',
    description:
      'This policy explains how OrderPilot uses cookies and similar technologies on our website and product pages.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

export default function CookiePolicyPage() {
  return (
    <AppShell>
      <main>
        {/* Header */}
        <section className="hero-section !pb-12">
          <div className="site-shell max-w-4xl">
            <p className="eyebrow">OrderPilot legal</p>
            <h1 className="display mt-6">Cookie Policy</h1>
            <p className="lede mt-6 max-w-2xl">
              This policy explains how OrderPilot may use cookies and similar technologies on our website and product pages.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-ink/70 dark:text-white/70">
              <span>Last updated: May 13, 2026</span>
              <span>•</span>
              <span>Effective date: May 22, 2026</span>
            </div>
          </div>
        </section>

        {/* Document Content */}
        <section className="section-pad bg-cream dark:bg-[#0b140d]">
          <div className="site-shell max-w-4xl">
            <article className="rounded-[2rem] border border-forest/15 bg-white p-6 sm:p-12 shadow-sm dark:border-white/10 dark:bg-[#121e15]">
              <div className="space-y-8 text-ink/80 leading-7 dark:text-white/80">
                <section className="space-y-4">
                  <p>
                    <strong className="text-ink dark:text-white">Effective date:</strong> May 22, 2026
                  </p>
                  <p>
                    OrderPilot is built by the OrderPilot team and backed by Digipex Solutions LLC. This Cookie Policy applies to our website, product pages, and dashboard experiences.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    1. What cookies are
                  </h2>
                  <p>
                    Cookies are small files stored on your device by a website. Similar technologies may include local storage, pixels, tags, and analytics identifiers.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    2. How we use cookies
                  </h2>
                  <p>OrderPilot may use cookies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Keep the website and dashboard working correctly.</li>
                    <li>Remember preferences and improve user experience.</li>
                    <li>Measure website performance and understand page usage.</li>
                    <li>Protect accounts and detect suspicious activity.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    3. Third-party services
                  </h2>
                  <p>
                    We may use trusted third-party services for hosting, analytics, product measurement, or embedded integrations. These providers may set their own cookies according to their policies.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    4. Managing cookies
                  </h2>
                  <p>
                    You can control or delete cookies through your browser settings. Blocking some cookies may affect website or dashboard functionality.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    5. Contact
                  </h2>
                  <p>
                    For questions about this Cookie Policy, contact{' '}
                    <a
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                      href="mailto:contact@orderpilot.pk"
                    >
                      contact@orderpilot.pk
                    </a>
                    . Digipex Solutions LLC handles OrderPilot privacy and cookie requests on behalf of the platform.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
    </AppShell>
  )
}

