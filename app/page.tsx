'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const REPORT_TEMPLATES = [
  {
    id: 'application-landscape',
    title: 'Application Landscape',
    description: 'Overview of all applications, their lifecycle status, and criticality',
    icon: '📊',
  },
  {
    id: 'tech-stack',
    title: 'Technology Stack Analysis',
    description: 'Analyze technologies in use across the organization',
    icon: '🛠️',
  },
  {
    id: 'portfolio',
    title: 'Application Portfolio',
    description: 'Portfolio view with lifecycle and business metrics',
    icon: '📈',
  },
  {
    id: 'integration-map',
    title: 'Integration Map',
    description: 'Visualize application integrations and data flows',
    icon: '🔗',
  },
  {
    id: 'risk-dashboard',
    title: 'Risk Assessment',
    description: 'Technical and business risk assessment dashboard',
    icon: '⚠️',
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Banner */}
      {(session as any)?.isDemoMode && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-yellow-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎬</span>
              <span>
                <strong>Demo Mode:</strong> This is a preview with mock LeanIX data.
              </span>
            </div>
            <span className="text-xs text-yellow-700">
              Contact your admin to enable live data access
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">LeanIX Viewer</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session.user?.name || session.user?.email}
              {(session as any)?.isDemoMode && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Demo</span>}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to LeanIX Viewer
          </h2>
          <p className="text-gray-600 mb-6">
            Create interactive reports and dashboards from your LeanIX landscape data.
          </p>
          <Link
            href="/builder"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            + Create Custom Report
          </Link>
        </div>

        {/* Report templates grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Pre-built Report Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPORT_TEMPLATES.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer h-full p-6">
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/builder"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                → Build Custom Report
              </Link>
            </li>
            <li>
              <Link
                href="/templates"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                → View All Templates
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
