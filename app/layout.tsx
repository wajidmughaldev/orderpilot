import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import './workflow.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://orderpilot.pk'),
  title: { default: 'OrderPilot — Restaurant Order Management for Pakistan', template: '%s | OrderPilot' },
  description: 'Connect WhatsApp, online web menus, and table QR orders directly to your kitchen. Built for Pakistani restaurants.',
  applicationName: 'OrderPilot',
  authors: [{ name: 'OrderPilot' }, { name: 'Digipex Solutions LLC' }],
  creator: 'Digipex Solutions LLC',
  publisher: 'OrderPilot',
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'OrderPilot — Restaurant Order Management for Pakistan',
    description: 'Connect WhatsApp, online web menus, and table QR orders directly to your kitchen. Built for Pakistani restaurants.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'OrderPilot',
    images: [{ url: '/assets/orderpilot_restaurant_dashboard_showcase.webp', width: 1456, height: 1092, alt: 'OrderPilot restaurant dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrderPilot — Restaurant Order Management for Pakistan',
    description: 'Connect WhatsApp, online web menus, and table QR orders directly to your kitchen. Built for Pakistani restaurants.',
    images: ['/assets/orderpilot_restaurant_dashboard_showcase.webp'],
  },
}

export const viewport: Viewport = { themeColor: '#FAF9F4', width: 'device-width', initialScale: 1, userScalable: true }

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OrderPilot',
  url: 'https://orderpilot.pk',
  logo: 'https://orderpilot.pk/assets/orderpilot-logo.png',
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
  url: 'https://orderpilot.pk',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
