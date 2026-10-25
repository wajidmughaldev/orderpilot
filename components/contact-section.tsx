'use client'

import { FormEvent, useState } from 'react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const data = new FormData(form)
    const subject = encodeURIComponent(`OrderPilot enquiry from ${data.get('restaurant')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nRestaurant: ${data.get('restaurant')}\n\n${data.get('message')}`)
    window.location.href = `mailto:info@digipexsolutions.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-pad scroll-mt-20 bg-mint/45">
      <div className="site-shell">
        <p className="eyebrow">Contact us</p>
        <h2 className="section-title mt-6 max-w-4xl">Let&apos;s talk about your restaurant.</h2>
        <p className="lede mt-5 max-w-2xl">Share how you handle orders today, and our team will help you find the right setup.</p>
        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-xl shadow-forest/5 lg:grid-cols-[1.25fr_.75fr]">
          <form className="grid gap-5 p-7 sm:grid-cols-2 sm:p-10" onSubmit={handleSubmit}>
            <Field label="Name" name="name" autoComplete="name" required />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() -]{7,20}" />
            <Field label="Restaurant name" name="restaurant" autoComplete="organization" required />
            <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold">Message</span><textarea className="form-control min-h-36 resize-y" name="message" required minLength={10} placeholder="Tell us about your current ordering setup" /></label>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2"><button type="submit" className="button-primary">Send message</button>{submitted && <p role="status" className="text-sm font-semibold text-brand">Your email app is ready with your message.</p>}</div>
          </form>
          <aside className="bg-forest p-7 text-white sm:p-10" aria-label="Contact details">
            <h3 className="text-2xl font-bold">OrderPilot support</h3>
            <p className="mt-3 leading-7 text-white/60">Reach us directly for demos, pricing, or product questions.</p>
            <div className="mt-9 flex flex-col gap-7">
              <ContactDetail icon={Mail} label="Email" value="info@digipexsolutions.com" href="mailto:info@digipexsolutions.com" />
              <ContactDetail icon={Phone} label="Phone & WhatsApp" value="+92 336 1815141" href="tel:+923361815141" />
              <ContactDetail icon={MapPin} label="Address" value="1500 N Grant St Ste R, Denver, CO 80203, United States" />
              <ContactDetail icon={Clock3} label="Business hours" value="Monday–Friday, 9:00 AM–6:00 PM PKT" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label><span className="mb-2 block text-sm font-bold">{label}</span><input className="form-control" {...props} /></label>
}

function ContactDetail({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = href ? <a href={href} className="font-semibold text-white hover:text-leaf">{value}</a> : <p className="font-semibold leading-6 text-white">{value}</p>
  return <div className="flex gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-leaf"><Icon className="size-5" /></span><div><p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/45">{label}</p>{content}</div></div>
}
