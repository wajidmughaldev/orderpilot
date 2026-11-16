import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageSquare, QrCode, Sparkles, ChefHat, Clock, Smartphone } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'QR Code Table Ordering for Pakistani Restaurants',
  description:
    'Enable contactless QR code table ordering in your restaurant. Let diners scan, browse the digital menu, and submit orders directly from their table.',
  alternates: {
    canonical: '/qr-table-ordering',
  },
  openGraph: {
    title: 'QR Code Table Ordering for Pakistani Restaurants | OrderPilot',
    description:
      'Enable contactless QR code table ordering in your restaurant. Let diners scan, browse the digital menu, and submit orders directly from their table.',
    url: '/qr-table-ordering',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot QR table ordering showcase' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Table Ordering for Pakistani Restaurants | OrderPilot',
    description:
      'Enable contactless QR code table ordering in your restaurant. Let diners scan, browse the digital menu, and submit orders directly from their table.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.orderpilot.pk' },
    { '@type': 'ListItem', position: 2, name: 'QR Table Ordering', item: 'https://www.orderpilot.pk/qr-table-ordering' },
  ],
}

const faqs = [
  {
    question: 'Do customers need to download an application to scan the QR code?',
    answer:
      'No. Guests point their phone camera at the QR standee to open your digital menu in their mobile browser—no app download or registration needed.',
  },
  {
    question: 'How do orders know which dining table they belong to?',
    answer:
      'Each table has its own unique QR code. When guests submit their order, it arrives on your kitchen screen labeled with their exact table number.',
  },
  {
    question: 'How does billing work for table QR orders?',
    answer:
      'Diners view an itemized bill on their phones, making group checks easy to verify before settling up with the floor captain or cashier.',
  },
  {
    question: 'Can diners still pay the waiter with cash?',
    answer:
      'Yes. Diners can pay cash to the waiter at the table, pay at the counter, or submit digital payment via JazzCash, EasyPaisa, or bank transfer.',
  },
  {
    question: 'Which OrderPilot subscription plan includes table QR ordering?',
    answer:
      'Table QR ordering is included as a core operational feature at 0% commission. Only completed WhatsApp AI orders carry a 5% commission. Includes a 14-day free trial on approval, zero platform subscription fee, and zero setup fee. Taxes excluded.',
  },
]

export default function QrTableOrderingPage() {
  const whatsappConsultUrl =
    'https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20how%20OrderPilot%20QR%20table%20ordering%20works%20for%20my%20dine-in%20restaurant.'

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
                <p className="eyebrow">Dine-In Table QR Ordering</p>
                <h1 className="display mt-6 max-w-2xl text-balance">
                  Let Customers Order <span className="text-brand">Straight from Their Table.</span>
                </h1>
                <p className="lede mt-6 max-w-xl text-balance">
                  Give dine-in guests an interactive digital menu right at their seat. Diners scan a table QR standee with
                  their phone camera to browse food photos, submit orders directly to your kitchen screen, and review their
                  order with zero app downloads.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/book-demo?interest=table-qr" className="button-primary">
                    Book Table QR Demo <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link href="/pricing" className="button-secondary">
                    View Pricing Plans
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-ink/75 dark:text-white/75">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> Zero app download required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> Works on iOS &amp; Android
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-brand dark:text-leaf" aria-hidden="true" /> Itemized table order review
                  </span>
                </div>
              </div>

              {/* Right Column: Physical Table QR Standee + Customer Mobile Menu Experience */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md space-y-4">
                  {/* Customer Mobile Digital Menu Card */}
                  <div className="overflow-hidden rounded-2xl border border-forest/15 dark:border-white/10 bg-white dark:bg-[#121e15] shadow-xl">
                    {/* Table Menu Top Bar */}
                    <div className="flex items-center justify-between border-b border-forest/10 dark:border-white/10 bg-forest/5 dark:bg-white/5 px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative size-8 overflow-hidden rounded-full border border-forest/10 dark:border-white/10">
                          <Image
                            src="/orderpilot-workflow/arab-cuisine-avatar.png"
                            alt="Arab Cuisine Restaurant"
                            width={32}
                            height={32}
                            className="size-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-ink dark:text-white">Arab Cuisine</span>
                          <span className="text-[10px] text-ink/60 dark:text-white/60">Dine-In Menu</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-brand/15 dark:bg-leaf/20 px-2.5 py-0.5 text-xs font-bold text-brand dark:text-leaf">
                        Table 12
                      </span>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 border-b border-forest/5 dark:border-white/5 px-4 py-2 text-[11px] font-semibold text-ink/70 dark:text-white/70 overflow-x-auto">
                      <span className="rounded-md bg-brand px-2 py-0.5 text-white">Burgers</span>
                      <span className="px-2 py-0.5">Sides</span>
                      <span className="px-2 py-0.5">Drinks</span>
                      <span className="px-2 py-0.5">Desserts</span>
                    </div>

                    {/* Featured Dish from QR Scan */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 rounded-xl border border-forest/10 dark:border-white/10 bg-cream/50 dark:bg-white/5 p-3">
                        <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-forest/10 dark:border-white/10 bg-white dark:bg-black/20">
                          <Image
                            src="/orderpilot-workflow/burger-qr.webp"
                            alt="Zinger Burger and Fries"
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
                            Crispy chicken, fresh lettuce, secret sauce, hot fries
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-ink/75 dark:text-white/75">Qty: 1</span>
                            <span className="rounded-md bg-brand/15 dark:bg-leaf/20 px-2 py-0.5 text-[10px] font-bold text-brand dark:text-leaf">
                              Added to Order
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Active Table Order Status */}
                      <div className="rounded-lg bg-forest/5 dark:bg-white/5 px-3 py-2 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-ink/80 dark:text-white/80">Active Check · Table 12</span>
                        <span className="font-bold text-brand dark:text-leaf">Sent to Kitchen</span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Table QR Standee Preview Card */}
                  <div className="flex items-center gap-4 rounded-2xl border border-forest/15 dark:border-white/10 bg-white/90 dark:bg-[#121e15] p-3.5 shadow-lg">
                    <div className="size-14 shrink-0 rounded-xl bg-forest/10 dark:bg-white/10 p-2 flex items-center justify-center">
                      <Image
                        src="/orderpilot-workflow/sample-qr.svg"
                        alt="Table QR Code"
                        width={40}
                        height={40}
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <QrCode className="size-3.5 text-brand dark:text-leaf" aria-hidden="true" />
                        <span className="text-xs font-bold text-ink dark:text-white">Table QR Standee</span>
                      </div>
                      <p className="text-[11px] text-ink/70 dark:text-white/70 mt-0.5">
                        Unique table code printed on durable acrylic standee. Diners scan with standard camera app.
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-[11px] text-ink/60 dark:text-white/60">
                    Illustrative table ordering demonstration. Standees and digital menus are customized for your floor layout.
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
              <p className="eyebrow section-heading-eyebrow">Floor Bottlenecks</p>
              <h2 className="section-title">Why traditional paper table service slows down busy evenings.</h2>
              <p className="section-description mt-4">
                During peak dinner shifts, waiters rush across crowded dining rooms. Paper menus create delays and
                order misunderstandings.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Clock className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Waiting for Paper Menus</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  When the dining hall fills up, guests wait several minutes just to get a waiter&apos;s attention for
                  printed menu cards.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <QrCode className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Sold-Out Surprises</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Waiters take orders on paper, walk to the kitchen, and discover a dish is sold out, forcing a second
                  trip back to the table.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Smartphone className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Group Bill Tally Delays</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Large families and friends take time deciphering handwritten checks. A digital summary makes bill
                  review fast and transparent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL SHOWCASE */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-y border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Kitchen Display</p>
              <h2 className="section-title">Table orders sent straight to your kitchen screen.</h2>
              <p className="section-description mt-4">
                When seated guests order from their table, tickets land directly on your kitchen screen with the table
                number, item notes, and order time.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-forest/15 dark:border-white/10 bg-forest/5 shadow-2xl">
              <Image
                src="/assets/orderpilot_kitchen_dashboard.webp"
                alt="OrderPilot restaurant table ordering kitchen display"
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
              <h2 className="section-title">From table scan to kitchen ticket in four simple steps.</h2>
              <p className="section-description mt-4">
                A reliable digital workflow connecting seated diners directly to your kitchen screen.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 01
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Scan Table QR</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Guest sits down and points their smartphone camera at the customized QR standee on Table 5.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 02
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Browse Digital Menu</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Your menu opens in their mobile browser with dish photos, ingredient details, and spice options.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 03
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Submit to Kitchen</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Guests confirm their choices. The ticket chimes onto the kitchen display labeled with Table 5.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 04
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Serve &amp; Settle Bill</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Staff deliver hot food to Table 5 with clear tickets, and guests settle with cash or digital transfer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-t border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Floor Operations</p>
              <h2 className="section-title">Faster table turns while staff focus on hospitality.</h2>
              <p className="section-description mt-4">
                Designed to help dining halls and cafés seat guests and process orders without paper chit chaos.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Smartphone className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Digital Bill &amp; Order Review</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Guests review all ordered dishes, quantities, and running totals directly on their phone screen for
                    fast and transparent settlement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ChefHat className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Instant Out-of-Stock Controls</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    When dishes sell out, toggle availability in your dashboard so table menus update immediately without
                    wasted waiter trips.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Sparkles className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Photo Menus &amp; Modifiers</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Diners browse dish photography, ingredients, and addon options so they can order confidently at their
                    own pace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Clock className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Table-Tagged Kitchen Tickets</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Every order card arriving on the kitchen display is automatically tagged with the table number to avoid
                    delivery mix-ups.
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
                Table QR ordering is included at 0% commission.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75 dark:text-white/75 max-w-2xl mx-auto">
                Table QR ordering is a core operational feature with 0% platform commission. Only completed WhatsApp orders carry a 5% commission. Includes a 14-day free trial upon restaurant approval, zero platform fee, and zero setup fee. Taxes excluded.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-demo?intent=trial" className="button-primary">
                  Start 14-Day Free Trial <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/pricing" className="button-secondary">
                  See Pricing Details
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
              <h2 className="section-title mt-4">Questions about table QR ordering.</h2>
              <p className="section-description mt-4">
                Wondering how table QR codes integrate with your floor layout? Talk to our restaurant team today.
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
                Connect your dine-in tables, delivery website, and WhatsApp into one live kitchen board.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Link
                href="/whatsapp-ordering"
                className="panel p-8 transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-[#121e15] dark:border-white/5 block group"
              >
                <p className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  WhatsApp Food Ordering
                </p>
                <h3 className="mt-3 text-xl font-bold dark:text-white group-hover:text-brand dark:group-hover:text-leaf flex items-center justify-between">
                  WhatsApp Digital Menu Ordering <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Share an interactive digital menu link directly in WhatsApp chats so customers can select dishes and send organized orders to your kitchen board.
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
