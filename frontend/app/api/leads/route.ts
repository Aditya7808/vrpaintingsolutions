import { NextResponse } from 'next/server';

const RAW_PHONE = process.env.WHATSAPP_PHONE || '919284825543';
const WHATSAPP_PHONE = RAW_PHONE.replace(/[^0-9]/g, '');

function generateWhatsAppUrl(lead: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service_interested?: string;
}) {
  const service = lead.service_interested
    ? lead.service_interested.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'General Painting Consultation';

  const lines = [
    'Hello VR Painting Solutions,',
    '',
    'I would like to request a quotation for painting services:',
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Service Required: ${service}`,
    lead.message ? `Project Details: ${lead.message}` : null,
    '',
    'Please share the estimate and site visit details. Thank you!',
  ].filter((item): item is string => item !== null);

  const text = lines.join('\n');
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const whatsappUrl = generateWhatsAppUrl({
      name: body.name,
      phone: body.phone,
      email: body.email,
      message: body.message,
      service_interested: body.service_interested,
    });

    const leadId = `lead-${Date.now()}`;

    // Optional email notification if RESEND_API_KEY is configured (using zero-dep HTTP fetch)
    if (process.env.RESEND_API_KEY) {
      try {
        const ownerEmail = process.env.NOTIFICATION_EMAIL || 'vrpainting117@gmail.com';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'VR Painting Solutions <onboarding@resend.dev>',
            to: [ownerEmail],
            subject: `🎨 New Lead: ${body.name} — ${body.service_interested || 'General'}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Phone:</strong> ${body.phone}</p>
              ${body.email ? `<p><strong>Email:</strong> ${body.email}</p>` : ''}
              ${body.service_interested ? `<p><strong>Service:</strong> ${body.service_interested}</p>` : ''}
              ${body.message ? `<p><strong>Message:</strong> ${body.message}</p>` : ''}
            `,
          }),
        });
      } catch (emailErr) {
        console.error('[EMAIL-ERROR]', emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        id: leadId,
        whatsapp_url: whatsappUrl,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[API/LEADS] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
