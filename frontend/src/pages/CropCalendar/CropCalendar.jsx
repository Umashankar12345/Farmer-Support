// src/pages/CropCalendar/CropCalendar.jsx
import React, { useState } from 'react';
import { Calendar, Cloud, ClipboardList, Clock, Download, ChevronLeft, ChevronRight, Droplets, FlaskConical, Bug, Sprout } from 'lucide-react';

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedRegion, setSelectedRegion] = useState('North India');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾' },
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'maize', name: 'Maize', icon: '🌽' },
    { id: 'cotton', name: 'Cotton', icon: '🧵' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' },
    { id: 'soybean', name: 'Soybean', icon: '🫘' },
    { id: 'pulses', name: 'Pulses', icon: '🫘' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' }
  ];

  const regions = [
    'North India', 'South India', 'East India', 'West India', 'Central India', 'All India'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCropCalendar = () => {
    const calendars = {
      'Rice': {
        'North India': [
          { activity: 'Nursery Preparation', months: [5, 6], duration: '15 days' },
          { activity: 'Transplanting', months: [6, 7], duration: '7-10 days' },
          { activity: 'First Irrigation', months: [6], duration: 'Immediate' },
          { activity: 'First Fertilizer', months: [6, 7], duration: '1 day' },
          { activity: 'Weeding', months: [7], duration: '7 days' },
          { activity: 'Second Fertilizer', months: [8], duration: '1 day' },
          { activity: 'Pest Control', months: [8, 9], duration: 'As needed' },
          { activity: 'Harvesting', months: [10, 11], duration: '15-20 days' }
        ],
        'All India': [
          { activity: 'Land Preparation', months: [5, 6], duration: '10 days' },
          { activity: 'Sowing/Transplanting', months: [6, 7], duration: '15 days' },
          { activity: 'Water Management', months: [6, 7, 8, 9], duration: 'Continuous' },
          { activity: 'Fertilizer Application', months: [6, 8], duration: '2 applications' },
          { activity: 'Harvesting', months: [10, 11], duration: '20 days' }
        ]
      },
      'Wheat': {
        'North India': [
          { activity: 'Land Preparation', months: [10, 11], duration: '10 days' },
          { activity: 'Sowing', months: [11], duration: '15 days' },
          { activity: 'First Irrigation', months: [11], duration: 'Immediate' },
          { activity: 'First Fertilizer', months: [11], duration: '1 day' },
          { activity: 'Second Irrigation', months: [1], duration: 'Immediate' },
          { activity: 'Second Fertilizer', months: [1], duration: '1 day' },
          { activity: 'Harvesting', months: [3, 4], duration: '15-20 days' }
        ]
      }
    };

    return calendars[selectedCrop]?.[selectedRegion] || calendars[selectedCrop]?.['All India'] || [];
  };

  const getCurrentActivities = () => {
    const calendar = getCropCalendar();
    return calendar.filter(activity => activity.months.includes(selectedMonth));
  };

  const getMonthActivities = (monthIndex) => {
    const calendar = getCropCalendar();
    return calendar.filter(activity => activity.months.includes(monthIndex + 1));
  };

  const getSeason = (month) => {
    if ([11, 12, 1, 2].includes(month)) return 'Rabi';
    if ([6, 7, 8, 9, 10].includes(month)) return 'Kharif';
    return 'Summer/Zaid';
  };

  const getWeatherRecommendations = () => {
    const recommendations = {
      1: { temp: 'Cold', advice: 'Protect from frost, delay irrigation on cold days' },
      2: { temp: 'Moderate', advice: 'Good for field preparation, apply pre-sowing fertilizer' },
      3: { temp: 'Warming', advice: 'Watch for heat stress during flowering' },
      4: { temp: 'Hot', advice: 'Harvest before extreme heat, provide shade if needed' },
      5: { temp: 'Very Hot', advice: 'Not suitable for most crops, prepare land for Kharif' },
      6: { temp: 'Hot & Humid', advice: 'Start Kharif sowing with monsoon onset' },
      7: { temp: 'Rainy', advice: 'Monitor drainage, prevent waterlogging' },
      8: { temp: 'Rainy', advice: 'Apply fertilizers after rain, watch for pests' },
      9: { temp: 'Humid', advice: 'Good for crop growth, continue pest monitoring' },
      10: { temp: 'Pleasant', advice: 'Harvest Kharif crops, prepare for Rabi' },
      11: { temp: 'Cool', advice: 'Start Rabi sowing, irrigate as needed' },
      12: { temp: 'Cold', advice: 'Protect from frost, reduce irrigation frequency' }
    };
    return recommendations[selectedMonth];
  };

  const weather = getWeatherRecommendations();
  const currentActivities = getCurrentActivities();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <header className="text-center mb-8 p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
        <h1 className="text-4xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-3">
          <Calendar size={40} /> Crop Calendar
        </h1>
        <p className="text-orange-500 text-lg">Plan your farming activities month by month</p>
      </header>

      {/* Selection Controls */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-orange-100">
        <div className="mb-6">
          <label className="block font-semibold text-gray-800 mb-4 text-lg">Select Crop</label>
          <div className="flex flex-wrap gap-3">
            {crops.map(crop => (
              <button
                key={crop.id}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl min-w-[140px] font-medium transition-all ${selectedCrop === crop.name
                    ? 'bg-orange-50 border-2 border-orange-500 text-orange-600 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-orange-50 hover:border-orange-200'
                  }`}
                onClick={() => setSelectedCrop(crop.name)}
              >
                <span className="text-xl">{crop.icon}</span>
                <span>{crop.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-800 mb-4 text-lg">Select Region</label>
          <div className="flex flex-wrap gap-3">
            {regions.map(region => (
              <button
                key={region}
                className={`flex items-center justify-center px-6 py-3 rounded-xl min-w-[140px] font-medium transition-all ${selectedRegion === region
                    ? 'bg-orange-50 border-2 border-orange-500 text-orange-600 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-orange-50 hover:border-orange-200'
                  }`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label className="block font-semibold text-gray-800 mb-4 text-lg">Current Month: {months[selectedMonth - 1]}</label>
          <div className="flex items-center gap-4 max-w-sm">
            <button
              className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm"
              onClick={() => setSelectedMonth(prev => prev > 1 ? prev - 1 : 12)}
            >
              <ChevronLeft size={24} />
            </button>
            <select
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={month} value={index + 1}>{month}</option>
              ))}
            </select>
            <button
              className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm"
              onClick={() => setSelectedMonth(prev => prev < 12 ? prev + 1 : 1)}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Current Month Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 border-l-green-500">
          <div className="text-4xl">🌤️</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-2">Current Season: {getSeason(selectedMonth)}</h3>
            <p className="text-gray-600 text-sm mb-1">Typical temperature: {weather.temp}</p>
            <p className="text-gray-600 text-sm">{weather.advice}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 border-l-blue-500">
          <div className="text-4xl">📋</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-2">This Month's Activities</h3>
            {currentActivities.length > 0 ? (
              <ul className="space-y-1">
                {currentActivities.map((activity, index) => (
                  <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{activity.activity} ({activity.duration})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic text-sm">No major activities this month</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border-l-4 border-l-orange-500">
          <div className="text-4xl">⏰</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-2">Important Reminders</h3>
            <ul className="space-y-1">
              {[
                'Check soil moisture before irrigation',
                'Monitor for pest signs weekly',
                'Order seeds for next season',
                'Maintain farm equipment'
              ].map((reminder, idx) => (
                <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                  {reminder}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Yearly Calendar */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-2">
          <Calendar /> Yearly Calendar for {selectedCrop} in {selectedRegion}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {months.map((month, index) => {
            const monthActivities = getMonthActivities(index);
            const isActive = monthActivities.length > 0;
            return (
              <div
                key={month}
                className={`rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border ${isActive ? 'bg-orange-50/50 border-orange-100' : 'bg-gray-50 border-transparent'
                  }`}
              >
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                  <h4 className="font-bold text-gray-800">{month}</h4>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getSeason(index + 1) === 'Kharif' ? 'bg-green-100 text-green-700' :
                      getSeason(index + 1) === 'Rabi' ? 'bg-amber-100 text-amber-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {getSeason(index + 1)}
                  </span>
                </div>

                <div className="min-h-[80px]">
                  {monthActivities.length > 0 ? (
                    <div className="space-y-2">
                      {monthActivities.map((activity, idx) => (
                        <div key={idx} className={`bg-white rounded-lg p-2.5 border-l-4 shadow-sm text-sm ${idx % 3 === 0 ? 'border-l-green-500' : idx % 3 === 1 ? 'border-l-blue-500' : 'border-l-orange-500'
                          }`}>
                          <div className="font-medium text-gray-800 mb-0.5">{activity.activity}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={10} /> {activity.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 italic text-sm py-4">
                      No scheduled activities
                    </div>
                  )}
                </div>

                <div className={`mt-4 pt-3 border-t border-gray-100 text-xs font-semibold flex items-center gap-1.5 ${isActive ? 'text-green-600' : 'text-gray-400'
                  }`}>
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  {isActive ? 'Active Month' : 'Inactive Month'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Activity Guide */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-2">
          <ClipboardList /> Detailed Activity Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 hover:bg-green-50/50 transition-colors border border-transparent hover:border-green-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sprout className="text-green-600" /> Pre-Sowing Activities
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Land Preparation:</strong> Plough 2-3 times, level properly
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Soil Testing:</strong> Get soil health card, adjust pH if needed
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Seed Selection:</strong> Choose certified seeds, treat if necessary
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Manure Application:</strong> Apply 10-15 tons/hectare farmyard manure
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Droplets className="text-blue-600" /> Irrigation Schedule
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Critical Stages:</strong> Tillering, Flowering, Grain filling
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Frequency:</strong> Every 7-10 days depending on soil type
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Method:</strong> Flood irrigation for rice, drip for others
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Water Saving:</strong> Irrigate early morning or late evening
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FlaskConical className="text-amber-600" /> Fertilizer Management
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Basal Dose:</strong> Apply 50% N, 100% P, 50% K at sowing
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Top Dressing:</strong> Remaining N at tillering and flowering
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Micronutrients:</strong> Zinc for rice, Boron for pulses
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Organic:</strong> Use vermicompost, green manure
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bug className="text-red-600" /> Pest & Disease Control
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Preventive:</strong> Crop rotation, resistant varieties
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Monitoring:</strong> Weekly field inspection
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Control:</strong> Use neem oil, biological controls first
              </li>
              <li className="text-gray-600 text-sm">
                <strong className="text-gray-900 block mb-0.5">Chemical:</strong> Use pesticides only when necessary
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-2">
          <Download /> Download Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-xl font-semibold transition-all hover:-translate-y-1 shadow-md shadow-orange-200">
            <span>📄</span> {selectedCrop} Calendar (PDF)
          </button>
          <button className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-xl font-semibold transition-all hover:-translate-y-1 shadow-md shadow-orange-200">
            <span>📊</span> All Crops (Excel)
          </button>
          <button className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-xl font-semibold transition-all hover:-translate-y-1 shadow-md shadow-orange-200">
            <span>🗓️</span> Google Calendar
          </button>
          <button className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-xl font-semibold transition-all hover:-translate-y-1 shadow-md shadow-orange-200">
            <span>📱</span> Mobile Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;