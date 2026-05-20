'use client';

import { Insight } from '@/lib/insightsGenerator';

interface ReportSummaryProps {
  insights: Insight[];
  title: string;
}

export function ReportSummary({ insights, title }: ReportSummaryProps) {
  if (insights.length === 0) {
    return null;
  }

  const severityColors: Record<string, string> = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-blue-50 border-blue-200',
  };

  const severityBadgeColors: Record<string, string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  const categoryIcons: Record<string, string> = {
    risk: '⚠️',
    opportunity: '💡',
    recommendation: '📋',
    metric: '📊',
  };

  const riskInsights = insights.filter((i) => i.category === 'risk');
  const opportunityInsights = insights.filter((i) => i.category === 'opportunity');
  const recommendationInsights = insights.filter((i) => i.category === 'recommendation');
  const metricInsights = insights.filter((i) => i.category === 'metric');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights & Analysis</h2>

      {/* Risk Section */}
      {riskInsights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
            <span>⚠️</span> Critical Risks
          </h3>
          <div className="space-y-3">
            {riskInsights.map((insight, idx) => (
              <div key={idx} className={`border rounded-lg p-4 ${severityColors[insight.severity || 'high']}`}>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{categoryIcons[insight.category]}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
                  </div>
                  {insight.severity && (
                    <span className={`text-xs font-medium px-2 py-1 rounded ${severityBadgeColors[insight.severity]}`}>
                      {insight.severity.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Section */}
      {metricInsights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <span>📊</span> Key Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metricInsights.map((insight, idx) => (
              <div key={idx} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-700">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Opportunities Section */}
      {opportunityInsights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span>💡</span> Opportunities
          </h3>
          <div className="space-y-3">
            {opportunityInsights.map((insight, idx) => (
              <div key={idx} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {recommendationInsights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <span>📋</span> Recommendations
          </h3>
          <div className="space-y-3">
            {recommendationInsights.map((insight, idx) => (
              <div key={idx} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
