'use client'

import { useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { trackEvent } from '@/lib/track'

const interests = ['WhatsApp ordering','Online ordering','QR/table ordering','Pricing','Not sure yet']
const billingMap: Record<string,string> = { monthly: 'Monthly', 'pay-per-order': 'Pay-per-Order', pricing: 'Help me decide' }

export function DemoForm() {
  const params = useSearchParams()
  const initialBilling = billingMap[params.get('interest') || ''] || ''
  const [status, setStatus] = useState<'idle'|'loading'|'error'|'success'>('idle')
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
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Your request could not be sent.')
      setStatus('success')
      setMessage(result.message || 'Your request was sent. Our team will get in touch to agree the next step.')
      form.reset()
      trackEvent('demo_form_submit_success')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Your request could not be sent. Please try again.')
    }
  }

  return <form onSubmit={submit} className="panel p-6 sm:p-9 dark:bg-[#121e15] dark:border-white/10 dark:text-white" noValidate={false}><div><h2 className="text-3xl font-bold">Request a demo</h2><p className="mt-2 text-ink/55">Share a few details so we can understand your restaurant.</p></div><div className="mt-8 grid gap-5 sm:grid-cols-2">
    <Field label="Your name" required><input className="form-control" name="name" autoComplete="name" required maxLength={80} /></Field>
    <Field label="Restaurant name" required><input className="form-control" name="restaurant" autoComplete="organization" required maxLength={100} /></Field>
    <Field label="WhatsApp / phone number" required><input className="form-control" name="phone" type="tel" defaultValue="+92 " autoComplete="tel" required pattern="^\+?[0-9 ()-]{7,20}$" aria-describedby="phone-help" /><span id="phone-help" className="text-xs text-ink/70">Pakistan +92 or an international number.</span></Field>
    <Field label="City" required><input className="form-control" name="city" autoComplete="address-level2" required maxLength={80} /></Field>
    <Field label="Restaurant type"><select className="form-control" name="type" defaultValue=""><option value="">Select one</option><option>Restaurant</option><option>Fast food / takeaway</option><option>Cafe / bakery</option><option>Cloud kitchen</option><option>Other</option></select></Field>
    <Field label="Rough daily order volume"><select className="form-control" name="volume" defaultValue=""><option value="">Select one</option><option>Under 10</option><option>10–30</option><option>31–100</option><option>100+</option><option>Prefer not to say</option></select></Field>
    <fieldset className="sm:col-span-2"><legend className="text-sm font-bold">What are you interested in?</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{interests.map(item => <label key={item} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-forest/10 bg-cream px-4 py-2.5 text-sm dark:border-white/10 dark:bg-[#16271a] dark:text-white"><input type="checkbox" name="interests" value={item} className="size-4 accent-brand" />{item}</label>)}</div></fieldset>
    <Field label="Billing option"><select className="form-control" name="billing" defaultValue={initialBilling}><option value="">Select one</option><option>Monthly</option><option>Pay-per-Order</option><option>Help me decide</option></select></Field>
    <Field label="What’s your biggest challenge?" wide><textarea className="form-control min-h-28 resize-y" name="challenge" maxLength={400} /></Field>
    <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
  </div><p className="mt-6 text-xs leading-5 text-ink/70">We&apos;ll use your details only to respond to your request.</p>{message && <div role="status" aria-live="polite" className={`mt-5 rounded-xl p-4 text-sm ${status === 'success' ? 'bg-mint text-forest' : 'bg-red-50 text-red-800'}`}>{message}</div>}<button className="button-primary mt-6 w-full justify-center" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="animate-spin" /> Sending request</> : <>Request My Demo <ArrowRight /></>}</button><p className="mt-4 text-center text-xs text-ink/70">This sends a demo request. Our team will contact you to arrange the next step.</p></form>
}
function Field({ label, required=false, wide=false, children }: { label:string; required?:boolean; wide?:boolean; children:React.ReactNode }) { return <label className={`flex flex-col gap-2 text-sm font-bold ${wide ? 'sm:col-span-2' : ''}`}>{label}{required && <span className="sr-only"> required</span>}{children}</label> }
