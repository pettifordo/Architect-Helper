import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export const config = {
  matcher: [
    '/((?!api/auth|auth/signin|_next/static|_next/image|favicon.ico).*)',
  ],
};
