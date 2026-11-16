import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { DemoForm } from '@/components/demo-form'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'Book a Restaurant Ordering Demo',
  description:
    'See how WhatsApp, website and table QR orders reach one OrderPilot dashboard. Book a walkthrough and explore the right plan for your restaurant.',
  alternates: { canonical: '/book-demo' },
  openGraph: {
    title: 'Book a Restaurant Ordering Demo | OrderPilot',
    description:
      'See how WhatsApp, website and table QR orders reach one OrderPilot dashboard. Book a walkthrough and explore the right plan for your restaurant.',
    url: '/book-demo',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot demo walkthrough' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Restaurant Ordering Demo | OrderPilot',
    description:
      'See how WhatsApp, website and table QR orders reach one OrderPilot dashboard. Book a walkthrough and explore the right plan for your restaurant.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const faqs = [
  {
    question: 'What happens during the live demo walkthrough?',
    answer:
      'We walk your team through live order routing—from WhatsApp, table QR, and web menus to real-time kitchen board alerts using your actual menu items.',
  },
  {
    question: 'Can I start the 14-day free trial directly?',
    answer:
      'Yes. If you prefer to explore without a scheduled call, visit app.orderpilot.pk to create your account and begin your 14-day free trial immediately.',
  },
  {
    question: 'Can we discuss pricing options during the walkthrough?',
    answer:
      'Yes. We explain our fixed monthly plans (from PKR 5,999/mo) and our upcoming Pay As You Go model. Every option includes a 14-day free trial. Taxes excluded.',
  },
]

export default function BookDemoPage() {
  return (
    <AppShell>
      <main>
        <section className="section-pad">
          <div className="site-shell grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr]">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Live Demo Walkthrough</p>
              <h1 className="display mt-7">See how OrderPilot works for your restaurant.</h1>
              <p className="lede mt-7">
                Book a live demo walkthrough with our team. We&apos;ll show you how customer orders travel from WhatsApp, website, and table QR codes directly into your kitchen screen.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  'See a customer order from start to finish.',
                  'Explore the order and kitchen views.',
                  'Ask about setup, support, and pricing.',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 font-semibold">
                    <CheckCircle2 className="size-5 text-brand" />{item}
                  </li>
                ))}
              </ul>
              <figure className="image-frame mt-10">
                <Image
                  src="/assets/orderpilot_restaurant_dashboard_showcase.webp"
                  alt="OrderPilot restaurant dashboard and customer order flow"
                  width={1456}
                  height={1092}
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full"
                />
              </figure>
            </div>
            <Suspense fallback={<div className="panel min-h-[720px] dark:bg-[#121e15] dark:border-white/5" />}>
              <DemoForm />
            </Suspense>
          </div>
        </section>
        <section className="section-pad bg-mint/45 dark:bg-[#0c150f]">
          <div className="site-shell grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <h2 className="section-title">Before you book a live demo.</h2>
            <FaqList items={faqs} />
          </div>
        </section>
      </main>
    </AppShell>
  )
}
