import React from 'react'

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedCrop,
  setSelectedCrop,
  selectedLocation,
  setSelectedLocation,
  farmSizeRange,
  setFarmSizeRange,
  plantingDate,
  setPlantingDate
}) => {
  const crops = [
    'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 
    'Pulses', 'Oilseeds', 'Fruits', 'Vegetables', 'Coconut'
  ]

  const locations = [
    'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 
    'Karnataka', 'Tamil Nadu', 'Kerala', 'Rajasthan'
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">🔍</span>
        <h3 className="text-lg font-semibold">Search Farms</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Farm Name Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Farm Name
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by farm name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            list="farm-suggestions"
          />
          <datalist id="farm-suggestions">
            <option value="Green Valley Farm" />
            <option value="Sunshine Fields" />
            <option value="River Side Farm" />
            <option value="Mountain View Farm" />
            <option value="Coastal Farm" />
          </datalist>
        </div>

        {/* Crop Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crop Type
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Crops</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Farm Size Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Farm Size: {farmSizeRange[0]} - {farmSizeRange[1]} Ha
          </label>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">0</span>
            <input
              type="range"
              min="0"
              max="100"
              value={farmSizeRange[0]}
              onChange={(e) => setFarmSizeRange([parseInt(e.target.value), farmSizeRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={farmSizeRange[1]}
              onChange={(e) => setFarmSizeRange([farmSizeRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <span className="text-sm text-gray-500">100</span>
          </div>
        </div>

        {/* Date Planted */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Planted
          </label>
          <input
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCrop('')
              setSelectedLocation('')
              setFarmSizeRange([0, 100])
              setPlantingDate('')
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar