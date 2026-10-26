import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, ChefHat, Cloud, Coffee, Croissant, Eye, Files, Martini, MessageCircle, RefreshCw, Sandwich, Soup, Store, Users, UtensilsCrossed } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import OrderWorkflow from '@/components/order-workflow'
import { FaqList } from '@/components/faq-list'
import { ContactSection } from '@/components/contact-section'
import { PartnersSection } from '@/components/partners-section'

const faqItems = [
  { question: 'How much does it cost?', answer: 'You can pay a monthly fee or pay per order. We’ll explain the terms before you commit. If you’d rather talk it through, message us on WhatsApp.', hidden: false },
  { question: 'What if my staff can’t use it?', answer: 'We’ll show your team how the system works before you go live.', hidden: false },
  { question: 'How does payment work?', answer: 'Your customers pay you, using the payment methods your restaurant already supports. OrderPilot’s own fee is separate and is explained before you decide.', hidden: false },
  { question: 'Can I use it for dine-in as well as takeaway or delivery?', answer: 'Yes. You can take table QR orders for dine-in, plus takeaway and delivery orders, on the same screen. In the demo we’ll go through which ones suit the way you serve customers.', hidden: false },
  { question: 'How long does setup take?', answer: '', hidden: true },
  { question: 'Can I keep my existing WhatsApp number?', answer: '', hidden: true },
  { question: 'What are the cancellation terms?', answer: '', hidden: true },
  { question: 'Do customers need to install or download an app?', answer: '', hidden: true },
  { question: 'Can my restaurant use its own branding?', answer: '', hidden: true },
]
const visibleFaqs = faqItems.filter(({ hidden }) => !hidden)
const restaurantTypes = [
  [UtensilsCrossed, 'Fine Dining', 'Keep table orders and the kitchen in step, even on a full night.'], [Soup, 'Casual Dining', 'Dine-in, takeaway and delivery orders in one queue.'], [Coffee, 'Cafés', 'Counter, table and repeat orders without a long line.'], [Sandwich, 'Quick Service / Fast Food', 'Get high-volume orders from the counter to the kitchen fast.'], [Cloud, 'Cloud Kitchens', 'Every WhatsApp and website order on one screen.'], [Building2, 'Food Courts', 'Keep a small team on top of a rush.'], [Croissant, 'Bakeries', 'Track pre-orders, custom cakes and pickups so nothing is forgotten.'], [Martini, 'Juice Bars / Lounges', 'Let staff focus on guests while orders stay visible to the team.'],
] as const
const benefits = [
  [Eye, 'One place to check orders.', 'No more scrolling through chats.'],
  [ChefHat, 'A clearer handoff to the kitchen.', 'Everyone sees what’s next.'],
  [Users, 'Customers order the way they already do.', 'Same WhatsApp, same website, same table QR.'],
] as const

export default function HomePage() {
  return <AppShell><main>
    <section className="hero-section"><div className="site-shell grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr]"><div><p className="eyebrow">Built for Pakistani restaurants</p><h1 className="display mt-6">Stop losing orders in <span className="text-brand">WhatsApp chats.</span></h1><p className="lede mt-6 max-w-xl">WhatsApp, website and table orders land on one screen. Calls too, once your staff type them in. Your kitchen sees what to cook next.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#contact" className="button-primary">Book a Demo <ArrowRight /></Link><Link href="https://wa.me/923361815141" className="button-secondary">Chat on WhatsApp</Link></div><p className="mt-5 text-sm font-medium text-ink/70">See it with your own menu. No pressure to decide today.</p></div><figure className="image-frame"><Image src="/assets/orderpilot_restaurant_dashboard_showcase.png" alt="OrderPilot restaurant dashboard beside a WhatsApp ordering flow" width={1456} height={1092} priority className="h-auto w-full scale-[1.03]" /></figure></div></section>

    <PartnersSection />

    <section className="section-pad bg-cream"><div className="site-shell"><SectionHeading eyebrow="Sound familiar?" title="Friday night. Phone buzzing. Kitchen shouting. Was that order even confirmed?" description="You’re taking an order on WhatsApp while someone waits at the counter and another customer calls to ask where their food is. Nobody is doing a bad job. There’s just too much coming from too many places." /><div className="mt-10 grid gap-5 md:grid-cols-3">{[[MessageCircle,'“Did this customer already order?”','Messages pile up faster than anyone can reply.'],[Files,'“Which slip is this one?”','Orders live in chats, notebooks and memory.'],[RefreshCw,'“Bhai, mera order kahan hai?”','Customers keep asking, and your staff stop cooking to check.']].map(([Icon,title,copy], index) => { const I = Icon as typeof MessageCircle; return <article key={title as string} className="panel flex h-full flex-col p-7 sm:p-8"><I className="size-9 text-brand" /><p className="mt-10 font-mono text-xs font-bold text-brand">0{index+1}</p><h3 className="mt-3 text-2xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-ink/75">{copy as string}</p></article>})}</div><p className="mt-8 font-semibold text-brand">It doesn&apos;t have to run on memory.</p></div></section>

    <section className="section-pad bg-white"><div className="site-shell max-w-4xl"><h2 className="section-title">You&apos;ve been handling this by hand. And you&apos;ve been doing it well.</h2><div className="mt-7 space-y-5 text-lg font-medium leading-8 text-ink/75"><p>Your team has their own tricks: the notebook, the group chat, the loud kitchen. It works, until a day gets busier than anyone can remember. That&apos;s when orders get missed.</p><p>You don&apos;t have to change how your customers order. Keep WhatsApp. Keep your phone line. OrderPilot makes sure that once an order arrives, it&apos;s written down and visible to your whole team.</p></div></div></section>

    <section id="how" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><SectionHeading eyebrow="How it works" title="Here’s your Friday night, after OrderPilot." description="Customers order the way they already do. Your team handles everything from one clear place." /><OrderWorkflow /></div></section>

    <section id="product" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><SectionHeading eyebrow="See the product" title="See what your team would actually use." description="We’ll walk you through a real order, from the customer’s first message to your kitchen board." /><figure className="image-frame mt-10"><Image src="/assets/orderpilot_kitchen_dashboard.png" alt="Kitchen board with new, preparing, and ready order columns" width={1456} height={1092} className="h-auto w-full" /></figure></div></section>

    <section className="bg-forest py-10 text-white"><div className="site-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><h3 className="text-3xl font-bold">Want to see this with your own menu?</h3><p className="mt-3 max-w-2xl text-lg text-white/80">Show us how orders reach you today. We&apos;ll show you how they would look on OrderPilot.</p></div><div className="flex flex-wrap gap-3"><Link href="#contact" className="button-primary !bg-leaf !text-forest">Book a Demo</Link><Link href="https://wa.me/923361815141" className="button-secondary !border-white/40 !bg-transparent !text-white">Chat on WhatsApp</Link></div></div></section>

    <section className="section-pad bg-cream"><div className="site-shell"><SectionHeading eyebrow="Built for every type of restaurant" title="Whether you run a café or a cloud kitchen, the rush looks the same." description="Different menus, same problem: too many orders coming from too many places." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{restaurantTypes.map(([Icon,title,copy]) => <article key={title} className="panel flex min-h-56 flex-col p-6"><span className="grid size-14 place-items-center rounded-full bg-mint text-brand"><Icon className="size-7" /></span><h3 className="mt-7 text-xl font-bold">{title}</h3><p className="mt-3 text-base leading-6 text-ink/75">{copy}</p></article>)}</div></div></section>

    <section className="section-pad bg-mint"><div className="site-shell"><SectionHeading eyebrow="Your day after" title="End the day with every order in one place." description="A clearer view for the whole team, from counter to kitchen." /><div className="ops-board mt-10"><div className="ops-board-grid">{benefits.map(([Icon,title,copy], index) => <article key={title} className="ops-card"><span className="ops-number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="ops-board-foot"><span>3 ways to order, 1 screen</span></div></div></div></section>

    <section id="pricing" className="section-pad scroll-mt-20 bg-cream"><div className="site-shell"><SectionHeading eyebrow="Pricing" title="Pay the way your business works." description="Pick a monthly plan, or pay as orders come in. We’ll explain the terms before you commit." /><div className="mt-10 grid gap-5 md:grid-cols-2"><PricingCard title="Monthly Subscription" copy="The same bill every month, easy to plan around." cta="Talk about Monthly" /><PricingCard title="Pay-per-Order" copy="A good fit if some days are busy and others are quiet." cta="Talk about Pay-per-Order" /></div></div></section>

    <section id="faq" className="section-pad scroll-mt-20 bg-white"><div className="site-shell"><h2 className="section-title">Questions you might have.</h2><div className="mt-10 max-w-4xl"><FaqList items={visibleFaqs} /></div></div></section>
    <ContactSection />
  </main></AppShell>
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <header className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-5">{title}</h2><p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-ink/75">{description}</p></header> }
function PricingCard({ title, copy, cta }: { title: string; copy: string; cta: string }) { return <article className="panel flex h-full flex-col p-8 sm:p-10"><h3 className="text-3xl font-bold">{title}</h3><p className="mt-5 text-xl font-bold text-brand">Pricing shared on a short call.</p><p className="mt-3 leading-7 text-ink/75">{copy}</p><Link href="https://wa.me/923361815141" className="button-primary mt-8 self-start">{cta} <ArrowRight className="size-4" /></Link></article> }
