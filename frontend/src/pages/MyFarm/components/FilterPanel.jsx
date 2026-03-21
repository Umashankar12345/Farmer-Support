import React from 'react'

const FilterPanel = ({
  farmStatus,
  setFarmStatus,
  irrigationType,
  setIrrigationType,
  soilType,
  setSoilType,
  farmingType,
  setFarmingType,
  waterAvailability,
  setWaterAvailability
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">🎛</span>
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Farm Status */}
        <div>
          <h4 className="font-medium mb-2">Farm Status</h4>
          <div className="space-y-2">
            {['all', 'active', 'inactive'].map(status => (
              <label key={status} className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={farmStatus === status}
                  onChange={(e) => setFarmStatus(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">
                  {status === 'all' ? 'All Status' : 
                   status === 'active' ? '✅ Active' : '⛔ Inactive'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Irrigation Type */}
        <div>
          <h4 className="font-medium mb-2">Irrigation Type</h4>
          <div className="space-y-2">
            {['all', 'rainfed', 'drip', 'canal'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="irrigation"
                  value={type}
                  checked={irrigationType === type}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">
                  {type === 'all' ? 'All Types' : 
                   type === 'drip' ? '💧 Drip' :
                   type === 'canal' ? '🚰 Canal' : '☔ Rainfed'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Soil Type */}
        <div>
          <h4 className="font-medium mb-2">Soil Type</h4>
          <div className="space-y-2">
            {['all', 'alluvial', 'black', 'red', 'sandy'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="soil"
                  value={type}
                  checked={soilType === type}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">
                  {type === 'all' ? 'All Types' : 
                   type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Farming Type */}
        <div>
          <h4 className="font-medium mb-2">Farming Type</h4>
          <div className="space-y-2">
            {['all', 'organic', 'conventional'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="farming"
                  value={type}
                  checked={farmingType === type}
                  onChange={(e) => setFarmingType(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">
                  {type === 'all' ? 'All Types' : 
                   type === 'organic' ? '🌿 Organic' : '🏭 Conventional'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Water Availability */}
        <div>
          <h4 className="font-medium mb-2">Water Availability</h4>
          <div className="space-y-2">
            {['all', 'adequate', 'moderate', 'low'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="water"
                  value={type}
                  checked={waterAvailability === type}
                  onChange={(e) => setWaterAvailability(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">
                  {type === 'all' ? 'All Levels' : 
                   type === 'adequate' ? '💧 Adequate' :
                   type === 'moderate' ? '⚠️ Moderate' : '🚫 Low'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear All Filters */}
        <div className="pt-4 border-t">
          <button
            onClick={() => {
              setFarmStatus('all')
              setIrrigationType('all')
              setSoilType('all')
              setFarmingType('all')
              setWaterAvailability('all')
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel