import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List public paths that never require auth
const PUBLIC_PATHS = ['/display', '/owner', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Allow public routes without checks
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 2) For everything else, read the Firebase Auth cookie set by the client SDK
  const idToken = request.cookies.get('__session')?.value;
  if (idToken) {
    return NextResponse.next();
  }

// 3) Unauthenticated → redirect to /login
  return NextResponse.redirect(new URL('/login', request.url));
  
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};
