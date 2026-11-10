import { test, expect } from '@playwright/test'

test.describe('E2E: SEO Landing Pages (Phase 2)', () => {
  const landingPages = [
    {
      path: '/whatsapp-ordering',
      title: 'WhatsApp Food Ordering System for Pakistan | OrderPilot',
      h1: 'Turn WhatsApp Chats Into Organized Kitchen Orders.',
      canonical: 'https://www.orderpilot.pk/whatsapp-ordering',
      demoCta: '/book-demo?interest=whatsapp',
    },
    {
      path: '/qr-table-ordering',
      title: 'QR Code Table Ordering for Pakistani Restaurants | OrderPilot',
      h1: 'Let Customers Order Straight from Their Table.',
      canonical: 'https://www.orderpilot.pk/qr-table-ordering',
      demoCta: '/book-demo?interest=table-qr',
    },
    {
      path: '/online-ordering',
      title: 'Online Ordering System for Restaurants in Pakistan | OrderPilot',
      h1: 'Your Restaurant. Your Menu. Your Online Orders.',
      canonical: 'https://www.orderpilot.pk/online-ordering',
      demoCta: '/book-demo?interest=web-menu',
    },
  ]

  for (const pageInfo of landingPages) {
    test(`Landing page ${pageInfo.path} loads with valid status, metadata, H1, and FAQ accordion`, async ({ page }) => {
      const response = await page.goto(pageInfo.path)
      expect(response?.status()).toBe(200)

      // Title check
      await expect(page).toHaveTitle(pageInfo.title)

      // Canonical link check
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveAttribute('href', pageInfo.canonical)

      // OpenGraph URL check
      const ogUrl = page.locator('meta[property="og:url"]')
      await expect(ogUrl).toHaveAttribute('content', pageInfo.canonical)

      // H1 check
      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible()
      await expect(h1).toHaveText(pageInfo.h1)

      // Primary CTA link
      const primaryCta = page.locator(`a[href="${pageInfo.demoCta}"]`).first()
      await expect(primaryCta).toBeVisible()

      // FAQ accordion interaction
      const firstFaqButton = page.locator('button[aria-controls="faq-answer-0"]').first()
      await expect(firstFaqButton).toBeVisible()
      await expect(page.locator('#faq-answer-0')).toBeVisible()

      // Footer links to other landing pages
      await expect(page.locator('footer a[href="/whatsapp-ordering"]')).toBeVisible()
      await expect(page.locator('footer a[href="/qr-table-ordering"]')).toBeVisible()
      await expect(page.locator('footer a[href="/online-ordering"]')).toBeVisible()
    })
  }

  test('Footer displays all 3 landing page links across mobile and desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer a[href="/whatsapp-ordering"]')).toBeVisible()
    await expect(page.locator('footer a[href="/qr-table-ordering"]')).toBeVisible()
    await expect(page.locator('footer a[href="/online-ordering"]')).toBeVisible()
  })
})

