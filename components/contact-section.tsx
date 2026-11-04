'use client'

import { FormEvent, useRef, useState } from 'react'
import { Clock3, LoaderCircle, Mail, Phone } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { trackEvent } from '@/lib/track'

const whatsappUrl = 'https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20how%20OrderPilot%20could%20work%20for%20my%20restaurant.'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '0px' })
  const prefersReduced = useReducedMotion()

  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    const form = event.currentTarget
    if (!form.reportValidity()) return

    setStatus('loading')
    setMessage('')

    const formData = new FormData(form)
    const payload = {
      source: 'homepage',
      name: formData.get('name'),
      phone: formData.get('phone'),
      restaurant: formData.get('restaurant'),
      city: formData.get('city'),
      message: formData.get('message'),
      website: formData.get('website'),
    }

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Your request could not be sent.')
      }
      setStatus('success')
      setMessage(result.message || 'Your request has been sent. Our team will contact you to arrange your demo.')
      form.reset()
      trackEvent('demo_form_submit_success')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Your request could not be sent. Please try again.')
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="section-pad scroll-mt-20 bg-forest dark:bg-[#07260c] text-white">
      <div className="site-shell site-shell-1280 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.05 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow !text-leaf">TALK TO US</p>
          <h2 className="section-title mt-5">Let&apos;s talk about your restaurant.</h2>
          <p className="mt-4 text-lg font-medium leading-8 text-white/95">Here&apos;s what happens next:</p>
          <ol className="mt-5 space-y-3.5 text-base sm:text-lg font-semibold text-white">
            <li>1. You tell us how orders reach you today.</li>
            <li>2. We set up your menu and your screen.</li>
            <li>3. We show your team how to use it, then you go live.</li>
          </ol>
          <motion.a
            href={whatsappUrl}
            animate={isInView && !prefersReduced ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="button-primary mt-7 !bg-leaf !text-forest inline-flex"
          >
            Chat on WhatsApp
          </motion.a>
          <div className="mt-10 grid gap-5">
            <ContactDetail icon={Phone} label="WhatsApp" value="+92 336 1815141" href="https://wa.me/923361815141" />
            <ContactDetail icon={Mail} label="Email" value="contact@orderpilot.pk" href="mailto:contact@orderpilot.pk" />
            <ContactDetail icon={Clock3} label="Hours" value="Monday to Friday, 9:00 AM to 6:00 PM PKT" />
          </div>
        </motion.div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.05 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        >
          <form className="grid gap-5 rounded-[2rem] bg-white p-7 text-ink sm:grid-cols-2 sm:p-9 dark:bg-[#121e15] dark:border dark:border-white/5 dark:text-white" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-bold sm:col-span-2">Request a demo</h3>
            <Field label="Name" name="name" placeholder="Your name" autoComplete="name" required maxLength={80} />
            <Field label="Phone / WhatsApp" name="phone" type="tel" placeholder="+92 300 0000000" autoComplete="tel" required pattern="^\+?[0-9 ()-]{7,20}$" aria-describedby="contact-phone-help" />
            <span id="contact-phone-help" className="sr-only">Pakistan +92 or an international number.</span>
            <Field label="Restaurant name" name="restaurant" placeholder="Your restaurant" autoComplete="organization" required maxLength={100} />
            <Field label="City (optional)" name="city" placeholder="Lahore" autoComplete="address-level2" maxLength={80} />
            <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold">How do orders reach you today?</span><textarea className="form-control min-h-32 resize-y" name="message" placeholder="WhatsApp, calls, notebook..." maxLength={600} /></label>
            <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            {message && <div role="status" aria-live="polite" className={`rounded-xl p-4 text-sm sm:col-span-2 ${status === 'success' ? 'bg-mint text-forest' : 'bg-red-50 text-red-800'}`}>{message}</div>}
            <button type="submit" className="button-primary justify-center sm:col-span-2" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="animate-spin inline-block mr-2" /> Sending request...</> : 'Request a demo'}</button>
            <p className="sm:col-span-2 text-center text-xs text-ink/70 dark:text-white/70">This sends a demo request. Our team will contact you to arrange the next step.</p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label><span className="mb-2 block text-sm font-bold">{label}{required && <span className="text-brand" aria-hidden="true">*</span>}</span><input className="form-control" required={required} {...props} /></label>
}

function ContactDetail({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = href ? <a href={href} className="font-semibold text-white hover:text-leaf">{value}</a> : <p className="font-semibold leading-6 text-white">{value}</p>
  return <div className="flex gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-leaf"><Icon className="size-5" /></span><div><p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/65">{label}</p>{content}</div></div>
}
