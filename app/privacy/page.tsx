import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { BUSINESS_INFO } from '@/lib/business-info';

export const metadata: Metadata = {
  title: 'Privacy Policy — OrderPilot',
  description: 'Privacy Policy for OrderPilot, built by the OrderPilot team and backed by Digipex Solutions.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`This policy explains how OrderPilot, built by the OrderPilot team and backed by ${BUSINESS_INFO.backerName}, handles information for restaurants, customers, and users.`}
    >
      <section className="space-y-4">
        <p>
          <strong>Effective date:</strong> May 22, 2026
        </p>
        <p>
          This Privacy Policy explains how OrderPilot, built by the OrderPilot team and backed by {BUSINESS_INFO.backerName},
          collects, uses, stores, and protects information when restaurants, customers, or users
          interact with our website, WhatsApp ordering system, dashboard, or related services.
        </p>
      </section>

      <section className="space-y-4">
        <h2>1. Backer & Operational Information</h2>
        <p>
          OrderPilot is built by the OrderPilot team and backed by {BUSINESS_INFO.backerName}, which provides technical, operational, and business management support.
        </p>
        <p>
          <strong>Backing Entity:</strong>
          <br />
          {BUSINESS_INFO.backerLegalName}
        </p>
        <p>
          <strong>Registered Address:</strong>
          <br />
          {BUSINESS_INFO.backerAddressLine1},
          <br />
          {BUSINESS_INFO.backerAddressLine2},
          <br />
          {BUSINESS_INFO.backerCountry}
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
        <h2>2. Information We Collect</h2>
        <p>We may collect information needed to provide and support OrderPilot, including:</p>
        <ul>
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
        <h2>3. How We Use Information</h2>
        <p>We use information to:</p>
        <ul>
          <li>Provide WhatsApp ordering, menu, catalog, order tracking, and dashboard features.</li>
          <li>Route WhatsApp messages and order events to the correct restaurant.</li>
          <li>Send automated customer replies and order status updates through WhatsApp.</li>
          <li>Help restaurants manage incoming orders and customer communication.</li>
          <li>Improve reliability, security, support, and product performance.</li>
          <li>Comply with legal, platform, and Meta requirements.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>4. WhatsApp and Meta Services</h2>
        <p>
          OrderPilot may use WhatsApp Business Platform and related Meta services to help
          restaurants receive and manage customer orders. Messages sent through WhatsApp may be
          processed according to WhatsApp&apos;s and Meta&apos;s applicable terms and privacy
          policies.
        </p>
        <p>
          When a restaurant connects WhatsApp through Meta, OrderPilot may receive access to
          WhatsApp Business assets selected during Meta Embedded Signup or Facebook Login for
          Business. We use this access only to operate the restaurant ordering workflow, including
          message sending, webhook processing, catalog support, and account configuration.
        </p>
        <p>
          We do not sell WhatsApp customer data, and we do not use customer messages for unrelated
          advertising.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Sharing of Information</h2>
        <p>We may share information only when needed to provide or secure the service:</p>
        <ul>
          <li>With Meta/WhatsApp to send and receive WhatsApp messages.</li>
          <li>With hosting, database, storage, analytics, and infrastructure providers used to run OrderPilot.</li>
          <li>With a restaurant account owner or authorized staff for their own restaurant data.</li>
          <li>When required by law, regulation, legal process, or platform compliance.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>6. Data Storage and Security</h2>
        <p>
          We use reasonable technical and organizational safeguards to protect data. Sensitive
          integration values such as access tokens are stored securely where supported by the
          application backend. No internet service can guarantee complete security, but we work to
          reduce risk and restrict access to operational needs.
        </p>
      </section>

      <section className="space-y-4">
        <h2>7. Data Retention</h2>
        <p>
          We retain restaurant, order, WhatsApp log, and account data for as long as needed to
          operate the service, provide support, comply with legal obligations, resolve disputes,
          prevent fraud, and maintain audit history.
        </p>
      </section>

      <section className="space-y-4">
        <h2>8. Data Deletion Requests</h2>
        <p>
          Restaurants or users may request deletion of their data by contacting{' '}
          <a className="text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
            {BUSINESS_INFO.email}
          </a>
          . Requests should include the business name, registered phone number, and details of the
          data they want deleted.
        </p>
      </section>

      <section className="space-y-4">
        <h2>9. Your Choices</h2>
        <ul>
          <li>Restaurants may request account export, correction, disconnection, or deletion.</li>
          <li>Restaurants may disconnect Meta/WhatsApp access from Meta Business Settings or Business Integrations.</li>
          <li>Customers may contact the restaurant directly to request order data correction or deletion.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>10. Contact</h2>
        <p>
          For privacy questions or deletion requests, contact{' '}
          <a className="text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
            {BUSINESS_INFO.email}
          </a>
          . {BUSINESS_INFO.backerLegalName} handles OrderPilot privacy and data deletion requests.
        </p>
      </section>
    </LegalPage>
  );
}
