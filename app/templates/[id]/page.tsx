'use client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getTemplate } from '@/lib/templates';
import { useState, useEffect } from 'react';

interface TemplateData {
  [key: string]: any;
}

export default function TemplatePage() {
  const params = useParams();
  const { data: session } = useSession();
  const [data, setData] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const templateId = params?.id as string;
  const template = getTemplate(templateId);

  useEffect(() => {
    if (!template || !session?.leanixAccessToken) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/leanix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: template?.query || '',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0]?.message || 'GraphQL error');
        }

        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [template, session?.leanixAccessToken]);

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600">Template not found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/templates" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{template.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{template.name}</h1>
              <p className="text-gray-600 mt-1">{template.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="inline-block">
              <div className="animate-spin text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading report data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 font-semibold">Error loading report</p>
            <p className="text-red-700 mt-2">{error}</p>
            <p className="text-sm text-red-600 mt-4">
              Make sure your LeanIX credentials are properly configured
            </p>
          </div>
        )}

        {data && !loading && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Report Data</h2>

            {/* Display the raw data for now */}
            <div className="overflow-x-auto">
              <pre className="bg-gray-50 p-4 rounded text-sm text-gray-800 overflow-auto max-h-96">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              <p className="font-semibold mb-2">💡 Next Steps</p>
              <p>
                This is a basic data display. Full visualizations (charts, tables, etc.)
                will be added as we develop the visualization components.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && !data && (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-gray-600">No data available</p>
          </div>
        )}
      </main>
    </div>
  );
}
