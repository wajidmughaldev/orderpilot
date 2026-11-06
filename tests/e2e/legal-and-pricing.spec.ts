import { test, expect } from '@playwright/test'

test.describe('E2E: Legal & Pricing Routes', () => {
  test('Pricing page renders with approved pricing, Coming Soon buttons, and setup fee terms', async ({ page }) => {
    const response = await page.goto('/pricing')
    expect(response?.status()).toBe(200)

    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Pick the plan that fits how customers order.')

    // Approved plan prices
    await expect(page.getByText('PKR 5,999').first()).toBeVisible()
    await expect(page.getByText('PKR 7,999').first()).toBeVisible()
    await expect(page.getByText('PKR 12,999').first()).toBeVisible()
    await expect(page.getByText('8% to 10%').first()).toBeVisible()

    // Setup fee & trial terms
    await expect(page.getByText(/PKR 5,000 setup fee/i).first()).toBeVisible()
    await expect(page.getByText(/14-day free trial on all plans/i).first()).toBeVisible()

    // Coming soon buttons
    const comingSoonButtons = page.getByRole('button', { name: 'Coming Soon' })
    const count = await comingSoonButtons.count()
    expect(count).toBeGreaterThanOrEqual(3)
    for (let i = 0; i < count; i++) {
      await expect(comingSoonButtons.nth(i)).toBeDisabled()
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
      await expect(canonical).toHaveAttribute('href', `https://orderpilot.pk${route.path}`)

      // Entity identity disclosure
      await expect(page.getByText(/Digipex Solutions/i).first()).toBeVisible()
      await expect(page.getByText('contact@orderpilot.pk').first()).toBeVisible()
    })
  }
})

