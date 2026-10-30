import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { HeroDashboardMockup } from '@/components/hero-dashboard-mockup'
import { FaqList } from '@/components/faq-list'
import { ContactSection } from '@/components/contact-section'
import { PartnersSection } from '@/components/partners-section'

// Lazy-load animated components below the fold
const ProblemSection = dynamic(() => import('@/components/problem-section').then((mod) => mod.ProblemSection))
const OrderWorkflow = dynamic(() => import('@/components/order-workflow'))
const WhoItsForSection = dynamic(() => import('@/components/who-its-for-section').then((mod) => mod.WhoItsForSection))
const WhatYouGetSection = dynamic(() => import('@/components/what-you-get-section').then((mod) => mod.WhatYouGetSection))
const SeeProductMockup = dynamic(() => import('@/components/see-product-mockup').then((mod) => mod.SeeProductMockup))
const PricingSectionView = dynamic(() => import('@/components/pricing-section-view').then((mod) => mod.PricingSectionView))

export const metadata: Metadata = {
  title: 'OrderPilot — Ordering Software for Pakistani Restaurants',
  description: 'Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'OrderPilot — Every order, on one screen.',
    description: 'Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.',
    url: '/',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot restaurant dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrderPilot — Every order, on one screen.',
    description: 'Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OrderPilot',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, WhatsApp',
  description: 'Multi-channel restaurant ordering software for WhatsApp, online web menus, and table QR ordering.',
  offers: [
    { '@type': 'Offer', name: 'WhatsApp Plan', price: '9999', priceCurrency: 'PKR', billingDuration: 'P1M' },
    { '@type': 'Offer', name: 'Web + Table Plan', price: '9999', priceCurrency: 'PKR', billingDuration: 'P1M' },
    { '@type': 'Offer', name: 'Complete Plan', price: '14999', priceCurrency: 'PKR', billingDuration: 'P1M' },
  ],
}

const faqs = [
  {
    question: 'How much does it cost?',
    answer: 'Plans start at PKR 9,999 a month. Complete, with everything included, is PKR 14,999. Or you can pay 10% to 15% of each order, depending on your usage. Message us on WhatsApp and we’ll tell you which one costs less for you.',
  },
  {
    question: 'Which plan should I pick?',
    answer: 'If customers order only on WhatsApp, or only through your web menu and table QR, the PKR 9,999 plans cover it. If you want all three ways to order, Complete costs less than buying both. If you’re just starting and your orders are low, pay per order may cost less. Tell us roughly how many orders you get and we’ll work it out with you.',
  },
  {
    question: 'What if my staff can’t use it?',
    answer: 'We show your team how it works before you start.',
  },
  {
    question: 'How do customers pay?',
    answer: 'You choose what to accept: cash on delivery, JazzCash, EasyPaisa or bank transfer. For transfers, the customer uploads a receipt and your manager approves it before the kitchen starts. Your customers pay you directly.',
  },
  {
    question: 'Can I use it for dine-in, takeaway and delivery?',
    answer: 'Yes. Table QR for dine-in, plus takeaway and delivery orders, all on one screen. For delivery you can set a fee by area. In the demo we’ll go through which ones suit your restaurant.',
  },
  {
    question: 'Do I keep my customer list?',
    answer: 'Yes. Your customers’ names, contact details and order history are in your account, and only your restaurant can see them.',
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
  const whatsappHeroUrl = "https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20OrderPilot%20with%20my%20restaurant%27s%20menu."

  return (
    <AppShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />

        {/* HERO */}
        <section className="hero-section">
          <div className="site-shell grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
            <div>
              <p className="eyebrow">ORDERING SOFTWARE FOR PAKISTANI RESTAURANTS</p>
              <h1 className="display mt-6">Every order, <span className="text-brand">on one screen.</span></h1>
              <p className="section-description mt-5 max-w-[640px] text-base sm:text-lg">
                Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book-demo" className="button-primary">Book a Demo <ArrowRight /></Link>
                <Link href={whatsappHeroUrl} className="button-secondary">Chat on WhatsApp</Link>
              </div>
              <p className="mt-4 text-sm font-medium text-ink/80">
                Plans from PKR 9,999 a month. We&apos;ll show it with your own menu. No pressure to decide.
              </p>
            </div>
            <HeroDashboardMockup />
          </div>
        </section>

        {/* LOGO STRIP */}
        <PartnersSection />

        {/* PROBLEM */}
        <ProblemSection />

        {/* REPLACE THE ORDERPILOT SOLUTION */}
        <section className="section-pad bg-white border-y border-forest/10 dark:bg-[#0c150f] dark:border-white/10">
          <div className="site-shell max-w-3xl">
            <h2 className="section-title">You don&apos;t have to change how customers order.</h2>
            <p className="section-description mt-5 max-w-[640px] text-base sm:text-lg">
              Your team already has a way of handling orders. We&apos;re not here to change your menu or your customers. We give every order one place to land, so it&apos;s written down where your whole team can see it.
            </p>
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
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">SEE THE PRODUCT</p>
              <h2 className="section-title">Take a look.</h2>
              <p className="section-description mt-4">This is the screen your team uses during service.</p>
            </header>
            <SeeProductMockup />
          </div>
        </section>

        {/* MID-PAGE CTA */}
        <section className="bg-forest py-16 sm:py-20 text-white">
          <div className="site-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-3xl sm:text-4xl font-bold">Want to see it with your own menu?</h3>
              <p className="mt-3 text-base sm:text-lg text-white/85">
                Tell us how orders reach you now. We&apos;ll show you how they would look on OrderPilot.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-demo" className="button-primary !bg-leaf !text-forest hover:!bg-white">
                Book a Demo
              </Link>
              <Link
                href={whatsappHeroUrl}
                className="button-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <PricingSectionView />

        {/* FAQ */}
        <section id="faq" className="section-pad scroll-mt-20 bg-cream dark:bg-[#0c150f]">
          <div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <header className="section-heading">
                <p className="eyebrow section-heading-eyebrow">FAQ</p>
                <h2 className="section-title">Questions.</h2>
                <p className="section-description mt-4">Quick answers about cost, plans and payment.</p>
              </header>
            </div>
            <div className="w-full">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <ContactSection />
      </main>
    </AppShell>
  )
}
