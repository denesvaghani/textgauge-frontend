import { NextResponse } from 'next/server';
import { submitToIndexNow, INDEXNOW_HOST } from '@/lib/indexnow';

export const dynamic = 'force-dynamic'; // Prevent static caching

export async function GET() {
  // Define all your important pages here
  // Ideally this should match your sitemap
  const pages = [
    `https://${INDEXNOW_HOST}/`,
    `https://${INDEXNOW_HOST}/cron-job-generator`,
    `https://${INDEXNOW_HOST}/image-compressor`,
    `https://${INDEXNOW_HOST}/json-formatter`,
    `https://${INDEXNOW_HOST}/yaml-formatter`,
    `https://${INDEXNOW_HOST}/toml-formatter`,
    `https://${INDEXNOW_HOST}/json-to-csv`,
    `https://${INDEXNOW_HOST}/diff-checker`,
  ];

  const result = await submitToIndexNow(pages);

  return NextResponse.json({
    message: 'IndexNow submission triggered',
    result,
    urls: pages.length
  });
}
