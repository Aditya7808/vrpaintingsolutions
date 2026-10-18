import dotenv from 'dotenv';
dotenv.config();

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service_interested?: string;
}

// Clean target WhatsApp number (defaults to owner's WhatsApp: +91 92848 25543)
const RAW_PHONE = process.env.WHATSAPP_PHONE || '919284825543';
export const WHATSAPP_PHONE = RAW_PHONE.replace(/[^0-9]/g, '');

/**
 * Format the lead details into a crisp, professional WhatsApp message
 */
export function generateWhatsAppMessage(lead: LeadData): string {
  const service = lead.service_interested 
    ? lead.service_interested.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
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

  return lines.join('\n');
}

/**
 * Generate full wa.me direct link
 */
export function generateWhatsAppUrl(lead: LeadData): string {
  const text = generateWhatsAppMessage(lead);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Optional backend WhatsApp API / Webhook forwarder
 */
export async function dispatchBackendWhatsAppNotification(lead: LeadData): Promise<void> {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log(`[WHATSAPP-DISPATCH] Lead ready for WhatsApp target ${WHATSAPP_PHONE}: ${lead.name} (${lead.phone})`);
    return;
  }

  try {
    const text = generateWhatsAppMessage(lead);
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: WHATSAPP_PHONE,
        message: text,
        lead,
      }),
    });
    console.log(`[WHATSAPP] Webhook dispatched successfully for ${lead.name}`);
  } catch (err) {
    console.error('[WHATSAPP] Webhook dispatch error:', err);
  }
}
