import { chromium } from '@playwright/test'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const PORT = 3025
const BASE_URL = `http://127.0.0.1:${PORT}`

const PAGES = [
  { slug: 'whatsapp-ordering', name: 'whatsapp_ordering' },
  { slug: 'qr-table-ordering', name: 'qr_table_ordering' },
  { slug: 'online-ordering', name: 'online_ordering' },
]

const OUTPUT_DIRS = [
  path.resolve(process.cwd(), 'docs/screenshots/seo-phase-2'),
  path.resolve('C:/Users/ebadk/.gemini/antigravity/brain/bffe6cc7-9149-406b-bb1d-b3908f04653d'),
]

for (const dir of OUTPUT_DIRS) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

async function run() {
  console.log('Starting Next.js production server for fullPage screenshot capture...')
  const nextServer = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    stdio: 'pipe',
    shell: true,
  })

  // Wait for server to be responsive
  let ready = false
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(BASE_URL)
      if (res.status === 200) {
        ready = true
        break
      }
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }

  if (!ready) {
    console.error('Server failed to start on port', PORT)
    nextServer.kill()
    process.exit(1)
  }
  console.log(`Server is ready on ${BASE_URL}`)

  const browser = await chromium.launch({ headless: true })
  const report = []

  try {
    for (const pageInfo of PAGES) {
      console.log(`\nCapturing screenshots for /${pageInfo.slug}...`)

      // Desktop Light & Dark
      for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          deviceScaleFactor: 1,
        })
        const page = await context.newPage()
        await page.goto(`${BASE_URL}/${pageInfo.slug}`, { waitUntil: 'networkidle' })

        // Set theme
        if (theme === 'dark') {
          await page.evaluate(() => {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
          })
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
          })
        }
        await page.waitForTimeout(500)

        // Verify footer is rendered in the DOM before screenshot
        const footerCount = await page.locator('footer').count()
        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)

        const filename = `${pageInfo.name}_desktop_${theme}.png`
        for (const outDir of OUTPUT_DIRS) {
          const filePath = path.join(outDir, filename)
          await page.screenshot({ path: filePath, fullPage: true })
        }

        const stats = fs.statSync(path.join(OUTPUT_DIRS[0], filename))
        report.push({
          page: `/${pageInfo.slug}`,
          viewport: 'Desktop (1440 × 900)',
          theme,
          filename,
          scrollHeight: `${scrollHeight}px`,
          fileSize: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
          footerCaptured: footerCount > 0,
        })
        console.log(`  ✓ Desktop ${theme}: ${filename} (Document Height: ${scrollHeight}px, Size: ${(stats.size / 1024).toFixed(0)} KB)`)
        await context.close()
      }

      // Mobile Light & Dark
      for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
          deviceScaleFactor: 2,
        })
        const page = await context.newPage()
        await page.goto(`${BASE_URL}/${pageInfo.slug}`, { waitUntil: 'networkidle' })

        // Set theme
        if (theme === 'dark') {
          await page.evaluate(() => {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
          })
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
          })
        }
        await page.waitForTimeout(500)

        // Verify footer is rendered in the DOM before screenshot
        const footerCount = await page.locator('footer').count()
        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)

        const filename = `${pageInfo.name}_mobile_${theme}.png`
        for (const outDir of OUTPUT_DIRS) {
          const filePath = path.join(outDir, filename)
          await page.screenshot({ path: filePath, fullPage: true })
        }

        const stats = fs.statSync(path.join(OUTPUT_DIRS[0], filename))
        report.push({
          page: `/${pageInfo.slug}`,
          viewport: 'Mobile (390 × 844 @2x)',
          theme,
          filename,
          scrollHeight: `${scrollHeight}px`,
          fileSize: `${(stats.size / 1024).toFixed(0)} KB`,
          footerCaptured: footerCount > 0,
        })
        console.log(`  ✓ Mobile ${theme}: ${filename} (Document Height: ${scrollHeight}px, Size: ${(stats.size / 1024).toFixed(0)} KB)`)
        await context.close()
      }
    }

    console.log('\n--- FULLPAGE SCREENSHOT REPORT ---')
    console.table(report)

  } finally {
    await browser.close()
    if (process.platform === 'win32' && nextServer.pid) {
      try {
        const killer = spawn('taskkill', ['/pid', String(nextServer.pid), '/t', '/f'])
        await new Promise(r => killer.on('close', r))
      } catch {}
    } else {
      nextServer.kill()
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
