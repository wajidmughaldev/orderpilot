import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { CinematicHero } from '@/components/cinematic-hero'
import { FaqList } from '@/components/faq-list'
import { ContactSection } from '@/components/contact-section'
import { PartnersSection } from '@/components/partners-section'
import { ScrollReveal } from '@/components/scroll-reveal'

// Lazy-load animated components below the fold
const ProblemSection = dynamic(() => import('@/components/problem-section').then((mod) => mod.ProblemSection))
const OrderWorkflow = dynamic(() => import('@/components/order-workflow'))
const WhoItsForSection = dynamic(() => import('@/components/who-its-for-section').then((mod) => mod.WhoItsForSection))
const WhatYouGetSection = dynamic(() => import('@/components/what-you-get-section').then((mod) => mod.WhatYouGetSection))
const SeeProductMockup = dynamic(() => import('@/components/see-product-mockup').then((mod) => mod.SeeProductMockup))
const PricingSectionView = dynamic(() => import('@/components/pricing-section-view').then((mod) => mod.PricingSectionView))

export const metadata: Metadata = {
  title: {
    absolute: 'Restaurant Ordering Software for Pakistan | OrderPilot',
  },
  description:
    'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Restaurant Ordering Software for Pakistan | OrderPilot',
    description:
      'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.',
    url: '/',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot restaurant dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Ordering Software for Pakistan | OrderPilot',
    description:
      'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OrderPilot',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, WhatsApp',
  url: 'https://www.orderpilot.pk',
  description: 'Multi-channel restaurant ordering software for WhatsApp, online web menus, and table QR ordering.',
  offers: [
    { '@type': 'Offer', name: 'WhatsApp Plan', price: '5999', priceCurrency: 'PKR', billingDuration: 'P1M', url: 'https://www.orderpilot.pk/pricing', description: 'Includes 14-day free trial, up to 1,000 orders/month. One-time PKR 5,000 setup fee applies if you continue. Prices exclude applicable taxes.' },
    { '@type': 'Offer', name: 'Web + Table Plan', price: '7999', priceCurrency: 'PKR', billingDuration: 'P1M', url: 'https://www.orderpilot.pk/pricing', description: 'Includes 14-day free trial, up to 1,000 orders/month. One-time PKR 5,000 setup fee applies if you continue. Prices exclude applicable taxes.' },
    { '@type': 'Offer', name: 'Complete Plan', price: '12999', priceCurrency: 'PKR', billingDuration: 'P1M', url: 'https://www.orderpilot.pk/pricing', description: 'Includes 14-day free trial, up to 1,000 orders/month. One-time PKR 5,000 setup fee applies if you continue. Prices exclude applicable taxes.' },
  ],
}

const faqs = [
  {
    question: 'How much does it cost?',
    answer: 'Subscriptions start at PKR 5,999 a month, or Complete with all channels is PKR 12,999. You can also pay 8% to 10% per order with no fixed monthly fee. Message us on WhatsApp and we’ll tell you which one costs less for you.',
  },
  {
    question: 'Which plan should I pick?',
    answer: 'If customers only order on WhatsApp, PKR 5,999 covers it. For website and table QR, Web + Table is PKR 7,999. If you want all three, Complete is PKR 12,999. If your order volume is lower or seasonal, pay per order may cost less.',
  },
  {
    question: 'What if my staff can’t use it?',
    answer: 'The interface is simple. We walk your team through receiving orders, updating statuses, and verifying payments before you start.',
  },
  {
    question: 'How do customers pay?',
    answer: 'You choose what to accept: cash on delivery, JazzCash, EasyPaisa or bank transfer. For transfers, customers upload a receipt and your manager approves it before cooking starts. Your customers pay you directly.',
  },
  {
    question: 'Can I use it for dine-in, takeaway and delivery?',
    answer: 'Yes. Table QR for dine-in, plus takeaway and delivery orders, all on one screen. For delivery you can set custom fees by area.',
  },
  {
    question: 'Do I keep my customer list?',
    answer: 'Yes. Your customers’ contact details and order history are in your account, visible only to your restaurant.',
  },
]

// Maintained in codebase per build note:
const hiddenFaqs = [
  'setup time',
  'existing WhatsApp number',
  'cancellation',
  'what to install',
  'customer app download',
  'branding',
]
void hiddenFaqs

export default function HomePage() {
  const whatsappHeroUrl = "https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20how%20OrderPilot%20could%20work%20for%20my%20restaurant."

  return (
    <AppShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />

        {/* HERO (Primary CTA: /book-demo?intent=trial) */}
        <CinematicHero whatsappHeroUrl={whatsappHeroUrl} />

        {/* LOGO STRIP */}
        <PartnersSection />

        {/* PROBLEM */}
        <ProblemSection />

        {/* REASSURANCE: REPLACE THE ORDERPILOT SOLUTION */}
        <section className="section-pad bg-white border-y border-forest/10 dark:bg-[#0c150f] dark:border-white/5">
          <div className="site-shell site-shell-800">
            <ScrollReveal className="mx-auto max-w-3xl text-center flex flex-col items-center">
              <h2 className="section-title text-balance">You don&apos;t have to change how customers order.</h2>
              <p className="section-description mt-5 max-w-[640px] text-base sm:text-lg text-balance mx-auto">
                They keep using WhatsApp, your website or table QR codes with no app to download. OrderPilot collects those orders in one view for your team.
              </p>
              <p className="mt-6 text-sm font-semibold text-brand dark:text-leaf text-balance">
                Curious how orders travel from customer to kitchen?{' '}
                <a href="#how" className="underline underline-offset-4 hover:text-forest dark:hover:text-mint">
                  See the 4-step workflow below ↓
                </a>
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section-pad scroll-mt-20 bg-white dark:bg-[#0b140d]">
          <div className="site-shell">
            <OrderWorkflow />
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <WhoItsForSection />

        {/* WHAT YOU GET */}
        <WhatYouGetSection />

        {/* SEE THE PRODUCT */}
        <section id="product" className="section-pad scroll-mt-20 bg-white dark:bg-[#0b140d]">
          <div className="site-shell site-shell-wide">
            <ScrollReveal>
              <header className="section-heading-centered mb-12">
                <p className="eyebrow section-heading-eyebrow">SEE THE PRODUCT</p>
                <h2 className="section-title">Your kitchen board, up close.</h2>
                <p className="section-description mt-4">See how your team can follow orders from New to Ready.</p>
              </header>
            </ScrollReveal>
            <SeeProductMockup />
          </div>
        </section>

        {/* MID-PAGE CTA */}
        <section className="bg-forest py-16 sm:py-20 text-white">
          <ScrollReveal className="site-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-3xl sm:text-4xl font-bold">Want to see OrderPilot with your own menu?</h3>
              <p className="mt-3 text-base sm:text-lg text-white/85">
                Tell us how orders reach you now. We&apos;ll show you how they look on OrderPilot.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-demo" className="button-primary !bg-leaf !text-forest hover:!bg-white">
                Book a Live Demo
              </Link>
              <Link
                href={whatsappHeroUrl}
                className="button-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* PRICING */}
        <PricingSectionView />

                {/* FAQ */}
        <section id="faq" className="section-pad scroll-mt-20 bg-cream dark:bg-[#0c150f]">
          <div className="site-shell site-shell-800">
            <ScrollReveal>
              <header className="section-heading-centered mb-12 sm:mb-16">
                <p className="eyebrow section-heading-eyebrow">FAQ</p>
                <h2 className="section-title">Good questions. Clear answers.</h2>
                <p className="section-description mt-4">Quick answers about cost, plans and payment.</p>
              </header>
            </ScrollReveal>

            <div className="mx-auto max-w-3xl w-full">
              <ScrollReveal delay={0.1}>
                <FaqList items={faqs} />
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="mt-12 rounded-2xl border border-forest/10 bg-white/70 p-6 sm:p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-base font-bold text-ink dark:text-white">Still have questions?</p>
                  <p className="mt-2 text-sm text-ink/75 dark:text-white/75 max-w-md mx-auto">
                    Message us on WhatsApp and we’ll answer them for your specific restaurant setup.
                  </p>
                  <a
                    href={whatsappHeroUrl}
                    className="button-secondary mt-5 inline-flex !border-forest/20 text-sm"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <ContactSection />
      </main>
    </AppShell>
  )
}
