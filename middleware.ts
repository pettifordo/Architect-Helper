import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for demo mode bypass cookie
  const demoAuth = request.cookies.get('demo-auth')?.value;

  // In demo mode, allow all access
  if (demoAuth === 'true') {
    return NextResponse.next();
  }

  // Allow access to signin and api/auth routes
  if (
    request.nextUrl.pathname === '/auth/signin' ||
    request.nextUrl.pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Otherwise redirect to signin
  return NextResponse.redirect(new URL('/auth/signin', request.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
