import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../db/client';
import { notifyNewLead } from '../services/emailService';
import { generateWhatsAppUrl, dispatchBackendWhatsAppNotification } from '../services/whatsappService';
// Auth removed — admin routes are open

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().optional(),
  service_interested: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

/** POST /api/leads — public contact form submission */
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }

    const d = parsed.data;

    const result = await query(
      `INSERT INTO leads (name, phone, email, message, service_interested, utm_source, utm_medium, utm_campaign)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [d.name, d.phone, d.email || null, d.message || null, d.service_interested || null,
       d.utm_source || null, d.utm_medium || null, d.utm_campaign || null]
    );

    // Generate direct WhatsApp link
    const whatsappUrl = generateWhatsAppUrl(d);

    // Notify owner via email (fire-and-forget)
    notifyNewLead({
      name: d.name,
      phone: d.phone,
      email: d.email,
      message: d.message,
      service_interested: d.service_interested,
    }).catch(console.error);

    // Notify / dispatch to WhatsApp service or webhook if configured
    dispatchBackendWhatsAppNotification(d).catch(console.error);

    res.status(201).json({ 
      success: true, 
      id: result.rows[0].id,
      whatsapp_url: whatsappUrl,
    });
  } catch (err) {
    console.error('[LEADS] Submission error:', err);
    res.status(500).json({ error: 'Failed to submit lead' });
  }
});

/** GET /api/leads — admin: list all leads */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('[LEADS] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

/** GET /api/leads/export — admin: CSV export */
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM leads ORDER BY created_at DESC');
    const rows = result.rows;

    const header = 'Name,Phone,Email,Message,Service,UTM Source,UTM Medium,UTM Campaign,Date\n';
    const csv = rows.map((r: Record<string, unknown>) =>
      [r.name, r.phone, r.email, r.message, r.service_interested,
       r.utm_source, r.utm_medium, r.utm_campaign, r.created_at]
        .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(header + csv);
  } catch (err) {
    console.error('[LEADS] Export error:', err);
    res.status(500).json({ error: 'Failed to export leads' });
  }
});

export default router;
