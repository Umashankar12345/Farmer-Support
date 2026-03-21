import React from 'react'

const MachineryCard = ({ machine, onBook, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Machine Header */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-cyan-600">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-6xl opacity-70">🚜</span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            machine.availability === 'Available Now' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {machine.availability}
          </span>
        </div>

        {/* Subsidy Badge */}
        {machine.subsidy && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
              💰 Subsidy: {machine.subsidyAmount}
            </span>
          </div>
        )}
      </div>

      {/* Machine Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{machine.name}</h3>
            <p className="text-gray-600">{machine.type}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{machine.rentPrice}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>
        </div>

        {/* Machine Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">🌱</span>
            <div>
              <p className="text-xs text-gray-500">Suitable for</p>
              <p className="font-medium text-sm">{machine.crop.slice(0, 2).join(', ')}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">⚡</span>
            <div>
              <p className="text-xs text-gray-500">Power</p>
              <p className="font-medium text-sm">{machine.power}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">📍</span>
            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-medium text-sm">{machine.distance}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">⭐</span>
            <div>
              <p className="text-xs text-gray-500">Rating</p>
              <p className="font-medium text-sm">{machine.rating}/5</p>
            </div>
          </div>
        </div>

        {/* Operations */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Operations:</p>
          <div className="flex flex-wrap gap-1">
            {machine.operation.map(op => (
              <span key={op} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {op}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onBook}
            className="py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>📅</span>
            <span>Book Now</span>
          </button>
          <button
            onClick={onViewDetails}
            className="py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>ℹ️</span>
            <span>Details</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">🤖</span>
            <span className="text-xs text-gray-600">{machine.automation}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">⛽</span>
            <span className="text-xs text-gray-600">{machine.fuelType}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MachineryCard