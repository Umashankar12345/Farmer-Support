// src/pages/CropSownAnalysis/components/FilterPanel.jsx
import React from 'react';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const irrigationTypes = [
    { label: 'All Types', value: '' },
    { label: 'Irrigated', value: 'irrigated' },
    { label: 'Rainfed', value: 'rainfed' }
  ];

  const soilTypes = [
    { label: 'All Types', value: '' },
    { label: 'Black Soil', value: 'black' },
    { label: 'Red Soil', value: 'red' },
    { label: 'Alluvial Soil', value: 'alluvial' },
    { label: 'Laterite Soil', value: 'laterite' }
  ];

  const sowingTypes = [
    { label: 'Normal Sowing', value: 'normal' },
    { label: 'Late Sowing', value: 'late' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Filter className="text-blue-500" size={20} /> Additional Filters
      </h3>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Irrigation Type</h4>
        <div className="flex flex-wrap gap-2">
          {irrigationTypes.map((type, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${filters.irrigation === type.value
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              onClick={() => onFilterChange('irrigation', type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Soil Type</h4>
        <div className="flex flex-wrap gap-2">
          {soilTypes.map((soil, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${filters.soilType === soil.value
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              onClick={() => onFilterChange('soilType', soil.value)}
            >
              {soil.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Other Filters</h4>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={filters.isGovtSupported}
              onChange={(e) => onFilterChange('isGovtSupported', e.target.checked)}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Govt-supported crops only</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={filters.isOrganic}
              onChange={(e) => onFilterChange('isOrganic', e.target.checked)}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Organic farming only</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Sowing Type</h4>
        <div className="flex flex-wrap gap-2">
          {sowingTypes.map((type, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${filters.sowingType === type.value
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              onClick={() => onFilterChange('sowingType', type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="w-full py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        onClick={() => {
          onFilterChange('irrigation', '');
          onFilterChange('soilType', '');
          onFilterChange('isGovtSupported', false);
          onFilterChange('isOrganic', false);
          onFilterChange('sowingType', 'normal');
        }}
      >
        <X size={16} />
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;