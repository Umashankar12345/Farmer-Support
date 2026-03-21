// src/pages/CropSownAnalysis/CropSownAnalysis.jsx
import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

import SummaryCards from './components/SummaryCards';
import SearchFilters from './components/SearchFilters';
import FilterPanel from './components/FilterPanel';
import ChartsSection from './components/ChartsSection';
import MapView from './components/MapView';
import CropCards from './components/CropCards';
import AIInsights from './components/AIInsights';

const CropSownAnalysis = () => {
  const [filters, setFilters] = useState({
    cropType: '',
    season: '',
    year: '2024',
    location: '',
    farmerType: '',
    irrigation: '',
    soilType: '',
    isGovtSupported: false,
    isOrganic: false,
    sowingType: 'normal'
  });

  const [showMap, setShowMap] = useState(false);
  const [exportFormat, setExportFormat] = useState('');

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleExport = (format) => {
    setExportFormat(format);
    // Export logic here
    setTimeout(() => setExportFormat(''), 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Sprout className="text-green-600" size={32} /> Crop Sown Analysis
        </h1>
        <p className="text-gray-500 text-lg">Analyze crop patterns, trends, and AI insights for better farming decisions</p>
      </div>

      {/* Part 1: Top Summary Cards */}
      <SummaryCards filters={filters} />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mt-8">
        {/* Left Column: Filters */}
        <div className="space-y-6">
          {/* Part 2: Search & Filters */}
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

          {/* Part 3: Filter Panel */}
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Right Column: Main Content */}
        <div className="space-y-8">
          {/* Part 4: Charts or Map View */}
          <div className="flex gap-2 mb-6">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all ${!showMap
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              onClick={() => setShowMap(false)}
            >
              📊 Chart View
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all ${showMap
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              onClick={() => setShowMap(true)}
            >
              🗺️ Map View
            </button>
          </div>

          {showMap ? (
            <MapView filters={filters} />
          ) : (
            <ChartsSection filters={filters} />
          )}

          {/* Part 5: Crop-wise Analysis Cards */}
          <CropCards filters={filters} />

          {/* Part 6: AI Insights Panel */}
          <AIInsights filters={filters} />
        </div>
      </div>

      {/* Part 7: Export & Report Options */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Export & Reports</h3>
        <div className="flex flex-wrap gap-4">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
            onClick={() => handleExport('pdf')}
            disabled={exportFormat === 'pdf'}
          >
            {exportFormat === 'pdf' ? '📄 Generating...' : '📄 Download PDF Report'}
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors font-medium disabled:opacity-50"
            onClick={() => handleExport('excel')}
            disabled={exportFormat === 'excel'}
          >
            {exportFormat === 'excel' ? '📊 Exporting...' : '📊 Export Excel Data'}
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors font-medium"
            onClick={() => window.print()}
          >
            🖨️ Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropSownAnalysis;