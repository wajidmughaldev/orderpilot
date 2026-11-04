import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Terms of Service — OrderPilot',
  description:
    'These Terms of Service govern the use of OrderPilot, a restaurant ordering automation product built by the OrderPilot team and backed by Digipex Solutions LLC.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service — OrderPilot',
    description:
      'These Terms of Service govern the use of OrderPilot, built by the OrderPilot team and backed by Digipex Solutions LLC.',
    url: '/terms',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — OrderPilot',
    description:
      'These Terms of Service govern the use of OrderPilot, built by the OrderPilot team and backed by Digipex Solutions LLC.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

export default function TermsOfServicePage() {
  return (
    <AppShell>
      <main>
        {/* Header */}
        <section className="hero-section !pb-12">
          <div className="site-shell max-w-4xl">
            <p className="eyebrow">OrderPilot legal</p>
            <h1 className="display mt-6">Terms of Service</h1>
            <p className="lede mt-6 max-w-2xl">
              These terms describe the rules for using OrderPilot, built by the OrderPilot team and backed by Digipex Solutions.
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
                    These Terms of Service govern the use of OrderPilot, a restaurant ordering automation product built by the OrderPilot team and backed by Digipex Solutions LLC, a Colorado limited liability company registered in the United States.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    1. Backer &amp; Operational Information
                  </h2>
                  <p>
                    OrderPilot is built by the OrderPilot team and backed by Digipex Solutions, which provides technical, operational, and business management support.
                  </p>
                  <p>
                    <strong className="text-ink dark:text-white">Backing Entity:</strong>
                    <br />
                    Digipex Solutions LLC
                  </p>
                  <p>
                    <strong className="text-ink dark:text-white">Registered Address:</strong>
                    <br />
                    1500 N GRANT ST STE R,
                    <br />
                    Denver, CO 80203,
                    <br />
                    United States
                  </p>
                  <p>
                    <strong className="text-ink dark:text-white">Contact:</strong>
                    <br />
                    <a
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                      href="mailto:contact@orderpilot.pk"
                    >
                      contact@orderpilot.pk
                    </a>
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    2. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing or using OrderPilot, you agree to these Terms of Service. If you use OrderPilot for a restaurant or business, you confirm that you are authorized to accept these terms on behalf of that business.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    3. Service Description
                  </h2>
                  <p>
                    OrderPilot helps restaurants receive and manage WhatsApp-based orders. Features may include restaurant onboarding, menu management, WhatsApp Business Platform connection, automated replies, order dashboards, status updates, logs, and catalog support.
                  </p>
                  <p>
                    OrderPilot is a technology platform and does not prepare food, deliver orders, or act as the restaurant.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    4. Restaurant Responsibilities
                  </h2>
                  <p>Restaurants are responsible for their own operations, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Menu accuracy, prices, item availability, descriptions, and catalog data.</li>
                    <li>Order fulfillment, delivery or pickup handling, refunds, and customer communication.</li>
                    <li>Providing accurate business, contact, and account information.</li>
                    <li>Maintaining lawful use of WhatsApp, Meta Business assets, images, and customer data.</li>
                    <li>Keeping account credentials secure and limiting access to authorized staff.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    5. Acceptable Use
                  </h2>
                  <p>Users must not misuse the platform. You must not use OrderPilot to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send spam, abusive, misleading, illegal, or unauthorized messages.</li>
                    <li>Violate WhatsApp, Meta, payment provider, or other third-party platform policies.</li>
                    <li>Upload illegal content or content that infringes another party&apos;s rights.</li>
                    <li>Attempt to bypass platform limits, security controls, or access controls.</li>
                    <li>Interfere with service availability or misuse APIs.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    6. WhatsApp, Meta, and Third-Party Services
                  </h2>
                  <p>
                    Some features depend on third-party platforms and providers, including WhatsApp, Meta, hosting providers, and payment providers if applicable. These services may change, fail, be delayed, require additional review, or become unavailable.
                  </p>
                  <p>
                    Restaurants are responsible for ensuring they have authority to connect their Meta Business Portfolio, WhatsApp Business Account, phone number, and catalogs to OrderPilot.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    7. Payments and Subscriptions
                  </h2>
                  <p>
                    Paid plans, billing, invoices, renewals, trials, and cancellation terms may be provided separately in an order form, invoice, subscription agreement, or dashboard notice. Unless stated otherwise, fees are charged for access to OrderPilot software and support, not for Meta, WhatsApp, delivery, restaurant, or payment provider charges.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    8. Service Availability
                  </h2>
                  <p>
                    We aim to keep OrderPilot reliable, but the service may be interrupted by maintenance, hosting issues, network problems, Meta/WhatsApp outages, third-party services, or events outside our control.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    9. Limitation of Liability
                  </h2>
                  <p>
                    To the maximum extent allowed by law, OrderPilot and Digipex Solutions LLC are not liable for indirect, incidental, special, consequential, or lost-profit damages, including losses related to missed orders, delayed messages, platform restrictions, incorrect restaurant data, refunds, fulfillment issues, or third-party service problems.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    10. Changes to Terms
                  </h2>
                  <p>
                    We may update these terms from time to time. Continued use of OrderPilot after changes means you accept the updated terms.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    11. Contact
                  </h2>
                  <p>
                    For questions about these terms, contact{' '}
                    <a
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                      href="mailto:contact@orderpilot.pk"
                    >
                      contact@orderpilot.pk
                    </a>
                    .
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

