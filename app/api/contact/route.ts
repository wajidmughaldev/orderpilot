import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const recipientEmail = process.env.DEMO_REQUEST_TO ?? 'kebad9231@gmail.com';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(80, 'Name is too long.'),
  email: z.string().trim().email('Enter a valid email address.').max(120, 'Email is too long.'),
  restaurant: z.string().trim().min(2, 'Enter your restaurant or company name.').max(120, 'Restaurant name is too long.'),
  message: z.string().trim().min(10, 'Enter a message (at least 10 characters).').max(2000, 'Message is too long.'),
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

  const parsed = contactSchema.safeParse(payload);

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
        message: 'Please fix the highlighted fields before sending.',
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
    console.error('Contact request email is not configured. Missing SMTP_HOST, SMTP_USER, SMTP_PASS, or SMTP_FROM.');
    return NextResponse.json(
      {
        ok: false,
        message: 'Email service is currently offline. Please try again later or contact us directly at info@digipexsolutions.com.',
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
      subject: `New OrderPilot Contact Enquiry from ${data.restaurant}`,
      text: [
        'New OrderPilot contact enquiry',
        '',
        `Name: ${data.name}`,
        `Restaurant / Company: ${data.restaurant}`,
        `Email: ${data.email}`,
        '',
        'Message:',
        data.message,
      ].join('\n'),
      html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>New OrderPilot Contact Enquiry</title>
          </head>
          <body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb;padding:32px 16px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                    <tr>
                      <td style="background:#16a34a;padding:28px 32px;color:#ffffff;">
                        <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">OrderPilot Contact</p>
                        <h1 style="margin:0;font-size:26px;line-height:1.25;">New Contact Enquiry</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:28px 32px;">
                        <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#4b5563;">
                          A visitor submitted a message via the OrderPilot contact form.
                        </p>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;">
                          <tr>
                            <td style="width:190px;padding:12px 0;border-bottom:1px solid #edf0f4;color:#6b7280;font-size:13px;font-weight:700;">Name</td>
                            <td style="padding:12px 0;border-bottom:1px solid #edf0f4;color:#111827;font-size:15px;">${escapeHtml(data.name)}</td>
                          </tr>
                          <tr>
                            <td style="width:190px;padding:12px 0;border-bottom:1px solid #edf0f4;color:#6b7280;font-size:13px;font-weight:700;">Restaurant / Company</td>
                            <td style="padding:12px 0;border-bottom:1px solid #edf0f4;color:#111827;font-size:15px;">${escapeHtml(data.restaurant)}</td>
                          </tr>
                          <tr>
                            <td style="width:190px;padding:12px 0;border-bottom:1px solid #edf0f4;color:#6b7280;font-size:13px;font-weight:700;">Email</td>
                            <td style="padding:12px 0;border-bottom:1px solid #edf0f4;color:#111827;font-size:15px;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
                          </tr>
                        </table>
                        <div style="border:1px solid #e5e7eb;border-radius:12px;padding:18px;background:#f9fafb;">
                          <p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:700;">Message</p>
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
      `,
    });

    return NextResponse.json({ ok: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact request email failed:', error);

    return NextResponse.json(
      { ok: false, message: 'Message could not be sent. Please try again later.' },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
