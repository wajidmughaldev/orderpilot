import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';

export const metadata: Metadata = {
  title: 'Data Deletion Instructions - OrderPilot',
  description: 'How to request deletion of data connected to OrderPilot.',
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      description="Use this page for Meta app setup and for restaurants or users who want to request deletion of data connected to OrderPilot."
    >
      <section className="space-y-4">
        <p>
          <strong>Effective date:</strong> May 22, 2026
        </p>
        <p>
          OrderPilot.pk is operated by Digipex Solutions. These instructions explain how
          restaurants and users can request deletion of data connected to OrderPilot and Meta
          integrations.
        </p>
      </section>

      <section className="space-y-4">
        <h2>1. How to request deletion</h2>
        <p>
          To request deletion of your OrderPilot account data or Meta/WhatsApp connected data, email
          us at{' '}
          <a className="text-primary hover:underline" href="mailto:hello@orderpilot.pk">
            hello@orderpilot.pk
          </a>{' '}
          with the subject line: Data Deletion Request.
        </p>
        <p>Please include:</p>
        <ul>
          <li>Your restaurant or business name.</li>
          <li>The email address used for the OrderPilot account.</li>
          <li>The WhatsApp Business phone number connected to OrderPilot, if applicable.</li>
          <li>A short confirmation that you want the connected data deleted.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>2. What we delete</h2>
        <p>After verifying your request, we will delete or anonymize data such as:</p>
        <ul>
          <li>Restaurant profile information stored in OrderPilot.</li>
          <li>Owner or staff account access connected to the restaurant.</li>
          <li>WhatsApp connection details stored by OrderPilot, including Meta authorization codes, tokens, connected IDs, webhook routing details, and catalogue IDs.</li>
          <li>Menu, category, item, and catalogue sync data stored in OrderPilot.</li>
          <li>WhatsApp message logs and conversation sessions where deletion is allowed.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>3. Data we may retain</h2>
        <p>
          We may retain limited information where required for legal, accounting, security, dispute
          resolution, fraud prevention, or audit purposes. If full deletion is not legally possible,
          we will restrict or anonymize data where practical.
        </p>
      </section>

      <section className="space-y-4">
        <h2>4. Disconnecting Meta access</h2>
        <p>
          You can also remove OrderPilot access from your Meta Business settings. Go to Meta
          Business settings, review connected apps or business integrations, and remove OrderPilot
          access. Removing access may stop WhatsApp ordering automation.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Processing time</h2>
        <p>
          We aim to process verified deletion requests within 30 days. If we need more information
          to verify the request, we will contact you using the email address provided.
        </p>
      </section>

      <section className="space-y-4">
        <h2>6. Contact</h2>
        <p>
          For deletion requests or questions, contact Digipex Solutions at{' '}
          <a className="text-primary hover:underline" href="mailto:hello@orderpilot.pk">
            hello@orderpilot.pk
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
