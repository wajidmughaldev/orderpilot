import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { BUSINESS_INFO, LEGAL_OPERATOR_LINE } from '@/lib/business-info';

export const metadata: Metadata = {
  title: 'About Us | OrderPilot.pk',
  description: 'Learn about OrderPilot.pk, a restaurant ordering automation product operated by Digipex Solutions LLC.',
};

export default function AboutPage() {
  return (
    <LegalPage
      title="About Us"
      description="OrderPilot.pk helps restaurants receive and manage WhatsApp-based orders with a simple dashboard and ordering workflow."
    >
      <section className="space-y-4">
        <h2>OrderPilot.pk</h2>
        <p>
          OrderPilot.pk is built for restaurants in Pakistan that want a simpler way to manage
          customer orders through WhatsApp. The product helps restaurants organize menus, receive
          customer messages, track order status, and keep ordering workflows easier to manage.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Company Information</h2>
        <p>
          {LEGAL_OPERATOR_LINE}
        </p>
        <p>
          {BUSINESS_INFO.legalName} is responsible for the operation, management, and business
          administration of {BUSINESS_INFO.productName}.
        </p>
        <div>
          <h3>Registered Address:</h3>
          <address className="not-italic leading-7">
            {BUSINESS_INFO.registeredAddressLine1},
            <br />
            {BUSINESS_INFO.registeredAddressLine2},
            <br />
            {BUSINESS_INFO.registeredCountry}.
          </address>
        </div>
        <div>
          <h3>Business Contact:</h3>
          <a className="text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
            {BUSINESS_INFO.email}
          </a>
        </div>
      </section>
    </LegalPage>
  );
}
