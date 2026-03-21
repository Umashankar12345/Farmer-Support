// src/pages/DroughtDashboard/components/SearchFilters.jsx
import React from 'react';
import { Search, Filter, Calendar, MapPin, Sprout } from 'lucide-react';

const SearchFilters = ({ filters, onFilterChange, loading }) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Search className="text-blue-500" /> Search & Filters
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" /> Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            disabled={loading}
          >
            <option>All India</option><option>Rajasthan</option><option>Maharashtra</option><option>Karnataka</option><option>Punjab</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
            <Sprout size={14} className="text-gray-400" /> Crop
          </label>
          <select
            value={filters.crop}
            onChange={(e) => handleChange('crop', e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            disabled={loading}
          >
            <option>All Crops</option><option>Rice</option><option>Wheat</option><option>Cotton</option><option>Sugarcane</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" /> Time Period
          </label>
          <select
            value={filters.timePeriod}
            onChange={(e) => handleChange('timePeriod', e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            disabled={loading}
          >
            <option>Last 30 days</option><option>Last 60 days</option><option>Last 90 days</option><option>This season</option>
          </select>
        </div>

        <div className="pt-5 border-t border-gray-100">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2 text-sm">
            <Filter size={14} /> Advanced Filters
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Rainfall Level</label>
              <select
                value={filters.rainfallLevel}
                onChange={(e) => handleChange('rainfallLevel', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                disabled={loading}
              >
                <option>All</option><option>Severe Deficit (&lt;-60%)</option><option>Moderate Deficit (-30% to -60%)</option><option>Normal (±30%)</option><option>Excess (&gt;+30%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Soil Moisture</label>
              <select
                value={filters.soilMoisture}
                onChange={(e) => handleChange('soilMoisture', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                disabled={loading}
              >
                <option>All</option><option>Critical (&lt;30%)</option><option>Low (30-50%)</option><option>Adequate (50-70%)</option><option>Good (&gt;70%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Reservoir Status</label>
              <select
                value={filters.reservoirStatus}
                onChange={(e) => handleChange('reservoirStatus', e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                disabled={loading}
              >
                <option>All</option><option>Critical (&lt;30%)</option><option>Low (30-60%)</option><option>Moderate (60-80%)</option><option>Good (&gt;80%)</option>
              </select>
            </div>
          </div>
        </div>

        <button className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium shadow-md shadow-orange-200 transition-all hover:-translate-y-0.5 mt-2">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;