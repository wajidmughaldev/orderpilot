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
      'No. Customers simply point their iPhone or Android camera at the table QR code. Your interactive digital menu opens immediately in their default mobile web browser with no app installation or account registration required.',
  },
  {
    question: 'How do orders know which dining table they belong to?',
    answer:
      'Each table has its own unique QR code linked to that specific table number (e.g. Table 4, Family Hall 2, Rooftop 7). When the diner submits their order, it arrives on your live kitchen board clearly marked with their exact table location.',
  },
  {
    question: 'How does billing work for table QR orders?',
    answer:
      'Diners can review their itemized order directly on their phones, making it easy for groups to check their bill and settle payment with the floor staff or cashier.',
  },
  {
    question: 'Can diners still pay the waiter with cash?',
    answer:
      'Yes. Your restaurant chooses the payment workflow: guests can pay cash to the captain/waiter at the table, pay at the counter, or complete digital payments (JazzCash, EasyPaisa, or bank transfer).',
  },
  {
    question: 'Which OrderPilot subscription plan includes table QR ordering?',
    answer:
      'Table QR ordering is included in the Web + Table plan (PKR 7,999/month) and the Complete plan (PKR 12,999/month), both covering up to 1,000 orders per month and kitchen boards. A 14-day free trial is available on all plans. Prices exclude applicable taxes.',
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
              <p className="eyebrow section-heading-eyebrow">The Dine-In Service Flow</p>
              <h2 className="section-title">Common bottlenecks in traditional floor service.</h2>
              <p className="section-description mt-4">
                During busy evening dinner shifts, floor teams balance multiple tables at once. Manual paper processes
                often create unnecessary waiting times for guests.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Clock className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Peak Hour Table Waiting</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  When the dining hall fills up, staff are busy serving hot food. New tables often wait several minutes
                  just to catch someone’s eye for a printed menu card.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <QrCode className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Outdated Paper Menus</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Reprinting paper menus for price updates or seasonal items takes time. When a specialty dish runs out
                  mid-shift, paper menus cannot reflect it immediately.
                </p>
              </div>

              <div className="panel p-7 dark:bg-[#121e15] dark:border-white/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Smartphone className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Group Bill Review Delays</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Large family gatherings, corporate lunches, and groups often take time to review items at the table.
                  An itemized digital menu makes checking table orders straightforward before settling up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL SHOWCASE */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-y border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Interactive Dine-In Technology</p>
              <h2 className="section-title">A complete table management view for your floor.</h2>
              <p className="section-description mt-4">
                Watch table orders appear on your manager screen with table numbers, guest requests, and real-time kitchen
                status updates.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-forest/15 dark:border-white/10 bg-forest/5 shadow-2xl">
              <Image
                src="/assets/orderpilot_restaurant_dashboard_showcase.webp"
                alt="OrderPilot restaurant table ordering dashboard showcase"
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
              <p className="eyebrow section-heading-eyebrow">Customer to Kitchen Workflow</p>
              <h2 className="section-title">How table QR ordering works in four steps.</h2>
              <p className="section-description mt-4">
                A structured, reliable workflow connecting seated diners directly to your kitchen display.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 01
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Scan Table QR</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Diner sits at Table 5 and scans the customized QR standee using their smartphone camera.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 02
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Browse Digital Menu</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Your digital menu opens in the mobile browser with food photos, dish descriptions, and spice choices.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 03
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Submit to Kitchen</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Guests submit their order. It appears on the kitchen board labeled with Table 5, ready for preparation.
                </p>
              </div>

              <div className="panel p-6 dark:bg-[#121e15] dark:border-white/5">
                <span className="font-mono text-xs font-bold text-brand dark:text-leaf uppercase tracking-wider">
                  Step 04
                </span>
                <h3 className="mt-3 text-lg font-bold dark:text-white">Serve &amp; Settle Check</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Staff deliver hot dishes to Table 5 with clear itemized tickets, allowing guests to pay cash with the waiter or settle at the counter without confusion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="section-pad bg-white dark:bg-[#0c150f] border-t border-forest/10 dark:border-white/5">
          <div className="site-shell">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow section-heading-eyebrow">Operational Tools</p>
              <h2 className="section-title">Built to support your floor captains and kitchen staff.</h2>
              <p className="section-description mt-4">
                Designed to assist your floor staff with real-time digital coordination, not replace personal hospitality.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Smartphone className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Itemized Table Order Review</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Guests can review all ordered dishes, quantities, and totals directly from their mobile screen,
                    helping group tables verify their order and settle their bill smoothly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ChefHat className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Centralized Menu Availability</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    When ingredients run short or daily specials sell out, mark items unavailable in your dashboard so
                    dine-in table menus reflect current offerings without reprinting.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Sparkles className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Rich Food Presentation</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Guests can view photos of each dish, read ingredient details, and explore appetizers, beverages, and
                    desserts at their own pace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <Clock className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Accurate Table-to-Kitchen Tickets</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Orders submitted from table QR arrive labeled with the exact table number, helping kitchen and floor
                    staff avoid ticket mix-ups during crowded dinner shifts.
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
                Included in Web + Table and Complete plans.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75 dark:text-white/75 max-w-2xl mx-auto">
                Included in Web + Table (PKR 7,999/month) and Complete (PKR 12,999/month) plans. Covers up to 1,000 orders/month,
                live kitchen boards, and customer list exports. 14-day free trial on all plans. One-time PKR 5,000 setup fee
                applies if continuing. Taxes excluded.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-demo?interest=table-qr" className="button-primary">
                  Book Table QR Demo <ArrowRight className="size-4" aria-hidden="true" />
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
