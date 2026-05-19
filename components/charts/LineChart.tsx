'use client';

import { LineChartDataPoint } from '@/lib/chartUtils';
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

interface LineChartProps {
  data: LineChartDataPoint[];
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-700">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p className="text-blue-300">Applications: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function LineChart({ data, title }: LineChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={420}>
        <RechartsLineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 600 }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 6, strokeWidth: 2, stroke: '#ffffff' }}
            activeDot={{ r: 8, fill: '#1e40af' }}
            label={{ position: 'top', fill: '#1f2937', fontSize: 11, fontWeight: 600 }}
            name="Applications"
            animationDuration={800}
            isAnimationActive={true}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
