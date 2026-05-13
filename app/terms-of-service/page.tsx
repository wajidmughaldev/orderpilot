import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service - OrderPilot',
  description: 'Terms of Service for restaurants using OrderPilot.',
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These terms describe the rules for using OrderPilot, including restaurant dashboards, WhatsApp ordering automation, and Meta integrations."
    >
      <section className="space-y-4">
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing or using OrderPilot, you agree to these Terms of Service. If you use
          OrderPilot for a restaurant or business, you confirm that you are authorized to accept
          these terms on behalf of that business.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. Service description</h2>
        <p>
          OrderPilot provides software that helps restaurants receive and manage orders through
          WhatsApp. Features may include restaurant onboarding, menu management, WhatsApp Cloud API
          connection, automated bot replies, order dashboards, status updates, logs, and catalogue
          support.
        </p>
      </section>

      <section className="space-y-4">
        <h2>3. Restaurant responsibilities</h2>
        <p>Restaurants are responsible for:</p>
        <ul>
          <li>Providing accurate business, menu, price, availability, and contact information.</li>
          <li>Honoring orders, prices, delivery commitments, and customer support obligations.</li>
          <li>Maintaining lawful use of WhatsApp, Meta Business, catalogues, images, and customer data.</li>
          <li>Keeping account credentials secure and limiting access to authorized staff.</li>
          <li>Complying with Meta, WhatsApp, payment provider, consumer protection, and local business rules.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>4. Meta and WhatsApp integrations</h2>
        <p>
          Some features require Meta Business, WhatsApp Cloud API, and related permissions. These
          services are provided by Meta and may change, fail, be delayed, or require additional
          review. OrderPilot is not responsible for Meta approval decisions, WhatsApp account
          restrictions, messaging limits, template approvals, or third-party outages.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Acceptable use</h2>
        <p>You must not use OrderPilot to:</p>
        <ul>
          <li>Send spam, abusive, misleading, illegal, or unauthorized messages.</li>
          <li>Upload content that infringes another party's rights.</li>
          <li>Attempt to bypass platform limits, security controls, or access controls.</li>
          <li>Interfere with service availability or misuse APIs.</li>
          <li>Process sensitive data unless you have a lawful basis and appropriate consent.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>6. Payments and subscriptions</h2>
        <p>
          Paid plans, billing, invoices, renewals, trials, and cancellation terms may be provided
          separately in an order form, invoice, subscription agreement, or dashboard notice. Unless
          stated otherwise, fees are charged for access to OrderPilot software and support, not for
          Meta or WhatsApp charges.
        </p>
      </section>

      <section className="space-y-4">
        <h2>7. Service availability</h2>
        <p>
          We aim to keep OrderPilot reliable, but the service may be interrupted by maintenance,
          hosting issues, network problems, Meta/WhatsApp outages, third-party services, or events
          outside our control.
        </p>
      </section>

      <section className="space-y-4">
        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent allowed by law, OrderPilot is not liable for indirect, incidental,
          special, consequential, or lost-profit damages, including losses related to missed orders,
          delayed messages, platform restrictions, incorrect restaurant data, or third-party
          service issues.
        </p>
      </section>

      <section className="space-y-4">
        <h2>9. Changes to terms</h2>
        <p>
          We may update these terms from time to time. Continued use of OrderPilot after changes
          means you accept the updated terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2>10. Contact</h2>
        <p>
          For questions about these terms, contact{' '}
          <a className="text-primary hover:underline" href="mailto:hello@orderpilot.pk">
            hello@orderpilot.pk
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
