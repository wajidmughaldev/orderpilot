import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Files, RefreshCw, Eye, ChefHat, Users, Store, Quote } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import OrderWorkflow from '@/components/order-workflow'
import { FaqList } from '@/components/faq-list'

const faqs = [
  { question: 'Do customers need to download an app?', answer: 'No separate OrderPilot customer app is needed for WhatsApp or web-based ordering.' },
  { question: 'Can my restaurant use its own branding?', answer: 'OrderPilot supports restaurant-focused ordering experiences. We’ll show the available customization options in your demo.' },
  { question: 'How does payment work?', answer: 'Customers pay the restaurant using its supported payment methods. OrderPilot’s software billing is a separate arrangement.' },
  { question: 'Can I use it for dine-in as well as takeaway or delivery?', answer: 'OrderPilot includes ordering flows for different restaurant situations, including table QR. We’ll review which flows suit your setup.' },
  { question: 'How much does it cost?', answer: 'There are monthly and pay-per-order arrangements. Check Pricing or request a demo for the current rates and terms.' },
]
const benefits = [
  [Eye, 'One place to check orders.', 'See the details without switching between scattered records.'],
  [ChefHat, 'A clearer kitchen handoff.', 'Keep order stages visible to the people preparing food.'],
  [Users, 'Ordering that feels familiar.', 'Customers use channels they already know.'],
  [Store, 'Your restaurant stays at the center.', 'Build your own direct ordering experience.'],
] as const

export default function HomePage() {
  return <AppShell><main>
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] rounded-bl-[7rem] bg-mint/60 lg:block" />
      <div className="site-shell relative grid items-center gap-14 lg:grid-cols-[.86fr_1.14fr]">
        <div><p className="eyebrow">Built for the way restaurants work</p><h1 className="display mt-7">Restaurant orders, <span className="text-brand">all in one place.</span></h1><p className="lede mt-7 max-w-xl">Manage WhatsApp, online, and table orders from one simple dashboard. Keep your team organized, your kitchen updated, and your customers connected.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/book-demo" className="button-primary">Book a Demo <ArrowRight /></Link><Link href="#how-it-works" className="button-secondary">See How It Works ↓</Link></div><p className="mt-5 text-sm text-ink/50">See the product. Ask questions. Find out if it fits your restaurant.</p></div>
        <figure className="image-frame relative"><Image src="/assets/orderpilot_restaurant_dashboard_showcase.png" alt="Illustrative OrderPilot restaurant dashboard beside a WhatsApp ordering flow" width={1456} height={1092} priority className="h-auto w-full" /><figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand backdrop-blur">Illustrative product concept</figcaption></figure>
      </div>
    </section>

    <section className="border-y border-forest/10 bg-white py-9"><div className="site-shell"><p className="text-center font-mono text-[10px] font-bold uppercase tracking-[.2em] text-ink/40">Backed by Pakistan&apos;s innovation ecosystem</p><div className="partner-grid mt-7">
      <figure><Image src="/assets/partner-nic.png" alt="Funded by Ignite and MoITT through NIC Hyderabad" width={500} height={500} /></figure>
      <figure><Image src="/assets/partner-ignite.png" alt="Ignite National Technology Fund" width={300} height={89} /></figure>
      <figure><Image src="/assets/partner-ntf.png" alt="National Technology Fund" width={105} height={41} /></figure>
      <figure><Image src="/assets/partner-moit.png" alt="Ministry of IT and Telecom, Government of Pakistan" width={749} height={428} /></figure>
      <figure><Image src="/assets/partner-digipex.png" alt="Digipex Solutions" width={2048} height={849} /></figure>
    </div></div></section>

    <section className="section-pad bg-white"><div className="site-shell"><p className="eyebrow">Sound familiar?</p><div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><h2 className="section-title">Busy service is hard enough. Orders shouldn&apos;t add to the chaos.</h2><p className="lede self-end">A few missed details can turn a normal shift into extra work.</p></div><div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-forest/10 bg-forest/10 md:grid-cols-3">{[[MessageCircle,'Messages keep coming.','Questions and order requests pile up while your team serves customers.'],[Files,'Details are scattered.','Orders across chats, notes, and counters are harder to follow.'],[RefreshCw,'Everyone asks for an update.','The counter, kitchen, and customer all need to know what’s happening.']].map(([Icon,title,copy], index) => { const I = Icon as typeof MessageCircle; return <article key={title as string} className={`bg-cream p-8 sm:p-10 ${index === 1 ? 'md:translate-y-4' : ''}`}><I className="size-8 text-brand" /><p className="mt-12 font-mono text-xs text-brand">0{index+1}</p><h3 className="mt-3 text-2xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-ink/60">{copy as string}</p></article>})}</div><p className="mt-10 text-center font-semibold text-brand">There&apos;s a clearer way to manage it.</p></div></section>

    <section id="how-it-works" className="scroll-mt-20 bg-[#fbfaf7] pt-16 sm:pt-24"><div className="site-shell"><p className="eyebrow">How OrderPilot works</p><h2 className="section-title mt-6 max-w-4xl">From customer order to kitchen, without the confusion.</h2><p className="lede mt-5 max-w-2xl">One connected flow helps your team see what came in and what comes next.</p></div><OrderWorkflow /></section>

    <section id="features" className="section-pad bg-forest text-white"><div className="site-shell"><p className="eyebrow !text-leaf">Made for your customers</p><div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><h2 className="section-title max-w-3xl">However they order, you&apos;re ready.</h2><p className="max-w-md text-lg leading-8 text-white/65">Familiar ways to order, all arriving in one manageable flow.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">
      <CustomerChannel image="/assets/whatsapp_food_ordering_flow.png" title="WhatsApp ordering" copy="Turn familiar conversations into clear, confirmed orders." />
      <CustomerChannel image="/assets/orderpilot_restaurant_dashboard_showcase.png" title="Branded online ordering" copy="Let customers browse your menu and order directly." />
      <CustomerChannel image="/assets/scan_order_pay_riverside_bistro_qr_dining.png" title="QR table ordering" copy="Guests scan, browse, and order right from the table." />
    </div></div></section>

    <section id="why-orderpilot" className="section-pad bg-mint/55"><div className="site-shell"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow">System integrity</p><h2 className="section-title mt-6">More control behind every order.</h2><p className="lede mt-5">A restaurant workflow designed to stay clear when service gets busy.</p></div><div className="ops-board"><div className="ops-board-head"><span>Live operations</span><span>All channels synced</span></div><div className="ops-board-grid">{benefits.map(([Icon,title,copy], index) => <article key={title} className={index === 1 ? 'ops-card ops-card-active' : 'ops-card'}><span className="ops-number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="ops-board-foot"><span>4 channels connected</span><span>One restaurant workspace</span></div></div></div></div></section>

    <section className="section-pad"><div className="site-shell grid items-center gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">See the product</p><h2 className="section-title mt-6">See what your team would actually use.</h2><p className="lede mt-5">We&apos;ll walk you through a real ordering flow—from the customer&apos;s first message to your kitchen board.</p><Link href="/book-demo" className="button-primary mt-8">Book a Demo <ArrowRight /></Link></div><figure className="image-frame"><Image src="/assets/orderpilot_kitchen_dashboard.png" alt="Illustrative kitchen board with new, preparing, and ready order columns" width={1456} height={1092} className="h-auto w-full" /><figcaption className="px-5 py-3 font-mono text-xs text-ink/45">Example workflow · concept artwork</figcaption></figure></div></section>

    <section className="section-pad bg-white"><div className="site-shell"><p className="eyebrow">Flexible billing</p><h2 className="section-title mt-6 max-w-4xl">A billing model that fits how you run your restaurant.</h2><p className="lede mt-5 max-w-2xl">Choose a recurring subscription or ask about pay-per-order. We&apos;ll explain the terms before you decide.</p><div className="mt-12 grid gap-5 md:grid-cols-2"><PricingPreview title="Monthly Subscription" copy="Plan your software cost with a recurring, prepaid arrangement." href="/pricing#monthly" cta="View Monthly Option" /><PricingPreview title="Pay-per-Order" copy="A usage-based arrangement linked to eligible orders." href="/pricing#pay-per-order" cta="View Pay-per-Order" dark /></div></div></section>

    <section className="section-pad bg-white"><div className="site-shell"><p className="eyebrow">Restaurant teams</p><h2 className="section-title mt-6 max-w-3xl">Built around real service pressure.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{[
      ['It gives us a much clearer picture of what came in and what the kitchen needs next.','Restaurant manager','Karachi'],
      ['Customers can order in a way that already feels familiar, while our team stays organized.','Cafe owner','Lahore'],
      ['The biggest difference is having one flow instead of checking different places during service.','Operations lead','Islamabad'],
    ].map(([quote,role,city]) => <figure key={quote} className="panel relative overflow-hidden p-8"><div className="absolute right-0 top-0 size-20 rounded-bl-[3rem] bg-mint" /><Quote className="relative size-7 text-brand" /><blockquote className="relative mt-8 text-lg font-semibold leading-8">“{quote}”</blockquote><figcaption className="mt-8 text-sm text-ink/55"><strong className="block text-ink">{role}</strong>{city}</figcaption></figure>)}</div><p className="mt-5 text-xs text-ink/40">Representative feedback shown for layout; replace with approved customer quotes before publication.</p></div></section>

    <section id="faq" className="section-pad scroll-mt-20"><div className="site-shell grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><h2 className="section-title">A few things you might be wondering.</h2><FaqList items={faqs} /></div></section>
    <section className="bg-forest py-20 text-white"><div className="site-shell flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"><div><h2 className="section-title max-w-3xl">Ready to make ordering easier for your team?</h2><p className="mt-5 max-w-2xl text-lg text-white/65">Show us how your restaurant handles orders today. We&apos;ll show you how OrderPilot could fit.</p></div><div className="flex shrink-0 flex-wrap gap-3"><Link href="/book-demo" className="button-primary !bg-leaf !text-forest">Book a Demo <ArrowRight /></Link><Link href="/pricing" className="button-secondary !border-white/30 !bg-transparent !text-white">Explore Pricing</Link></div></div></section>
  </main></AppShell>
}

function CustomerChannel({ image, title, copy }: { image: string; title: string; copy: string }) { return <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#101820]"><div className="aspect-[4/3] overflow-hidden bg-white"><Image src={image} alt="" width={720} height={540} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><div className="relative p-7"><div className="absolute right-0 top-0 size-16 rounded-bl-[2.5rem] bg-leaf/15" /><h3 className="relative text-2xl font-bold">{title}</h3><p className="relative mt-3 leading-7 text-white/60">{copy}</p></div></article> }
function PricingPreview({ title, copy, href, cta, dark = false }: { title:string; copy:string; href:string; cta:string; dark?:boolean }) { return <article className={`rounded-[2rem] p-8 sm:p-10 ${dark ? 'bg-forest text-white' : 'bg-mint text-ink'}`}><p className="font-mono text-xs font-bold uppercase tracking-wider opacity-55">Billing option</p><h3 className="mt-8 text-3xl font-bold">{title}</h3><p className="mt-3 max-w-lg leading-7 opacity-65">{copy}</p><Link href={href} className={`mt-10 inline-flex items-center gap-2 font-bold ${dark ? 'text-leaf' : 'text-brand'}`}>{cta} <ArrowRight className="size-4" /></Link></article> }
