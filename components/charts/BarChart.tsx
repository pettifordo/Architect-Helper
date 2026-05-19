'use client';

import { ChartDataPoint } from '@/lib/chartUtils';
import { BarChart as RechartsBarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

interface BarChartProps {
  data: ChartDataPoint[];
  title?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-700">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p className="text-blue-300">Count: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function BarChart({ data, title }: BarChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={420}>
        <RechartsBarChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 600 }}
            iconType="square"
          />
          <Bar
            dataKey="value"
            fill="#3b82f6"
            name="Count"
            radius={[8, 8, 0, 0]}
            label={{ position: 'top', fill: '#1f2937', fontSize: 12, fontWeight: 600 }}
            animationDuration={800}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
