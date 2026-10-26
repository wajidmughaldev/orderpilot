import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, UserRound, Store, WalletCards } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FaqList } from '@/components/faq-list'
import { pricingConfig } from '@/lib/pricing'

export const metadata: Metadata = { title: 'Pricing', description: 'Compare OrderPilot monthly subscription and pay-per-order billing models.', alternates: { canonical: '/pricing' } }

const faqs = [
  { question: 'Is Pay-per-Order the same as a food marketplace commission?', answer: 'It’s an OrderPilot commercial billing model based on eligible orders and agreed terms. We’ll explain the fee basis before you choose.' },
  { question: 'Are there setup fees or usage limits?', answer: 'These depend on the current agreement or plan. Request the full pricing details before starting.' },
  { question: 'Can I change billing models later?', answer: 'Ask our team about available changes and when they can take effect.' },
  { question: 'Does OrderPilot collect my customers’ payments?', answer: 'Customer payments go through the methods your restaurant supports; OrderPilot’s business billing is separate.' },
  { question: 'Is a free trial included?', answer: 'Trial availability and duration must be confirmed with our team; no trial is promised on this page.' },
  { question: 'What if I operate more than one branch?', answer: 'Tell us about your branches and we’ll explain supported setup and pricing options.' },
]
const comparison = [
  ['Billing basis','Prepaid recurring plan','Eligible orders under agreed terms'],
  ['When you pay','At the agreed monthly renewal','According to agreed statement and collection cycle'],
  ['Best starting point','Restaurants wanting predictable software costs','Restaurants preferring usage-linked commercial billing'],
  ['Features and limits','Defined by selected plan','Defined by signed agreement'],
  ['Current price','Confirm with OrderPilot','Confirm with OrderPilot'],
]

export default function PricingPage() {
  return <AppShell><main>
    <section className="section-pad bg-mint/55"><div className="site-shell text-center"><p className="eyebrow">Clear options. No guesswork.</p><h1 className="display mx-auto mt-7 max-w-5xl">Choose how you want to pay for OrderPilot.</h1><p className="lede mx-auto mt-7 max-w-2xl">Some restaurants prefer a predictable monthly plan. Others prefer a model linked to their orders. We&apos;ll help you understand both.</p><Link href="/book-demo?interest=pricing" className="button-primary mt-9">Discuss Pricing <ArrowRight /></Link><p className="mt-5 text-sm text-ink/50">We&apos;ll explain rates, billing, and what&apos;s included before you sign up.</p></div></section>

    <section className="section-pad"><div className="site-shell grid gap-6 lg:grid-cols-2"><ModelCard id="monthly" label="Predictable billing" title="One recurring plan. A clear monthly cost." copy="Pay in advance for an agreed plan with defined features and usage terms." price={pricingConfig.monthly.publicPrice} href={pricingConfig.monthly.href} cta="Discuss Monthly Pricing" points={['Recurring monthly billing, prepaid.','The agreed plan defines available features and usage limits.','You can review your terms before starting.','Exact fees and included usage depend on the approved plan.']} /><ModelCard id="pay-per-order" label="Usage-based billing" title="A model linked to eligible orders." copy="Commercial charges are based on agreed eligible orders instead of a fixed monthly subscription." price={pricingConfig.perOrder.publicPrice} href={pricingConfig.perOrder.href} cta="Discuss Pay-per-Order" dark recommended points={['Charges follow the agreed eligible-order rules and fee schedule.','Statements can be reviewed on a weekly collection cycle, subject to the agreed contract.','Restaurant-to-customer payment remains separate from OrderPilot billing.','Exact fee rate, exclusions, settlement terms and any safeguards are confirmed before activation.']} /></div></section>

    <section className="section-pad bg-white"><div className="site-shell"><h2 className="section-title max-w-3xl">Which option suits your restaurant?</h2><div className="mt-12 overflow-hidden rounded-[1.5rem] border border-forest/10"><div className="hidden grid-cols-[.8fr_1fr_1fr] bg-forest px-6 py-4 text-sm font-bold text-white md:grid"><span>Question</span><span>Monthly</span><span>Pay-per-Order</span></div>{comparison.map(([q,m,p]) => <div key={q} className="grid gap-3 border-t border-forest/10 p-6 first:border-0 md:grid-cols-[.8fr_1fr_1fr]"><strong>{q}</strong><p className="text-ink/60"><span className="mb-1 block text-xs font-bold uppercase text-brand md:hidden">Monthly</span>{m}</p><p className="text-ink/60"><span className="mb-1 block text-xs font-bold uppercase text-brand md:hidden">Pay-per-Order</span>{p}</p></div>)}</div></div></section>

    <section className="section-pad"><div className="site-shell"><div className="rounded-[2.5rem] bg-ink p-8 text-white sm:p-12"><h2 className="section-title max-w-3xl">Customer payments and OrderPilot billing are separate.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">Your customers pay your restaurant through the payment options you support. Separately, your restaurant pays OrderPilot under the commercial model you choose.</p><div className="mt-12 grid gap-4 lg:grid-cols-2"><PaymentLane icon={UserRound} from="Customer" to="Restaurant" note="For the food order" /><PaymentLane icon={Store} from="Restaurant" to="OrderPilot" note="For software billing" /></div></div></div></section>

    <section className="section-pad bg-mint/40"><div className="site-shell grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><h2 className="section-title">Pricing questions, answered simply.</h2><FaqList items={faqs} /></div></section>
    <section className="py-20"><div className="site-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><div><h2 className="section-title">Not sure which model makes sense?</h2><p className="lede mt-5 max-w-2xl">Tell us roughly how your restaurant takes orders. We&apos;ll walk you through the options, without the sales pressure.</p></div><Link href="/book-demo?interest=pricing" className="button-primary shrink-0">Talk About Pricing <ArrowRight /></Link></div></section>
  </main></AppShell>
}

function ModelCard({ id,label,title,copy,price,href,cta,points,dark=false,recommended=false }: { id:string; label:string; title:string; copy:string; price:string; href:string; cta:string; points:string[]; dark?:boolean; recommended?:boolean }) { return <article id={id} className={`relative flex h-full scroll-mt-28 flex-col rounded-[2rem] border p-8 sm:p-10 ${dark ? 'border-leaf/60 bg-forest text-white shadow-xl shadow-forest/15' : 'border-transparent bg-white text-ink shadow-xl shadow-forest/5'}`}>{recommended && <span className="absolute right-6 top-6 rounded-full bg-leaf px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-forest">Recommended</span>}<p className={`font-mono text-xs font-bold uppercase tracking-[.16em] ${dark ? 'text-leaf' : 'text-brand'}`}>{label}</p><h2 className="mt-7 text-4xl font-bold tracking-tight">{title}</h2><p className="mt-4 leading-7 opacity-65">{copy}</p><ul className="mt-9 flex flex-col gap-4">{points.map(point => <li key={point} className="flex gap-3 text-sm leading-6"><Check className={`mt-1 size-4 shrink-0 ${dark ? 'text-leaf' : 'text-brand'}`} />{point}</li>)}</ul><div className={`mt-10 rounded-2xl p-5 ${dark ? 'bg-white/10' : 'bg-mint'}`}><p className="font-bold">{price}</p></div><Link href={href} className={`button-primary mt-6 ${dark ? '!bg-leaf !text-forest' : ''}`}>{cta} <ArrowRight /></Link></article> }
function PaymentLane({ icon:Icon, from, to, note }: { icon: typeof WalletCards; from:string; to:string; note:string }) { return <div className="rounded-2xl bg-white/8 p-6"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-leaf text-forest"><Icon className="size-5" /></span><div><p className="font-bold">{from} <span className="text-leaf">→</span> {to}</p><p className="text-sm text-white/50">{note}</p></div></div></div> }
