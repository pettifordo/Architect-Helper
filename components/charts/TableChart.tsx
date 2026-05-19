import { TableRow } from '@/lib/chartUtils';

interface TableChartProps {
  data: TableRow[];
}

export function TableChart({ data }: TableChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Application</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Business Criticality</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Functional Suitability</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Technical Suitability</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">State</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id}
              className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
            >
              <td className="px-4 py-2 font-medium text-gray-900">{row.displayName}</td>
              <td className="px-4 py-2 text-gray-600">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  {row.businessCriticality}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-600">{row.functionalSuitability}</td>
              <td className="px-4 py-2 text-gray-600">{row.technicalSuitability}</td>
              <td className="px-4 py-2 text-gray-600">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    row.state === 'APPROVED'
                      ? 'bg-green-50 text-green-700'
                      : row.state === 'DRAFT'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {row.state}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-600 text-xs">{row.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
