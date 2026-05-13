import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';

export const metadata: Metadata = {
  title: 'Cookie Policy - OrderPilot',
  description: 'Cookie Policy for OrderPilot.',
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="This policy explains how OrderPilot may use cookies and similar technologies on our website and product pages."
    >
      <section className="space-y-4">
        <h2>1. What cookies are</h2>
        <p>
          Cookies are small files stored on your device by a website. Similar technologies may
          include local storage, pixels, tags, and analytics identifiers.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. How we use cookies</h2>
        <p>OrderPilot may use cookies to:</p>
        <ul>
          <li>Keep the website and dashboard working correctly.</li>
          <li>Remember preferences and improve user experience.</li>
          <li>Measure website performance and understand page usage.</li>
          <li>Protect accounts and detect suspicious activity.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2>3. Third-party services</h2>
        <p>
          We may use trusted third-party services for hosting, analytics, product measurement, or
          embedded integrations. These providers may set their own cookies according to their
          policies.
        </p>
      </section>

      <section className="space-y-4">
        <h2>4. Managing cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. Blocking some cookies may
          affect website or dashboard functionality.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Contact</h2>
        <p>
          For questions about this Cookie Policy, contact{' '}
          <a className="text-primary hover:underline" href="mailto:hello@orderpilot.pk">
            hello@orderpilot.pk
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
