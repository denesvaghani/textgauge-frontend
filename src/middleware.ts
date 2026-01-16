import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Canonical domain - all other domains should redirect here
const CANONICAL_DOMAIN = 'www.countcharacters.org';

// Domains that should redirect to the canonical domain
const REDIRECT_DOMAINS = [
  'countcharacters.in',
  'www.countcharacters.in',
  'countcharacters.org', // non-www should also redirect to www
];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0]; // Remove port if present
  
  // Check if current domain should redirect
  if (REDIRECT_DOMAINS.includes(hostname)) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_DOMAIN;
    url.protocol = 'https';
    
    // 301 permanent redirect for SEO
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

// Only run middleware on actual page requests, not on static files or API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|.*\\..*).*)' 
  ],
};
