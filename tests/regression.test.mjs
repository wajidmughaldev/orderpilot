import http from 'node:http'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')

let passed = 0
let failed = 0
const failures = []

async function test(name, fn) {
  try {
    await fn()
    passed++
    console.log(`  PASS: ${name}`)
  } catch (err) {
    failed++
    failures.push({ name, error: err })
    console.error(`  FAIL: ${name}`)
    console.error(`    ${err.message}`)
  }
}

function createMockWebhook() {
  const requests = []
  let behavior = 'success' // 'success' | 'fail_500' | 'drop'

  const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      requests.push({
        method: req.method,
        headers: req.headers,
        body: body ? JSON.parse(body) : null
      })

      if (behavior === 'drop') {
        req.destroy()
        return
      }

      if (behavior === 'fail_500') {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Internal server error' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
    })
  })

  return {
    server,
    requests,
    setBehavior: (b) => { behavior = b },
    clear: () => { requests.length = 0 },
    listen: () => new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server.address().port))),
    close: () => new Promise(resolve => server.close(resolve))
  }
}

async function isPortOpen(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/demo-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    return res.status > 0
  } catch {
    return false
  }
}

async function runAll() {
  console.log('\n========================================')
  console.log(' OrderPilot Web — Regression Test Suite ')
  console.log('========================================\n')

  const webhook = createMockWebhook()
  const webhookPort = await webhook.listen()
  const webhookUrl = `http://127.0.0.1:${webhookPort}/leads-webhook`
  console.log(`Mock webhook listening on ${webhookUrl}`)

  // Start test Next.js server configured with webhook on port 3020
  console.log('Starting test server on port 3020...')
  const nextServer = spawn('npx', ['next', 'start', '-p', '3020'], {
    cwd: ROOT_DIR,
    shell: true,
    env: {
      ...process.env,
      PORT: '3020',
      LEAD_DELIVERY_WEBHOOK_URL: webhookUrl,
      LEAD_DELIVERY_WEBHOOK_SECRET: 'test_token_secret_123',
      NODE_ENV: 'production'
    }
  })

  let ready = false
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400))
    if (await isPortOpen(3020)) {
      ready = true
      break
    }
  }

  if (!ready) {
    nextServer.kill()
    await webhook.close()
    throw new Error('Test server failed to start on port 3020. Ensure `npm run build` has been executed.')
  }

  console.log('Test server is ready. Executing test suites...\n')
  const BASE_URL = 'http://127.0.0.1:3020'

  try {
    // -------------------------------------------------------------------------
    // 1. Valid Demo Submissions
    // -------------------------------------------------------------------------
    console.log('Suite 1: Valid Demo Submissions')
    await test('Homepage contact submission delivers valid payload to webhook', async () => {
      webhook.clear()
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.2.1' },
        body: JSON.stringify({
          source: 'homepage_contact',
          restaurant: 'Karachi Biryani House',
          name: 'Ahmed Khan',
          phone: '03001234567',
          city: 'Karachi',
          challenge: 'Managing dinner rush WhatsApp orders',
          interests: 'WhatsApp'
        })
      })

      assert.equal(res.status, 200)
      const data = await res.json()
      assert.equal(data.success, true)
      assert.equal(webhook.requests.length, 1)
      const delivered = webhook.requests[0].body
      assert.equal(delivered.restaurant, 'Karachi Biryani House')
      assert.equal(delivered.name, 'Ahmed Khan')
      assert.equal(delivered.phone, '03001234567')
      assert.equal(delivered.city, 'Karachi')
      assert.equal(webhook.requests[0].headers.authorization, 'Bearer test_token_secret_123')
    })

    await test('Book Demo submission delivers full metadata to webhook', async () => {
      webhook.clear()
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.2.2' },
        body: JSON.stringify({
          source: 'book-demo',
          restaurant: 'Lahore Grill & BBQ',
          name: 'Usman Ali',
          phone: '+92 321 9876543',
          city: 'Lahore',
          type: 'Restaurant',
          volume: '31–100',
          billing: 'Monthly',
          challenge: 'Kitchen delayed tickets',
          message: 'Interested in Table QR and Kitchen display board',
          interests: 'Table QR, Kitchen board'
        })
      })

      assert.equal(res.status, 200)
      const data = await res.json()
      assert.equal(data.success, true)
      assert.equal(webhook.requests.length, 1)
      const delivered = webhook.requests[0].body
      assert.equal(delivered.restaurant, 'Lahore Grill & BBQ')
      assert.equal(delivered.volume, '31–100')
      assert.equal(delivered.billing, 'Monthly')
    })

    await test('Valid international phone format is accepted with 200', async () => {
      webhook.clear()
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.2.3' },
        body: JSON.stringify({
          source: 'homepage_contact',
          restaurant: 'Global Bistro',
          name: 'Tariq International',
          phone: '+44 20 7946 0958',
          city: 'London / Karachi'
        })
      })

      assert.equal(res.status, 200)
      const data = await res.json()
      assert.equal(data.success, true)
      assert.equal(webhook.requests.length, 1)
      assert.equal(webhook.requests[0].body.phone, '+44 20 7946 0958')
    })

    await test('Submission without optional fields succeeds with 200 and omits optional keys in webhook', async () => {
      webhook.clear()
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.2.4' },
        body: JSON.stringify({
          restaurant: 'Minimal Diner',
          name: 'Hamza',
          phone: '+92 334 1112233',
          city: 'Islamabad'
        })
      })

      assert.equal(res.status, 200)
      const data = await res.json()
      assert.equal(data.success, true)
      assert.equal(webhook.requests.length, 1)
      const delivered = webhook.requests[0].body
      assert.equal(delivered.restaurant, 'Minimal Diner')
      assert.equal(delivered.name, 'Hamza')
      assert.equal(delivered.phone, '+92 334 1112233')
      assert.equal(delivered.city, 'Islamabad')
      assert.equal(delivered.type, undefined)
      assert.equal(delivered.volume, undefined)
      assert.equal(delivered.interests, undefined)
      assert.equal(delivered.billing, undefined)
      assert.equal(delivered.challenge, undefined)
      assert.equal(delivered.message, undefined)
    })

    // -------------------------------------------------------------------------
    // 2. Invalid and Missing Form Fields
    // -------------------------------------------------------------------------
    console.log('\nSuite 2: Field Validation & Rejections')
    const validationCases = [
      { name: 'Missing restaurant', ip: '10.0.3.1', payload: { name: 'A', phone: '03001234567', city: 'Karachi' } },
      { name: 'Blank name', ip: '10.0.3.2', payload: { restaurant: 'R', name: '   ', phone: '03001234567', city: 'Karachi' } },
      { name: 'Missing phone', ip: '10.0.3.3', payload: { restaurant: 'R', name: 'A', city: 'Karachi' } },
      { name: 'Non-numeric phone', ip: '10.0.3.4', payload: { restaurant: 'R', name: 'A', phone: 'abc-def-ghij', city: 'Karachi' } },
      { name: 'Phone too short (<7 chars)', ip: '10.0.3.5', payload: { restaurant: 'R', name: 'A', phone: '12345', city: 'Karachi' } },
      { name: 'Phone too long (>20 chars)', ip: '10.0.3.6', payload: { restaurant: 'R', name: 'A', phone: '123456789012345678901', city: 'Karachi' } },
      { name: 'Blank phone', ip: '10.0.3.7', payload: { restaurant: 'R', name: 'A', phone: '   ' } },
      { name: 'Oversized challenge (>400 chars)', ip: '10.0.3.8', payload: { restaurant: 'R', name: 'A', phone: '03001234567', city: 'Karachi', challenge: 'x'.repeat(401) } },
      { name: 'Oversized message (>600 chars)', ip: '10.0.3.9', payload: { restaurant: 'R', name: 'A', phone: '03001234567', city: 'Karachi', message: 'x'.repeat(601) } }
    ]

    for (const c of validationCases) {
      await test(`Rejects: ${c.name}`, async () => {
        const res = await fetch(`${BASE_URL}/api/demo-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-forwarded-for': c.ip },
          body: JSON.stringify(c.payload)
        })
        assert.equal(res.status, 400)
        const data = await res.json()
        assert.ok(data.message)
      })
    }

    // -------------------------------------------------------------------------
    // 3. Malformed Request Bodies & Size Protection
    // -------------------------------------------------------------------------
    console.log('\nSuite 3: Malformed Request Bodies & Size Protection')
    await test('Rejects non-JSON raw string body', async () => {
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.4.1' },
        body: 'invalid-string'
      })
      assert.equal(res.status, 400)
    })

    await test('Rejects JSON array payload', async () => {
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.4.2' },
        body: JSON.stringify([{ restaurant: 'Array' }])
      })
      assert.equal(res.status, 400)
    })

    await test('Rejects JSON null payload', async () => {
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.4.3' },
        body: 'null'
      })
      assert.equal(res.status, 400)
    })

    await test('Rejects oversized request payload (>64KB with Content-Length) with HTTP 413', async () => {
      const largePayload = JSON.stringify({
        name: 'A',
        restaurant: 'R',
        phone: '03001234567',
        city: 'Karachi',
        padding: 'x'.repeat(70_000)
      })
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.4.4' },
        body: largePayload
      })
      assert.equal(res.status, 413)
      const data = await res.json()
      assert.ok(data.message.includes('too large'))
    })

    await test('Rejects oversized request payload without Content-Length (chunked transfer) with HTTP 413', async () => {
      const result = await new Promise((resolve, reject) => {
        const req = http.request({
          hostname: '127.0.0.1',
          port: 3020,
          path: '/api/demo-request',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '10.0.4.5',
            'Transfer-Encoding': 'chunked'
          }
        }, (res) => {
          let data = ''
          res.on('data', chunk => { data += chunk })
          res.on('end', () => resolve({ status: res.statusCode, body: data }))
        })

        req.on('error', (err) => {
          resolve({ status: 413, error: err })
        })

        // Stream multiple chunks exceeding 64KB
        req.write('{"name":"ChunkTester","restaurant":"R","phone":"03001234567","city":"Karachi","data":"')
        req.write('x'.repeat(70000))
        req.write('"}')
        req.end()
      })

      assert.equal(result.status, 413)
      if (result.body) {
        const json = JSON.parse(result.body)
        assert.ok(json.message.includes('too large'))
      }
    })

    // -------------------------------------------------------------------------
    // 4. Honeypot Rejection
    // -------------------------------------------------------------------------
    console.log('\nSuite 4: Honeypot Spam Protection')
    await test('Honeypot website field returns 400 Request rejected', async () => {
      webhook.clear()
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.5.1' },
        body: JSON.stringify({
          restaurant: 'Spam Bistro',
          name: 'Spam Bot',
          phone: '03001234567',
          city: 'Karachi',
          website: 'https://spammy-seo.com'
        })
      })

      assert.equal(res.status, 400)
      const data = await res.json()
      assert.equal(data.message, 'Request rejected.')
      assert.equal(webhook.requests.length, 0)
    })

    await test('Honeypot submission is not dispatched to webhook', async () => {
      assert.equal(webhook.requests.length, 0)
    })

    // -------------------------------------------------------------------------
    // 5. Rate Limiting
    // -------------------------------------------------------------------------
    console.log('\nSuite 5: Rate Limiting')
    await test('Enforces 5 requests per IP limit', async () => {
      const testIp = '198.51.100.77'
      for (let i = 0; i < 5; i++) {
        const res = await fetch(`${BASE_URL}/api/demo-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-forwarded-for': testIp },
          body: JSON.stringify({
            restaurant: `Test ${i}`,
            name: 'Test',
            phone: '03001234567',
            city: 'Islamabad'
          })
        })
        assert.equal(res.status, 200)
      }

      // 6th request should hit rate limit
      const blockedRes = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': testIp },
        body: JSON.stringify({
          restaurant: 'Blocked',
          name: 'Blocked',
          phone: '03001234567',
          city: 'Islamabad'
        })
      })
      assert.equal(blockedRes.status, 429)
      const data = await blockedRes.json()
      assert.ok(data.message.includes('Too many requests'))
    })

    // -------------------------------------------------------------------------
    // 6. Webhook Upstream Responses
    // -------------------------------------------------------------------------
    console.log('\nSuite 6: Webhook Success and Failure Responses')
    await test('Upstream HTTP 500 returns HTTP 502 with friendly message', async () => {
      webhook.setBehavior('fail_500')
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.6.1' },
        body: JSON.stringify({
          restaurant: 'Fail Test',
          name: 'Tester',
          phone: '03001234567',
          city: 'Multan'
        })
      })
      assert.equal(res.status, 502)
      const data = await res.json()
      assert.ok(data.message.includes('reach out to us directly'))
    })

    await test('Upstream connection drop returns HTTP 502 with friendly message', async () => {
      webhook.setBehavior('drop')
      const res = await fetch(`${BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.6.2' },
        body: JSON.stringify({
          restaurant: 'Drop Test',
          name: 'Tester',
          phone: '03001234567',
          city: 'Multan'
        })
      })
      assert.equal(res.status, 502)
      const data = await res.json()
      assert.ok(data.message.includes('reach out to us directly'))
      webhook.setBehavior('success')
    })

    // -------------------------------------------------------------------------
    // 7. Unconfigured Webhook Behavior
    // -------------------------------------------------------------------------
    console.log('\nSuite 7: Unconfigured Webhook Handling')
    await test('Route returns HTTP 503 when delivery destination is unconfigured', async () => {
      const routeContent = fs.readFileSync(path.join(ROOT_DIR, 'app/api/demo-request/route.ts'), 'utf8')
      assert.ok(routeContent.includes('!deliveryConfig'))
      assert.ok(routeContent.includes('status: 503'))
      assert.ok(routeContent.includes('contact OrderPilot'))
    })

    // -------------------------------------------------------------------------
    // 8. Form Usability & Accessibility Markup
    // -------------------------------------------------------------------------
    console.log('\nSuite 8: Form Usability & Accessibility Markup')
    const contactCode = fs.readFileSync(path.join(ROOT_DIR, 'components/contact-section.tsx'), 'utf8')
    const demoFormCode = fs.readFileSync(path.join(ROOT_DIR, 'components/demo-form.tsx'), 'utf8')

    await test('ContactSection includes aria-live="polite" and role="status"', async () => {
      assert.ok(contactCode.includes('aria-live="polite"') && contactCode.includes('role="status"'))
    })

    await test('DemoForm includes aria-live="polite" and role="status"', async () => {
      assert.ok(demoFormCode.includes('aria-live="polite"') && demoFormCode.includes('role="status"'))
    })

    await test('Both forms include hidden honeypot spam protection', async () => {
      assert.ok(contactCode.includes('name="website"') && demoFormCode.includes('name="website"'))
      assert.ok(demoFormCode.includes('tabIndex={-1}'))
    })

    await test('Both forms enforce client-side phone pattern matching server', async () => {
      assert.ok(contactCode.includes('pattern="^\\+?[0-9 ()-]{7,20}$"'))
      assert.ok(demoFormCode.includes('pattern="^\\+?[0-9 ()-]{7,20}$"'))
    })

    await test('Both forms disable submit button during loading state', async () => {
      assert.ok(contactCode.includes("disabled={status === 'loading'}"))
      assert.ok(demoFormCode.includes("disabled={status === 'loading'}"))
    })

    // -------------------------------------------------------------------------
    // 9. CTA Destinations
    // -------------------------------------------------------------------------
    console.log('\nSuite 9: CTA Destinations & Contact Links')
    await test('WhatsApp numbers and navigation links point to verified destinations', async () => {
      const header = fs.readFileSync(path.join(ROOT_DIR, 'components/site-header.tsx'), 'utf8')
      const footer = fs.readFileSync(path.join(ROOT_DIR, 'components/site-footer.tsx'), 'utf8')
      const pricing = fs.readFileSync(path.join(ROOT_DIR, 'app/pricing/page.tsx'), 'utf8')

      assert.ok(header.includes('/#how'))
      assert.ok(header.includes('/#product'))
      assert.ok(header.includes('/#pricing'))
      assert.ok(header.includes('/#contact'))

      assert.ok(footer.includes('923361815141'))
      assert.ok(footer.includes('info@digipexsolutions.com'))

      assert.ok(pricing.includes('wa.me/923361815141'))
      assert.ok(pricing.includes('/book-demo?interest=pricing'))
    })

    // -------------------------------------------------------------------------
    // 10. Pricing Route & Metadata
    // -------------------------------------------------------------------------
    console.log('\nSuite 10: Pricing Route & Metadata')
    await test('Pricing page returns 200 with approved pricing numbers and canonical', async () => {
      const res = await fetch(`${BASE_URL}/pricing`)
      assert.equal(res.status, 200)
      const html = await res.text()
      assert.ok(html.includes('PKR 9,999'))
      assert.ok(html.includes('PKR 14,999'))
      assert.ok(html.includes('10% to 15%'))
      assert.ok(html.includes('<link rel="canonical" href="https://orderpilot.pk/pricing"'))
      assert.ok(html.includes('Pricing Plans — Transparent Subscription'))
    })

    // -------------------------------------------------------------------------
    // 11. Technical SEO Endpoints
    // -------------------------------------------------------------------------
    console.log('\nSuite 11: Technical SEO Endpoints')
    await test('sitemap.xml returns valid XML with real routes', async () => {
      const res = await fetch(`${BASE_URL}/sitemap.xml`)
      assert.equal(res.status, 200)
      const xml = await res.text()
      assert.ok(xml.includes('<loc>https://orderpilot.pk/</loc>'))
      assert.ok(xml.includes('<loc>https://orderpilot.pk/pricing</loc>'))
      assert.ok(xml.includes('<loc>https://orderpilot.pk/book-demo</loc>'))
      assert.ok(!xml.includes('/api/'))
    })

    await test('robots.txt disallows /api/ and specifies sitemap', async () => {
      const res = await fetch(`${BASE_URL}/robots.txt`)
      assert.equal(res.status, 200)
      const txt = await res.text()
      assert.ok(txt.includes('User-Agent: *'))
      assert.ok(txt.includes('Disallow: /api/'))
      assert.ok(txt.includes('Sitemap: https://orderpilot.pk/sitemap.xml'))
    })

    // -------------------------------------------------------------------------
    // 12. Critical Page Rendering & Structured Data
    // -------------------------------------------------------------------------
    console.log('\nSuite 12: Critical Page Rendering & Structured Data')
    await test('Homepage renders 200 with h1, JSON-LD, and WebP showcase', async () => {
      const res = await fetch(`${BASE_URL}/`)
      assert.equal(res.status, 200)
      const html = await res.text()
      assert.ok(html.includes('<h1'))
      assert.ok(html.includes('SoftwareApplication'))
      assert.ok(html.includes('Organization'))
      assert.ok(html.includes('orderpilot_restaurant_dashboard_showcase.webp'))
    })

    await test('Book Demo page renders 200 with h1 and canonical', async () => {
      const res = await fetch(`${BASE_URL}/book-demo`)
      assert.equal(res.status, 200)
      const html = await res.text()
      assert.ok(html.includes('<h1'))
      assert.ok(html.includes('<link rel="canonical" href="https://orderpilot.pk/book-demo"'))
    })

  } finally {
    console.log('\nTearing down test infrastructure...')
    if (process.platform === 'win32' && nextServer.pid) {
      try {
        const killer = spawn('taskkill', ['/pid', String(nextServer.pid), '/t', '/f'])
        await new Promise(r => killer.on('close', r))
      } catch {}
    } else {
      nextServer.kill('SIGTERM')
    }
    await webhook.close()
  }

  console.log('\n========================================')
  console.log('            TEST RESULTS                ')
  console.log('========================================')
  console.log(`TOTAL TESTS: ${passed + failed}`)
  console.log(`PASSED:      ${passed}`)
  console.log(`FAILED:      ${failed}`)
  console.log('========================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runAll().catch(err => {
  console.error('Test suite failed:', err)
  process.exit(1)
})
