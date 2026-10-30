import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Files, RefreshCw, ChefHat, Users, Store, Check, UtensilsCrossed, Coffee, Sandwich, Cloud, Building2, Croissant, Martini, Soup, QrCode, Monitor, CreditCard } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import OrderWorkflow from '@/components/order-workflow'
import { FaqList } from '@/components/faq-list'
import { ContactSection } from '@/components/contact-section'
import { PartnersSection } from '@/components/partners-section'

export const metadata: Metadata = {
  title: 'OrderPilot — Ordering Software for Pakistani Restaurants',
  description: 'Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'OrderPilot — Every order, on one screen.',
    description: 'Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.',
    url: '/',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot restaurant dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrderPilot — Every order, on one screen.',
    description: 'Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OrderPilot',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, WhatsApp',
  description: 'Multi-channel restaurant ordering software for WhatsApp, online web menus, and table QR ordering.',
  offers: [
    { '@type': 'Offer', name: 'WhatsApp Plan', price: '9999', priceCurrency: 'PKR', billingDuration: 'P1M' },
    { '@type': 'Offer', name: 'Web + Table Plan', price: '9999', priceCurrency: 'PKR', billingDuration: 'P1M' },
    { '@type': 'Offer', name: 'Complete Plan', price: '14999', priceCurrency: 'PKR', billingDuration: 'P1M' },
  ],
}

const whatYouGetTiles = [
  {
    icon: Monitor,
    number: '01',
    title: 'One screen for every order.',
    copy: 'WhatsApp, web and table QR orders land on one kitchen board.',
  },
  {
    icon: CreditCard,
    number: '02',
    title: 'Pay the way Pakistan pays.',
    copy: 'Cash on delivery, JazzCash, EasyPaisa or bank transfer. For transfers, customers upload a receipt and your manager approves it before the kitchen starts.',
  },
  {
    icon: ChefHat,
    number: '03',
    title: 'A screen for your kitchen.',
    copy: 'Pair a kitchen display with a code. Your cooks see tickets without logging into your account.',
  },
  {
    icon: QrCode,
    number: '04',
    title: 'Table QR that stays with the guest.',
    copy: 'Guests add more orders during their visit, call the waiter, or ask for the bill. Your staff handle each request.',
  },
  {
    icon: RefreshCw,
    number: '05',
    title: 'Customers know where their order is.',
    copy: 'New, preparing, ready. WhatsApp customers get updates automatically.',
  },
  {
    icon: Users,
    number: '06',
    title: 'Your customers, in one place.',
    copy: 'Names, order history and notes for every customer. Filter your VIP and regular customers.',
  },
]

const faqs = [
  {
    question: 'How much does it cost?',
    answer: 'Plans start at PKR 9,999 a month. Complete, with everything included, is PKR 14,999. Or you can pay 10% to 15% of each order, depending on your usage. Message us on WhatsApp and we’ll tell you which one costs less for you.',
  },
  {
    question: 'Which plan should I pick?',
    answer: 'If customers order only on WhatsApp, or only through your web menu and table QR, the PKR 9,999 plans cover it. If you want all three ways to order, Complete costs less than buying both. If you’re just starting and your orders are low, pay per order may cost less. Tell us roughly how many orders you get and we’ll work it out with you.',
  },
  {
    question: 'What if my staff can’t use it?',
    answer: 'We show your team how it works before you start.',
  },
  {
    question: 'How do customers pay?',
    answer: 'You choose what to accept: cash on delivery, JazzCash, EasyPaisa or bank transfer. For transfers, the customer uploads a receipt and your manager approves it before the kitchen starts. Your customers pay you directly.',
  },
  {
    question: 'Can I use it for dine-in, takeaway and delivery?',
    answer: 'Yes. Table QR for dine-in, plus takeaway and delivery orders, all on one screen. For delivery you can set a fee by area. In the demo we’ll go through which ones suit your restaurant.',
  },
  {
    question: 'Do I keep my customer list?',
    answer: 'Yes. Your customers’ names, contact details and order history are in your account, and only your restaurant can see them.',
  },
]

// Maintained in codebase per build note:
const hiddenFaqs = [
  'setup time',
  'existing WhatsApp number',
  'cancellation',
  'what to install',
  'customer app download',
  'branding',
]
void hiddenFaqs

export default function HomePage() {
  const whatsappHeroUrl = "https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20OrderPilot%20with%20my%20restaurant%27s%20menu."

  return (
    <AppShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />

        {/* HERO */}
        <section className="hero-section">
          <div className="site-shell grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
            <div>
              <p className="eyebrow">ORDERING SOFTWARE FOR PAKISTANI RESTAURANTS</p>
              <h1 className="display mt-6">Every order, <span className="text-brand">on one screen.</span></h1>
              <p className="section-description mt-5 max-w-[640px] text-base sm:text-lg">
                Customers order on WhatsApp, your website or a table QR. Every order shows up on one screen, so your kitchen knows what to make next.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book-demo" className="button-primary">Book a Demo <ArrowRight /></Link>
                <Link href={whatsappHeroUrl} className="button-secondary">Chat on WhatsApp</Link>
              </div>
              <p className="mt-4 text-sm font-medium text-ink/80">
                Plans from PKR 9,999 a month. We&apos;ll show it with your own menu. No pressure to decide.
              </p>
            </div>
            <figure className="image-frame">
              <Image
                src="/assets/orderpilot_restaurant_dashboard_showcase.webp"
                alt="OrderPilot restaurant dashboard beside a WhatsApp ordering conversation"
                width={1456}
                height={1092}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full scale-[1.03]"
              />
            </figure>
          </div>
        </section>

        {/* LOGO STRIP */}
        <PartnersSection />

        {/* PROBLEM */}
        <section className="section-pad bg-cream">
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">THE PROBLEM</p>
              <h2 className="section-title">Orders come from too many places.</h2>
              <p className="section-description mt-4">On a busy night, that gets messy.</p>
            </header>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                [MessageCircle, 'Orders get buried in chats.', 'A message comes in at 8:40, another at 8:42. By 9:00 you’re scrolling up to find the first one.'],
                [Files, 'The kitchen hears it late.', 'Someone reads the order out, someone writes it down, and something gets missed.'],
                [RefreshCw, 'Customers keep calling.', '“Bhai, mera order kahan hai?” Your staff stop what they’re doing to check.'],
              ].map(([Icon, title, copy], index) => {
                const I = Icon as typeof MessageCircle
                return (
                  <article key={title as string} className="panel flex h-full flex-col p-7 sm:p-8">
                    <I className="size-9 text-brand" />
                    <p className="mt-8 font-mono text-xs font-bold text-brand">0{index + 1}</p>
                    <h3 className="mt-3 text-2xl font-bold">{title as string}</h3>
                    <p className="mt-3 text-base leading-7 text-ink/80">{copy as string}</p>
                  </article>
                )
              })}
            </div>
            <p className="mt-8 max-w-4xl text-lg font-semibold text-brand">
              You&apos;re not doing anything wrong. There are just too many places to look. OrderPilot puts them in one.
            </p>
          </div>
        </section>

        {/* REPLACE THE ORDERPILOT SOLUTION */}
        <section className="section-pad bg-white border-y border-forest/10">
          <div className="site-shell max-w-3xl">
            <h2 className="section-title">You don&apos;t have to change how customers order.</h2>
            <p className="section-description mt-5 max-w-[640px] text-base sm:text-lg">
              Your team already has a way of handling orders. We&apos;re not here to change your menu or your customers. We give every order one place to land, so it&apos;s written down where your whole team can see it.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section-pad scroll-mt-20 bg-white">
          <div className="site-shell">
            <OrderWorkflow />
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="section-pad bg-cream">
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">WHO IT&apos;S FOR</p>
              <h2 className="section-title">Works for any kind of restaurant.</h2>
              <p className="section-description mt-4">Whatever you serve, orders come from the same places.</p>
            </header>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [UtensilsCrossed, 'Fine Dining', 'Table orders reach the kitchen without anyone running back and forth.'],
                [Soup, 'Casual Dining', 'Dine-in, takeaway and delivery in one list.'],
                [Coffee, 'Cafés', 'Counter, table and repeat orders in one queue.'],
                [Sandwich, 'Quick Service / Fast Food', 'Lots of orders, fast. Everyone sees what’s next.'],
                [Cloud, 'Cloud Kitchens', 'WhatsApp and website orders on one screen.'],
                [Building2, 'Food Courts', 'A small team handling a big rush.'],
                [Croissant, 'Bakeries', 'Pre-orders, custom cakes and pickups, written down.'],
                [Martini, 'Juice Bars / Lounges', 'Guests order, staff keep serving.'],
              ].map(([Icon, title, copy]) => {
                const I = Icon as typeof Store
                return (
                  <article key={title as string} className="panel flex min-h-[15rem] flex-col justify-start p-6 sm:p-7">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mint text-brand">
                      <I className="size-7" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold">{title as string}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ink/80">{copy as string}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section id="what-you-get" className="section-pad scroll-mt-20 bg-mint">
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">WHAT YOU GET</p>
              <h2 className="section-title">What you get.</h2>
              <p className="section-description mt-4">Use all of it, or only the parts you need.</p>
            </header>

            <div className="ops-board mt-10">
              <div className="ops-board-head">
                <span>YOUR SCREEN</span>
                <span>ALL ORDERS IN ONE PLACE</span>
              </div>
              <div className="ops-board-grid">
                {whatYouGetTiles.map((tile) => {
                  const Icon = tile.icon
                  return (
                    <article key={tile.title} className="ops-card">
                      <span className="ops-number">{tile.number}</span>
                      <Icon />
                      <h3>{tile.title}</h3>
                      <p>{tile.copy}</p>
                    </article>
                  )
                })}
              </div>
              <div className="ops-board-foot">
                <span>3 WAYS TO ORDER</span>
                <span>1 SCREEN</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEE THE PRODUCT */}
        <section id="product" className="section-pad scroll-mt-20 bg-white">
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">SEE THE PRODUCT</p>
              <h2 className="section-title">Take a look.</h2>
              <p className="section-description mt-4">This is the screen your team uses during service.</p>
            </header>
          </div>
        </section>

        {/* MID-PAGE CTA */}
        <section className="bg-forest py-16 sm:py-20 text-white">
          <div className="site-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-3xl sm:text-4xl font-bold">Want to see it with your own menu?</h3>
              <p className="mt-3 text-base sm:text-lg text-white/85">
                Tell us how orders reach you now. We&apos;ll show you how they would look on OrderPilot.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-demo" className="button-primary !bg-leaf !text-forest hover:!bg-white">
                Book a Demo
              </Link>
              <Link
                href={whatsappHeroUrl}
                className="button-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-pad scroll-mt-20 bg-cream !pb-12 sm:!pb-16">
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">PRICING</p>
              <h2 className="section-title">Pricing.</h2>
              <p className="section-description mt-4">
                All prices are in PKR. Pick the plan that fits how your customers order.
              </p>
            </header>

            {/* Three monthly cards */}
            <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
              {/* Card 1: WhatsApp */}
              <article className="flex h-full flex-col rounded-[2rem] border border-forest/15 bg-white p-7 sm:p-9 shadow-sm">
                <h3 className="text-2xl font-bold">WhatsApp</h3>
                <p className="mt-4 text-3xl font-extrabold text-brand">PKR 9,999 <span className="text-base font-medium text-ink/70">/ month</span></p>
                <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                  {['WhatsApp ordering', 'Kitchen board and kitchen display', 'Customer records', 'Cash, JazzCash, EasyPaisa and bank transfer payments'].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/923361815141?text=Hi%2C%20I%27m%20interested%20in%20the%20WhatsApp%20plan%20for%20my%20restaurant."
                  className="button-primary mt-8 justify-center text-center"
                >
                  Get WhatsApp plan
                </a>
              </article>

              {/* Card 2: Web + Table */}
              <article className="flex h-full flex-col rounded-[2rem] border border-forest/15 bg-white p-7 sm:p-9 shadow-sm">
                <h3 className="text-2xl font-bold">Web + Table</h3>
                <p className="mt-4 text-3xl font-extrabold text-brand">PKR 9,999 <span className="text-base font-medium text-ink/70">/ month</span></p>
                <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                  {['Web menu', 'Table QR ordering', 'Kitchen board and kitchen display', 'Customer records', 'Cash, JazzCash, EasyPaisa and bank transfer payments'].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/923361815141?text=Hi%2C%20I%27m%20interested%20in%20the%20Web%20%2B%20Table%20plan%20for%20my%20restaurant."
                  className="button-primary mt-8 justify-center text-center"
                >
                  Get Web + Table plan
                </a>
              </article>

              {/* Card 3: Complete */}
              <article className="relative flex h-full flex-col rounded-[2rem] border-2 border-brand bg-white p-7 sm:p-9 shadow-md">
                <div className="absolute -top-3.5 right-7 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Best value
                </div>
                <h3 className="text-2xl font-bold">Complete</h3>
                <p className="mt-4 text-3xl font-extrabold text-brand">PKR 14,999 <span className="text-base font-medium text-ink/70">/ month</span></p>
                <p className="mt-3 font-semibold text-ink/90">Everything in WhatsApp and Web + Table.</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/70">
                  Both plans above cost PKR 19,998. Complete saves you PKR 4,999 a month.
                </p>
                <ul className="mt-5 flex flex-1 flex-col gap-3.5">
                  {[
                    'WhatsApp, Web menu, and Table QR ordering',
                    'Kitchen board and kitchen display',
                    'Customer records',
                    'Cash, JazzCash, EasyPaisa and bank transfer payments',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/923361815141?text=Hi%2C%20I%27m%20interested%20in%20the%20Complete%20plan%20for%20my%20restaurant."
                  className="button-primary mt-8 justify-center text-center"
                >
                  Get Complete
                </a>
              </article>
            </div>

            {/* Full-width strip below the cards */}
            <div className="mt-8 rounded-[2rem] border border-forest/15 bg-white p-7 sm:p-9 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl font-bold">Pay per order: 10% to 15% of each order</h3>
                  <div className="mt-4 space-y-2 text-base leading-relaxed text-ink/80">
                    <p>Your rate depends on your usage. We confirm it with you before you start. Includes everything in Complete.</p>
                    <p>You get a weekly statement and pay us by bank transfer or wallet.</p>
                    <p>A good fit when you&apos;re starting out or your orders are low.</p>
                    <p>If your monthly orders are under about PKR 100,000, pay per order usually costs less. Above about PKR 150,000, a monthly plan costs less.</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <a
                    href="https://wa.me/923361815141?text=Hi%2C%20I%27m%20interested%20in%20the%20Pay%20per%20order%20plan%20for%20my%20restaurant."
                    className="button-primary justify-center text-center whitespace-nowrap"
                  >
                    Start pay per order
                  </a>
                </div>
              </div>
            </div>

            {/* Line under everything */}
            <p className="mt-6 text-center text-sm font-semibold text-ink/80">
              Not sure which fits? Message us on WhatsApp and we&apos;ll work it out with your numbers.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section-pad scroll-mt-20 bg-cream">
          <div className="site-shell">
            <header className="section-heading">
              <p className="eyebrow section-heading-eyebrow">FAQ</p>
              <h2 className="section-title">Questions.</h2>
              <p className="section-description mt-4">Quick answers about cost, plans and payment.</p>
            </header>
            <div className="mt-10 w-full">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <ContactSection />
      </main>
    </AppShell>
  )
}
