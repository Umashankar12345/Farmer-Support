// src/pages/CropProduction/CropProduction.jsx
import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';

// Import components
import SummaryCards from './components/SummaryCards';
import FiltersSection from './components/FiltersSection';
import ProductionCharts from './components/ProductionCharts';
import CropCards from './components/CropCards';
import AIPrediction from './components/AIPrediction';
import AlertsPanel from './components/AlertsPanel';
import ExportPanel from './components/ExportPanel';

// Mock data functions (kept same as before)
const mockData = {
  getProductionSummary: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      totalProduction: '12,450',
      avgYield: '28.5',
      yieldGrowth: '+8.2%',
      lossEstimation: '1,250',
      waterUsed: '5,200',
      productionChange: '+5.3%',
      yieldChange: '+2.1%',
      lossChange: '-12.5%',
      waterChange: '-3.2%'
    };
  },

  getProductionData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      barChartData: [
        { crop: 'Rice', production: 4500, expected: 4800 },
        { crop: 'Wheat', production: 3800, expected: 4000 },
        { crop: 'Maize', production: 2800, expected: 3000 },
        { crop: 'Soybean', production: 2100, expected: 2200 },
        { crop: 'Cotton', production: 1800, expected: 2000 }
      ],
      trendData: [
        { year: '2020', production: 8500 },
        { year: '2021', production: 9200 },
        { year: '2022', production: 10500 },
        { year: '2023', production: 11200 },
        { year: '2024', production: 12450 }
      ],
      comparisonData: [
        { month: 'Jan', expected: 1000, actual: 950 },
        { month: 'Feb', expected: 1100, actual: 1050 },
        { month: 'Mar', expected: 1200, actual: 1250 },
        { month: 'Apr', expected: 1300, actual: 1280 }
      ]
    };
  },

  getCropDetails: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: 1,
        name: 'Rice',
        area: '20 acres',
        production: '4,500 tons',
        yield: '225 tons/acre',
        yieldGrade: 4,
        status: 'Normal',
        color: '#27ae60'
      },
      {
        id: 2,
        name: 'Wheat',
        area: '15 acres',
        production: '3,800 tons',
        yield: '253 tons/acre',
        yieldGrade: 5,
        status: 'Excellent',
        color: '#f39c12'
      },
      {
        id: 3,
        name: 'Maize',
        area: '12 acres',
        production: '2,800 tons',
        yield: '233 tons/acre',
        yieldGrade: 3,
        status: 'Low',
        color: '#e74c3c'
      },
      {
        id: 4,
        name: 'Soybean',
        area: '10 acres',
        production: '2,100 tons',
        yield: '210 tons/acre',
        yieldGrade: 4,
        status: 'Normal',
        color: '#3498db'
      }
    ];
  },

  getYieldPrediction: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      predictedYield: '+8.5%',
      confidence: '85%',
      recommendations: [
        'Increase irrigation frequency by 20%',
        'Apply organic compost before next planting',
        'Monitor for early signs of pest infestation',
        'Consider crop rotation with legumes'
      ],
      risks: [
        'Expected rainfall deficit in next 30 days',
        'Soil nitrogen levels below optimal'
      ]
    };
  },

  getAlerts: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
      {
        id: 1,
        type: 'warning',
        message: '⚠️ Low productivity detected in Rice crops',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'info',
        message: '🌧️ Rainfall impact warning for next week',
        time: '5 hours ago'
      },
      {
        id: 3,
        type: 'danger',
        message: '🐛 Pest infestation reported in nearby farms',
        time: '1 day ago'
      }
    ];
  }
};

const CropProduction = () => {
  // State for filters
  const [filters, setFilters] = useState({
    cropName: 'All Crops',
    season: 'Kharif',
    year: '2024',
    location: 'All India',
    farmSize: 'All',
    irrigationType: 'All',
    fertilizerUsage: 'All',
    pestStatus: 'All',
    farmingType: 'All'
  });

  // State for data
  const [summary, setSummary] = useState(null);
  const [productionData, setProductionData] = useState(null);
  const [cropDetails, setCropDetails] = useState([]);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryData, productionData, cropDetailsData, alertsData] =
        await Promise.all([
          mockData.getProductionSummary(filters),
          mockData.getProductionData(filters),
          mockData.getCropDetails(filters),
          mockData.getAlerts(filters.location)
        ]);

      setSummary(summaryData);
      setProductionData(productionData);
      setCropDetails(cropDetailsData);
      setAlerts(alertsData);

      // Get AI prediction if crop is selected
      if (filters.cropName !== 'All Crops') {
        const prediction = await mockData.getYieldPrediction({
          crop: filters.cropName,
          location: filters.location,
          season: filters.season
        });
        setAiPrediction(prediction);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchData();
  };

  // Handle crop selection from cards
  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    const newFilters = { ...filters, cropName: crop.name };
    setFilters(newFilters);
    fetchData();
  };

  // Export function placeholder
  const handleExport = async (format) => {
    console.log(`Exporting ${format} data...`);
    alert(`Exporting data in ${format} format...`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Sprout className="text-green-600" size={32} /> Crop Production Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Monitor actual production, yield performance, and get AI-based predictions</p>
      </div>

      {/* 1️⃣ Top Summary Cards */}
      <SummaryCards
        summary={summary}
        loading={loading}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_350px] gap-6 mt-6">
        {/* Left Column: Filters & Controls */}
        <div className="space-y-6">
          <FiltersSection
            filters={filters}
            onFilterChange={handleFilterChange}
            loading={loading}
          />

          <AlertsPanel
            alerts={alerts}
            loading={loading}
          />

          <ExportPanel
            filters={filters}
            productionData={productionData}
          />
        </div>

        {/* Middle Column: Charts & AI */}
        <div className="space-y-6">
          <ProductionCharts
            productionData={productionData}
            filters={filters}
            loading={loading}
          />

          <AIPrediction
            prediction={aiPrediction}
            selectedCrop={selectedCrop || filters.cropName}
            loading={loading}
          />
        </div>

        {/* Right Column: Crop Cards */}
        <div className="space-y-6">
          <CropCards
            crops={cropDetails}
            onCropSelect={handleCropSelect}
            selectedCrop={selectedCrop}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CropProduction;