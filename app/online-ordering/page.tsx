import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageSquare, Globe, Store, MapPin, Banknote, ShieldCheck, ChefHat, ShoppingBag } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'Online Ordering System for Restaurants in Pakistan',
  description:
    'Launch your restaurant\'s own branded online ordering website. Accept direct delivery and takeaway orders with clear address collection, local payment options, and kitchen board routing.',
  alternates: {
    canonical: '/online-ordering',
  },
  openGraph: {
    title: 'Online Ordering System for Restaurants in Pakistan | OrderPilot',
    description:
      'Launch your restaurant\'s own branded online ordering website. Accept direct delivery and takeaway orders with clear address collection, local payment options, and kitchen board routing.',
    url: '/online-ordering',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot online web ordering dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Ordering System for Restaurants in Pakistan | OrderPilot',
    description:
      'Launch your restaurant\'s own branded online ordering website. Accept direct delivery and takeaway orders with clear address collection, local payment options, and kitchen board routing.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.orderpilot.pk' },
    { '@type': 'ListItem', position: 2, name: 'Online Ordering', item: 'https://www.orderpilot.pk/online-ordering' },
  ],
}

const faqs = [
  {
    question: 'How do customers access my restaurant’s online ordering website?',
    answer:
      'Your restaurant gets its own dedicated, mobile-optimized web ordering link (and custom domain support). You can place this link in your Instagram bio, Facebook page, Google Business Profile, TikTok, and SMS campaigns for diners to order directly.',
  },
  {
    question: 'How do delivery riders know where to deliver?',
    answer:
      'When placing an order, customers choose delivery or takeaway and enter their complete delivery address, contact phone number, and special delivery instructions. Orders appear on your kitchen screen with complete address details for your in-house riders or local delivery partners.',
  },
  {
    question: 'Can I set different delivery fees for different neighborhoods?',
    answer:
      'OrderPilot collects complete address and neighborhood details for delivery or takeaway orders, allowing your team to manage local delivery coverage and apply your restaurant’s delivery policies.',
  },
  {
    question: 'What payment methods can customers use on my website?',
    answer:
      'You can accept Cash on Delivery (COD), JazzCash, EasyPaisa, or direct bank transfer. Diners choose their preferred payment method at checkout, allowing your team to verify payments according to your standard workflow.',
  },
  {
    question: 'Which plan includes direct online web ordering?',
    answer:
      'Online web ordering is included in the Web + Table plan (PKR 7,999/month) and the Complete plan (PKR 12,999/month), both covering up to 1,000 orders per month and kitchen boards. A 14-day free trial is available on all plans. Prices exclude applicable taxes.',
  },
]

export default function OnlineOrderingPage() {
  const whatsappConsultUrl =
    'https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20how%20OrderPilot%20direct%20online%20ordering%20works%20for%20my%20restaurant.'

  return (
    <AppShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        {/* HERO SECTION */}
        <section className="hero-section !pb-12 sm:!pb-16 lg:!pb-20">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Value Proposition & CTAs */}
              <div className="lg:col-span-7">
                <p className="eyebrow">Direct Web Ordering &amp; Takeaway</p>
                <h1 className="display mt-6 max-w-2xl text-balance">
                  Your Restaurant. Your Menu. <span className="text-brand">Your Online Orders.</span>
                </h1>
                <p className="lede mt-6 max-w-xl text-balance">
                  Give your customers a direct, mobile-friendly website to browse your full menu and place delivery or
                  takeaway orders. OrderPilot routes every order straight to your kitchen board while keeping your customer
                  relationships in your hands.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/book-demo?interest=web-menu" className="button-primary">
                    Book Online Ordering Demo <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link href="/pricing" className="button-secondary">
                    View Subscription Plans
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-ink/75 dark:text-white/75">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> Direct kitchen routing
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> You own all customer data
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> Delivery &amp; takeaway coverage
                  </span>
                </div>
              </div>

              {/* Right Column: Branded Restaurant Storefront Device Preview */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md space-y-4">
                  {/* Branded Web Storefront Mockup Card */}
                  <div className="overflow-hidden rounded-2xl border border-forest/15 dark:border-white/10 bg-white dark:bg-[#121e15] shadow-xl">
                    {/* Browser Address Bar */}
                    <div className="flex items-center justify-between border-b border-forest/10 dark:border-white/10 bg-forest/5 dark:bg-white/5 px-4 py-2.5 text-xs text-ink/70 dark:text-white/70">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-red-400" />
                        <span className="size-2 rounded-full bg-yellow-400" />
                        <span className="size-2 rounded-full bg-green-400" />
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[11px] text-ink/80 dark:text-white/80">
                        <Globe className="size-3 text-brand dark:text-leaf" aria-hidden="true" />
                        <span>orderpilot.pk/arabcuisine</span>
                      </div>
                      <span className="text-[10px] text-brand dark:text-leaf font-bold">SSL 🔒</span>
                    </div>

                    {/* Storefront Header */}
                    <div className="flex items-center gap-3 border-b border-forest/5 dark:border-white/5 p-4">
                      <div className="relative size-12 overflow-hidden rounded-xl border border-forest/10 dark:border-white/10">
                        <Image
                          src="/orderpilot-workflow/arab-cuisine-avatar.png"
                          alt="Arab Cuisine Storefront"
                          width={48}
                          height={48}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm text-ink dark:text-white">Arab Cuisine</h3>
                        <p className="text-xs text-ink/65 dark:text-white/65">Delivery &amp; Takeaway · Open 12 PM - 12 AM</p>
                        <div className="mt-1 flex items-center gap-2 text-[10px]">
                          <span className="rounded bg-brand/15 dark:bg-leaf/20 px-1.5 py-0.2 font-semibold text-brand dark:text-leaf">Direct Menu</span>
                          <span className="text-ink/60 dark:text-white/60">30–45 min delivery</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 border-b border-forest/5 dark:border-white/5 px-4 py-2 text-[11px] font-semibold text-ink/70 dark:text-white/70">
                      <span className="rounded-md bg-brand px-2.5 py-0.5 text-white">Burgers</span>
                      <span className="px-2 py-0.5">Shawarma</span>
                      <span className="px-2 py-0.5">Sides</span>
                      <span className="px-2 py-0.5">Drinks</span>
                    </div>

                    {/* Menu Item Display */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 rounded-xl border border-forest/10 dark:border-white/10 bg-cream/50 dark:bg-white/5 p-3">
                        <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-forest/10 dark:border-white/10 bg-white dark:bg-black/20">
                          <Image
                            src="/orderpilot-workflow/burger.webp"
                            alt="Zinger Burger + Fries"
                            width={64}
                            height={64}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-ink dark:text-white">Zinger Burger + Fries</span>
                            <span className="font-mono font-bold text-xs text-brand dark:text-leaf">PKR 850</span>
                          </div>
                          <p className="mt-0.5 text-[10px] text-ink/65 dark:text-white/65 line-clamp-1">
                            Crispy chicken fillet with fries and signature house sauce.
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] text-ink/70 dark:text-white/70">Choice of spice level</span>
                            <span className="rounded-md bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                              Add +
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Active Order Cart Drawer */}
                      <div className="rounded-xl border border-brand/20 dark:border-leaf/20 bg-forest/5 dark:bg-white/5 p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="size-4 text-brand dark:text-leaf" aria-hidden="true" />
                          <div>
                            <span className="font-bold text-ink dark:text-white">Your Cart (1 item)</span>
                            <span className="block text-[10px] text-ink/60 dark:text-white/60">Delivery to DHA / Bahria</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-brand dark:text-leaf">PKR 850</span>
                          <span className="block text-[10px] font-semibold text-ink/75 dark:text-white/75">Routes to Kitchen</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGE SECTION */}
        <section className="section-pad bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">The Direct Ordering Advantage</p>
              <h2 className="section-title">Why Pakistani restaurants build their own direct ordering channel.</h2>
              <p className="section-description mt-4">
                Make it simple for loyal diners to order directly from your restaurant without competing brands or
                unnecessary distractions.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Store className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Your Brand Front &amp; Center</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  When diners look for your food online, give them a clean ordering link dedicated entirely to your menu.
                  No competing restaurants listed above you and no third-party markups on your dishes.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Protect Customer Relationships</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Retain your customers&apos; names, phone numbers, and delivery addresses in your private database.
                  Use your own customer records for direct announcements, menu updates, and repeat orders.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <MapPin className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Delivery &amp; Coverage Flexibility</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Collect accurate neighborhood and delivery address details for every order. Establish minimum order
                  guidelines and delivery parameters that match your restaurant&apos;s operational coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL SHOWCASE */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-y border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Your Branded Storefront</p>
              <h2 className="section-title">A unified web storefront connected directly to your kitchen.</h2>
              <p className="section-description mt-4">
                Give your customers a clean, responsive ordering experience that reflects your restaurant’s brand and
                syncs live with your kitchen board.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-forest/15 dark:border-white/10 bg-forest/5 shadow-2xl">
              <Image
                src="/assets/orderpilot_restaurant_dashboard_showcase.webp"
                alt="OrderPilot branded online ordering storefront and dashboard"
                width={1456}
                height={1092}
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-pad bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">How It Works</p>
              <h2 className="section-title">From digital storefront to doorstep delivery in four steps.</h2>
              <p className="section-description mt-4">
                Start accepting direct orders on your branded website without technical complexity or engineering hassle.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 01
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Configure Your Menu</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Set up your digital menu with food photography, categories, modifiers, addon choices, and prices.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 02
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Share Your Link</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Add your ordering link to your Instagram bio, Facebook page, Google Maps profile, and WhatsApp status.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 03
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Diners Order Directly</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Customers pick delivery or takeaway, specify location details, and choose COD or direct mobile transfer.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 04
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Kitchen Prepares &amp; Dispatches</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  The order rings on your kitchen board. Cooks prepare the food, and your rider delivers hot food on time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-t border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Engineered for Pakistan</p>
              <h2 className="section-title">Features designed for real restaurant operations in Pakistan.</h2>
              <p className="section-description mt-4">
                Everything you need to accept direct orders smoothly without technical headaches.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Banknote className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Flexible Pakistani Payment Methods</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Cash on delivery (COD), JazzCash, EasyPaisa, or direct bank transfer. For online transfers, customers
                    can provide transaction confirmation details for staff verification alongside their order.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Delivery Area &amp; Order Policies</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Capture complete destination details across your city&apos;s key sectors and towns with transparent order
                    requirements for delivery and takeaway.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ChefHat className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Live Kitchen Board Integration</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Online orders flow straight into the same live kitchen board as your WhatsApp and table QR orders. One
                    unified view for all kitchen orders.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Globe className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Direct Customer Data Ownership</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    View customer names, phone numbers, delivery addresses, and ordering habits. Export contact lists
                    anytime for seasonal marketing and VIP promotions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CALLOUT */}
        <section className="section-pad bg-cream dark:bg-[#0b140d]">
          <div className="site-shell max-w-4xl">
            <div className="panel p-8 sm:p-12 text-center dark:bg-[#121e15] dark:border-white/5">
              <p className="eyebrow section-heading-eyebrow justify-center">Transparent Pricing</p>
              <h2 className="section-title mx-auto text-balance">
                Predictable subscription plans with a 14-day free trial.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75 dark:text-white/75 max-w-2xl mx-auto">
                Included in Web + Table plan (PKR 7,999/month) or 8%–10% pay-per-order. Covers up to 1,000 orders/month,
                live kitchen boards, and customer exports. 14-day free trial on all plans. One-time PKR 5,000 setup fee
                applies if continuing. Taxes excluded.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-demo?interest=web-menu" className="button-primary">
                  Book Online Ordering Demo <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/pricing" className="button-secondary">
                  Compare All Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-t border-forest/10 dark:border-white/5">
          <div className="site-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow">Frequently Asked</p>
              <h2 className="section-title mt-4">Questions about direct online ordering.</h2>
              <p className="section-description mt-4">
                Want to see a live web menu in action? Schedule a quick live walkthrough with our team.
              </p>
              <div className="mt-6">
                <a
                  href={whatsappConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                >
                  <MessageSquare className="size-4 text-brand" aria-hidden="true" />
                  Ask Us on WhatsApp
                </a>
              </div>
            </div>

            <FaqList items={faqs} />
          </div>
        </section>

        {/* CROSS-CHANNEL INTERLINKING */}
        <section className="section-pad bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Explore Other Channels</p>
              <h2 className="section-title">More ways to accept direct restaurant orders.</h2>
              <p className="section-description mt-4">
                Manage WhatsApp, table QR, and online website orders from a single screen.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Link
                href="/whatsapp-ordering"
                className="panel p-8 transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-[#121e15] dark:border-white/5 block group"
              >
                <p className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Chat Automation
                </p>
                <h3 className="mt-3 text-xl font-bold dark:text-white group-hover:text-brand dark:group-hover:text-leaf flex items-center justify-between">
                  WhatsApp Food Ordering <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Turn messy WhatsApp voice notes and text messages into organized, structured kitchen orders.
                </p>
              </Link>

              <Link
                href="/qr-table-ordering"
                className="panel p-8 transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-[#121e15] dark:border-white/5 block group"
              >
                <p className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Dine-In Operations
                </p>
                <h3 className="mt-3 text-xl font-bold dark:text-white group-hover:text-brand dark:group-hover:text-leaf flex items-center justify-between">
                  QR Code Table Ordering <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Let dine-in guests scan a table QR code, browse food photos, and review orders from their phone.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
