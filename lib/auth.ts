import { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    leanixAccessToken?: string;
    isDemoMode?: boolean;
    user: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    leanixAccessToken?: string;
    leanixRefreshToken?: string;
    leanixTokenExpiry?: number;
    isDemoMode?: boolean;
  }
}

// Function to refresh LeanIX token if expired
async function refreshLeanIXToken(token: JWT): Promise<JWT> {
  // Only refresh if token is expiring within 1 minute
  if (!token.leanixTokenExpiry || token.leanixTokenExpiry > Date.now() + 60000) {
    return token;
  }

  try {
    const response = await fetch('https://syensqo.leanix.net/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.leanixRefreshToken || '',
        client_id: process.env.LEANIX_OAUTH_CLIENT_ID || '',
        client_secret: process.env.LEANIX_OAUTH_CLIENT_SECRET || '',
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh LeanIX token');
    }

    const data = await response.json();
    return {
      ...token,
      leanixAccessToken: data.access_token,
      leanixRefreshToken: data.refresh_token || token.leanixRefreshToken,
      leanixTokenExpiry: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    console.error('Error refreshing LeanIX token:', error);
    return token;
  }
}

const isDemoMode =
  !process.env.AZURE_AD_CLIENT_ID ||
  !process.env.AZURE_AD_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    // Azure AD provider (production)
    ...(isDemoMode
      ? []
      : [
          AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID || '',
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
            tenantId: process.env.AZURE_AD_TENANT_ID || 'common',
            authorization: {
              params: {
                scope: 'openid profile email',
              },
            },
          }),
        ]),
    // Demo credentials provider (when Azure AD not configured)
    ...(isDemoMode
      ? [
          CredentialsProvider({
            name: 'Demo Login',
            credentials: {
              email: {
                label: 'Email',
                type: 'email',
                placeholder: 'demo@example.com',
              },
              password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
              // In demo mode, accept any credentials
              if (credentials?.email) {
                return {
                  id: 'demo-user',
                  email: credentials.email,
                  name: credentials.email.split('@')[0],
                  image: null,
                };
              }
              return null;
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Demo mode - set demo token
      if (isDemoMode && user) {
        token.isDemoMode = true;
        token.leanixAccessToken = 'demo-token';
        return token;
      }

      // Production mode - On first sign in, try to get LeanIX token
      if (account) {
        token.accessToken = account.access_token;

        // Request LeanIX authorization
        try {
          const response = await fetch('https://syensqo.leanix.net/oauth2/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'client_credentials',
              client_id: process.env.LEANIX_OAUTH_CLIENT_ID || '',
              client_secret: process.env.LEANIX_OAUTH_CLIENT_SECRET || '',
            }).toString(),
          });

          if (response.ok) {
            const data = await response.json();
            token.leanixAccessToken = data.access_token;
            token.leanixRefreshToken = data.refresh_token;
            token.leanixTokenExpiry = Date.now() + data.expires_in * 1000;
          }
        } catch (error) {
          console.error('Failed to obtain LeanIX token:', error);
        }
      }

      // Refresh LeanIX token if needed (production only)
      if (!isDemoMode && token.leanixRefreshToken) {
        token = await refreshLeanIXToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken;
        session.leanixAccessToken = token.leanixAccessToken;
        session.isDemoMode = token.isDemoMode || false;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
};
