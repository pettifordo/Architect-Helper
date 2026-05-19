import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Always authorize if user has a token
        // This works for both demo mode (credentials provider) and production (Azure AD)
        return !!token;
      },
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/signin',
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.svg|.png|.jpg|.jpeg|.gif|.webp).*)',
  ],
};
