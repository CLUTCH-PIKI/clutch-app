import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  let dbStatus = 'unknown';
  try {
    const result = db.prepare('SELECT 1 as result').get() as { result: number };
    if (result && result.result === 1) {
      dbStatus = 'connected';
    }
  } catch (err) {
    dbStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: dbStatus,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_PATH: process.env.DATABASE_PATH
    }
  });
}
