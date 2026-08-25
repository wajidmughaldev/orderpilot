import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Problem } from '@/components/landing/problem';
import { Solution } from '@/components/landing/solution';
import { NativeCatalog } from '@/components/landing/native-catalog';
import { FastCheckout } from '@/components/landing/fast-checkout';
import { Features } from '@/components/landing/features';
import { RestaurantTypes } from '@/components/landing/restaurant-types';
import { DashboardPreview } from '@/components/landing/dashboard-preview';
import { Pricing } from '@/components/landing/pricing';
import { AboutSection } from '@/components/landing/about';
import { BackedByDigipex } from '@/components/landing/backed-by-digipex';
import { TeamSection } from '@/components/landing/team';
import { Testimonials } from '@/components/landing/testimonials';
import { Roadmap } from '@/components/landing/roadmap';
import { FAQ } from '@/components/landing/faq';
import { ContactSection } from '@/components/landing/contact-section';
import { FinalCTA } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'OrderPilot',
      'url': 'https://orderpilot.pk/',
      'logo': 'https://orderpilot.pk/logo.png',
      'description': 'OrderPilot is an AI-powered SaaS platform that helps restaurants manage ordering through WhatsApp.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'OrderPilot',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Web',
      'url': 'https://orderpilot.pk/',
      'description': 'AI-powered WhatsApp ordering and restaurant order management software.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Abdul Wajid Khan',
      'jobTitle': 'Founder & CEO',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Muhammad Ebad Khan',
      'jobTitle': 'Co-Founder & COO',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Muhammad Hunain Memon',
      'jobTitle': 'CTO',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden">
        <Header />
        <Hero />
        <Problem />
        <Solution />
        <NativeCatalog />
        <FastCheckout />
        <Features />
        <RestaurantTypes />
        <DashboardPreview />
        <Pricing />
        <AboutSection />
        <BackedByDigipex />
        <TeamSection />
        <Testimonials />
        <Roadmap />
        <FAQ />
        <ContactSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
