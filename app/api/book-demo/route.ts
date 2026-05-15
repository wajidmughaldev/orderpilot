import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const recipientEmail = process.env.DEMO_REQUEST_TO ?? 'kebad9231@gmail.com';

const demoSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(80, 'Name is too long.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\-\s0-9]{8,20}$/, 'Enter a valid phone number.'),
  email: z.string().trim().email('Enter a valid email address.').max(120, 'Email is too long.'),
  restaurant: z.string().trim().min(2, 'Enter your restaurant name.').max(120, 'Restaurant name is too long.'),
  restaurantType: z.string().trim().min(1, 'Select your restaurant type.').max(80),
  city: z.string().trim().min(2, 'Enter your city or area.').max(100, 'City or area is too long.'),
  branches: z.string().trim().min(1, 'Select your branch count.').max(40),
  monthlyOrders: z.string().trim().min(1, 'Select your monthly order volume.').max(60),
  currentChannels: z
    .string()
    .trim()
    .min(2, 'Enter at least one current ordering channel.')
    .max(180, 'Ordering channels are too long.'),
  preferredDemoTime: z
    .string()
    .trim()
    .min(4, 'Enter a preferred demo time.')
    .max(120, 'Preferred demo time is too long.'),
  message: z.string().trim().min(10, 'Enter at least 10 characters.').max(2000, 'Message is too long.'),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid request. Please try again.' },
      { status: 400 },
    );
  }

  const parsed = demoSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([field, messages]) => [
        field,
        messages?.[0],
      ]),
    );

    return NextResponse.json(
      {
        ok: false,
        message: 'Please fix the highlighted fields before booking your demo.',
        errors: fieldErrors,
      },
      { status: 422 },
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    console.error('Demo request email is not configured. Missing SMTP_HOST, SMTP_USER, SMTP_PASS, or SMTP_FROM.');

    return NextResponse.json(
      {
        ok: false,
        message:
          'Demo email is not configured yet. Add SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM in .env.local, then restart the server.',
      },
      { status: 500 },
    );
  }

  const data = parsed.data;
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: recipientEmail,
      replyTo: data.email,
      subject: `New OrderPilot demo request from ${data.restaurant}`,
      text: buildPlainTextEmail(data),
      html: buildHtmlEmail(data),
    });

    return NextResponse.json({ ok: true, message: 'Demo request sent successfully.' });
  } catch (error) {
    console.error('Demo request email failed:', error);

    return NextResponse.json(
      { ok: false, message: 'Demo request could not be sent. Please try again later.' },
      { status: 500 },
    );
  }
}

function buildPlainTextEmail(data: z.infer<typeof demoSchema>) {
  return [
    'New OrderPilot demo request',
    '',
    `Name: ${data.name}`,
    `Restaurant: ${data.restaurant}`,
    `Restaurant Type: ${data.restaurantType}`,
    `City / Area: ${data.city}`,
    `Branches: ${data.branches}`,
    `Monthly WhatsApp Orders: ${data.monthlyOrders}`,
    `Current Ordering Channels: ${data.currentChannels}`,
    `Preferred Demo Time: ${data.preferredDemoTime}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    '',
    'Demo Focus:',
    data.message,
  ].join('\n');
}

function buildHtmlEmail(data: z.infer<typeof demoSchema>) {
  const rows = [
    ['Name', data.name],
    ['Restaurant', data.restaurant],
    ['Restaurant Type', data.restaurantType],
    ['City / Area', data.city],
    ['Branches', data.branches],
    ['Monthly WhatsApp Orders', data.monthlyOrders],
    ['Current Ordering Channels', data.currentChannels],
    ['Preferred Demo Time', data.preferredDemoTime],
    ['Phone', data.phone],
    ['Email', data.email],
  ];

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>New OrderPilot Demo Request</title>
      </head>
      <body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="background:#16a34a;padding:28px 32px;color:#ffffff;">
                    <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">OrderPilot Demo</p>
                    <h1 style="margin:0;font-size:26px;line-height:1.25;">New demo request</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#4b5563;">
                      A restaurant submitted a request to see OrderPilot's WhatsApp ordering workflow.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;">
                      ${rows
                        .map(
                          ([label, value]) => `
                            <tr>
                              <td style="width:190px;padding:12px 0;border-bottom:1px solid #edf0f4;color:#6b7280;font-size:13px;font-weight:700;">${escapeHtml(label)}</td>
                              <td style="padding:12px 0;border-bottom:1px solid #edf0f4;color:#111827;font-size:15px;">${escapeHtml(value)}</td>
                            </tr>
                          `,
                        )
                        .join('')}
                    </table>
                    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:18px;background:#f9fafb;">
                      <p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:700;">Demo Focus</p>
                      <p style="margin:0;color:#111827;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
                    Reply directly to this email to contact ${escapeHtml(data.name)}.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
