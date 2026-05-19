'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);

    // Set demo auth cookie and redirect
    document.cookie = 'demo-auth=true; path=/; max-age=86400';

    // Small delay to ensure cookie is set
    await new Promise(resolve => setTimeout(resolve, 100));

    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LeanIX Viewer</h1>
        <p className="text-gray-600 mb-6">Interactive reports and dashboards</p>

        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 mb-2">
            <span className="font-semibold block">🎬 Demo Mode</span>
            <span>No login needed. Just click below to explore with mock data.</span>
          </p>
        </div>

        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span> Entering...
            </>
          ) : (
            <>
              <span>🚀</span> Enter Demo
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          Demo mode: Full app access with realistic mock LeanIX data
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
