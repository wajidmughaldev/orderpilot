import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import './workflow.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orderpilot.pk'),
  title: { default: 'OrderPilot — Restaurant orders, all in one place', template: '%s | OrderPilot' },
  description: 'Manage WhatsApp, online, and table orders from one simple restaurant dashboard.',
  openGraph: { title: 'OrderPilot — Restaurant orders, all in one place', description: 'Connected ordering for Pakistani restaurants.', type: 'website', url: '/' },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = { themeColor: '#FAF9F4', width: 'device-width', initialScale: 1, userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning className={`${jakarta.variable} ${space.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
