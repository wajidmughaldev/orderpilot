import { describe, it, expect, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Plus_Jakarta_Sans: () => ({ variable: '--font-jakarta' }),
  Space_Grotesk: () => ({ variable: '--font-space' }),
}))

import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { metadata as layoutMetadata } from '@/app/layout'
import { metadata as homeMetadata } from '@/app/page'
import { metadata as pricingMetadata } from '@/app/pricing/page'
import { metadata as bookDemoMetadata } from '@/app/book-demo/page'
import { metadata as privacyMetadata } from '@/app/privacy/page'
import { metadata as termsMetadata } from '@/app/terms/page'
import { metadata as dataDeletionMetadata } from '@/app/data-deletion/page'
import { metadata as cookiePolicyMetadata } from '@/app/cookie-policy/page'

describe('Technical SEO — Canonical URL & Signal Consistency', () => {
  it('standardizes metadataBase to https://www.orderpilot.pk', () => {
    expect(layoutMetadata.metadataBase).toBeInstanceOf(URL)
    expect(layoutMetadata.metadataBase?.toString()).toBe('https://www.orderpilot.pk/')
  })

  it('generates sitemap strictly with https://www.orderpilot.pk and valid routes', () => {
    const sitemapEntries = sitemap()
    expect(sitemapEntries.length).toBe(7)

    for (const entry of sitemapEntries) {
      expect(entry.url).toMatch(/^https:\/\/www\.orderpilot\.pk(\/.*)?$/)
      expect(entry.url).not.toContain('//api')
    }

    const urls = sitemapEntries.map(e => e.url)
    expect(urls).toContain('https://www.orderpilot.pk/')
    expect(urls).toContain('https://www.orderpilot.pk/pricing')
    expect(urls).toContain('https://www.orderpilot.pk/book-demo')
    expect(urls).toContain('https://www.orderpilot.pk/privacy')
    expect(urls).toContain('https://www.orderpilot.pk/terms')
    expect(urls).toContain('https://www.orderpilot.pk/data-deletion')
    expect(urls).toContain('https://www.orderpilot.pk/cookie-policy')
  })

  it('configures robots.txt to point to canonical sitemap and disallow /api/', () => {
    const robotsConfig = robots()
    expect(robotsConfig.sitemap).toBe('https://www.orderpilot.pk/sitemap.xml')

    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules
    expect(rules?.allow).toBe('/')
    expect(rules?.disallow).toEqual(['/api/'])
  })
})

describe('Technical SEO — Metadata & Title Template Hygiene', () => {
  it('homepage specifies absolute title without duplicate "| OrderPilot" suffix', () => {
    const title = homeMetadata.title
    expect(typeof title).toBe('object')
    // @ts-expect-error Next.js Title template object check
    expect(title?.absolute).toBe('Restaurant Ordering Software for Pakistan | OrderPilot')

    // Ensure description contains Pakistani restaurant target keywords
    expect(homeMetadata.description).toBe(
      'Manage WhatsApp, website and table QR orders in one dashboard. OrderPilot helps Pakistani restaurants track orders from new to ready.'
    )

    // Alternates and OpenGraph canonical
    expect(homeMetadata.alternates?.canonical).toBe('/')
    expect(homeMetadata.openGraph?.url).toBe('/')
  })

  it('pricing page metadata specifies approved Pakistani pricing target without duplicate suffix', () => {
    expect(pricingMetadata.title).toBe('Restaurant Ordering Software Pricing in Pakistan')
    expect(pricingMetadata.description).toBe(
      'Compare OrderPilot plans from PKR 5,999/month and pay-per-order options. WhatsApp, website and table QR ordering with a 14-day trial on all plans.'
    )
    expect(pricingMetadata.alternates?.canonical).toBe('/pricing')
    expect(pricingMetadata.openGraph?.url).toBe('/pricing')
  })

  it('book-demo page metadata specifies canonical demo walkthrough title and description', () => {
    expect(bookDemoMetadata.title).toBe('Book a Restaurant Ordering Demo')
    expect(bookDemoMetadata.description).toBe(
      'See how WhatsApp, website and table QR orders reach one OrderPilot dashboard. Book a walkthrough and explore the right plan for your restaurant.'
    )
    // Ensures parameterized queries (?intent=trial) declare /book-demo as canonical
    expect(bookDemoMetadata.alternates?.canonical).toBe('/book-demo')
    expect(bookDemoMetadata.openGraph?.url).toBe('/book-demo')
  })

  it('legal routes declare canonical paths matching their routes and avoid title suffix duplication', () => {
    expect(privacyMetadata.title).toBe('Privacy Policy')
    expect(termsMetadata.title).toBe('Terms of Service')
    expect(dataDeletionMetadata.title).toBe('Data Deletion Request')
    expect(cookiePolicyMetadata.title).toBe('Cookie Policy')
    expect(privacyMetadata.alternates?.canonical).toBe('/privacy')
    expect(termsMetadata.alternates?.canonical).toBe('/terms')
    expect(dataDeletionMetadata.alternates?.canonical).toBe('/data-deletion')
    expect(cookiePolicyMetadata.alternates?.canonical).toBe('/cookie-policy')
  })
})
