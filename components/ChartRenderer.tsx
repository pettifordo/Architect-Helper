'use client';

import { FilterConfig } from '@/types/leanix';
import {
  applyFilters,
  transformApplicationsForTable,
  transformApplicationsForBarChart,
  transformApplicationsForPieChart,
  transformApplicationsForLineChart,
  transformApplicationsForScatterChart,
} from '@/lib/chartUtils';
import { TableChart } from './charts/TableChart';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { LineChart } from './charts/LineChart';
import { ScatterChart } from './charts/ScatterChart';
import { IntegrationMap } from './IntegrationMap';

interface ChartRendererProps {
  chartType: string;
  data: any[];
  filters: FilterConfig[];
  factSheetType: string;
}

export function ChartRenderer({ chartType, data, filters, factSheetType }: ChartRendererProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
        <p className="text-lg">No data available</p>
      </div>
    );
  }

  // Apply filters
  const filteredData = applyFilters(data, filters);

  if (filteredData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
        <p className="text-lg">No data matches your filters</p>
        <p className="text-sm mt-2">Try adjusting your filter criteria</p>
      </div>
    );
  }

  // Render appropriate chart
  switch (chartType) {
    case 'table':
      const tableData = transformApplicationsForTable(filteredData);
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <TableChart data={tableData} />
        </div>
      );

    case 'bar':
      const barData = transformApplicationsForBarChart(filteredData);
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <BarChart data={barData} title="Applications by Technical Suitability" />
        </div>
      );

    case 'pie':
      const pieData = transformApplicationsForPieChart(filteredData);
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <PieChart data={pieData} title="Applications by Business Criticality" />
        </div>
      );

    case 'line':
      const lineData = transformApplicationsForLineChart(filteredData);
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <LineChart data={lineData} title="Applications Created Over Time" />
        </div>
      );

    case 'scatter':
      const scatterData = transformApplicationsForScatterChart(filteredData);
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <ScatterChart data={scatterData} title="Technical vs Functional Suitability" />
        </div>
      );

    case 'graph':
      return (
        <div className="bg-white rounded-lg shadow overflow-hidden" style={{ height: '600px' }}>
          <IntegrationMap applications={filteredData} />
        </div>
      );

    default:
      return (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          <p>Unknown chart type: {chartType}</p>
        </div>
      );
  }
}
