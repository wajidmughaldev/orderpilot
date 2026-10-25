import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Files, RefreshCw, Eye, ChefHat, Users, Store, UtensilsCrossed, Coffee, Sandwich, Cloud, Building2, Croissant, Martini, Soup } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import OrderWorkflow from '@/components/order-workflow'
import { FaqList } from '@/components/faq-list'
import { ContactSection } from '@/components/contact-section'
import { PartnersSection } from '@/components/partners-section'

const faqs = [
  { question: 'How much does it cost?', answer: 'Pricing is shared on a short call. We’ll explain the terms before you commit. If you’d rather talk it through, message us on WhatsApp.' },
  { question: 'How does payment work?', answer: 'Your customers pay you using the payment methods your restaurant already supports. OrderPilot’s own fee is separate and is explained before you decide.' },
  { question: 'Can I use it for dine-in as well as takeaway or delivery?', answer: 'Yes. You can take table QR orders for dine-in, plus takeaway and delivery orders, on the same screen. In the demo we’ll go through which ones suit the way you serve customers.' },
]
const benefits = [
  [Eye, 'One place to check orders.', 'See the details without switching between scattered records.'],
  [ChefHat, 'A clearer kitchen handoff.', 'Keep order stages visible to the people preparing food.'],
  [Users, 'Ordering that feels familiar.', 'Customers use channels they already know.'],
  [Store, 'Your restaurant stays at the center.', 'Build your own direct ordering experience.'],
] as const

export default function HomePage() {
  return <AppShell><main>
    <section className="hero-section">
      <div className="site-shell grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
        <div><p className="eyebrow">Built for the way restaurants work</p><h1 className="display mt-6">Restaurant orders, <span className="text-brand">all in one place.</span></h1><p className="lede mt-6 max-w-xl">Manage WhatsApp, online, and table orders from one simple dashboard. Keep your team organized, your kitchen updated, and your customers connected.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/book-demo" className="button-primary">Book a Demo <ArrowRight /></Link><Link href="#how-it-works" className="button-secondary">See How It Works ↓</Link></div><p className="mt-5 text-sm font-medium text-ink/70">See the product. Ask questions. Find out if it fits your restaurant.</p></div>
        <figure className="image-frame"><Image src="/assets/orderpilot_restaurant_dashboard_showcase.png" alt="OrderPilot restaurant dashboard beside a WhatsApp ordering flow" width={1456} height={1092} priority className="h-auto w-full scale-[1.03]" /></figure>
      </div>
    </section>

    <PartnersSection />

    <section className="section-pad bg-cream"><div className="site-shell"><SectionHeading eyebrow="Sound familiar?" title="Busy service is hard enough. Orders shouldn’t add to the chaos." description="A few missed details can turn a normal shift into extra work." /><div className="mt-10 grid gap-5 md:grid-cols-3">{[[MessageCircle,'Messages keep coming.','Questions and order requests pile up while your team serves customers.'],[Files,'Details are scattered.','Orders across chats, notes, and counters are harder to follow.'],[RefreshCw,'Everyone asks for an update.','The counter, kitchen, and customer all need to know what’s happening.']].map(([Icon,title,copy], index) => { const I = Icon as typeof MessageCircle; return <article key={title as string} className="panel flex h-full flex-col p-7 sm:p-8"><I className="size-9 text-brand" /><p className="mt-10 font-mono text-xs font-bold text-brand">0{index+1}</p><h3 className="mt-3 text-2xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-ink/75">{copy as string}</p></article>})}</div><p className="mt-8 font-semibold text-brand">There&apos;s a clearer way to manage it.</p></div></section>

    <section id="how-it-works" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><SectionHeading eyebrow="How OrderPilot works" title="From customer order to kitchen, without the confusion." description="One connected flow helps your team see what came in and what comes next." /><OrderWorkflow /></div></section>

    <section id="features" className="section-pad bg-forest text-white"><div className="site-shell"><SectionHeading dark eyebrow="Made for your customers" title="However they order, you’re ready." description="Familiar ways to order, all arriving in one manageable flow." /><div className="mt-10 grid gap-5 md:grid-cols-3"><CustomerChannel image="/assets/whatsapp_food_ordering_flow.png" title="WhatsApp ordering" copy="Turn familiar conversations into clear, confirmed orders." /><CustomerChannel image="/assets/orderpilot_kitchen_dashboard.png" title="Branded online ordering" copy="Let customers browse your menu and order directly." /><CustomerChannel image="/assets/scan_order_pay_riverside_bistro_qr_dining.png" title="QR table ordering" copy="Guests scan, browse, and order right from the table." /></div></div></section>

    <section className="section-pad bg-cream"><div className="site-shell"><SectionHeading eyebrow="Made for every format" title="Built for Every Type of Restaurant" description="Flexible ordering tools that adapt to your service model, pace, and customer experience." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
      [UtensilsCrossed, 'Fine Dining', 'Deliver attentive service with clear table and kitchen coordination.'], [Soup, 'Casual Dining', 'Keep dine-in, takeaway, and delivery orders moving together.'], [Coffee, 'Cafés', 'Handle counter, table, and repeat orders without slowing the queue.'], [Sandwich, 'Quick Service / Fast Food', 'Move high-volume orders from checkout to preparation quickly.'], [Cloud, 'Cloud Kitchens', 'Bring orders from multiple channels into one operational view.'], [Building2, 'Food Courts', 'Keep compact teams organized through busy service periods.'], [Croissant, 'Bakeries', 'Manage scheduled pickups, custom requests, and daily orders clearly.'], [Martini, 'Bars / Lounges', 'Support table ordering while staff stay focused on hospitality.'],
    ].map(([Icon,title,copy]) => { const I = Icon as typeof Store; return <article key={title as string} className="panel flex min-h-56 flex-col p-6"><span className="grid size-14 place-items-center rounded-full bg-mint text-brand"><I className="size-7" /></span><h3 className="mt-7 text-xl font-bold">{title as string}</h3><p className="mt-3 text-base leading-6 text-ink/75">{copy as string}</p></article>})}</div></div></section>

    <section id="why-orderpilot" className="section-pad bg-mint"><div className="site-shell"><SectionHeading eyebrow="System integrity" title="More control behind every order." description="A restaurant workflow designed to stay clear when service gets busy." /><div className="ops-board mt-10"><div className="ops-board-head"><span>Live operations</span><span>All channels synced</span></div><div className="ops-board-grid">{benefits.map(([Icon,title,copy], index) => <article key={title} className="ops-card"><span className="ops-number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="ops-board-foot"><span>3 channels connected</span><span>One restaurant workspace</span></div></div></div></section>

    <section id="product" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><SectionHeading eyebrow="See the product" title="See what your team would actually use." description="We’ll walk you through a real ordering flow—from the customer’s first message to your kitchen board." /><figure className="image-frame mt-10"><Image src="/assets/orderpilot_kitchen_dashboard.png" alt="Kitchen board with new, preparing, and ready order columns" width={1456} height={1092} className="h-auto w-full" /></figure></div></section>

    <section id="pricing" className="section-pad scroll-mt-20 bg-cream"><div className="site-shell"><SectionHeading eyebrow="Pricing" title="Pricing shared on a short call." description="Tell us how your restaurant handles orders and we’ll explain the available terms before you decide." /><Link href="https://wa.me/923361815141" className="button-primary mt-8">Chat on WhatsApp <ArrowRight className="size-4" /></Link></div></section>

    <section id="faq" className="section-pad scroll-mt-20 bg-cream"><div className="site-shell"><SectionHeading eyebrow="FAQ" title="A few things you might be wondering." description="Quick answers about ordering, setup, and billing." /><div className="mt-10 max-w-4xl"><FaqList items={faqs} /></div></div></section>
    <ContactSection />
  </main></AppShell>
}

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) { return <header className="section-heading"><p className={`eyebrow ${dark ? '!text-leaf' : ''}`}>{eyebrow}</p><h2 className="section-title mt-5">{title}</h2><p className={`mt-4 max-w-2xl text-lg leading-8 font-medium ${dark ? 'text-white/80' : 'text-ink/75'}`}>{description}</p></header> }
function CustomerChannel({ image, title, copy }: { image: string; title: string; copy: string }) { return <article className="overflow-hidden rounded-[1.75rem] border border-white/20 bg-white text-ink"><div className="aspect-[4/3] overflow-hidden bg-mint"><Image src={image} alt={`${title} example`} width={720} height={540} className="size-full object-cover" /></div><div className="p-7"><h3 className="text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 text-ink/75">{copy}</p></div></article> }
