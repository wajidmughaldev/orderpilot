import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageSquare, Clock, ShieldCheck, Banknote, ChefHat, Sparkles } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'WhatsApp Food Ordering System for Pakistan',
  description:
    'Organize WhatsApp food orders directly for your kitchen. OrderPilot lets Pakistani restaurants share interactive digital menus, verify customer orders, and reduce order mistakes.',
  alternates: {
    canonical: '/whatsapp-ordering',
  },
  openGraph: {
    title: 'WhatsApp Food Ordering System for Pakistan | OrderPilot',
    description:
      'Organize WhatsApp food orders directly for your kitchen. OrderPilot lets Pakistani restaurants share interactive digital menus, verify customer orders, and reduce order mistakes.',
    url: '/whatsapp-ordering',
    images: [{ url: '/assets/orderpilot_kitchen_dashboard.webp', width: 1456, height: 1092, alt: 'OrderPilot WhatsApp kitchen ordering dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Food Ordering System for Pakistan | OrderPilot',
    description:
      'Organize WhatsApp food orders directly for your kitchen. OrderPilot lets Pakistani restaurants share interactive digital menus, verify customer orders, and reduce order mistakes.',
    images: ['/assets/orderpilot_kitchen_dashboard.webp'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.orderpilot.pk' },
    { '@type': 'ListItem', position: 2, name: 'WhatsApp Ordering', item: 'https://www.orderpilot.pk/whatsapp-ordering' },
  ],
}

const faqs = [
  {
    question: 'Do my customers need to download a separate mobile app?',
    answer:
      'No. Your customers do not need to download anything from Google Play or the App Store. When they message your restaurant on WhatsApp, they receive an interactive digital menu link that opens in their mobile browser where they can select items and confirm their order.',
  },
  {
    question: 'Can I keep my restaurant’s existing WhatsApp phone number?',
    answer:
      'Yes. OrderPilot connects to your existing restaurant WhatsApp number. You retain your current number, your customer chat history, and your established brand identity.',
  },
  {
    question: 'How do customers pay for WhatsApp orders in Pakistan?',
    answer:
      'You choose what payment methods your restaurant accepts: Cash on Delivery (COD), JazzCash, EasyPaisa, or direct bank transfer. For digital transfers, customers can provide payment confirmation details for your team to verify alongside the order.',
  },
  {
    question: 'How do WhatsApp orders reach my kitchen team?',
    answer:
      'Every verified WhatsApp order appears on your OrderPilot live kitchen board with an audio notification, order itemization, customer notes, delivery address, and status tracking (New, In Kitchen, Ready, Out for Delivery).',
  },
  {
    question: 'What is the pricing for the WhatsApp ordering plan?',
    answer:
      'The WhatsApp subscription plan is PKR 5,999 per month and covers up to 1,000 orders per month, the live kitchen board, and full customer list exports. A 14-day free trial is available on all plans. A pay-per-order option (8% to 10% per order, Coming Soon) is also planned. Prices exclude applicable taxes.',
  },
]

export default function WhatsAppOrderingPage() {
  const whatsappConsultUrl =
    'https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20how%20OrderPilot%20WhatsApp%20ordering%20works%20for%20my%20restaurant.'

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
                <p className="eyebrow">WhatsApp Ordering System</p>
                <h1 className="display mt-6 max-w-2xl text-balance">
                  Turn WhatsApp Chats Into <span className="text-brand">Organized Kitchen Orders.</span>
                </h1>
                <p className="lede mt-6 max-w-xl text-balance">
                  Pakistani diners love ordering on WhatsApp, but handling voice notes and manual paper slips during dinner
                  rush creates chaos. OrderPilot provides a clean digital menu link and structured order flow that customers
                  open from WhatsApp, routing clear tickets directly to your kitchen screen.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/book-demo?interest=whatsapp" className="button-primary">
                    Book WhatsApp Demo <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={whatsappConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary"
                  >
                    <MessageSquare className="size-4 text-brand" aria-hidden="true" />
                    Talk on WhatsApp
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-ink/75 dark:text-white/75">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> Works with your existing number
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> 14-day free trial on all plans
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> No customer app download
                  </span>
                </div>
              </div>

              {/* Right Column: Real Customer Interaction + Kitchen Workflow Preview */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md space-y-4">
                  {/* WhatsApp Customer Chat Card */}
                  <div className="overflow-hidden rounded-2xl border border-forest/15 dark:border-white/10 bg-white dark:bg-[#121e15] shadow-xl">
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 border-b border-forest/10 dark:border-white/10 bg-forest/5 dark:bg-white/5 px-4 py-3">
                      <div className="relative size-10 overflow-hidden rounded-full border border-forest/15 dark:border-white/10">
                        <Image
                          src="/orderpilot-workflow/arab-cuisine-avatar.png"
                          alt="Arab Cuisine Restaurant"
                          width={40}
                          height={40}
                          className="size-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-ink dark:text-white">Arab Cuisine</span>
                        <p className="text-xs text-ink/60 dark:text-white/60">WhatsApp Business Account</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-3 p-4 text-xs">
                      {/* Customer Message */}
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-[#dcf8c6] dark:bg-[#005f00]/40 px-3.5 py-2 text-ink dark:text-white shadow-sm">
                          <p className="font-medium">Hi! I&apos;d like to order 1 Zinger Burger + Fries</p>
                          <span className="mt-1 block text-right text-[10px] text-ink/50 dark:text-white/50">9:41 PM ✓✓</span>
                        </div>
                      </div>

                      {/* Interactive Product Confirmation from OrderPilot */}
                      <div className="rounded-xl border border-forest/10 dark:border-white/10 bg-cream/70 dark:bg-white/5 p-3">
                        <div className="flex items-center gap-3">
                          <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-forest/10 dark:border-white/10 bg-white dark:bg-black/20">
                            <Image
                              src="/orderpilot-workflow/burger.webp"
                              alt="Zinger Burger + Fries"
                              width={56}
                              height={56}
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-ink dark:text-white">Zinger Burger + Fries</span>
                              <span className="font-mono font-bold text-brand dark:text-leaf">PKR 850</span>
                            </div>
                            <p className="text-[11px] text-ink/65 dark:text-white/65">Crispy fillet, signature sauce, hot fries</p>
                            <div className="mt-1 flex items-center justify-between text-[11px]">
                              <span className="font-medium text-ink/75 dark:text-white/75">Qty: 1</span>
                              <span className="font-semibold text-brand dark:text-leaf">✓ Details Confirmed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connected Kitchen Board Ticket */}
                  <div className="overflow-hidden rounded-2xl border border-brand/20 dark:border-leaf/20 bg-forest text-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <ChefHat className="size-4 text-leaf" aria-hidden="true" />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-leaf">
                          Kitchen Screen · Ticket #1042
                        </span>
                      </div>
                      <span className="rounded bg-leaf/20 px-2 py-0.5 text-[10px] font-bold text-leaf">
                        In Kitchen
                      </span>
                    </div>
                    <div className="p-4 text-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-white text-sm">1× Zinger Burger + Fries</p>
                          <p className="text-white/70 mt-0.5">Note: Spicy fillet, extra garlic mayo</p>
                        </div>
                        <span className="font-mono text-white/90">PKR 850</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-white/70">
                        <span>Channel: WhatsApp Delivery</span>
                        <span>Payment: Cash on Delivery (COD)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-[11px] text-ink/60 dark:text-white/60">
                    Illustrative workflow demonstration. Menus and kitchen tickets are configured for your restaurant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="section-pad bg-cream dark:bg-[#0b140d]">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">The Problem in Pakistan</p>
              <h2 className="section-title">Why manual WhatsApp ordering breaks during dinner rush.</h2>
              <p className="section-description mt-4">
                Between 8 PM and 11 PM, Pakistani restaurants, burger joints, and cloud kitchens face a flood of chat
                messages and voice notes. Relying on staff memory and handwritten paper slips leads to costly mistakes.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Clock className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Unclear Voice Notes</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Customers send audio notes with noisy backgrounds. Staff mishear customizations like spice level, extra
                  sauces, or dietary requests, resulting in customer frustration and remade food.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Banknote className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Payment Screenshot Delays</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Diners send bank transfer, JazzCash, or EasyPaisa screenshots. Cashiers spend minutes checking bank SMS
                  alerts before approving the food, slowing down kitchen preparation.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Customer Data Masking</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Third-party marketplaces hide your customers&apos; contact details and list competitors right next to
                  your food. When regular diners order direct on WhatsApp, you keep your customer records and build
                  direct loyalty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL SHOWCASE */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-y border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Real Kitchen Visibility</p>
              <h2 className="section-title">A live kitchen display board built for WhatsApp order flow.</h2>
              <p className="section-description mt-4">
                Orders confirmed through WhatsApp appear clearly on your live kitchen board. Your kitchen staff see exactly
                what to cook, special instructions, and delivery status without shouting across the counter.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-forest/15 dark:border-white/10 bg-forest/5 shadow-2xl">
              <Image
                src="/assets/orderpilot_kitchen_dashboard.webp"
                alt="OrderPilot live kitchen display board for WhatsApp orders"
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
              <h2 className="section-title">From WhatsApp message to hot meal in four simple steps.</h2>
              <p className="section-description mt-4">
                Keep the ordering channel your customers already use while giving your restaurant team an organized,
                structured kitchen ordering process.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 01
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Customer Messages WhatsApp</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Diner sends a message to your WhatsApp business number and receives a direct link to your interactive
                  menu.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 02
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Selects Items &amp; Delivery</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Customer selects food items, spicy levels, drinks, inputs their delivery address, and chooses payment
                  method.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 03
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Kitchen Board Receives Order</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  The order appears on your live screen with an audio chime, clear itemized list, and receipt proof if
                  paying digitally.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 04
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Dispatched to Customer</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Staff move order to ready, assign to your rider, and keep customer contact details saved in your private
                  database.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-t border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Real Product Capabilities</p>
              <h2 className="section-title">Engineered specifically for Pakistani restaurant operations.</h2>
              <p className="section-description mt-4">
                Built to solve the day-to-day challenges of running food delivery and takeaway in Karachi, Lahore,
                Islamabad, Rawalpindi, and across Pakistan.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ChefHat className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Live Kitchen Display &amp; Statuses</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Keep your kitchen organized with real-time order columns: New, In Kitchen, Ready, Out for Delivery,
                    and Completed. Audio chimes ensure cooks never miss a ticket.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">100% Customer List Ownership</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Unlike third-party aggregator apps that mask phone numbers, OrderPilot saves customer contact details
                    in your private dashboard. Export phone numbers anytime for announcements and promos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Banknote className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Local Payment Options</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Accept Cash on Delivery, JazzCash, EasyPaisa, or direct bank transfer. Customers provide payment confirmation
                    details so your team can verify transactions before cooking starts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Sparkles className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Local Delivery &amp; Address Capture</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Capture complete neighborhood and address details for every order, helping riders fulfill deliveries
                    accurately across DHA, Gulberg, Bahria Town, or your service area.
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
                Start WhatsApp ordering with a 14-day free trial.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75 dark:text-white/75 max-w-2xl mx-auto">
                PKR 5,999/month (covers up to 1,000 orders) or 8%–10% pay-per-order (Coming Soon). Includes 14-day free trial, live
                kitchen board, and customer list exports. One-time PKR 5,000 setup fee applies only if you continue. Taxes excluded.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-demo?interest=whatsapp" className="button-primary">
                  Book WhatsApp Demo <ArrowRight className="size-4" aria-hidden="true" />
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
              <h2 className="section-title mt-4">Questions about WhatsApp ordering.</h2>
              <p className="section-description mt-4">
                Have more questions? Contact our team on WhatsApp anytime for an immediate consultation.
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
                OrderPilot unites all ordering channels in one unified kitchen screen.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
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

              <Link
                href="/online-ordering"
                className="panel p-8 transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-[#121e15] dark:border-white/5 block group"
              >
                <p className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Direct Web Storefront
                </p>
                <h3 className="mt-3 text-xl font-bold dark:text-white group-hover:text-brand dark:group-hover:text-leaf flex items-center justify-between">
                  Direct Online Web Ordering <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Set up your restaurant&apos;s own branded delivery and pickup website with direct kitchen routing.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
