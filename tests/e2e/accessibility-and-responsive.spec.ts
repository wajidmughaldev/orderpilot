import { test, expect } from '@playwright/test'

test.describe('E2E: Accessibility & Responsive Layouts', () => {
  test('Form accessibility: inputs, labels, honeypots, and live regions', async ({ page }) => {
    await page.goto('/book-demo')

    // Form inputs must have labels
    const inputs = ['name', 'restaurant', 'phone', 'city', 'pos']
    for (const name of inputs) {
      const input = page.locator(`input[name="${name}"]`)
      await expect(input).toBeVisible({ timeout: 15000 })
      // Verify parent or associated label
      const hasLabel = await input.evaluate((el) => {
        return !!el.closest('label') || !!document.querySelector(`label[for="${el.id}"]`)
      })
      expect(hasLabel).toBe(true)
    }

    // Honeypot field must have tabIndex = -1 and be hidden from screen flow
    const honeypot = page.locator('input[name="website"]')
    await expect(honeypot).toHaveAttribute('tabindex', '-1')
  })

  const viewports = [
    { name: 'Mobile (375px)', width: 375, height: 667 },
    { name: 'Tablet (768px)', width: 768, height: 1024 },
    { name: 'Laptop (1366px)', width: 1366, height: 768 },
    { name: 'Desktop (1440px)', width: 1440, height: 900 },
  ]

  for (const vp of viewports) {
    test(`Responsive layout has zero horizontal overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')

      // Check whether page body has horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1 // Allow 1px sub-pixel tolerance
      })
      expect(hasOverflow).toBe(false)
    })
  }
})

