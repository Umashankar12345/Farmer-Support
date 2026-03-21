// src/pages/CropProduction/components/FiltersSection.jsx
import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

const FiltersSection = ({ filters, onFilterChange, loading }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      cropName: 'All Crops',
      season: 'Kharif',
      year: '2024',
      location: 'All India',
      farmSize: 'All',
      irrigationType: 'All',
      fertilizerUsage: 'All',
      pestStatus: 'All',
      farmingType: 'All'
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Search className="text-blue-500" /> Search & Filters
      </h3>

      <div className="space-y-4">
        {/* Basic Filters */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Crop Name</label>
            <select
              value={localFilters.cropName}
              onChange={(e) => handleChange('cropName', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50"
              disabled={loading}
            >
              <option>All Crops</option>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Maize</option>
              <option>Soybean</option>
              <option>Cotton</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Season</label>
            <select
              value={localFilters.season}
              onChange={(e) => handleChange('season', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50"
              disabled={loading}
            >
              <option>Kharif</option>
              <option>Rabi</option>
              <option>Summer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Year</label>
            <select
              value={localFilters.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50"
              disabled={loading}
            >
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
            <select
              value={localFilters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50"
              disabled={loading}
            >
              <option>All India</option>
              <option>Punjab</option>
              <option>Haryana</option>
              <option>Uttar Pradesh</option>
              <option>Madhya Pradesh</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2 text-sm">
            <SlidersHorizontal size={14} /> Advanced Filters
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Farm Size</label>
              <select
                value={localFilters.farmSize}
                onChange={(e) => handleChange('farmSize', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option>All</option>
                <option>Small (&lt;2 ha)</option>
                <option>Medium (2-10 ha)</option>
                <option>Large (&gt;10 ha)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Irrigation</label>
              <select
                value={localFilters.irrigationType}
                onChange={(e) => handleChange('irrigationType', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option>All</option>
                <option>Canal</option>
                <option>Borewell</option>
                <option>Rainfed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Fertilizer</label>
              <select
                value={localFilters.fertilizerUsage}
                onChange={(e) => handleChange('fertilizerUsage', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Pest Status</label>
              <select
                value={localFilters.pestStatus}
                onChange={(e) => handleChange('pestStatus', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option>All</option>
                <option>Healthy</option>
                <option>Affected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={applyFilters}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-md shadow-green-200 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Applying...' : 'Apply Filters'}
          </button>
          <button
            onClick={resetFilters}
            disabled={loading}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;