'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const subject = encodeURIComponent(`OrderPilot demo request from ${data.get('restaurant')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nPhone / WhatsApp: ${data.get('phone')}\nRestaurant: ${data.get('restaurant')}\nCity: ${data.get('city')}\n\nHow orders reach them today:\n${data.get('orders')}`)
    window.location.href = `mailto:info@digipexsolutions.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }
  return <section id="contact" className="section-pad scroll-mt-20 bg-forest text-white"><div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><h2 className="section-title">Ready to stop chasing orders?</h2><p className="mt-4 text-lg font-medium text-white/80">Here&apos;s how we get you started:</p><ol className="mt-8 space-y-6">{[['Tell us how you take orders.','We’ll ask how orders reach you today.'],['We set it up for you.','Your menu, your WhatsApp, your screen.'],['Your team goes live.','We show your staff how it works first.']].map(([title,copy], index) => <li key={title} className="flex gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf font-bold text-forest">{index + 1}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-white/75">{copy}</p></div></li>)}</ol><Link href="https://wa.me/923361815141" className="button-primary mt-8 !bg-leaf !text-forest">Chat on WhatsApp</Link><div className="mt-10 rounded-2xl border border-white/15 p-6"><h3 className="text-xl font-bold">Reach us directly</h3><div className="mt-5 space-y-4"><Contact icon={MessageCircle} label="WhatsApp" value="+92 336 1815141" href="https://wa.me/923361815141" /><Contact icon={Mail} label="Email" value="info@digipexsolutions.com" href="mailto:info@digipexsolutions.com" /></div></div></div><form className="grid gap-5 rounded-[2rem] bg-white p-7 text-ink sm:grid-cols-2 sm:p-9" onSubmit={handleSubmit}><h3 className="text-3xl font-bold sm:col-span-2">Book your demo</h3><Field label="Name" name="name" autoComplete="name" required /><Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() -]{7,20}" /><Field label="Restaurant name" name="restaurant" autoComplete="organization" required /><Field label="City" name="city" autoComplete="address-level2" required /><label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold">How do orders reach you today?</span><textarea className="form-control min-h-32 resize-y" name="orders" required /></label><button className="button-primary sm:col-span-2 sm:justify-center" type="submit">Send my details</button>{submitted && <p role="status" className="text-sm font-semibold text-brand sm:col-span-2">Your email app has opened with your details ready to send.</p>}</form></div></section>
}
function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label><span className="mb-2 block text-sm font-bold">{label}</span><input className="form-control" {...props} /></label> }
function Contact({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) { return <div className="flex items-center gap-3"><Icon className="size-5 text-leaf" /><span><span className="mr-2 text-sm text-white/60">{label}</span><a href={href} className="font-semibold hover:text-leaf">{value}</a></span></div> }
