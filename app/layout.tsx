import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import './workflow.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.orderpilot.pk'),
  title: { default: 'Restaurant Ordering Software for Pakistan | OrderPilot', template: '%s | OrderPilot' },
  description: 'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.',
  applicationName: 'OrderPilot',
  authors: [{ name: 'OrderPilot' }, { name: 'Digipex Solutions LLC' }],
  creator: 'Digipex Solutions LLC',
  publisher: 'OrderPilot',
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Restaurant Ordering Software for Pakistan | OrderPilot',
    description: 'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'OrderPilot',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot restaurant dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Ordering Software for Pakistan | OrderPilot',
    description: 'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

export const viewport: Viewport = { themeColor: '#FAF9F4', width: 'device-width', initialScale: 1, userScalable: true }

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OrderPilot',
  url: 'https://www.orderpilot.pk',
  logo: 'https://www.orderpilot.pk/assets/orderpilot-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-336-1815141',
    contactType: 'customer service',
    areaServed: 'PK',
    availableLanguage: ['English', 'Urdu'],
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'Digipex Solutions LLC',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OrderPilot',
  url: 'https://www.orderpilot.pk',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="theme-script" dangerouslySetInnerHTML={{ __html: "(function(){try{var s=localStorage.getItem('theme');if(s==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body suppressHydrationWarning className={`${jakarta.variable} ${space.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
