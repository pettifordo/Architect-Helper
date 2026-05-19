'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [email, setEmail] = useState('demo@example.com');

  // Check if Azure AD is configured
  useEffect(() => {
    const checkDemoMode = async () => {
      try {
        const response = await fetch('/api/auth/session');
        // If we can't get config, we're in demo mode
        setIsDemoMode(true);
      } catch {
        setIsDemoMode(true);
      }
    };
    checkDemoMode();
  }, []);

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn('credentials', {
      email,
      password: 'demo',
      callbackUrl,
    });
  };

  const handleAzureLogin = () => {
    setIsLoading(true);
    signIn('azure-ad', { callbackUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LeanIX Viewer</h1>
        <p className="text-gray-600 mb-2">Interactive reports and dashboards</p>

        {isDemoMode && (
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <p className="font-semibold mb-1">🎬 Demo Mode</p>
            <p>
              Running with mock data. Use any email to log in and explore the
              application.
            </p>
          </div>
        )}

        {isDemoMode ? (
          <form onSubmit={handleDemoLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span> Signing in...
                </>
              ) : (
                <>
                  <span>🚀</span> Enter Demo Mode
                </>
              )}
            </button>
          </form>
        ) : (
          <button
            onClick={handleAzureLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span> Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24h-8.1c-.3 0-.5-.2-.5-.5V.5c0-.3.2-.5.5-.5h8.1c.3 0 .5.2.5.5v23c0 .3-.2.5-.5.5z" />
                  <path d="M21.3 0h-8.1c-.3 0-.5.2-.5.5V12h9.1V.5c0-.3-.2-.5-.5-.5z" />
                  <path d="M21.3 13H3.2V24h8.1c.3 0 .5-.2.5-.5V13h9.5z" />
                </svg>
                Sign in with Microsoft
              </>
            )}
          </button>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          {isDemoMode
            ? 'Demo mode: Enter any email to explore'
            : 'You will be redirected to sign in with your Syensqo corporate account'}
        </p>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
