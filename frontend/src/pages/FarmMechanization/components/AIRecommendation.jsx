import React, { useState } from 'react'

const AIRecommendation = ({ farmSize, selectedCrop, selectedOperation }) => {
  const [aiResult, setAiResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const getAIRecommendation = () => {
    setLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      let recommendation = {
        title: "AI-Powered Machinery Recommendation",
        recommendedMachine: "",
        reason: "",
        costAnalysis: "",
        subsidyInfo: "",
        efficiency: ""
      }

      // AI Logic based on inputs
      if (farmSize <= 2) {
        recommendation.recommendedMachine = "Power Tiller (15 HP)"
        recommendation.reason = "Small farm size, cost-effective for tilling and ploughing"
        recommendation.costAnalysis = "Rent: ₹1,800/day, Purchase: ₹2,20,000 (with subsidy)"
        recommendation.subsidyInfo = "35% subsidy available under PM-Kisan Mechanization"
        recommendation.efficiency = "Covers 1 acre/day, fuel efficient"
      } else if (farmSize <= 5) {
        recommendation.recommendedMachine = "Medium Tractor (45 HP)"
        recommendation.reason = "Ideal for medium farms, versatile for multiple operations"
        recommendation.costAnalysis = "Rent: ₹4,000/day, Purchase: ₹6,50,000 (with subsidy)"
        recommendation.subsidyInfo = "25% subsidy available"
        recommendation.efficiency = "Covers 2-3 acres/day"
      } else {
        recommendation.recommendedMachine = "Combine Harvester + Tractor"
        recommendation.reason = "Large farm, requires efficient harvesting and tilling"
        recommendation.costAnalysis = "Rent: ₹15,000/day, Purchase package available"
        recommendation.subsidyInfo = "Custom Hiring Centre subsidy applicable"
        recommendation.efficiency = "Covers 8-10 acres/day"
      }

      // Adjust based on crop
      if (selectedCrop === 'Rice' || selectedCrop === 'Wheat') {
        recommendation.recommendedMachine += " + Paddy Harvester"
        recommendation.reason += ". Specialized for grain crops"
      }

      if (selectedOperation === 'Harvesting') {
        recommendation.recommendedMachine = "Combine Harvester"
        recommendation.reason = "Specifically for harvesting operations"
      }

      setAiResult(recommendation)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h3 className="text-xl font-bold">AI Machinery Assistant</h3>
          <p className="text-gray-600">Get personalized recommendations based on your farm</p>
        </div>
      </div>

      {/* Current Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Farm Size</p>
          <p className="text-xl font-bold">{farmSize} acres</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Crop Type</p>
          <p className="text-xl font-bold">{selectedCrop || 'Any Crop'}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Operation</p>
          <p className="text-xl font-bold">{selectedOperation || 'Any Operation'}</p>
        </div>
      </div>

      {/* Get Recommendation Button */}
      <button
        onClick={getAIRecommendation}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all mb-6 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            AI is thinking...
          </div>
        ) : (
          "🤖 Get AI Recommendation"
        )}
      </button>

      {/* AI Result */}
      {aiResult && (
        <div className="border border-purple-200 rounded-xl p-5 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🎯</span>
            <div>
              <h4 className="text-lg font-bold text-purple-700">{aiResult.title}</h4>
              <p className="text-sm text-purple-600">Based on your farm parameters</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🚜</span>
                <h5 className="font-bold">Recommended Machine</h5>
              </div>
              <p className="text-lg font-bold text-green-600">{aiResult.recommendedMachine}</p>
              <p className="text-gray-700">{aiResult.reason}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-bold mb-2">💰 Cost Analysis</h5>
                <p className="text-gray-700">{aiResult.costAnalysis}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-bold mb-2">🏛️ Subsidy Information</h5>
                <p className="text-gray-700">{aiResult.subsidyInfo}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold mb-2">⚡ Efficiency & Coverage</h5>
              <p className="text-gray-700">{aiResult.efficiency}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                ✅ Apply Recommendation
              </button>
              <button className="py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium">
                💬 Talk to Krishi Officer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-bold mb-2 flex items-center">
          <span className="mr-2">💡</span>
          AI Farming Tips
        </h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Rent machinery during peak season to save costs</li>
          <li>• Combine multiple operations to reduce rental days</li>
          <li>• Check subsidy eligibility before purchasing</li>
          <li>• Consider fuel efficiency for long-term savings</li>
          <li>• Book in advance during harvest season</li>
        </ul>
      </div>
    </div>
  )
}

export default AIRecommendation