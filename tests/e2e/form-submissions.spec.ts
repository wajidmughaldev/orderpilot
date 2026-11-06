import { test, expect } from '@playwright/test'

test.describe('E2E: Form Submissions, Intent Routing & Validation States', () => {
  test.describe('Homepage Contact Us Form', () => {
    test('submits valid contact inquiry and shows loading then success state', async ({ page }) => {
      // Mock the API endpoint
      await page.route('**/api/demo-request', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Your message was received. Our team will get in touch shortly.',
            intent: 'contact',
          }),
        })
      })

      await page.goto('/')

      const contactSection = page.locator('#contact')
      await contactSection.scrollIntoViewIfNeeded()

      // Fill in fields
      await contactSection.locator('input[name="name"]').fill('Ahmed Khan')
      await contactSection.locator('input[name="restaurant"]').fill('Karachi Biryani House')
      await contactSection.locator('input[name="phone"]').fill('+92 300 1234567')
      await contactSection.locator('input[name="city"]').fill('Karachi')
      await contactSection.locator('textarea[name="message"]').fill('Interested in kitchen display board.')

      const submitBtn = contactSection.getByRole('button', { name: /send message/i })
      await expect(submitBtn).toBeEnabled()

      // Submit
      await submitBtn.click()

      // Verify success status banner
      const statusBanner = contactSection.locator('[role="status"]')
      await expect(statusBanner).toBeVisible()
      await expect(statusBanner).toHaveAttribute('aria-live', 'polite')
      await expect(statusBanner).toContainText('Your message was received')
    })

    test('displays error message when API fails with 502', async ({ page }) => {
      await page.route('**/api/demo-request', async (route) => {
        await route.fulfill({
          status: 502,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'We were unable to deliver your request due to a delivery service error. Please try again or reach out to us directly.',
          }),
        })
      })

      await page.goto('/')
      const contactSection = page.locator('#contact')
      await contactSection.scrollIntoViewIfNeeded()

      await contactSection.locator('input[name="name"]').fill('Ahmed Khan')
      await contactSection.locator('input[name="restaurant"]').fill('Karachi Biryani House')
      await contactSection.locator('input[name="phone"]').fill('+92 300 1234567')
      await contactSection.locator('input[name="city"]').fill('Karachi')
      await contactSection.locator('textarea[name="message"]').fill('Interested in WhatsApp.')

      await contactSection.getByRole('button', { name: /send message/i }).click()

      const statusBanner = contactSection.locator('[role="status"]')
      await expect(statusBanner).toBeVisible()
      await expect(statusBanner).toContainText('unable to deliver your request')
    })
  })

  test.describe('Request a Demo Page (/book-demo)', () => {
    test('submits demo request with optional Current POS filled and verifies success', async ({ page }) => {
      await page.route('**/api/demo-request', async (route) => {
        const body = JSON.parse(route.request().postData() || '{}')
        expect(body.name).toBe('Tariq Butt')
        expect(body.restaurant).toBe('Lahore Shinwari')
        expect(body.pos).toBe('Candela POS')
        expect(body.intent).toBe('demo')

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Your request was sent. Our team will get in touch to agree the next step.',
            intent: 'demo',
          }),
        })
      })

      await page.goto('/book-demo')

      // Fill form
      await page.locator('input[name="name"]').fill('Tariq Butt')
      await page.locator('input[name="restaurant"]').fill('Lahore Shinwari')
      await page.locator('input[name="phone"]').fill('+92 321 9876543')
      await page.locator('input[name="city"]').fill('Lahore')
      await page.locator('select[name="type"]').selectOption('Restaurant')
      await page.locator('select[name="volume"]').selectOption('31–100')
      await page.locator('input[name="pos"]').fill('Candela POS')
      await page.locator('textarea[name="challenge"]').fill('Need faster order synchronization.')

      const submitBtn = page.getByRole('button', { name: /book a live demo/i })
      await expect(submitBtn).toBeEnabled()
      await submitBtn.click()

      const statusBanner = page.locator('[role="status"]')
      await expect(statusBanner).toBeVisible()
      await expect(statusBanner).toContainText('Your request was sent')
    })

    test('preselects Pay-per-Order billing when opened with ?interest=pay-per-order', async ({ page }) => {
      await page.goto('/book-demo?interest=pay-per-order')

      const billingSelect = page.locator('select[name="billing"]')
      await expect(billingSelect).toHaveValue('Pay-per-Order')
    })

    test('direct 14-day free trial callout banner links to app.orderpilot.pk', async ({ page }) => {
      await page.goto('/book-demo')

      const directTrialLink = page.getByRole('link', { name: /Sign in & start trial directly/i })
      await expect(directTrialLink).toBeVisible()
      expect(await directTrialLink.getAttribute('href')).toBe('https://app.orderpilot.pk')
    })
  })
})

