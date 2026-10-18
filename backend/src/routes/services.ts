import { Router, Request, Response } from 'express';
import { query } from '../db/client';
// Auth removed — admin routes are open

const router = Router();

/** GET /api/services — public: active services */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT id, slug, title, short_description, hero_image, sort_order FROM services WHERE is_active = true ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[SERVICES] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

/** GET /api/services/:slug — public: single service detail */
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM services WHERE slug = $1 AND is_active = true', [req.params.slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('[SERVICES] Detail error:', err);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

/** POST /api/services — admin: create service */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { slug, title, short_description, full_description, scope_of_work, process_steps, faqs, price_hint, hero_image, sort_order } = req.body;

    const result = await query(
      `INSERT INTO services (slug, title, short_description, full_description, scope_of_work, process_steps, faqs, price_hint, hero_image, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [slug, title, short_description || '', full_description || '', scope_of_work || '',
       JSON.stringify(process_steps || []), JSON.stringify(faqs || []),
       price_hint || null, hero_image || null, sort_order || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('[SERVICES] Create error:', err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

/** PATCH /api/services/:id — admin: update service */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { title, short_description, full_description, scope_of_work, process_steps, faqs, price_hint, is_active, hero_image, sort_order } = req.body;

    const result = await query(
      `UPDATE services SET
        title = COALESCE($1, title),
        short_description = COALESCE($2, short_description),
        full_description = COALESCE($3, full_description),
        scope_of_work = COALESCE($4, scope_of_work),
        process_steps = COALESCE($5, process_steps),
        faqs = COALESCE($6, faqs),
        price_hint = COALESCE($7, price_hint),
        is_active = COALESCE($8, is_active),
        hero_image = COALESCE($9, hero_image),
        sort_order = COALESCE($10, sort_order),
        updated_at = NOW()
       WHERE id = $11 RETURNING *`,
      [title, short_description, full_description, scope_of_work,
       process_steps ? JSON.stringify(process_steps) : null,
       faqs ? JSON.stringify(faqs) : null,
       price_hint, is_active, hero_image, sort_order, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('[SERVICES] Update error:', err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

/** DELETE /api/services/:id — admin: delete service */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[SERVICES] Delete error:', err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
