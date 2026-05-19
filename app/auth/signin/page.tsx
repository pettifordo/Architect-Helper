'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LeanIX Viewer</h1>
        <p className="text-gray-600 mb-8">Interactive reports and dashboards</p>

        <button
          onClick={() => {
            setIsLoading(true);
            signIn('azure-ad', { callbackUrl });
          }}
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

        <p className="text-sm text-gray-500 text-center mt-6">
          You will be redirected to sign in with your Syensqo corporate account
        </p>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
