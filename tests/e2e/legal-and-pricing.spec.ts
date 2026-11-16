import { test, expect } from '@playwright/test'

test.describe('E2E: Legal & Pricing Routes', () => {
  test('Pricing page renders with approved PAYG terms, 5% commission rate, zero setup fee, and add-on catalog', async ({ page }) => {
    const response = await page.goto('/pricing')
    expect(response?.status()).toBe(200)

    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('One plan.')
    await expect(h1).toContainText('Pay as you go.')

    // Core PAYG commission rate
    await expect(page.getByText('5%').first()).toBeVisible()
    await expect(page.getByText(/Transparent 5% commission on eligible completed WhatsApp AI orders/i)).toBeVisible()

    // Transparent calculation example (PKR 2,000 order = PKR 100 commission, PKR 1,900 food sales after fee)
    await expect(page.getByText('PKR 100').first()).toBeVisible()
    await expect(page.getByText('PKR 1,900').first()).toBeVisible()

    // Verified zero setup fee & 14-day free trial terms
    await expect(page.getByText(/PKR 0 Setup Fee/i).first()).toBeVisible()
    await expect(page.getByText(/14-Day Free Trial/i).first()).toBeVisible()
    await expect(page.getByText(/PKR 500 Minimum Top-up/i).first()).toBeVisible()

    // Optional add-ons catalog rates
    await expect(page.getByText('PKR 2,000').first()).toBeVisible()
    await expect(page.getByText('PKR 500').first()).toBeVisible()
    await expect(page.getByText('PKR 999').first()).toBeVisible()

    // Active trial CTAs link to trial request
    const trialLinks = page.getByRole('link', { name: /Start 14-Day Free Trial/i })
    expect(await trialLinks.count()).toBeGreaterThanOrEqual(1)
    expect(await trialLinks.first().getAttribute('href')).toContain('/book-demo?intent=trial')
  })

  test('Pricing page has zero horizontal overflow at 390px and 320px mobile viewports', async ({ page }) => {
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 })
      await page.goto('/pricing')
      const isOverflowFree = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth
      })
      expect(isOverflowFree).toBe(true)
    }
  })

  const legalRoutes = [
    { path: '/privacy', heading: 'Privacy Policy' },
    { path: '/terms', heading: 'Terms of Service' },
    { path: '/data-deletion', heading: 'Data Deletion Request' },
    { path: '/cookie-policy', heading: 'Cookie Policy' },
  ]

  for (const route of legalRoutes) {
    test(`Legal route ${route.path} renders 200 with heading, canonical, and entity disclosure`, async ({ page }) => {
      const response = await page.goto(route.path)
      expect(response?.status()).toBe(200)

      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible()
      await expect(h1).toContainText(route.heading)

      // Canonical link verification
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveAttribute('href', `https://www.orderpilot.pk${route.path}`)

      // Entity identity disclosure
      await expect(page.getByText(/Digipex Solutions/i).first()).toBeVisible()
      await expect(page.getByText('contact@orderpilot.pk').first()).toBeVisible()
    })
  }
})
