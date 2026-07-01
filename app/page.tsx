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
import { Testimonials } from '@/components/landing/testimonials';
import { Roadmap } from '@/components/landing/roadmap';
import { FAQ } from '@/components/landing/faq';
import { FinalCTA } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
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
      <Testimonials />
      <Roadmap />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
