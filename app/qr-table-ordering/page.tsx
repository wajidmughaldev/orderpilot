import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageSquare, QrCode, SplitSquareVertical, Sparkles, ChefHat, Clock } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'QR Code Table Ordering for Pakistani Restaurants',
  description:
    'Enable contactless QR code table ordering in your restaurant. Let diners scan, browse the digital menu, and split bills directly from their table without waiting.',
  alternates: {
    canonical: '/qr-table-ordering',
  },
  openGraph: {
    title: 'QR Code Table Ordering for Pakistani Restaurants | OrderPilot',
    description:
      'Enable contactless QR code table ordering in your restaurant. Let diners scan, browse the digital menu, and split bills directly from their table without waiting.',
    url: '/qr-table-ordering',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot QR table ordering showcase' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Table Ordering for Pakistani Restaurants | OrderPilot',
    description:
      'Enable contactless QR code table ordering in your restaurant. Let diners scan, browse the digital menu, and split bills directly from their table without waiting.',
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
    question: 'Can customers at the same table split the bill?',
    answer:
      'Yes. OrderPilot includes built-in Split Bill & Pay functionality. Diners at the same table can easily split items or divide the bill amount without creating bottlenecks at your cashier counter.',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function QrTableOrderingPage() {
  const whatsappConsultUrl =
    'https://wa.me/923361815141?text=Hi%2C%20I%27d%20like%20to%20see%20how%20OrderPilot%20QR%20table%20ordering%20works%20for%20my%20dine-in%20restaurant.'

  return (
    <AppShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        {/* HERO SECTION */}
        <section className="hero-section !pb-16 sm:!pb-20">
          <div className="site-shell max-w-5xl">
            <p className="eyebrow">Dine-In Table QR Ordering</p>
            <h1 className="display mt-6 max-w-4xl text-balance">
              Let Customers Order <span className="text-brand">Straight from Their Table.</span>
            </h1>
            <p className="lede mt-6 max-w-3xl text-balance">
              Give dine-in guests an interactive digital menu right at their seat. Diners scan a table QR code to browse
              food photos, submit orders directly to your kitchen screen, and split their bill with zero app downloads.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/book-demo?interest=table-qr" className="button-primary">
                Book Dine-In Demo <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/pricing" className="button-secondary">
                View Pricing Plans
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-ink/75 dark:text-white/75">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-brand" aria-hidden="true" /> Zero app download required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-brand" aria-hidden="true" /> Works on iOS &amp; Android
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-brand" aria-hidden="true" /> Built-in split bill &amp; pay
              </span>
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
                  <SplitSquareVertical className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold dark:text-white">Split-Bill Counter Delays</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Large family gatherings, corporate lunches, and groups often request separate bills. Manual
                  calculations at the cashier counter cause long lines at departure.
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
                <h3 className="mt-3 text-lg font-bold dark:text-white">Serve &amp; Split Bill</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Staff deliver hot dishes to Table 5. Diners can split the check or pay cash with the waiter.
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
                  <SplitSquareVertical className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Split Bill &amp; Pay Built-In</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Guests at the same table can split their bill by dish or divide total amounts from their own phones,
                    reducing checkout wait times at the counter.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 dark:bg-white/10 text-brand dark:text-leaf">
                  <ChefHat className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Instant Out-of-Stock (86) Controls</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    When an ingredient or dish runs out mid-shift, managers can toggle it off in seconds. The digital menu
                    updates across all table QR codes immediately.
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
                  <h3 className="text-lg font-bold dark:text-white">Seamless Reordering During the Meal</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                    Need additional naan, water, or dessert? Diners can scan again and add items to their active table
                    order without waiting for a waiter to bring back paper slips.
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
                Table QR ordering is included in the Web + Table plan (PKR 7,999/month) and Complete plan (PKR
                12,999/month), both covering up to 1,000 orders/month, live kitchen boards, and customer exports. A
                14-day free trial is available on all plans. The one-time PKR 5,000 setup fee applies only if you
                continue on a paid plan. Prices exclude applicable taxes.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-demo?interest=table-qr" className="button-primary">
                  Start Free Trial <ArrowRight className="size-4" aria-hidden="true" />
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
                  Chat Automation
                </p>
                <h3 className="mt-3 text-xl font-bold dark:text-white group-hover:text-brand dark:group-hover:text-leaf flex items-center justify-between">
                  WhatsApp Food Ordering <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-white/75">
                  Turn messy WhatsApp voice notes and text messages into organized, automated kitchen orders.
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
                  Launch your restaurant&apos;s own branded delivery and pickup website with direct kitchen routing.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
