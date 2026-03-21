import React, { useState } from 'react'

const BookingModal = ({ machine, onClose }) => {
  const [bookingType, setBookingType] = useState('rent') // 'rent' or 'purchase'
  const [selectedDate, setSelectedDate] = useState('')
  const [duration, setDuration] = useState(1)
  const [contactNumber, setContactNumber] = useState('')
  const [bookingStep, setBookingStep] = useState(1) // 1: Details, 2: Confirmation

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bookingStep === 1) {
      setBookingStep(2)
    } else {
      // Submit booking
      alert(`Booking confirmed for ${machine.name}! You will receive a confirmation call.`)
      onClose()
    }
  }

  const calculateCost = () => {
    if (bookingType === 'rent') {
      const pricePerDay = parseInt(machine.rentPrice.replace(/[^0-9]/g, ''))
      return pricePerDay * duration
    } else {
      const purchasePrice = parseInt(machine.purchasePrice.replace(/[^0-9]/g, ''))
      const subsidy = machine.subsidy ? parseInt(machine.subsidyAmount.replace(/[^0-9]/g, '')) : 0
      return purchasePrice - subsidy
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book {machine.name}</h2>
            <p className="text-gray-600">{machine.type} • {machine.power}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center p-4 border-b">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`w-24 h-1 mx-2 ${bookingStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
          </div>
          <div className="ml-4">
            <span className="text-sm font-medium">
              Step {bookingStep} of 2: {bookingStep === 1 ? 'Booking Details' : 'Confirmation'}
            </span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {bookingStep === 1 ? (
            <form onSubmit={handleSubmit}>
              {/* Booking Type */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Booking Type</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setBookingType('rent')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center ${bookingType === 'rent' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <span className="text-2xl mb-2">📅</span>
                    <span className="font-bold">Rent</span>
                    <span className="text-sm text-gray-600">{machine.rentPrice}/day</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('purchase')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center ${bookingType === 'purchase' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <span className="text-2xl mb-2">💰</span>
                    <span className="font-bold">Purchase</span>
                    <span className="text-sm text-gray-600">{machine.purchasePrice}</span>
                  </button>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                {bookingType === 'rent' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (Days)
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <span className="font-bold text-lg min-w-[3rem]">{duration} days</span>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Machine Info Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-bold mb-2">Selected Machine</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium ml-2">{machine.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Power:</span>
                      <span className="font-medium ml-2">{machine.power}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-medium ml-2">{machine.availability}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-medium ml-2">{machine.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-bold mb-2">Cost Summary</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>{bookingType === 'rent' ? 'Rental Cost' : 'Purchase Price'}:</span>
                      <span className="font-bold">
                        {bookingType === 'rent' ? machine.rentPrice : machine.purchasePrice}
                      </span>
                    </div>
                    {machine.subsidy && bookingType === 'purchase' && (
                      <div className="flex justify-between text-green-600">
                        <span>Subsidy Deduction:</span>
                        <span className="font-bold">-{machine.subsidyAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-bold">Total Amount:</span>
                      <span className="text-xl font-bold text-green-600">
                        ₹{calculateCost().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-6"
              >
                Continue to Confirmation →
              </button>
            </form>
          ) : (
            /* Confirmation Step */
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">✅</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Booking Summary</h3>
              <p className="text-gray-600 mb-6">Review your booking details before confirmation</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Machine:</span>
                    <span className="font-bold">{machine.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Type:</span>
                    <span className="font-bold">{bookingType === 'rent' ? 'Rental' : 'Purchase'}</span>
                  </div>
                  {bookingType === 'rent' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-bold">{selectedDate || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-bold">{duration} days</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-bold">{contactNumber}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 mt-3">
                    <span className="text-lg font-bold">Total Amount:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{calculateCost().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBookingStep(1)}
                  className="py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  ← Edit Details
                </button>
                <button
                  onClick={handleSubmit}
                  className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                >
                  Confirm Booking
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                <h5 className="font-bold mb-2 flex items-center">
                  <span className="mr-2">📞</span>
                  What happens next?
                </h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• You will receive a confirmation call within 30 minutes</li>
                  <li>• Our executive will visit for verification</li>
                  <li>• Machine will be delivered at your farm</li>
                  <li>• Payment on delivery</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Alternative Contact Options */}
        <div className="p-6 border-t">
          <p className="text-center text-gray-600 mb-3">Prefer other ways to book?</p>
          <div className="grid grid-cols-3 gap-3">
            <button className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex flex-col items-center">
              <span className="text-xl mb-1">📞</span>
              <span className="text-sm">Call Center</span>
            </button>
            <button className="p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex flex-col items-center">
              <span className="text-xl mb-1">💬</span>
              <span className="text-sm">WhatsApp</span>
            </button>
            <button className="p-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 flex flex-col items-center">
              <span className="text-xl mb-1">🏪</span>
              <span className="text-sm">Visit Center</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal