import http from 'k6/http'
import { check, sleep } from 'k6'

/**
 * OrderPilot Lead API Controlled Load Test
 *
 * CRITICAL SAFETY REQUIREMENT:
 * This script MUST NOT be executed against production (orderpilot.pk).
 * It is designated strictly for staging and isolated local environments.
 */

const TARGET_HOST = __ENV.TARGET_URL || 'http://127.0.0.1:3000'

// Production Guard: Abort immediately if pointed at production domain
if (TARGET_HOST.includes('orderpilot.pk') && !TARGET_HOST.includes('staging')) {
  throw new Error(`[FATAL SAFETY BLOCK] Refusing to run load test against production host: ${TARGET_HOST}. Tests may only target staging or localhost.`)
}

export const options = {
  stages: [
    { duration: '10s', target: 2 },  // Warm up / smoke
    { duration: '20s', target: 5 },  // Controlled concurrency
    { duration: '10s', target: 0 },  // Ramp down
  ],
  thresholds: {
    // 95% of requests should complete within 500ms
    http_req_duration: ['p(95)<500'],
    // Less than 5% unhandled 5xx server errors
    http_req_failed: ['rate<0.05'],
  },
}

export default function () {
  const url = `${TARGET_HOST}/api/demo-request`
  const payload = JSON.stringify({
    source: 'k6_staging_test',
    intent: 'demo',
    name: `Load Test User ${__VU}`,
    restaurant: `Staging Cafe ${__VU}`,
    phone: '+92 300 1234567',
    city: 'Lahore',
    pos: 'Test POS',
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
      // Provide simulated isolated IP per VU to evaluate rate limiting and throughput
      'X-Forwarded-For': `10.99.${__VU}.${__ITER % 200 + 1}`,
    },
  }

  const res = http.post(url, payload, params)

  // Status should be 200 (success) or 429 (rate-limited by IP)
  check(res, {
    'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
    'response has message': (r) => {
      try {
        const body = JSON.parse(r.body)
        return Boolean(body.message)
      } catch {
        return false
      }
    },
  })

  sleep(1)
}

