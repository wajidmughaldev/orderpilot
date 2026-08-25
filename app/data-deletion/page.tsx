import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { BUSINESS_INFO } from '@/lib/business-info';

export const metadata: Metadata = {
  title: 'Data Deletion | OrderPilot',
  description: `Data deletion request instructions for OrderPilot, backed by ${BUSINESS_INFO.backerLegalName}.`,
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Request"
      description="Users, restaurants, or customers may request deletion of personal or business data associated with OrderPilot."
    >
      <section className="space-y-4">
        <p>
          <strong>Effective date:</strong> May 22, 2026
        </p>
        <p>{BUSINESS_INFO.productName} is built by the OrderPilot team and backed by {BUSINESS_INFO.backerLegalName}.</p>
        <p>
          Users, restaurants, or customers may request deletion of personal or business data
          associated with {BUSINESS_INFO.productName}.
        </p>
      </section>

      <section className="space-y-4">
        <h2>How to Request Deletion</h2>
        <p>
          To request deletion, email{' '}
          <a className="text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
            {BUSINESS_INFO.email}
          </a>{' '}
          with the following details:
        </p>
        <ul>
          <li>Your full name.</li>
          <li>Business name, if applicable.</li>
          <li>Registered phone number.</li>
          <li>WhatsApp number used with {BUSINESS_INFO.productDomain}.</li>
          <li>Description of the data you want deleted.</li>
        </ul>
        <p>
          We will review the request and process eligible deletion requests within a reasonable
          timeframe, subject to legal, security, fraud prevention, and operational requirements.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Registered Address</h2>
        <address className="not-italic leading-7">
          {BUSINESS_INFO.backerLegalName}
          <br />
          {BUSINESS_INFO.backerAddressLine1},
          <br />
          {BUSINESS_INFO.backerAddressLine2},
          <br />
          {BUSINESS_INFO.backerCountry}.
        </address>
      </section>
    </LegalPage>
  );
}
