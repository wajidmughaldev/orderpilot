import type { Metadata } from 'next';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { ContactSection } from '@/components/landing/contact-section';

export const metadata: Metadata = {
  title: 'Contact OrderPilot',
  description: 'Get in touch with OrderPilot for general enquiries, restaurant onboarding, and business partnerships.',
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-background">
      <Header />
      
      {/* Visual spacer for fixed header */}
      <div className="h-16 md:h-20" />
      
      <div className="py-8">
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
