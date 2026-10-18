import dotenv from 'dotenv';
dotenv.config();

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email via Resend. Falls back to console.log when
 * RESEND_API_KEY is not configured (local development).
 */
export async function sendEmail({ to, subject, html }: EmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === 're_xxxxxxxxxx') {
    console.log('[EMAIL-DEV] Would send email:');
    console.log(`  To: ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body preview: ${html.slice(0, 200)}…`);
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'VR Painting Solutions <noreply@vrpaintingsolutions.com>',
      to,
      subject,
      html,
    });

    console.log(`[EMAIL] Sent "${subject}" to ${to}`);
  } catch (err) {
    console.error('[EMAIL] Failed to send:', err);
  }
}

/**
 * Notify the owner about a new lead submission.
 */
export async function notifyNewLead(lead: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service_interested?: string;
}) {
  const ownerEmail = process.env.NOTIFICATION_EMAIL || 'vrpainting117@gmail.com';

  await sendEmail({
    to: ownerEmail,
    subject: `🎨 New Lead: ${lead.name} — ${lead.service_interested || 'General Inquiry'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${lead.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${lead.phone}</td></tr>
        ${lead.email ? `<tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${lead.email}</td></tr>` : ''}
        ${lead.service_interested ? `<tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${lead.service_interested}</td></tr>` : ''}
        ${lead.message ? `<tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${lead.message}</td></tr>` : ''}
      </table>
    `,
  });
}
