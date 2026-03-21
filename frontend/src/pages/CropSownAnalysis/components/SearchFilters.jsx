// src/pages/CropSownAnalysis/components/SearchFilters.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchFilters = ({ filters, onFilterChange }) => {
  const cropTypes = ['Paddy', 'Wheat', 'Maize', 'Soybean', 'Cotton', 'Sugarcane', 'Pulses', 'Oilseeds'];
  const seasons = ['Kharif', 'Rabi', 'Zaid', 'All Seasons'];
  const years = ['2024', '2023', '2022', '2021', '2020'];
  const locations = ['All India', 'Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'West Bengal'];
  const farmerTypes = ['All Farmers', 'Small', 'Marginal', 'Large'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Search className="text-blue-500" size={20} /> Search & Filter
      </h3>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Crop Type</label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            value={filters.cropType}
            onChange={(e) => onFilterChange('cropType', e.target.value)}
          >
            <option value="">All Crops</option>
            {cropTypes.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Season</label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            value={filters.season}
            onChange={(e) => onFilterChange('season', e.target.value)}
          >
            <option value="">Select Season</option>
            {seasons.map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Year</label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Location</label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Farmer Type</label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            value={filters.farmerType}
            onChange={(e) => onFilterChange('farmerType', e.target.value)}
          >
            <option value="">All Types</option>
            {farmerTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Search size={18} />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;