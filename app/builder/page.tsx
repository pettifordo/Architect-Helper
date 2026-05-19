'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const FACT_SHEET_TYPES = [
  { id: 'Application', label: 'Applications' },
  { id: 'ITComponent', label: 'IT Components' },
  { id: 'Platform', label: 'Platforms' },
  { id: 'TechnologyStack', label: 'Technology Stacks' },
  { id: 'BusinessCapability', label: 'Business Capabilities' },
  { id: 'Interface', label: 'Interfaces' },
  { id: 'DataObject', label: 'Data Objects' },
];

const CHART_TYPES = [
  { id: 'table', label: 'Table', icon: '📋' },
  { id: 'bar', label: 'Bar Chart', icon: '📊' },
  { id: 'pie', label: 'Pie Chart', icon: '🥧' },
  { id: 'line', label: 'Line Chart', icon: '📈' },
  { id: 'scatter', label: 'Scatter Plot', icon: '📍' },
];

export default function BuilderPage() {
  const { data: session } = useSession();
  const [reportName, setReportName] = useState('');
  const [selectedFactSheet, setSelectedFactSheet] = useState('Application');
  const [selectedChart, setSelectedChart] = useState('table');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName) {
      setError('Please enter a report name');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Build a basic query for the selected fact sheet type
      const queryMap: Record<string, string> = {
        Application: 'allApplications',
        ITComponent: 'allITComponents',
        Platform: 'allPlatforms',
        TechnologyStack: 'allTechnologyStacks',
        BusinessCapability: 'allBusinessCapabilities',
        Interface: 'allInterfaces',
        DataObject: 'allDataObjects',
      };

      const queryName = queryMap[selectedFactSheet] || 'allApplications';

      const query = `
        query {
          ${queryName}(first: 100) {
            edges {
              node {
                id
                displayName
                description
                state
                updatedAt
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;

      const response = await fetch('/api/leanix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      setResult({
        name: reportName,
        factSheet: selectedFactSheet,
        chart: selectedChart,
        data: data.data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Custom Report</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Builder Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleBuild} className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Configure Report</h2>

              {/* Report Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g., High Risk Applications"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Fact Sheet Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fact Sheet Type
                </label>
                <select
                  value={selectedFactSheet}
                  onChange={(e) => setSelectedFactSheet(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {FACT_SHEET_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chart Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Visualization
                </label>
                <div className="space-y-2">
                  {CHART_TYPES.map((chart) => (
                    <label key={chart.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="chart"
                        value={chart.id}
                        checked={selectedChart === chart.id}
                        onChange={(e) => setSelectedChart(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg">{chart.icon}</span>
                      <span className="text-gray-700">{chart.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Building...' : 'Build Report'}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {result && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Report: {result.name}</h2>

                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  <p><strong>Fact Sheet Type:</strong> {result.factSheet}</p>
                  <p><strong>Visualization:</strong> {result.chart}</p>
                </div>

                <div className="overflow-x-auto">
                  <pre className="bg-gray-50 p-4 rounded text-xs text-gray-800 overflow-auto max-h-96">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                  <p className="font-semibold mb-2">📊 Coming Soon</p>
                  <p>
                    Advanced filtering, drill-down capabilities, and full visualization support
                    will be available in the next phase.
                  </p>
                </div>
              </div>
            )}

            {!result && !loading && (
              <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
                <p className="text-lg">Configure your report and click "Build Report" to see results</p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="inline-block">
                  <div className="animate-spin text-4xl mb-4">⏳</div>
                  <p className="text-gray-600">Building report...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
