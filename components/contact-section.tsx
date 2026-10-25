'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock3, Mail, MapPin, Phone } from 'lucide-react'

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

  return <section id="contact" className="section-pad scroll-mt-20 bg-forest text-white"><div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="eyebrow !text-leaf">Contact us</p><h2 className="section-title mt-5">Ready to make ordering easier for your team?</h2><p className="mt-4 max-w-xl text-lg font-medium leading-8 text-white/80">Show us how your restaurant handles orders today. We&apos;ll show you how OrderPilot could fit.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/book-demo" className="button-primary !bg-leaf !text-forest">Book a Demo <ArrowRight /></Link><Link href="https://wa.me/923361815141" className="button-secondary !border-white/40 !bg-transparent !text-white">Chat on WhatsApp</Link></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1"><ContactDetail icon={Mail} label="Email" value="info@digipexsolutions.com" href="mailto:info@digipexsolutions.com" /><ContactDetail icon={Phone} label="Phone & WhatsApp" value="+92 336 1815141" href="tel:+923361815141" /><ContactDetail icon={MapPin} label="Address" value="1500 N Grant St Ste R, Denver, CO 80203, United States" /><ContactDetail icon={Clock3} label="Business hours" value="Monday–Friday, 9:00 AM–6:00 PM PKT" /></div></div><form className="grid gap-5 rounded-[2rem] bg-white p-7 text-ink sm:grid-cols-2 sm:p-9" onSubmit={handleSubmit}><Field label="Name" name="name" placeholder="Your name" autoComplete="name" required /><Field label="Email" name="email" type="email" placeholder="you@restaurant.com" autoComplete="email" required /><Field label="Phone" name="phone" type="tel" placeholder="+92 300 0000000" autoComplete="tel" required pattern="[+0-9() -]{7,20}" /><Field label="Restaurant name" name="restaurant" placeholder="Your restaurant" autoComplete="organization" required /><label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold">Message <span className="text-brand" aria-hidden="true">*</span></span><textarea className="form-control min-h-36 resize-y" name="message" required minLength={10} placeholder="Tell us about your current ordering setup" /></label><div className="sm:col-span-2"><button type="submit" className="button-primary min-w-44 justify-center">Send message <ArrowRight className="size-4" /></button>{submitted && <p role="status" className="mt-3 text-sm font-semibold text-brand">Your email app is ready with your message.</p>}</div></form></div></section>
}

function Field({ label, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label><span className="mb-2 block text-sm font-bold">{label} {required && <span className="text-brand" aria-hidden="true">*</span>}</span><input className="form-control" required={required} {...props} /></label> }
function ContactDetail({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) { const content = href ? <a href={href} className="font-semibold text-white hover:text-leaf">{value}</a> : <p className="font-semibold leading-6 text-white">{value}</p>; return <div className="flex gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-leaf"><Icon className="size-5" /></span><div><p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/65">{label}</p>{content}</div></div> }
