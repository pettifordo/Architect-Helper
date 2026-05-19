import { FilterConfig } from '@/types/leanix';

export interface TableRow {
  id: string;
  displayName: string;
  businessCriticality: string;
  functionalSuitability: string;
  technicalSuitability: string;
  state: string;
  updatedAt: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface LineChartDataPoint {
  month: string;
  count: number;
}

export interface ScatterChartDataPoint {
  x: string;
  y: string;
  name: string;
}

// Extract field value from nested object
export function getFieldValue(obj: any, fieldPath: string): any {
  const parts = fieldPath.split('.');
  let value = obj;
  for (const part of parts) {
    value = value?.[part];
  }
  return value;
}

// Transform applications for table display
export function transformApplicationsForTable(data: any[]): TableRow[] {
  return data.map((app) => ({
    id: app.id || '',
    displayName: app.displayName || 'N/A',
    businessCriticality: app.businessCriticality || 'N/A',
    functionalSuitability: app.functionalSuitability || 'N/A',
    technicalSuitability: app.technicalSuitability || 'N/A',
    state: app.state || 'N/A',
    updatedAt: app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : 'N/A',
  }));
}

// Transform applications for bar chart (grouped by technicalSuitability)
export function transformApplicationsForBarChart(data: any[]): ChartDataPoint[] {
  const grouped: Record<string, number> = {};

  data.forEach((app) => {
    const suitability = app.technicalSuitability || 'Unknown';
    grouped[suitability] = (grouped[suitability] || 0) + 1;
  });

  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
}

// Transform applications for pie chart (grouped by businessCriticality)
export function transformApplicationsForPieChart(data: any[]): ChartDataPoint[] {
  const grouped: Record<string, number> = {};

  data.forEach((app) => {
    const criticality = app.businessCriticality || 'Unknown';
    grouped[criticality] = (grouped[criticality] || 0) + 1;
  });

  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
}

// Transform applications for line chart (count by month)
export function transformApplicationsForLineChart(data: any[]): LineChartDataPoint[] {
  const grouped: Record<string, number> = {};

  data.forEach((app) => {
    const dateStr = app.createdAt || app.updatedAt;
    if (!dateStr) return;

    const date = new Date(dateStr);
    const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    grouped[monthKey] = (grouped[monthKey] || 0) + 1;
  });

  // Sort by date
  return Object.entries(grouped)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([month, count]) => ({
      month,
      count,
    }));
}

// Transform applications for scatter chart (technical vs functional suitability)
export function transformApplicationsForScatterChart(data: any[]): ScatterChartDataPoint[] {
  return data.map((app) => ({
    x: app.technicalSuitability || 'Unknown',
    y: app.functionalSuitability || 'Unknown',
    name: app.displayName || 'Unknown',
  }));
}

// Apply filters to data
export function applyFilters(data: any[], filters: FilterConfig[]): any[] {
  if (!filters || filters.length === 0) {
    return data;
  }

  return data.filter((item) => {
    return filters.every((filter) => {
      const fieldValue = getFieldValue(item, filter.field);

      switch (filter.operator) {
        case 'equals':
          return fieldValue === filter.value;
        case 'contains':
          return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
        case 'gt':
          return Number(fieldValue) > Number(filter.value);
        case 'lt':
          return Number(fieldValue) < Number(filter.value);
        case 'gte':
          return Number(fieldValue) >= Number(filter.value);
        case 'lte':
          return Number(fieldValue) <= Number(filter.value);
        case 'in':
          const values = Array.isArray(filter.value) ? filter.value : String(filter.value).split(',');
          return values.includes(fieldValue);
        default:
          return true;
      }
    });
  });
}
