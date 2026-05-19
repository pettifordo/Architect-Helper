'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTemplate } from '@/lib/templates';
import { useState, useEffect } from 'react';
import { FilterConfig } from '@/types/leanix';
import { FilterPanel } from '@/components/FilterPanel';
import { ChartTypeSelector } from '@/components/ChartTypeSelector';
import { ChartRenderer } from '@/components/ChartRenderer';

interface TemplateData {
  [key: string]: any[];
}

const AVAILABLE_FIELDS = [
  'displayName',
  'state',
  'businessCriticality',
  'technicalSuitability',
  'functionalSuitability',
  'lxHostingType',
  'lxSixRClassification',
  'description',
];

export default function TemplatePage() {
  const params = useParams();
  const [data, setData] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [chartType, setChartType] = useState<string>('table');

  const templateId = params?.id as string;
  const template = getTemplate(templateId);

  // Set chartType from template config when template loads
  useEffect(() => {
    if (template) {
      setChartType(template.config.chartType);
    }
  }, [template]);

  useEffect(() => {
    if (!template) {
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
  }, [template]);

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

  // Extract data from nested GraphQL structure
  const getChartData = () => {
    if (!data) return [];

    // Handle nested structure: { allApplications: { edges: [{node: {...}}] } }
    const values = Object.values(data);
    const flatData: any[] = [];

    values.forEach((item: any) => {
      if (item?.edges && Array.isArray(item.edges)) {
        // GraphQL structure
        flatData.push(...item.edges.map((edge: any) => edge.node));
      } else if (Array.isArray(item)) {
        // Direct array
        flatData.push(...item);
      }
    });

    return flatData;
  };

  const chartData = getChartData();

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
          <div className="space-y-6">
            {/* Filter Panel - Hide for graph type */}
            {template.config.chartType !== 'graph' && (
              <FilterPanel onFilterChange={setFilters} availableFields={AVAILABLE_FIELDS} />
            )}

            {/* Chart Type Selector - Hide for graph type */}
            {template.config.chartType !== 'graph' && (
              <ChartTypeSelector selectedChart={chartType} onChartChange={setChartType} />
            )}

            {/* Chart */}
            <ChartRenderer
              chartType={chartType}
              data={chartData}
              filters={filters}
              factSheetType={template.name}
            />
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
