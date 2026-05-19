'use client';

import { useState } from 'react';
import { FilterConfig } from '@/types/leanix';

interface FilterPanelProps {
  onFilterChange: (filters: FilterConfig[]) => void;
  availableFields: string[];
}

const OPERATORS = ['equals', 'contains', 'gt', 'lt', 'gte', 'lte', 'in'];

export function FilterPanel({ onFilterChange, availableFields }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  const addFilter = () => {
    const newFilter: FilterConfig = {
      field: availableFields[0] || 'displayName',
      operator: 'equals',
      value: '',
    };
    const updatedFilters = [...filters, newFilter];
    setFilters(updatedFilters);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const updateFilter = (index: number, key: keyof FilterConfig, value: any) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      [key]: value,
    };
    setFilters(updatedFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      {filters.length === 0 ? (
        <p className="text-sm text-gray-500 mb-4">No filters applied</p>
      ) : (
        <div className="space-y-3 mb-4">
          {filters.map((filter, index) => (
            <div key={index} className="flex gap-2 items-end">
              {/* Field */}
              <select
                value={filter.field}
                onChange={(e) => updateFilter(index, 'field', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableFields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>

              {/* Operator */}
              <select
                value={filter.operator}
                onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {OPERATORS.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>

              {/* Value */}
              <input
                type="text"
                placeholder="Value"
                value={filter.value}
                onChange={(e) => updateFilter(index, 'value', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Delete Button */}
              <button
                onClick={() => removeFilter(index)}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Filter Button */}
      <button
        onClick={addFilter}
        className="w-full mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
      >
        + Add Filter
      </button>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        disabled={filters.length === 0}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
