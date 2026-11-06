import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { DemoForm } from '@/components/demo-form'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'Book a Live Demo — Walkthrough for Your Restaurant',
  description:
    'Request a guided OrderPilot demo for your restaurant. Explore WhatsApp and Table QR ordering, kitchen dashboards, the 14-day free trial available on all plans (monthly subscriptions from PKR 5,999/mo up to 1,000 orders/mo, or flexible 8%–10% pay-per-order). One-time PKR 5,000 setup fee applies only if you continue on a paid plan. Prices exclude applicable taxes.',
  alternates: { canonical: '/book-demo' },
  openGraph: {
    title: 'Book a Live Demo — Walkthrough for Your Restaurant',
    description:
      'Explore WhatsApp, Web, and Table QR ordering, the kitchen board, and pricing options with our team.',
    url: '/book-demo',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot demo walkthrough' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request an OrderPilot Demo — Walkthrough for Your Restaurant',
    description:
      'Explore WhatsApp, Web, and Table QR ordering, the kitchen board, and pricing options with our team.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const faqs = [
  { question: 'What is this live demo walkthrough?', answer: 'It is a personalized live demo where our team walks you through how OrderPilot works in real time—from WhatsApp, web menu, and table QR ordering to live kitchen board alerts.' },
  { question: 'How do I start the 14-day free trial directly?', answer: 'If you do not need a walkthrough and want to start immediately, you can go straight to the app at app.orderpilot.pk to sign in and begin your 14-day free trial.' },
  { question: 'Can we discuss pricing during the live demo?', answer: 'Yes! A 14-day free trial is available on all plans. During the live demo, we can explain both monthly subscription plans (from PKR 5,999/mo, up to 1,000 orders/mo) and the 8% to 10% pay-per-order model. The one-time PKR 5,000 setup fee applies only if you continue on a paid plan after your trial. All prices exclude applicable taxes.' },
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
