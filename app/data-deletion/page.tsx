import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Data Deletion Request — OrderPilot',
  description:
    'Users, restaurants, or customers may request deletion of personal or business data associated with OrderPilot, backed by Digipex Solutions LLC.',
  alternates: {
    canonical: '/data-deletion',
  },
  openGraph: {
    title: 'Data Deletion Request — OrderPilot',
    description:
      'Instructions for users, restaurants, and customers to request deletion of personal or business data associated with OrderPilot.',
    url: '/data-deletion',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot Data Deletion Request' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Deletion Request — OrderPilot',
    description:
      'Instructions for users, restaurants, and customers to request deletion of personal or business data associated with OrderPilot.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

export default function DataDeletionPage() {
  return (
    <AppShell>
      <main>
        {/* Header */}
        <section className="hero-section !pb-12">
          <div className="site-shell max-w-4xl">
            <p className="eyebrow">OrderPilot legal</p>
            <h1 className="display mt-6">Data Deletion Request</h1>
            <p className="lede mt-6 max-w-2xl">
              Users, restaurants, or customers may request deletion of personal or business data associated with OrderPilot.
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
                    OrderPilot is built by the OrderPilot team and backed by Digipex Solutions LLC.
                  </p>
                  <p>
                    Users, restaurants, or customers may request deletion of personal or business data associated with OrderPilot.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    How to Request Deletion
                  </h2>
                  <p>
                    To request deletion, email{' '}
                    <a
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                      href="mailto:contact@orderpilot.pk"
                    >
                      contact@orderpilot.pk
                    </a>{' '}
                    with the following details:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your full name.</li>
                    <li>Business name, if applicable.</li>
                    <li>Registered phone number.</li>
                    <li>WhatsApp number used with orderpilot.pk.</li>
                    <li>Description of the data you want deleted.</li>
                  </ul>
                  <p>
                    We will review the request and process eligible deletion requests within a reasonable timeframe, subject to legal, security, fraud prevention, and operational requirements.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    Registered Address
                  </h2>
                  <address className="not-italic leading-7 text-ink/80 dark:text-white/80">
                    Digipex Solutions LLC
                    <br />
                    1500 N GRANT ST STE R,
                    <br />
                    Denver, CO 80203,
                    <br />
                    United States.
                  </address>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
    </AppShell>
  )
}

