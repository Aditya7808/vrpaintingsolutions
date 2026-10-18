import { NextResponse } from 'next/server';
import { PORTFOLIO_ITEMS } from '@/lib/portfolioData';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const service = searchParams.get('service');

  let items = PORTFOLIO_ITEMS;
  if (service) {
    items = items.filter(
      (item) => item.service_slug === service || item.additional_slugs?.includes(service)
    );
  }

  const responseData = items.map((item, idx) => ({
    id: `portfolio-${idx}`,
    url: `/portfolio/${encodeURIComponent(item.file)}`,
    service_slug: item.service_slug,
    caption: item.caption,
    sort_order: idx,
    uploaded_at: new Date().toISOString(),
  }));

  return NextResponse.json(responseData);
}
