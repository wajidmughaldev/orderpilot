/**
 * OrderPilot Transactional Email Delivery Service
 *
 * Supported delivery channels:
 * 1. Resend (HTTP REST API via RESEND_API_KEY)
 * 2. Postmark (HTTP REST API via POSTMARK_SERVER_TOKEN)
 * 3. SendGrid (HTTP REST API via SENDGRID_API_KEY)
 * 4. Webhook Dispatch (HTTP POST via LEAD_DELIVERY_WEBHOOK_URL / LEAD_WEBHOOK_URL)
 *
 * Recipient: contact@orderpilot.pk
 * Verified Sender: configured via EMAIL_FROM (defaults to notifications@orderpilot.pk)
 */

export type LeadIntent = 'contact' | 'demo' | 'free-trial'

export interface LeadPayload {
  submittedAt: string
  source: string
  intent: LeadIntent
  name: string
  restaurant: string
  phone: string
  city?: string
  pos?: string
  type?: string
  volume?: string
  interests?: string
  billing?: string
  challenge?: string
  message?: string
}

export interface EmailDeliveryResult {
  success: boolean
  channel: 'resend' | 'postmark' | 'sendgrid' | 'webhook' | 'unconfigured'
  messageId?: string
  error?: string
}

const RECIPIENT_EMAIL = process.env.LEAD_RECIPIENT_EMAIL || 'contact@orderpilot.pk'
const SENDER_EMAIL = process.env.EMAIL_FROM || 'OrderPilot Notifications <notifications@send.orderpilot.pk>'

/**
 * Generate official, clearly distinguishable email subject line
 */
export function getEmailSubject(payload: LeadPayload): string {
  const restaurant = payload.restaurant.trim()
  switch (payload.intent) {
    case 'contact':
      return `[OrderPilot] New Contact Inquiry — ${restaurant}`
    case 'free-trial':
      return `[OrderPilot] New Free Trial Request — ${restaurant}`
    case 'demo':
    default:
      return `[OrderPilot] New Demo Request — ${restaurant}`
  }
}

/**
 * Format human-readable date in Pakistan Standard Time (PKT, UTC+5)
 */
function formatSubmissionDate(isoDate: string): string {
  try {
    const d = new Date(isoDate)
    return new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(d) + ' PKT'
  } catch {
    return isoDate
  }
}

/**
 * Generate plain text email content
 */
export function generateEmailText(payload: LeadPayload): string {
  const subject = getEmailSubject(payload)
  const formattedDate = formatSubmissionDate(payload.submittedAt)
  const isContact = payload.intent === 'contact'
  const isTrial = payload.intent === 'free-trial'

  let intentHeader = 'DEMO REQUEST'
  if (isContact) intentHeader = 'CONTACT INQUIRY'
  if (isTrial) intentHeader = '14-DAY FREE TRIAL REQUEST'

  let content = `============================================================
ORDERPILOT — ${intentHeader}
============================================================

Subject: ${subject}
Date & Time: ${formattedDate}
Source: ${payload.source === 'homepage_contact' || payload.source === 'homepage' ? 'Homepage Contact Us' : 'Request a Demo page (/book-demo)'}
Submission Intent: ${payload.intent}

RESTAURANT & CONTACT DETAILS
------------------------------------------------------------
Restaurant Name:  ${payload.restaurant}
Contact Person:   ${payload.name}
Phone / WhatsApp: ${payload.phone}
City:             ${payload.city || 'Not specified'}
`

  if (isContact) {
    content += `
INQUIRY MESSAGE
------------------------------------------------------------
${payload.message || 'No message provided'}
`
  } else {
    content += `
RESTAURANT PROFILE
------------------------------------------------------------
Current POS:      ${payload.pos || 'Not specified'}
Restaurant Type:  ${payload.type || 'Not specified'}
Daily Order Vol:  ${payload.volume || 'Not specified'}
Interested In:    ${payload.interests || 'Not specified'}
Billing Option:   ${payload.billing || 'Not specified'}

BIGGEST CHALLENGE
------------------------------------------------------------
${payload.challenge || 'Not specified'}
`
  }

  content += `
============================================================
OrderPilot Notification Service
Delivered directly to: ${RECIPIENT_EMAIL}
https://www.orderpilot.pk
`

  return content
}

/**
 * Generate responsive HTML email content
 */
export function generateEmailHtml(payload: LeadPayload): string {
  const subject = getEmailSubject(payload)
  const formattedDate = formatSubmissionDate(payload.submittedAt)
  const isContact = payload.intent === 'contact'
  const isTrial = payload.intent === 'free-trial'

  let badgeText = 'DEMO REQUEST'
  let badgeBg = '#e6f4ea'
  let badgeColor = '#005f00'

  if (isContact) {
    badgeText = 'CONTACT INQUIRY'
    badgeBg = '#e8f0fe'
    badgeColor = '#1a73e8'
  } else if (isTrial) {
    badgeText = '14-DAY FREE TRIAL'
    badgeBg = '#fef7e0'
    badgeColor = '#b06000'
  }

  const phoneDigits = payload.phone.replace(/[^0-9+]/g, '')
  const waLink = `https://wa.me/${phoneDigits.replace(/^\+/, '')}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f4f6f3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #101820; line-height: 1.5;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0e5de; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
    <!-- Header -->
    <div style="background-color: #002d04; padding: 24px 28px; color: #ffffff;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px;">
        <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">
          orderpilot<span style="color: #5ed44f;">.pk</span>
        </span>
        <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
          ${badgeText}
        </span>
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; color: #ffffff;">
        ${escapeHtml(subject)}
      </h1>
      <p style="margin: 6px 0 0; font-size: 12px; color: rgba(255, 255, 255, 0.75);">
        ${formattedDate} · Source: ${payload.source === 'homepage_contact' || payload.source === 'homepage' ? 'Homepage Contact Us' : 'Request a Demo page (/book-demo)'}
      </p>
    </div>

    <!-- Content Body -->
    <div style="padding: 28px;">
      <!-- Contact Info Section -->
      <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #005f00; border-bottom: 2px solid #edf2ec; padding-bottom: 6px;">
        Contact Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #667085; width: 140px; font-weight: 500;">Restaurant:</td>
          <td style="padding: 8px 0; font-weight: 700; color: #101820; font-size: 15px;">${escapeHtml(payload.restaurant)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">Contact Name:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #101820;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0;">
            <a href="tel:${phoneDigits}" style="color: #005f00; text-decoration: none; font-weight: 600;">${escapeHtml(payload.phone)}</a>
            &nbsp;·&nbsp;
            <a href="${waLink}" style="color: #25d366; text-decoration: none; font-weight: 600;">Open WhatsApp</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">City:</td>
          <td style="padding: 8px 0; color: #101820;">${escapeHtml(payload.city || 'Not specified')}</td>
        </tr>
      </table>

      ${
        isContact
          ? `<!-- Inquiry Message -->
      <h2 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #005f00; border-bottom: 2px solid #edf2ec; padding-bottom: 6px;">
        Inquiry Message
      </h2>
      <div style="background-color: #f9faf8; border: 1px solid #e5eae3; border-radius: 10px; padding: 16px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${escapeHtml(payload.message || 'No message provided')}</div>`
          : `<!-- Restaurant Profile -->
      <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #005f00; border-bottom: 2px solid #edf2ec; padding-bottom: 6px;">
        Restaurant Profile & Requirements
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #667085; width: 140px; font-weight: 500;">Current POS:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #101820;">${escapeHtml(payload.pos || 'Not specified')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">Restaurant Type:</td>
          <td style="padding: 8px 0; color: #101820;">${escapeHtml(payload.type || 'Not specified')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">Daily Order Vol:</td>
          <td style="padding: 8px 0; color: #101820;">${escapeHtml(payload.volume || 'Not specified')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">Interested In:</td>
          <td style="padding: 8px 0; color: #101820;">${escapeHtml(payload.interests || 'Not specified')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #667085; font-weight: 500;">Billing Option:</td>
          <td style="padding: 8px 0; color: #101820;">${escapeHtml(payload.billing || 'Not specified')}</td>
        </tr>
      </table>

      ${
        payload.challenge
          ? `<!-- Biggest Challenge -->
      <h2 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #005f00; border-bottom: 2px solid #edf2ec; padding-bottom: 6px;">
        Biggest Challenge
      </h2>
      <div style="background-color: #f9faf8; border: 1px solid #e5eae3; border-radius: 10px; padding: 16px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${escapeHtml(payload.challenge)}</div>`
          : ''
      }`
      }

      <!-- Call to Action -->
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 18px; margin-top: 10px; font-size: 13px; color: #166534; display: flex; align-items: center; justify-content: space-between;">
        <span>Respond to <strong>${escapeHtml(payload.name)}</strong>:</span>
        <a href="${waLink}" style="display: inline-block; background-color: #005f00; color: #ffffff; padding: 7px 14px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 12px;">Chat on WhatsApp</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 28px; background-color: #fafbfc; border-top: 1px solid #edf2ec; font-size: 11px; color: #8892a0; text-align: center;">
      OrderPilot Website Lead Delivery · Sent directly to <a href="mailto:${RECIPIENT_EMAIL}" style="color: #005f00; text-decoration: none;">${RECIPIENT_EMAIL}</a><br>
      © ${new Date().getFullYear()} OrderPilot. All rights reserved.
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Deliver email via Resend HTTP REST API
 */
async function sendViaResend(apiKey: string, payload: LeadPayload): Promise<EmailDeliveryResult> {
  const subject = getEmailSubject(payload)
  const text = generateEmailText(payload)
  const html = generateEmailHtml(payload)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
      'User-Agent': 'OrderPilot-LeadDelivery/1.0',
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: [RECIPIENT_EMAIL],
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10000),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMsg = data?.message || `Resend returned HTTP status ${response.status}`
    console.error('[lead-email] Resend delivery failed:', errorMsg)
    return { success: false, channel: 'resend', error: errorMsg }
  }

  return { success: true, channel: 'resend', messageId: data?.id }
}

/**
 * Deliver email via Postmark HTTP REST API
 */
async function sendViaPostmark(serverToken: string, payload: LeadPayload): Promise<EmailDeliveryResult> {
  const subject = getEmailSubject(payload)
  const text = generateEmailText(payload)
  const html = generateEmailHtml(payload)

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'X-Postmark-Server-Token': serverToken.trim(),
      'Content-Type': 'application/json',
      'User-Agent': 'OrderPilot-LeadDelivery/1.0',
    },
    body: JSON.stringify({
      From: SENDER_EMAIL,
      To: RECIPIENT_EMAIL,
      Subject: subject,
      TextBody: text,
      HtmlBody: html,
    }),
    signal: AbortSignal.timeout(10000),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMsg = data?.Message || `Postmark returned HTTP status ${response.status}`
    console.error('[lead-email] Postmark delivery failed:', errorMsg)
    return { success: false, channel: 'postmark', error: errorMsg }
  }

  return { success: true, channel: 'postmark', messageId: data?.MessageID }
}

/**
 * Deliver email via SendGrid v3 Mail Send API
 */
async function sendViaSendGrid(apiKey: string, payload: LeadPayload): Promise<EmailDeliveryResult> {
  const subject = getEmailSubject(payload)
  const text = generateEmailText(payload)
  const html = generateEmailHtml(payload)

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
      'User-Agent': 'OrderPilot-LeadDelivery/1.0',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: RECIPIENT_EMAIL }] }],
      from: { email: SENDER_EMAIL.includes('<') ? SENDER_EMAIL.split('<')[1].replace('>', '').trim() : SENDER_EMAIL },
      subject,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    }),
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    const errorMsg = data?.errors?.[0]?.message || `SendGrid returned HTTP status ${response.status}`
    console.error('[lead-email] SendGrid delivery failed:', errorMsg)
    return { success: false, channel: 'sendgrid', error: errorMsg }
  }

  return { success: true, channel: 'sendgrid' }
}

/**
 * Deliver via Webhook Relay (used for external CRM/Zapier/Make and regression test suite)
 */
async function sendViaWebhook(
  url: string,
  secret: string | undefined,
  payload: LeadPayload
): Promise<EmailDeliveryResult> {
  const subject = getEmailSubject(payload)
  const text = generateEmailText(payload)
  const html = generateEmailHtml(payload)

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'OrderPilot-LeadDelivery/1.0',
  }
  if (secret) {
    headers['Authorization'] = `Bearer ${secret}`
    headers['X-Lead-Secret'] = secret
  }

  const webhookBody = {
    ...payload,
    emailSubject: subject,
    emailRecipient: RECIPIENT_EMAIL,
    emailText: text,
    emailHtml: html,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(webhookBody),
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    return {
      success: false,
      channel: 'webhook',
      error: `Webhook returned HTTP status ${response.status}`,
    }
  }

  return { success: true, channel: 'webhook' }
}

/**
 * Central Lead Delivery Dispatcher
 *
 * Resolves available provider in order of precedence:
 * 1. Resend API
 * 2. Postmark API
 * 3. SendGrid API
 * 4. Webhook Relay
 *
 * Dispatches to all configured channels. If both an email provider and a webhook
 * are configured, both receive the lead.
 */
export async function dispatchLead(payload: LeadPayload): Promise<EmailDeliveryResult> {
  const resendKey = (process.env.RESEND_API_KEY || '').trim()
  const postmarkToken = (process.env.POSTMARK_SERVER_TOKEN || '').trim()
  const sendgridKey = (process.env.SENDGRID_API_KEY || '').trim()

  const rawWebhookUrl = (process.env.LEAD_DELIVERY_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL || '').trim()
  const webhookSecret = (process.env.LEAD_DELIVERY_WEBHOOK_SECRET || process.env.LEAD_WEBHOOK_SECRET || '').trim() || undefined

  let webhookValid = false
  if (rawWebhookUrl) {
    try {
      const parsed = new URL(rawWebhookUrl)
      webhookValid = parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {}
  }

  const hasEmailProvider = Boolean(resendKey || postmarkToken || sendgridKey)
  const hasWebhook = webhookValid

  if (!hasEmailProvider && !hasWebhook) {
    return {
      success: false,
      channel: 'unconfigured',
      error: 'No email provider (RESEND_API_KEY, POSTMARK_SERVER_TOKEN, SENDGRID_API_KEY) or delivery webhook is configured.',
    }
  }

  let emailResult: EmailDeliveryResult | null = null

  // Dispatch Email Provider
  if (resendKey) {
    emailResult = await sendViaResend(resendKey, payload)
  } else if (postmarkToken) {
    emailResult = await sendViaPostmark(postmarkToken, payload)
  } else if (sendgridKey) {
    emailResult = await sendViaSendGrid(sendgridKey, payload)
  }

  // If email provider was configured and failed, stop and return the error
  if (emailResult && !emailResult.success) {
    return emailResult
  }

  // Dispatch Webhook (if configured)
  let webhookResult: EmailDeliveryResult | null = null
  if (hasWebhook) {
    webhookResult = await sendViaWebhook(rawWebhookUrl, webhookSecret, payload)
    if (!webhookResult.success) {
      return webhookResult
    }
  }

  return emailResult || webhookResult || { success: true, channel: 'unconfigured' }
}

