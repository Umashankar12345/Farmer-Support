import React, { useState } from 'react';
import { Sprout, Beaker, Leaf, CheckCircle2, AlertCircle } from 'lucide-react';

const FertilizerRecommendations = () => {
  // State for form inputs
  const [selectedCrop, setSelectedCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [soilPH, setSoilPH] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [organicFilter, setOrganicFilter] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  // Mock data - replace with API data
  const crops = [
    'Paddy (Rice)',
    'Wheat',
    'Cotton',
    'Sugarcane',
    'Maize',
    'Soybean',
    'Potato',
    'Tomato'
  ];

  const soilTypes = [
    'Alluvial',
    'Black Soil (Regur)',
    'Red Soil',
    'Laterite Soil',
    'Mountain Soil',
    'Desert Soil'
  ];

  const growthStages = [
    'Seedling',
    'Vegetative',
    'Flowering',
    'Fruiting',
    'Maturity'
  ];

  // Mock fertilizer data
  const fertilizerData = {
    'Paddy (Rice)': [
      {
        id: 1,
        name: 'Urea',
        npk: '46-0-0',
        quantity: '100-120 kg/acre',
        timing: 'Basal and Tillering stage',
        type: 'Chemical',
        price: '₹250/bag'
      },
      {
        id: 2,
        name: 'DAP (Di-Ammonium Phosphate)',
        npk: '18-46-0',
        quantity: '60-80 kg/acre',
        timing: 'Basal application',
        type: 'Chemical',
        price: '₹1200/bag'
      },
      {
        id: 3,
        name: 'Vermicompost',
        npk: '1-0.5-0.7',
        quantity: '2-3 tonnes/acre',
        timing: 'Before sowing',
        type: 'Organic',
        price: '₹8000/tonne'
      }
    ],
    'Wheat': [
      {
        id: 1,
        name: 'Urea',
        npk: '46-0-0',
        quantity: '80-100 kg/acre',
        timing: 'Sowing and Crown root initiation',
        type: 'Chemical',
        price: '₹250/bag'
      },
      {
        id: 2,
        name: 'SSP (Single Super Phosphate)',
        npk: '0-16-0',
        quantity: '150-200 kg/acre',
        timing: 'Basal application',
        type: 'Chemical',
        price: '₹400/bag'
      }
    ],
    'Cotton': [
      {
        id: 1,
        name: 'Urea',
        npk: '46-0-0',
        quantity: '50-70 kg/acre',
        timing: 'Basal application',
        type: 'Chemical',
        price: '₹250/bag'
      }
    ],
    'Sugarcane': [
      {
        id: 1,
        name: 'Urea',
        npk: '46-0-0',
        quantity: '200-250 kg/acre',
        timing: 'Split application',
        type: 'Chemical',
        price: '₹250/bag'
      }
    ]
  };

  const handleGenerateRecommendation = () => {
    if (!selectedCrop) {
      alert('Please select a crop first');
      return;
    }

    // Filter recommendations based on organic preference
    let filteredRecs = fertilizerData[selectedCrop] || [];

    if (organicFilter) {
      filteredRecs = filteredRecs.filter(rec => rec.type === 'Organic');
    }

    setRecommendations(filteredRecs);
  };

  return (
    <div className="min-h-screen p-6 bg-green-50/50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-2 flex items-center justify-center gap-3">
          <Sprout size={32} className="text-green-600" />
          Fertilizer Recommendations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          Apply the right nutrients in the right amount. Get customized fertilizer recommendations for your farm.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">
        {/* Left Panel - Form */}
        <div className="lg:flex-[1] lg:max-w-md w-full">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-6">
            <h2 className="text-xl font-bold text-green-800 mb-6 pb-3 border-b-2 border-green-500">
              Get Your Personalized Plan
            </h2>

            {/* Step 1: Select Crop */}
            <div className="mb-6">
              <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Select Your Crop
              </h3>
              <div className="relative">
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-white focus:outline-none focus:border-green-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="">Select Crop --</option>
                  {crops.map((crop, index) => (
                    <option key={index} value={crop}>{crop}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>

            {/* Step 2: Soil Details */}
            <div className="mb-6">
              <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                Enter Soil Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Soil Type</label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                  >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Soil pH (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., 6.5"
                    value={soilPH}
                    onChange={(e) => setSoilPH(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                  />
                  <small className="text-xs text-gray-500 mt-1 block">Most crops prefer pH 6.0-7.0</small>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Growth Stage</label>
                  <select
                    value={growthStage}
                    onChange={(e) => setGrowthStage(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                  >
                    <option value="">Select Growth Stage</option>
                    {growthStages.map((stage, index) => (
                      <option key={index} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="pt-5 border-t border-gray-100 mt-6">
              <h3 className="text-gray-800 font-semibold mb-3">Filters</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={organicFilter}
                    onChange={(e) => setOrganicFilter(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-green-500 checked:bg-green-500"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-green-700 transition-colors">Show only Organic fertilizers</span>
              </label>
            </div>

            {/* Generate Button */}
            <button
              className="w-full mt-6 bg-green-600 text-white p-3.5 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-sm active:transform active:scale-[0.98]"
              onClick={handleGenerateRecommendation}
            >
              Generate Recommendation
            </button>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="lg:flex-[2] w-full">
          {recommendations ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 min-h-[500px]">
              <div className="mb-6 pb-4 border-b-2 border-green-50">
                <h2 className="text-2xl font-bold text-green-900 mb-2">Recommended Fertilizers for {selectedCrop}</h2>
                <div className="text-gray-600 text-sm flex gap-3">
                  <span>{recommendations.length} recommendations found</span>
                  {soilType && <span>• Soil: {soilType}</span>}
                  {soilPH && <span>• pH: {soilPH}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {recommendations.map((fertilizer) => (
                  <div key={fertilizer.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:-translate-y-1 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-green-900 m-0">{fertilizer.name}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${fertilizer.type === 'Organic'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                        }`}>
                        {fertilizer.type}
                      </span>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">NPK Ratio:</span>
                        <span className="font-medium text-gray-800 text-sm">{fertilizer.npk}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Quantity:</span>
                        <span className="font-medium text-gray-800 text-sm">{fertilizer.quantity}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Apply at:</span>
                        <span className="font-medium text-gray-800 text-sm">{fertilizer.timing}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Price:</span>
                        <span className="font-medium text-gray-800 text-sm">{fertilizer.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 border-2 border-green-500 text-green-600 rounded-lg font-semibold text-sm hover:bg-green-500 hover:text-white transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 py-2.5 bg-green-500 border-2 border-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 hover:border-green-600 transition-colors">
                        Add to Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No results message */}
              {recommendations.length === 0 && (
                <div className="text-center py-10">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-5">No fertilizer recommendations found for the selected criteria.</p>
                  <button
                    className="px-5 py-2.5 bg-white border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                    onClick={() => {
                      setOrganicFilter(false);
                      setRecommendations(fertilizerData[selectedCrop] || []);
                    }}
                  >
                    Show All Recommendations
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-200 min-h-[500px] flex flex-col justify-center items-center">
              <div className="text-6xl mb-5 animate-bounce">
                🌱
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">Generate Fertilizer Plan</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Select your crop and soil details to get personalized fertilizer recommendations tailored to your farm needs.
              </p>
              <div className="flex flex-col gap-3 text-left w-full max-w-xs mx-auto">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">Crop-specific recommendations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">Soil-based nutrient planning</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">Organic & Chemical options</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">Quantity & timing guidance</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendations;