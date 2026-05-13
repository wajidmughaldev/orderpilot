import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy - OrderPilot',
  description: 'Privacy Policy for OrderPilot, a WhatsApp ordering platform for restaurants.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how OrderPilot collects, uses, stores, and protects information when restaurants and their customers use our WhatsApp ordering platform."
    >
      <section className="space-y-4">
        <h2>1. Who we are</h2>
        <p>
          OrderPilot provides WhatsApp-based ordering tools for restaurants. Restaurants use
          OrderPilot to manage menus, receive customer orders, connect WhatsApp Cloud API,
          and track order status from receipt to delivery.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. Information we collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Restaurant account information, including business name, address, contact number, owner name, and owner email.</li>
          <li>Menu and catalogue information, including categories, item names, prices, descriptions, and item images.</li>
          <li>WhatsApp integration information, including WhatsApp Business Account IDs, phone number IDs, catalogue IDs, webhook events, and access tokens stored securely on our backend.</li>
          <li>Customer order information, including customer phone number, customer name, delivery address, selected items, payment method, receipt image metadata, order status, and conversation session state.</li>
          <li>Technical information, including browser type, IP address, device information, API logs, error logs, and usage events needed to operate and secure the service.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>3. How we use information</h2>
        <p>We use information to:</p>
        <ul>
          <li>Provide WhatsApp ordering, menu, catalogue, order tracking, and dashboard features.</li>
          <li>Route WhatsApp webhook messages to the correct restaurant.</li>
          <li>Send automated customer replies and order status updates through WhatsApp Cloud API.</li>
          <li>Help restaurants manage incoming orders and customer communication.</li>
          <li>Improve reliability, security, support, and product performance.</li>
          <li>Comply with legal, platform, and Meta requirements.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>4. Meta and WhatsApp data</h2>
        <p>
          When a restaurant connects WhatsApp through Meta, OrderPilot may receive access to
          WhatsApp Business assets selected during Meta Embedded Signup or Facebook Login for
          Business. We use this access only to operate the restaurant ordering workflow, including
          message sending, webhook processing, catalogue support, and account configuration.
        </p>
        <p>
          OrderPilot does not sell WhatsApp customer data. We do not use customer messages for
          unrelated advertising.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Sharing of information</h2>
        <p>We may share information only when needed to provide or secure the service:</p>
        <ul>
          <li>With Meta/WhatsApp to send and receive WhatsApp messages.</li>
          <li>With hosting, database, storage, analytics, and infrastructure providers used to run OrderPilot.</li>
          <li>With a restaurant account owner or authorized staff for their own restaurant data.</li>
          <li>When required by law, regulation, legal process, or platform compliance.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>6. Data storage and security</h2>
        <p>
          We use reasonable technical and organizational safeguards to protect data. Sensitive
          integration values such as access tokens are stored encrypted where supported by the
          application backend. No internet service can guarantee complete security, but we work to
          reduce risk and restrict access to operational needs.
        </p>
      </section>

      <section className="space-y-4">
        <h2>7. Data retention</h2>
        <p>
          We retain restaurant, order, WhatsApp log, and account data for as long as needed to
          operate the service, provide support, comply with legal obligations, resolve disputes,
          and maintain audit history. Restaurants may request deletion as described in our Data
          Deletion page.
        </p>
      </section>

      <section className="space-y-4">
        <h2>8. Your choices</h2>
        <ul>
          <li>Restaurants may request account export, correction, disconnection, or deletion.</li>
          <li>Restaurants may disconnect Meta/WhatsApp access from Meta Business settings.</li>
          <li>Customers may contact the restaurant directly to request order data correction or deletion.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>9. Contact</h2>
        <p>
          For privacy questions or deletion requests, contact us at{' '}
          <a className="text-primary hover:underline" href="mailto:hello@orderpilot.pk">
            hello@orderpilot.pk
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
