import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { BUSINESS_INFO } from '@/lib/business-info';

export const metadata: Metadata = {
  title: 'Terms of Service | OrderPilot.pk',
  description: 'Terms of Service for OrderPilot.pk, operated by Digipex Solutions LLC.',
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These terms describe the rules for using OrderPilot.pk, including restaurant dashboards, WhatsApp ordering automation, and Meta integrations."
    >
      <section className="space-y-4">
        <p>
          <strong>Effective date:</strong> May 22, 2026
        </p>
        <p>
          These Terms of Service govern the use of OrderPilot.pk, a restaurant ordering automation
          product operated by Digipex Solutions LLC, a Colorado limited liability company registered
          in the United States.
        </p>
      </section>

      <section className="space-y-4">
        <h2>1. Company Information</h2>
        <p>
          <strong>Operator:</strong>
          <br />
          {BUSINESS_INFO.legalName}
        </p>
        <p>
          <strong>Registered Address:</strong>
          <br />
          {BUSINESS_INFO.registeredAddressLine1},
          <br />
          {BUSINESS_INFO.registeredAddressLine2},
          <br />
          {BUSINESS_INFO.registeredCountry}
        </p>
        <p>
          <strong>Contact:</strong>
          <br />
          <a className="text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
            {BUSINESS_INFO.email}
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. Acceptance of Terms</h2>
        <p>
          By accessing or using OrderPilot.pk, you agree to these Terms of Service. If you use
          OrderPilot.pk for a restaurant or business, you confirm that you are authorized to accept
          these terms on behalf of that business.
        </p>
      </section>

      <section className="space-y-4">
        <h2>3. Service Description</h2>
        <p>
          OrderPilot.pk helps restaurants receive and manage WhatsApp-based orders. Features may
          include restaurant onboarding, menu management, WhatsApp Business Platform connection,
          automated replies, order dashboards, status updates, logs, and catalog support.
        </p>
        <p>
          OrderPilot.pk is a technology platform and does not prepare food, deliver orders, or act
          as the restaurant.
        </p>
      </section>

      <section className="space-y-4">
        <h2>4. Restaurant Responsibilities</h2>
        <p>Restaurants are responsible for their own operations, including:</p>
        <ul>
          <li>Menu accuracy, prices, item availability, descriptions, and catalog data.</li>
          <li>Order fulfillment, delivery or pickup handling, refunds, and customer communication.</li>
          <li>Providing accurate business, contact, and account information.</li>
          <li>Maintaining lawful use of WhatsApp, Meta Business assets, images, and customer data.</li>
          <li>Keeping account credentials secure and limiting access to authorized staff.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>5. Acceptable Use</h2>
        <p>Users must not misuse the platform. You must not use OrderPilot.pk to:</p>
        <ul>
          <li>Send spam, abusive, misleading, illegal, or unauthorized messages.</li>
          <li>Violate WhatsApp, Meta, payment provider, or other third-party platform policies.</li>
          <li>Upload illegal content or content that infringes another party&apos;s rights.</li>
          <li>Attempt to bypass platform limits, security controls, or access controls.</li>
          <li>Interfere with service availability or misuse APIs.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>6. WhatsApp, Meta, and Third-Party Services</h2>
        <p>
          Some features depend on third-party platforms and providers, including WhatsApp, Meta,
          hosting providers, and payment providers if applicable. These services may change, fail,
          be delayed, require additional review, or become unavailable.
        </p>
        <p>
          Restaurants are responsible for ensuring they have authority to connect their Meta
          Business Portfolio, WhatsApp Business Account, phone number, and catalogs to
          OrderPilot.pk.
        </p>
      </section>

      <section className="space-y-4">
        <h2>7. Payments and Subscriptions</h2>
        <p>
          Paid plans, billing, invoices, renewals, trials, and cancellation terms may be provided
          separately in an order form, invoice, subscription agreement, or dashboard notice. Unless
          stated otherwise, fees are charged for access to OrderPilot.pk software and support, not
          for Meta, WhatsApp, delivery, restaurant, or payment provider charges.
        </p>
      </section>

      <section className="space-y-4">
        <h2>8. Service Availability</h2>
        <p>
          We aim to keep OrderPilot.pk reliable, but the service may be interrupted by maintenance,
          hosting issues, network problems, Meta/WhatsApp outages, third-party services, or events
          outside our control.
        </p>
      </section>

      <section className="space-y-4">
        <h2>9. Limitation of Liability</h2>
        <p>
          To the maximum extent allowed by law, OrderPilot.pk and Digipex Solutions LLC are not
          liable for indirect, incidental, special, consequential, or lost-profit damages, including
          losses related to missed orders, delayed messages, platform restrictions, incorrect
          restaurant data, refunds, fulfillment issues, or third-party service problems.
        </p>
      </section>

      <section className="space-y-4">
        <h2>10. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of OrderPilot.pk after changes
          means you accept the updated terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2>11. Contact</h2>
        <p>
          For questions about these terms, contact{' '}
          <a className="text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
            {BUSINESS_INFO.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
