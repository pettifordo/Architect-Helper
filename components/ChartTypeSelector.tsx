'use client';

interface ChartTypeSelectorProps {
  selectedChart: string;
  onChartChange: (type: string) => void;
}

const CHART_TYPES = [
  { id: 'table', label: 'Table', icon: '📋' },
  { id: 'bar', label: 'Bar Chart', icon: '📊' },
  { id: 'pie', label: 'Pie Chart', icon: '🥧' },
  { id: 'line', label: 'Line Chart', icon: '📈' },
  { id: 'scatter', label: 'Scatter Plot', icon: '📍' },
];

export function ChartTypeSelector({ selectedChart, onChartChange }: ChartTypeSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualization Type</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {CHART_TYPES.map((chart) => (
          <button
            key={chart.id}
            onClick={() => onChartChange(chart.id)}
            className={`p-3 rounded-lg text-center transition-all ${
              selectedChart === chart.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <div className="text-2xl mb-1">{chart.icon}</div>
            <div className="text-xs font-medium">{chart.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
