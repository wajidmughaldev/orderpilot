import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://orderpilot.pk'),
  title: 'OrderPilot — AI-Powered WhatsApp Ordering Software for Restaurants',
  description: 'OrderPilot is an AI-powered SaaS platform that helps restaurants automate customer conversations, ordering, checkout, and order management through WhatsApp.',
  generator: 'v0.app',
  alternates: {
    canonical: 'https://orderpilot.pk/',
  },
  openGraph: {
    title: 'OrderPilot — AI-Powered WhatsApp Ordering Software for Restaurants',
    description: 'OrderPilot is an AI-powered SaaS platform that helps restaurants automate customer conversations, ordering, checkout, and order management through WhatsApp.',
    url: 'https://orderpilot.pk/',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'OrderPilot - WhatsApp Ordering for Restaurants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrderPilot — AI-Powered WhatsApp Ordering Software for Restaurants',
    description: 'OrderPilot is an AI-powered SaaS platform that helps restaurants automate customer conversations, ordering, checkout, and order management through WhatsApp.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
