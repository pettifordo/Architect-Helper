'use client';

import { ChartDataPoint } from '@/lib/chartUtils';
import { PieChart as RechartsPieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PieChartProps {
  data: ChartDataPoint[];
  title?: string;
}

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const total = (payload as any).reduce((sum: number) => sum + 1, 0) * payload[0].value;
    const value = payload[0].value;
    const percent = ((value / (payload[0].payload._total || value * 3)) * 100).toFixed(1);
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-700">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-blue-300">Count: {value}</p>
      </div>
    );
  }
  return null;
};

export function PieChart({ data, title }: PieChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={420}>
        <RechartsPieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, value }) => {
              const percent = ((value / total) * 100).toFixed(0);
              return `${name}: ${value} (${percent}%)`;
            }}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 600 }}
            iconType="circle"
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
