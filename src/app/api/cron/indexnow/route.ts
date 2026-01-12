import { NextResponse } from 'next/server';
import { submitToIndexNow, INDEXNOW_HOST } from '@/lib/indexnow';
import sitemap from '@/app/sitemap';

export const dynamic = 'force-dynamic'; // Prevent static caching

export async function GET() {
  try {
    // Dynamically fetch all URLs from the sitemap
    const sitemapEntries = await sitemap();
    const pages = sitemapEntries.map(entry => entry.url);

    const result = await submitToIndexNow(pages);

    return NextResponse.json({
      message: 'IndexNow submission triggered',
      result,
      urls: pages.length,
      pages // useful for debugging
    });
  } catch (error) {
    console.error('Failed to trigger IndexNow:', error);
    return NextResponse.json({ error: 'Failed to trigger IndexNow' }, { status: 500 });
  }
}
