import React, { useState } from 'react'

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState(null)

  const schemes = [
    {
      id: 1,
      name: "PM-Kisan Mechanization Scheme",
      ministry: "Ministry of Agriculture",
      subsidy: "Up to 50%",
      amount: "₹1,25,000 maximum",
      eligibility: "Small & Marginal Farmers",
      crops: "All crops",
      machines: ["Tractors", "Power Tillers", "Harvesters"],
      deadline: "31 March 2025",
      icon: "🏛️",
      color: "bg-blue-100",
      textColor: "text-blue-700"
    },
    {
      id: 2,
      name: "Custom Hiring Centre (CHC) Scheme",
      ministry: "State Agriculture Dept",
      subsidy: "40-60%",
      amount: "₹10,00,000 maximum",
      eligibility: "FPOs, Cooperatives",
      crops: "All crops",
      machines: ["Full package"],
      deadline: "Ongoing",
      icon: "🤝",
      color: "bg-green-100",
      textColor: "text-green-700"
    },
    {
      id: 3,
      name: "Sub-Mission on Agricultural Mechanization",
      ministry: "SMAM, GoI",
      subsidy: "25-40%",
      amount: "Varies by state",
      eligibility: "All farmers",
      crops: "Priority crops",
      machines: ["Seeders", "Sprayers", "Planters"],
      deadline: "31 Dec 2024",
      icon: "🌾",
      color: "bg-yellow-100",
      textColor: "text-yellow-700"
    },
    {
      id: 4,
      name: "Rashtriya Krishi Vikas Yojana",
      ministry: "RKVY",
      subsidy: "Up to 60%",
      amount: "₹5,00,000 maximum",
      eligibility: "Women & SC/ST farmers",
      crops: "All crops",
      machines: ["Small machinery"],
      deadline: "Ongoing",
      icon: "👩‍🌾",
      color: "bg-pink-100",
      textColor: "text-pink-700"
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">💰</span>
        </div>
        <div>
          <h3 className="text-xl font-bold">Government Subsidy Schemes</h3>
          <p className="text-gray-600">Financial assistance for farm machinery</p>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {schemes.map(scheme => (
          <div 
            key={scheme.id} 
            className={`border rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer ${scheme.color} ${selectedScheme?.id === scheme.id ? 'ring-2 ring-offset-2 ring-yellow-500' : ''}`}
            onClick={() => setSelectedScheme(scheme)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{scheme.icon}</span>
                  <h4 className="font-bold text-lg">{scheme.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{scheme.ministry}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${scheme.textColor}`}>
                {scheme.subsidy} Subsidy
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="font-medium">{scheme.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Eligibility:</span>
                <span className="font-medium">{scheme.eligibility}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Deadline:</span>
                <span className="font-medium">{scheme.deadline}</span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Covered Machines:</p>
              <div className="flex flex-wrap gap-1">
                {scheme.machines.map(machine => (
                  <span key={machine} className="px-2 py-1 bg-white text-xs rounded">
                    {machine}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Scheme Details */}
      {selectedScheme && (
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-xl font-bold mb-2">{selectedScheme.name} Details</h4>
              <p className="text-gray-600">Complete information and application process</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              📝 Apply Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold mb-3">📋 Eligibility Criteria</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Land holding: 0.5 - 5 acres
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {selectedScheme.eligibility}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Valid Aadhaar & Bank account
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No pending loans
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold mb-3">📄 Required Documents</h5>
              <ul className="space-y-2 text-sm">
                <li>• Aadhaar Card</li>
                <li>• Land Ownership Proof</li>
                <li>• Bank Passbook</li>
                <li>• Caste Certificate (if applicable)</li>
                <li>• Passport Size Photos</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold mb-3">⏱️ Application Process</h5>
              <ol className="space-y-2 text-sm list-decimal pl-5">
                <li>Visit nearest Agriculture Office</li>
                <li>Submit application form</li>
                <li>Field verification (7 days)</li>
                <li>Approval (15-20 days)</li>
                <li>Subsidy disbursement</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📞</span>
              <div>
                <h5 className="font-bold">Need Help?</h5>
                <p className="text-sm text-gray-600">Contact Agriculture Department: 1800-180-1551</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 flex flex-col items-center">
          <span className="text-2xl mb-2">📱</span>
          <span className="text-sm font-medium">Check Status</span>
        </button>
        <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 flex flex-col items-center">
          <span className="text-2xl mb-2">📄</span>
          <span className="text-sm font-medium">Download Form</span>
        </button>
        <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 flex flex-col items-center">
          <span className="text-2xl mb-2">🎥</span>
          <span className="text-sm font-medium">Video Guide</span>
        </button>
        <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 flex flex-col items-center">
          <span className="text-2xl mb-2">💬</span>
          <span className="text-sm font-medium">Chat Support</span>
        </button>
      </div>
    </div>
  )
}

export default GovernmentSchemes