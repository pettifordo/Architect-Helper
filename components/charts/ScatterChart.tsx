'use client';

import { ScatterChartDataPoint } from '@/lib/chartUtils';
import { ScatterChart as RechartsScatterChart, Scatter, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ScatterChartProps {
  data: ScatterChartDataPoint[];
  title?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-700">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p className="text-blue-300">Technical: {payload[0].payload.x}</p>
        <p className="text-green-300">Functional: {payload[0].payload.y}</p>
      </div>
    );
  }
  return null;
};

export function ScatterChart({ data, title }: ScatterChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={420}>
        <RechartsScatterChart margin={{ top: 30, right: 30, left: 60, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="category"
            dataKey="x"
            name="Technical Suitability"
            label={{ value: 'Technical Suitability', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis
            type="category"
            dataKey="y"
            name="Functional Suitability"
            label={{ value: 'Functional Suitability', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3', stroke: '#3b82f6' }}
            content={<CustomTooltip />}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 600 }}
            iconType="circle"
          />
          <Scatter
            name="Applications"
            data={data}
            fill="#3b82f6"
            fillOpacity={0.8}
            shape="circle"
            isAnimationActive={true}
            animationDuration={800}
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
