'use client'

import { useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { trackEvent } from '@/lib/track'

const interests = ['WhatsApp ordering', 'Online ordering', 'QR/table ordering', 'Pricing', 'Not sure yet']
const billingMap: Record<string, string> = {
  monthly: 'Monthly',
  'pay-per-order': 'Pay-per-Order',
  'pay-as-you-go': 'Pay-per-Order',
  payasyougo: 'Pay-per-Order',
  pricing: 'Help me decide',
}

export function DemoForm() {
  const params = useSearchParams()
  const initialBilling = billingMap[params.get('interest') || ''] || ''

  // Normalize intent: 'trial' / 'free-trial' -> 'free-trial', otherwise default to 'demo'
  const rawIntent = (params.get('intent') || '').trim().toLowerCase()
  const isTrial = rawIntent === 'trial' || rawIntent === 'free-trial' || rawIntent === 'freetrial'
  const normalizedIntent: 'free-trial' | 'demo' = isTrial ? 'free-trial' : 'demo'

  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    data.interests = formData.getAll('interests').join(', ')
    data.source = 'book-demo'
    data.intent = normalizedIntent

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Your request could not be sent.')
      setStatus('success')
      const defaultSuccess = isTrial
        ? 'Your 14-day free trial request was received. Our team will contact you to arrange setup and activate your account.'
        : 'Your request was sent. Our team will get in touch to agree the next step.'
      setMessage(result.message || defaultSuccess)
      form.reset()
      trackEvent('demo_form_submit_success', { intent: normalizedIntent })
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Your request could not be sent. Please try again.')
    }
  }

  return (
    <form
      onSubmit={submit}
      className="panel p-6 sm:p-9 dark:bg-[#121e15] dark:border-white/5 dark:text-white"
      noValidate={false}
    >
      <input type="hidden" name="intent" value={normalizedIntent} />

      {/* Direct Trial Alternative Callout */}
      <div className="mb-6 rounded-2xl border border-forest/15 bg-mint/35 p-4 text-center text-xs sm:text-sm font-medium dark:border-white/10 dark:bg-white/[0.04]">
        <span className="text-ink/80 dark:text-white/80">Want to start your 14-day free trial right now without waiting for a demo? </span>
        <a
          href="https://app.orderpilot.pk"
          className="font-bold text-brand dark:text-leaf underline underline-offset-4 hover:text-forest whitespace-nowrap"
        >
          Sign in &amp; start trial directly →
        </a>
      </div>

      <div>
        <h2 className="text-3xl font-bold">
          Book a Live Demo
        </h2>
        <p className="mt-2 text-ink/55 dark:text-white/60">
          Share a few details and our team will get in touch to schedule a live walkthrough showing how OrderPilot works for your restaurant.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required>
          <input className="form-control" name="name" autoComplete="name" required maxLength={80} />
        </Field>
        <Field label="Restaurant name" required>
          <input className="form-control" name="restaurant" autoComplete="organization" required maxLength={100} />
        </Field>
        <Field label="WhatsApp / phone number" required>
          <input
            className="form-control"
            name="phone"
            type="tel"
            defaultValue="+92 "
            autoComplete="tel"
            required
            pattern="^\+?[0-9 ()-]{7,20}$"
            aria-describedby="phone-help"
          />
          <span id="phone-help" className="text-xs text-ink/70 dark:text-white/60">
            Pakistan +92 or an international number.
          </span>
        </Field>
        <Field label="City" required>
          <input className="form-control" name="city" autoComplete="address-level2" required maxLength={80} />
        </Field>
        <Field label="Restaurant type">
          <select className="form-control" name="type" defaultValue="">
            <option value="">Select one</option>
            <option>Restaurant</option>
            <option>Fast food / takeaway</option>
            <option>Cafe / bakery</option>
            <option>Cloud kitchen</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Rough daily order volume">
          <select className="form-control" name="volume" defaultValue="">
            <option value="">Select one</option>
            <option>Under 10</option>
            <option>10–30</option>
            <option>31–100</option>
            <option>100+</option>
            <option>Prefer not to say</option>
          </select>
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-bold">What are you interested in?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {interests.map((item) => (
              <label
                key={item}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-forest/10 bg-cream px-4 py-2.5 text-sm dark:border-white/5 dark:bg-[#16271a] dark:text-white"
              >
                <input type="checkbox" name="interests" value={item} className="size-4 accent-brand" />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Billing option">
          <select className="form-control" name="billing" defaultValue={initialBilling}>
            <option value="">Select one</option>
            <option value="Monthly">Monthly subscription (from PKR 5,999)</option>
            <option value="Pay-per-Order">Pay-as-you-go / Pay-per-Order (8%–10%)</option>
            <option value="Help me decide">Help me decide</option>
          </select>
        </Field>
        <Field label="Current POS (optional)">
          <input
            className="form-control"
            name="pos"
            placeholder="POS name, or None"
            maxLength={100}
          />
        </Field>
        <Field label="What’s your biggest challenge?" wide>
          <textarea className="form-control min-h-28 resize-y" name="challenge" maxLength={400} />
        </Field>
        <div className="sr-only" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <p className="mt-6 text-xs leading-5 text-ink/70 dark:text-white/60">
        We&apos;ll use your details only to respond to your request.
      </p>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-xl p-4 text-sm ${status === 'success' ? 'bg-mint text-forest' : 'bg-red-50 text-red-800'}`}
        >
          {message}
        </div>
      )}

      <button className="button-primary mt-6 w-full justify-center" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <LoaderCircle className="animate-spin" /> Scheduling walkthrough...
          </>
        ) : (
          <>
            Book a Live Demo <ArrowRight />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-ink/70 dark:text-white/60">
        This sends a live demo request. Our team will contact you to schedule a walkthrough showing how our system works for your restaurant.
      </p>
    </form>
  )
}

function Field({
  label,
  required = false,
  wide = false,
  children,
}: {
  label: string
  required?: boolean
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <label className={`flex flex-col gap-2 text-sm font-bold ${wide ? 'sm:col-span-2' : ''}`}>
      {label}
      {required && <span className="sr-only"> required</span>}
      {children}
    </label>
  )
}
