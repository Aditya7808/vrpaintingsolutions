import { Router, Request, Response } from 'express';
import { query } from '../db/client';
// Auth removed — admin routes are open
import { upload } from '../middleware/upload';

const router = Router();

/** GET /api/gallery — public: all images, optionally filter by service_slug */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { service } = req.query;
    let result;

    if (service && typeof service === 'string') {
      result = await query(
        'SELECT * FROM gallery_images WHERE service_slug = $1 ORDER BY sort_order ASC, uploaded_at DESC',
        [service]
      );
    } else {
      result = await query('SELECT * FROM gallery_images ORDER BY sort_order ASC, uploaded_at DESC');
    }

    res.json(result.rows);
  } catch (err) {
    console.error('[GALLERY] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

/** POST /api/gallery/upload — admin: upload image */
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // In production, upload to Supabase Storage and get public URL.
    // For local dev, use the local file path.
    const url = `/uploads/${req.file.filename}`;
    const { service_slug, caption } = req.body;

    const result = await query(
      `INSERT INTO gallery_images (url, service_slug, caption) VALUES ($1, $2, $3) RETURNING *`,
      [url, service_slug || null, caption || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('[GALLERY] Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

/** PATCH /api/gallery/reorder — admin: reorder images */
router.patch('/reorder', async (req: Request, res: Response) => {
  try {
    const { order } = req.body; // Array of { id, sort_order }

    if (!Array.isArray(order)) {
      return res.status(400).json({ error: 'order must be an array of { id, sort_order }' });
    }

    for (const item of order) {
      await query('UPDATE gallery_images SET sort_order = $1 WHERE id = $2', [item.sort_order, item.id]);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('[GALLERY] Reorder error:', err);
    res.status(500).json({ error: 'Failed to reorder gallery' });
  }
});

/** DELETE /api/gallery/:id — admin: delete image */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM gallery_images WHERE id = $1 RETURNING id, url', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }
    // TODO: Also delete from Supabase Storage in production
    res.json({ success: true });
  } catch (err) {
    console.error('[GALLERY] Delete error:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
