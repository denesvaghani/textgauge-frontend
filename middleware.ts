import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    const headers = response.headers;

    // 1. Preventing Clickjacking
    headers.set('X-Frame-Options', 'DENY');

    // 2. Prevent MIME sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // 3. Referrer Policy
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // 4. Content Security Policy (Basic)
    // strict-dynamic is hard with Next.js without nonce, so we use a robust default.
    // We allow 'unsafe-eval' for Monaco Editor workers to function correctly.
    const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com https://cdn.jsdelivr.net; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.google-analytics.com https://cdn.jsdelivr.net;
    font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net;
    connect-src 'self' https://trends.google.com https://www.google-analytics.com;
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

    headers.set('Content-Security-Policy', csp);

    // 5. Permissions Policy
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
