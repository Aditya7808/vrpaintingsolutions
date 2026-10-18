import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected pool error:', err.message);
});

/** Run a single query */
export const query = (text: string, params?: unknown[]) => pool.query(text, params);

/** Get a client for transactions */
export const getClient = (): Promise<PoolClient> => pool.connect();

/** Graceful shutdown */
export const closePool = () => pool.end();

export default pool;
