import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for subdomain-based routing.
 * 
 * When the hostname is `studio.jeffdomingos.com`, the request is internally
 * rewritten to the /studio route while preserving the locale prefix.
 * 
 * Examples:
 *   studio.jeffdomingos.com/         → rewrite to /en/studio
 *   studio.jeffdomingos.com/en       → rewrite to /en/studio
 *   studio.jeffdomingos.com/pt       → rewrite to /pt/studio
 *   studio.jeffdomingos.com/pt/      → rewrite to /pt/studio
 * 
 * For local development, you can test by adding to /etc/hosts:
 *   127.0.0.1 studio.localhost
 * 
 * And accessing: http://studio.localhost:3000
 */

const STUDIO_HOSTNAMES = [
    'studio.jeffdomingos.com',
    'studio.localhost', // Local development
];

const SUPPORTED_LOCALES = ['en', 'pt'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host')?.split(':')[0] ?? '';
    const { pathname } = request.nextUrl;

    // Only intercept if the request is coming from a studio subdomain
    if (!STUDIO_HOSTNAMES.includes(hostname)) {
        return NextResponse.next();
    }

    // Skip static assets, API routes, and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/ingest') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    let locale = DEFAULT_LOCALE;
    let remainingPath = '';

    if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
        locale = segments[0];
        remainingPath = segments.slice(1).join('/');
    } else {
        remainingPath = segments.join('/');
    }

    // If user is already on /studio, let it pass through
    if (remainingPath === 'studio' || remainingPath.startsWith('studio/')) {
        const targetPath = `/${locale}/${remainingPath}`;
        if (pathname === targetPath) {
            return NextResponse.next();
        }
        const url = request.nextUrl.clone();
        url.pathname = targetPath;
        return NextResponse.rewrite(url);
    }

    // Rewrite root and any non-studio path to /studio
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/studio`;
    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
