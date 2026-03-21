import React, { useState } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  DollarSign,
  Calendar,
  RefreshCw,
} from 'lucide-react';

const MachinerySearch = ({ onSearch, onFilterChange, initialFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: initialFilters?.type || '',
    location: initialFilters?.location || '',
    priceRange: initialFilters?.priceRange || '',
    availability: initialFilters?.availability || '',
    powerSource: initialFilters?.powerSource || '',
    sortBy: initialFilters?.sortBy || 'relevance',
  });

  const machineryTypes = [
    'Tractor',
    'Harvester',
    'Plough',
    'Seeder',
    'Irrigation System',
    'Sprayer',
    'Cultivator',
    'Loader',
    'Balers',
    'Other',
  ];

  const powerSources = ['Diesel', 'Electric', 'Solar', 'Manual', 'Hybrid'];
  const priceRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $20,000',
    '$20,000 - $50,000',
    'Above $50,000',
  ];
  const locations = [
    'Nearby',
    'Same State',
    'Anywhere',
    'North Region',
    'South Region',
    'East Region',
    'West Region',
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm, filters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      location: '',
      priceRange: '',
      availability: '',
      powerSource: '',
      sortBy: 'relevance',
    };
    setFilters(resetFilters);
    setSearchTerm('');
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  const quickFilters = [
    { label: 'Available Today', key: 'availability', value: 'today' },
    { label: 'Under $5k', key: 'priceRange', value: '$1,000 - $5,000' },
    { label: 'Electric', key: 'powerSource', value: 'Electric' },
    { label: 'Nearby', key: 'location', value: 'Nearby' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-slate-500 dark:text-slate-400">Find Agricultural Machinery</h3>
        <div className="relative flex items-center">
          <div className="absolute left-3 text-slate-400 flex items-center justify-center">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for tractors, harvesters, irrigation systems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full py-3 pl-10 pr-3 border border-slate-200 rounded-lg text-base transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
          />
          <button
            className="absolute right-[1px] top-[1px] bottom-[1px] px-5 bg-green-600 text-white border-none rounded-r-lg font-medium cursor-pointer transition-colors hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3 text-slate-600 font-medium text-sm dark:text-slate-300">
          <Filter size={16} />
          <span>Quick Filters</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              className={`px-3 py-1.5 border rounded-full text-xs cursor-pointer transition-all ${filters[filter.key] === filter.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600'
                }`}
              onClick={() => handleFilterChange(filter.key, filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3 text-slate-600 font-medium text-sm dark:text-slate-300">
          <SlidersHorizontal size={16} />
          <span>Advanced Filters</span>
          <button
            className="ml-auto flex items-center gap-1 bg-none border-none text-slate-500 cursor-pointer text-sm p-1 rounded hover:bg-slate-50 hover:text-slate-600 transition-colors dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            onClick={handleReset}
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {/* Machinery Type */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">Machinery Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="p-2 border border-slate-200 rounded-md text-sm bg-white text-slate-600 cursor-pointer transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
            >
              <option value="">All Types</option>
              {machineryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
              <MapPin size={12} />
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="p-2 border border-slate-200 rounded-md text-sm bg-white text-slate-600 cursor-pointer transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
            >
              <option value="">Any Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
              <DollarSign size={12} />
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="p-2 border border-slate-200 rounded-md text-sm bg-white text-slate-600 cursor-pointer transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
            >
              <option value="">Any Price</option>
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Power Source */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">Power Source</label>
            <select
              value={filters.powerSource}
              onChange={(e) => handleFilterChange('powerSource', e.target.value)}
              className="p-2 border border-slate-200 rounded-md text-sm bg-white text-slate-600 cursor-pointer transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
            >
              <option value="">All Power Sources</option>
              {powerSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
              <Calendar size={12} />
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="p-2 border border-slate-200 rounded-md text-sm bg-white text-slate-600 cursor-pointer transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
            >
              <option value="">Any Time</option>
              <option value="today">Available Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Date</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="p-2 border border-slate-200 rounded-md text-sm bg-white text-slate-600 cursor-pointer transition-all focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/10 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:border-green-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="distance">Distance</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(Object.values(filters).some(value => value) || searchTerm) && (
        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-md text-xs dark:bg-green-900/30 dark:text-green-300">
                Search: {searchTerm}
                <button
                  className="bg-none border-none text-inherit cursor-pointer p-0 ml-1 text-sm leading-none hover:text-red-700 dark:hover:text-red-400"
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </button>
              </span>
            )}

            {Object.entries(filters).map(([key, value]) => {
              if (value && key !== 'sortBy') {
                return (
                  <span key={key} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-md text-xs dark:bg-green-900/30 dark:text-green-300">
                    {key}: {value}
                    <button
                      className="bg-none border-none text-inherit cursor-pointer p-0 ml-1 text-sm leading-none hover:text-red-700 dark:hover:text-red-400"
                      onClick={() => handleFilterChange(key, '')}
                    >
                      ×
                    </button>
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MachinerySearch;