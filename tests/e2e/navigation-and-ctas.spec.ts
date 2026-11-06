import { test, expect } from '@playwright/test'

test.describe('E2E: Homepage Navigation, CTAs & Theme Switching', () => {
  test('loads homepage with 200, displays header, logo, and core navigation', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    // Check header logo and title
    const logo = page.locator('header a[href="/"]').first()
    await expect(logo).toBeVisible()

    // Check main hero heading
    const heroH1 = page.locator('h1').first()
    await expect(heroH1).toBeVisible()
    await expect(heroH1).toContainText('Every order')

    // Check navigation links
    await expect(page.locator('header').getByRole('link', { name: 'How It Works' })).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: 'Product' })).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: 'Pricing' })).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: 'Talk to Us' })).toBeVisible()
  })

  test('verifies primary CTA links and routing', async ({ page }) => {
    await page.goto('/')

    // Hero Free Trial CTA links to app.orderpilot.pk
    const heroTrialBtn = page.getByRole('link', { name: 'Start 14-Day Free Trial' }).first()
    await expect(heroTrialBtn).toBeVisible()
    expect(await heroTrialBtn.getAttribute('href')).toBe('https://app.orderpilot.pk')

    // Header Sign In button links to app.orderpilot.pk
    const headerSignIn = page.locator('header').getByRole('link', { name: 'Sign In' })
    await expect(headerSignIn).toBeVisible()
    expect(await headerSignIn.getAttribute('href')).toBe('https://app.orderpilot.pk')

    // Header Book Demo button links to /book-demo
    const headerBookDemo = page.locator('header').getByRole('link', { name: 'Book Demo' })
    await expect(headerBookDemo).toBeVisible()
    expect(await headerBookDemo.getAttribute('href')).toBe('/book-demo')
  })

  test('theme toggle switches between light and dark modes', async ({ page }) => {
    await page.goto('/')

    const themeToggle = page.getByRole('button', { name: /switch to (?:dark|light) theme/i }).first()
    await expect(themeToggle).toBeVisible()
    // Ensure component is hydrated
    await expect(themeToggle.locator('svg')).toBeVisible()

    // Determine initial state
    const htmlElement = page.locator('html')
    const initialIsDark = await htmlElement.evaluate(el => el.classList.contains('dark'))

    // Click toggle
    await themeToggle.click({ force: true })
    await expect(async () => {
      const isDarkNow = await htmlElement.evaluate(el => el.classList.contains('dark'))
      expect(isDarkNow).toBe(!initialIsDark)
    }).toPass({ timeout: 3000 })

    // Click toggle again to restore
    await themeToggle.click({ force: true })
    await expect(async () => {
      const isDarkRestored = await htmlElement.evaluate(el => el.classList.contains('dark'))
      expect(isDarkRestored).toBe(initialIsDark)
    }).toPass({ timeout: 3000 })
  })

  test('mobile drawer opens on hamburger click and shows navigation and CTAs', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const mobileMenuBtn = page.getByRole('button', { name: 'Open menu' })
    await expect(mobileMenuBtn).toBeVisible()
    await mobileMenuBtn.click()

    // Verify drawer contents
    const drawer = page.locator('#mobile-menu')
    await expect(drawer).toBeVisible()

    // Both Book Demo and Sign In are present in mobile menu
    await expect(drawer.getByRole('link', { name: 'Book Demo' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'Sign In' })).toBeVisible()
  })
})

