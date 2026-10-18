import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/client';
import { requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

/** POST /api/auth/login */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: 'admin' as const },
      secret,
      { expiresIn: '7d' }
    );

    res.json({ token, admin: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('[AUTH] Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/** GET /api/auth/me — verify token & return admin info */
router.get('/me', requireAdmin, (req: AuthRequest, res: Response) => {
  res.json({ admin: req.admin });
});

export default router;
