import React from 'react'

const MapView = ({ farms, onFarmClick }) => {
  // Simple map representation with farm pins
  // In production, you would use Google Maps or Leaflet

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="mr-2">🗺</span>
          Farm Locations Map
        </h3>
        <p className="text-gray-600 text-sm">Click on farm pins to view details</p>
      </div>

      {/* Simplified Map Representation */}
      <div className="relative h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden border border-gray-200">
        {/* India Map Outline (simplified) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">🗺️</div>
        </div>

        {/* Farm Pins */}
        {farms.map(farm => (
          <button
            key={farm.id}
            onClick={() => onFarmClick(farm)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${((farm.longitude + 180) / 360) * 100}%`,
              top: `${((90 - farm.latitude) / 180) * 100}%`,
            }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              farm.status === 'Active' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-400 text-white'
            }`}>
              <span className="text-lg">📍</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-3 py-2 bg-white rounded-lg shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {farm.name}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </button>
        ))}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2 text-sm">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Active Farm</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-sm">Inactive Farm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>📍 Showing {farms.length} farms on the map</p>
        <p className="text-xs mt-1">Note: For production use, integrate with Google Maps API or Leaflet.js</p>
      </div>
    </div>
  )
}

export default MapView