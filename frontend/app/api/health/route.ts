import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'VR Painting Solutions',
    timestamp: new Date().toISOString(),
  });
}
