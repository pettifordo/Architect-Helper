'use client';

import { ScatterChartDataPoint } from '@/lib/chartUtils';
import { ScatterChart as RechartsScatterChart, Scatter, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ScatterChartProps {
  data: ScatterChartDataPoint[];
  title?: string;
}

export function ScatterChart({ data, title }: ScatterChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  // Get unique values for axes
  const uniqueX = [...new Set(data.map((d) => d.x))].sort();
  const uniqueY = [...new Set(data.map((d) => d.y))].sort();

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <RechartsScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="x"
            name="Technical Suitability"
            label={{ value: 'Technical Suitability', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            type="category"
            dataKey="y"
            name="Functional Suitability"
            label={{ value: 'Functional Suitability', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
            formatter={(value) => String(value)}
          />
          <Scatter
            name="Applications"
            data={data}
            fill="#3b82f6"
            fillOpacity={0.7}
            shape="circle"
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
