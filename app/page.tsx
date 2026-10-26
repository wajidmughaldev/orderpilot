import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Files, RefreshCw, Eye, ChefHat, Users, Store, Check, UtensilsCrossed, Coffee, Sandwich, Cloud, Building2, Croissant, Martini, Soup } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import OrderWorkflow from '@/components/order-workflow'
import { FaqList } from '@/components/faq-list'
import { ContactSection } from '@/components/contact-section'
import { PartnersSection } from '@/components/partners-section'

const faqs = [
  { question: 'How much does it cost?', answer: 'Plans start at PKR 9,999 a month. Or you can pay 10% to 15% of each order, depending on your usage. Message us on WhatsApp and we’ll tell you which one costs less for you.' },
  { question: 'Which plan should I pick?', answer: 'If your orders are steady, a monthly plan is easier to plan around. If you’re just starting or your orders are low, pay per order may cost less. Tell us roughly how many orders you get and we’ll work it out with you.' },
  { question: 'What if my staff can’t use it?', answer: 'We show your team how it works before you start.' },
  { question: 'How does payment work?', answer: 'Your customers pay you, using the payment methods your restaurant already supports. We charge you either the monthly plan, or a share of each order if you pick pay per order.' },
  { question: 'Can I use it for dine-in, takeaway and delivery?', answer: 'Yes. Table QR for dine-in, plus takeaway and delivery orders, all on one screen. In the demo we’ll go through which ones suit your restaurant.' },
  { question: 'Do I keep my customer list?', answer: 'Yes. It’s your list, and you can export it whenever you want.' },
]
const hiddenFaqs = ['Setup time', 'Existing WhatsApp number', 'Cancellation', 'What to install', 'Customer app download', 'Branding']
void hiddenFaqs
const benefits = [
  [Eye, 'Too many places to check.', 'WhatsApp, web and table QR orders land on one kitchen board.'],
  [ChefHat, 'Table service is slow.', 'Guests scan the QR, order together, split the bill and pay from their seat. No waiting for the waiter twice.'],
  [Users, 'Guests don’t come back.', 'Send offers with Broadcasting. Run win-back offers, loyalty and referrals so regulars return.'],
  [Store, 'Not enough Google reviews.', 'Ask guests for a Google review after their order. Turn it on only if you want it.'],
  [Files, 'Your customer list is yours.', 'Export your customer list whenever you want.'],
  [RefreshCw, 'Customers ask where their order is.', 'Mark each order new, preparing or ready, so everyone can see where it stands.'],
] as const

export default function HomePage() {
  return <AppShell><main>
    <section className="hero-section">
      <div className="site-shell grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
        <div><p className="eyebrow">Order management for Pakistani restaurants</p><h1 className="display mt-6">Every order, <span className="text-brand">on one screen.</span></h1><p className="lede mt-6 max-w-xl">Orders from WhatsApp, your website and table QR show up in one place. Your kitchen sees each one as it comes in. Plans start at PKR 9,999 a month.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#contact" className="button-primary">Book a Demo <ArrowRight /></Link><Link href="https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20OrderPilot%20with%20my%20restaurant%27s%20menu." className="button-secondary">Chat on WhatsApp</Link></div><p className="mt-5 text-sm font-medium text-ink/70">We&apos;ll show it with your own menu. No pressure to decide.</p></div>
        <figure className="image-frame"><Image src="/assets/orderpilot_restaurant_dashboard_showcase.png" alt="OrderPilot restaurant dashboard beside a WhatsApp ordering flow" width={1456} height={1092} priority className="h-auto w-full scale-[1.03]" /></figure>
      </div>
    </section>

    <PartnersSection />

    <section className="section-pad bg-cream"><div className="site-shell"><SectionHeading eyebrow="The problem" title="Orders come from too many places." description="On a busy night, that gets messy." /><div className="mt-10 grid gap-5 md:grid-cols-3">{[[MessageCircle,'Orders get buried in chats.','A message comes in at 8:40, another at 8:42. By 9:00 you’re scrolling up to find the first one.'],[Files,'The kitchen hears it late.','Someone reads the order out, someone writes it down, and something gets missed.'],[RefreshCw,'Customers keep calling.','“Bhai, mera order kahan hai?” Your staff stop what they’re doing to check.']].map(([Icon,title,copy], index) => { const I = Icon as typeof MessageCircle; return <article key={title as string} className="panel flex h-full flex-col p-7 sm:p-8"><I className="size-9 text-brand" /><p className="mt-10 font-mono text-xs font-bold text-brand">0{index+1}</p><h3 className="mt-3 text-2xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-ink/75">{copy as string}</p></article>})}</div><p className="mt-8 max-w-4xl text-lg font-semibold text-brand">You&apos;re not doing anything wrong. There are just too many places to look. OrderPilot puts them in one.</p></div></section>

    <section className="section-pad bg-white"><div className="site-shell"><h2 className="section-title max-w-4xl">You don&apos;t have to change how customers order.</h2><p className="lede mt-5 max-w-4xl">Your team already has a way of handling orders. We&apos;re not here to change your menu or your customers. We give every order one place to land, so it&apos;s written down where your whole team can see it.</p></div></section>

    <section id="how" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><OrderWorkflow /></div></section>

    <section className="section-pad bg-cream"><div className="site-shell"><SectionHeading eyebrow="Who it’s for" title="Works for any kind of restaurant." description="Whatever you serve, orders come from the same places." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
      [UtensilsCrossed, 'Fine Dining', 'Table orders reach the kitchen without anyone running back and forth.'], [Soup, 'Casual Dining', 'Dine-in, takeaway and delivery in one list.'], [Coffee, 'Cafés', 'Counter, table and repeat orders in one queue.'], [Sandwich, 'Quick Service / Fast Food', 'Lots of orders, fast. Everyone sees what’s next.'], [Cloud, 'Cloud Kitchens', 'WhatsApp and website orders on one screen.'], [Building2, 'Food Courts', 'A small team handling a big rush.'], [Croissant, 'Bakeries', 'Pre-orders, custom cakes and pickups, written down.'], [Martini, 'Juice Bars / Lounges', 'Guests order, staff keep serving.'],
    ].map(([Icon,title,copy]) => { const I = Icon as typeof Store; return <article key={title as string} className="panel flex min-h-56 flex-col p-6"><span className="grid size-14 place-items-center rounded-full bg-mint text-brand"><I className="size-7" /></span><h3 className="mt-7 text-xl font-bold">{title as string}</h3><p className="mt-3 text-base leading-6 text-ink/75">{copy as string}</p></article>})}</div></div></section>

    <section className="section-pad bg-mint"><div className="site-shell"><SectionHeading eyebrow="What you get" title="Problems we fix." description="Use all of it, or only the parts you need." /><div className="ops-board mt-10"><div className="ops-board-head"><span>Your screen</span><span>All orders in one place</span></div><div className="ops-board-grid">{benefits.map(([Icon,title,copy], index) => <article key={title} className="ops-card"><span className="ops-number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="ops-board-foot"><span>3 ways to order</span><span>1 screen</span></div></div></div></section>

    <section id="product" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><SectionHeading eyebrow="See the product" title="Take a look." description="This is the screen your team uses during service." /><figure className="image-frame mt-10"><Image src="/assets/orderpilot_kitchen_dashboard.png" alt="Kitchen board with new, preparing, and ready order columns" width={1456} height={1092} className="h-auto w-full" /></figure></div></section>

    <section className="bg-forest py-10 text-white"><div className="site-shell flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-3xl font-bold">Want to see it with your own menu?</h2><p className="mt-2 text-white/75">Tell us how orders reach you now. We&apos;ll show you how they would look on OrderPilot.</p></div><div className="flex flex-wrap gap-3"><Link href="#contact" className="button-primary !bg-leaf !text-forest">Book a Demo</Link><Link href="https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20OrderPilot%20with%20my%20restaurant%27s%20menu." className="button-secondary !border-white/35 !bg-transparent !text-white">Chat on WhatsApp</Link></div></div></section>

    <section id="pricing" className="section-pad scroll-mt-20 bg-cream"><div className="site-shell"><SectionHeading eyebrow="Pricing" title="Pricing." description="All prices are in PKR. Pick a monthly plan, or pay per order." /><div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3"><PricingPreview title="Basic" price="PKR 9,999 / month" features={['Kitchen board','WhatsApp ordering','Web menu','Table QR (with split bill and pay)','Customer list export']} note="Don’t need WhatsApp ordering? Web menu + Table QR only is also PKR 9,999." cta="Get Basic" plan="Basic" /><PricingPreview title="Plus" price="PKR 13,999 / month" intro="Everything in Basic, plus:" features={['Broadcasting','Win-back offers, loyalty and referrals','Google review requests']} cta="Get Plus" plan="Plus" /><PricingPreview title="Pay per order" price="10% to 15% of each order" intro="Your rate depends on your usage. We confirm it with you before you start." features={['Everything in Plus']} note="A good fit when you’re starting out or your orders are low." cta="Start pay per order" plan="Pay per order" /></div><div className="mt-7 max-w-4xl space-y-2 text-sm leading-6 text-ink/65"><p>Under roughly PKR 70,000 to 100,000 in monthly orders, pay per order costs less. Above that, a monthly plan costs less.</p><p>Not sure which fits? Message us on WhatsApp and we&apos;ll work it out with your numbers.</p></div></div></section>

    <section id="faq" className="section-pad scroll-mt-20 bg-cream"><div className="site-shell"><SectionHeading eyebrow="FAQ" title="Questions." description="Quick answers about cost, plans and payment." /><div className="mt-10 max-w-4xl"><FaqList items={faqs} /></div></div></section>
    <ContactSection />
  </main></AppShell>
}

function PricingPreview({ title, price, intro, features, note, cta, plan }: { title:string; price:string; intro?:string; features:string[]; note?:string; cta:string; plan:string }) { const href = `https://wa.me/923361815141?text=${encodeURIComponent(`Hi, I'm interested in the ${plan} plan for my restaurant.`)}`; return <article className="flex h-full flex-col rounded-[2rem] border border-forest/15 bg-white p-8 sm:p-9"><h3 className="text-3xl font-bold">{title}</h3><p className="mt-4 text-xl font-bold text-brand">{price}</p>{intro && <p className="mt-4 leading-7 text-ink/70">{intro}</p>}<ul className="mt-7 flex flex-col gap-3">{features.map(feature => <li key={feature} className="flex gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-brand" />{feature}</li>)}</ul>{note && <p className="mt-6 text-sm leading-6 text-ink/60">{note}</p>}<Link href={href} className="button-primary mt-auto pt-3">{cta} <ArrowRight className="size-4" /></Link></article> }
function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) { return <header className="section-heading"><p className={`eyebrow section-heading-eyebrow ${dark ? '!text-leaf' : ''}`}>{eyebrow}</p><h2 className="section-title">{title}</h2><p className={`section-description ${dark ? 'text-white/80' : 'text-ink/75'}`}>{description}</p></header> }
