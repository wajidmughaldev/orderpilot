import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Talk with OrderPilot about pricing for your restaurant.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <AppShell>
      <main>
        <section className="section-pad bg-mint/55">
          <div className="site-shell">
            <p className="eyebrow">Pricing</p>
            <h1 className="display mt-7 max-w-4xl">Pricing shared on a short call.</h1>
            <p className="lede mt-7 max-w-2xl">
              Tell us how your restaurant handles orders and we&apos;ll explain the available terms before you decide.
            </p>
            <Link href="https://wa.me/923361815141" className="button-primary mt-9">
              <MessageCircle className="size-5" aria-hidden="true" />
              Chat on WhatsApp
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
