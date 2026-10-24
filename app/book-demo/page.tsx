import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { DemoForm } from '@/components/demo-form'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = { title: 'Book a Demo', description: 'Request a guided OrderPilot demo for your restaurant.', alternates: { canonical: '/book-demo' } }
const faqs = [
  { question: 'What happens after I request a demo?', answer: 'Our team follows up to agree the next step. Sending this form does not confirm a meeting time.' },
  { question: 'Do I need to prepare anything?', answer: 'No. Restaurant and menu details can be helpful, but they are not required for the first conversation.' },
  { question: 'Can we discuss pricing?', answer: 'Yes. We can explain both the monthly and pay-per-order billing models.' },
]

export default function BookDemoPage() { return <AppShell><main>
  <section className="section-pad"><div className="site-shell grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr]">
    <div className="lg:sticky lg:top-28"><p className="eyebrow">Let&apos;s talk about your restaurant</p><h1 className="display mt-7">See how OrderPilot could work for you.</h1><p className="lede mt-7">Tell us a little about your restaurant and what you&apos;d like to improve. We&apos;ll show you the ordering experience, the restaurant dashboard, and the available pricing options.</p><ul className="mt-8 flex flex-col gap-4">{['See a customer order from start to finish.','Explore the order and kitchen views.','Ask about setup, support, and pricing.'].map(item => <li key={item} className="flex items-center gap-3 font-semibold"><CheckCircle2 className="size-5 text-brand" />{item}</li>)}</ul><figure className="image-frame mt-10"><Image src="/assets/orderpilot_restaurant_dashboard_showcase.png" alt="Illustrative OrderPilot restaurant dashboard and customer order flow" width={1456} height={1092} className="h-auto w-full" /><figcaption className="px-4 py-3 font-mono text-xs text-ink/45">Example workflow · concept artwork</figcaption></figure></div>
    <Suspense fallback={<div className="panel min-h-[720px]" />}><DemoForm /></Suspense>
  </div></section>
  <section className="section-pad bg-mint/45"><div className="site-shell grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><h2 className="section-title">Before you request a demo.</h2><FaqList items={faqs} /></div></section>
</main></AppShell> }
