import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/constants';

export async function GET() {
  const summary = SERVICES.map((svc, i) => ({
    id: `service-${svc.slug}`,
    slug: svc.slug,
    title: svc.title,
    short_description: `Professional ${svc.title.toLowerCase()} in Pune by VR Painting Solutions.`,
    hero_image: `/portfolio/commercial-building.png`,
    sort_order: i,
  }));

  return NextResponse.json(summary);
}
