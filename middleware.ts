import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasScanned = request.cookies.get('has_scanned');

  // Paths that should be protected from double scanning
  const protectedPaths = ['/', '/step-1', '/step-2'];

  if (hasScanned && protectedPaths.includes(request.nextUrl.pathname)) {
    // Lead has already scanned, redirect to the results/remarketing page
    return NextResponse.redirect(new URL('/results', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/step-1', '/step-2'],
};
