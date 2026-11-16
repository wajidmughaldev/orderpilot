import type { Metadata } from 'next'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'This Privacy Policy explains how OrderPilot, built by the OrderPilot team and backed by Digipex Solutions LLC, collects, uses, stores, and protects information.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — OrderPilot',
    description:
      'This Privacy Policy explains how OrderPilot collects, uses, stores, and protects information for restaurants, customers, and users.',
    url: '/privacy',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — OrderPilot',
    description:
      'This Privacy Policy explains how OrderPilot collects, uses, stores, and protects information for restaurants, customers, and users.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <AppShell>
      <main>
        {/* Header */}
        <section className="hero-section !pb-12">
          <div className="site-shell max-w-4xl">
            <p className="eyebrow">OrderPilot legal</p>
            <h1 className="display mt-6">Privacy Policy</h1>
            <p className="lede mt-6 max-w-2xl">
              This policy explains how OrderPilot, built by the OrderPilot team and backed by Digipex Solutions, handles information for restaurants, customers, and users.
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
                    This Privacy Policy explains how OrderPilot, built by the OrderPilot team and backed by Digipex Solutions, collects, uses, stores, and protects information when restaurants, customers, or users interact with our website, WhatsApp ordering system, dashboard, or related services.
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
                    2. Information We Collect
                  </h2>
                  <p>We may collect information needed to provide and support OrderPilot, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Restaurant business information.</li>
                    <li>Restaurant menu/catalog data.</li>
                    <li>Customer names.</li>
                    <li>Customer phone numbers.</li>
                    <li>WhatsApp messages related to orders.</li>
                    <li>Delivery or pickup details.</li>
                    <li>Order items and order status.</li>
                    <li>Payment status if applicable.</li>
                    <li>Technical logs needed for security and support.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    3. How We Use Information
                  </h2>
                  <p>We use information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide WhatsApp ordering, menu, catalog, order tracking, and dashboard features.</li>
                    <li>Route WhatsApp messages and order events to the correct restaurant.</li>
                    <li>Send automated customer replies and order status updates through WhatsApp.</li>
                    <li>Help restaurants manage incoming orders and customer communication.</li>
                    <li>Improve reliability, security, support, and product performance.</li>
                    <li>Comply with legal, platform, and Meta requirements.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    4. WhatsApp and Meta Services
                  </h2>
                  <p>
                    OrderPilot may use WhatsApp Business Platform and related Meta services to help restaurants receive and manage customer orders. Messages sent through WhatsApp may be processed according to WhatsApp&apos;s and Meta&apos;s applicable terms and privacy policies.
                  </p>
                  <p>
                    When a restaurant connects WhatsApp through Meta, OrderPilot may receive access to WhatsApp Business assets selected during Meta Embedded Signup or Facebook Login for Business. We use this access only to operate the restaurant ordering workflow, including message sending, webhook processing, catalog support, and account configuration.
                  </p>
                  <p>
                    We do not sell WhatsApp customer data, and we do not use customer messages for unrelated advertising.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    5. Sharing of Information
                  </h2>
                  <p>We may share information only when needed to provide or secure the service:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With Meta/WhatsApp to send and receive WhatsApp messages.</li>
                    <li>With hosting, database, storage, analytics, and infrastructure providers used to run OrderPilot.</li>
                    <li>With a restaurant account owner or authorized staff for their own restaurant data.</li>
                    <li>When required by law, regulation, legal process, or platform compliance.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    6. Data Storage and Security
                  </h2>
                  <p>
                    We use reasonable technical and organizational safeguards to protect data. Sensitive integration values such as access tokens are stored securely where supported by the application backend. No internet service can guarantee complete security, but we work to reduce risk and restrict access to operational needs.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    7. Data Retention
                  </h2>
                  <p>
                    We retain restaurant, order, WhatsApp log, and account data for as long as needed to operate the service, provide support, comply with legal obligations, resolve disputes, prevent fraud, and maintain audit history.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    8. Data Deletion Requests
                  </h2>
                  <p>
                    Restaurants or users may request deletion of their data by contacting{' '}
                    <a
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                      href="mailto:contact@orderpilot.pk"
                    >
                      contact@orderpilot.pk
                    </a>
                    . Requests should include the business name, registered phone number, and details of the data they want deleted. For further instructions, please visit our{' '}
                    <Link
                      href="/data-deletion"
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                    >
                      Data Deletion page
                    </Link>
                    .
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    9. Your Choices
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Restaurants may request account export, correction, disconnection, or deletion.</li>
                    <li>Restaurants may disconnect Meta/WhatsApp access from Meta Business Settings or Business Integrations.</li>
                    <li>Customers may contact the restaurant directly to request order data correction or deletion.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-white border-b border-forest/10 pb-2 dark:border-white/10">
                    10. Contact
                  </h2>
                  <p>
                    For privacy questions or deletion requests, contact{' '}
                    <a
                      className="font-semibold text-brand underline underline-offset-4 hover:text-forest dark:text-leaf dark:hover:text-mint"
                      href="mailto:contact@orderpilot.pk"
                    >
                      contact@orderpilot.pk
                    </a>
                    . Digipex Solutions LLC handles OrderPilot privacy and data deletion requests.
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

