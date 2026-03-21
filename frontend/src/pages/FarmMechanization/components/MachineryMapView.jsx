import React from 'react'

const MachineryMapView = ({ machines, onMachineClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="mr-2">🗺</span>
          Machinery Locations Map
        </h3>
        <p className="text-gray-600 text-sm">Click on machine pins to book</p>
      </div>

      {/* Simplified Map */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border border-gray-200">
        {/* Delhi/NCR Region Map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">🗺️</div>
        </div>

        {/* Machine Pins */}
        {machines.map(machine => (
          <button
            key={machine.id}
            onClick={() => onMachineClick(machine)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${(machine.location.lng - 77.0) * 100 + 50}%`,
              top: `${(28.7 - machine.location.lat) * 100 + 50}%`,
            }}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
              machine.availability === 'Available Now' 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-500 text-white'
            }`}>
              {machine.category === 'tractor' && '🚜'}
              {machine.category === 'harvester' && '🌾'}
              {machine.category === 'seeder' && '🌱'}
              {machine.category === 'tiller' && '🛠️'}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-white rounded-lg shadow-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="font-bold">{machine.name}</div>
              <div className="text-xs text-gray-600">{machine.rentPrice}/day</div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </button>
        ))}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2 text-sm">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Available Now</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">Available Soon</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">With Subsidy</span>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
          <div className="text-sm">
            <p className="font-medium">📍 Delhi/NCR Region</p>
            <p className="text-xs text-gray-600">{machines.length} machines nearby</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Nearest Center</p>
          <p className="text-lg font-bold text-blue-600">3 km</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Avg. Rent</p>
          <p className="text-lg font-bold text-green-600">₹2,500/day</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Subsidy Available</p>
          <p className="text-lg font-bold text-yellow-600">60% machines</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Response Time</p>
          <p className="text-lg font-bold text-purple-600">30 mins</p>
        </div>
      </div>
    </div>
  )
}

export default MachineryMapView