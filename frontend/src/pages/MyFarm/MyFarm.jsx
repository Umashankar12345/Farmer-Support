import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import FarmCard from './components/FarmCard'
import MapView from './components/MapView'
import FarmDetailsModal from './components/FarmDetailsModal'
import GlassCard from '../../components/UI/GlassCard'
import { Plus, LayoutGrid, Map as MapIcon, Filter, TrendingUp, Ruler, Sprout, Activity } from 'lucide-react'

const MyFarm = () => {
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'map'
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [showFarmDetails, setShowFarmDetails] = useState(false)
  const { t } = useLanguage()

  // Sample farms data
  const farms = [
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Punjab, Ludhiana",
      area: "12.5 Ha",
      crop: "Rice",
      cropType: "Basmati Rice",
      soilType: "Alluvial",
      irrigation: "Canal",
      status: "Active",
      plantingDate: "2024-06-15",
      waterAvailability: "Adequate",
      farmingType: "Conventional",
      latitude: 30.9010,
      longitude: 75.8573
    },
    {
      id: 2,
      name: "Sunshine Fields",
      location: "Haryana, Karnal",
      area: "8.2 Ha",
      crop: "Wheat",
      cropType: "Durum Wheat",
      soilType: "Black",
      irrigation: "Drip",
      status: "Active",
      plantingDate: "2024-10-20",
      waterAvailability: "Moderate",
      farmingType: "Organic",
      latitude: 29.6857,
      longitude: 76.9905
    },
    {
      id: 3,
      name: "River Side Farm",
      location: "Uttar Pradesh, Meerut",
      area: "15.3 Ha",
      crop: "Sugarcane",
      cropType: "CO 0238",
      soilType: "Alluvial",
      irrigation: "Canal",
      status: "Active",
      plantingDate: "2024-02-10",
      waterAvailability: "Adequate",
      farmingType: "Conventional",
      latitude: 28.9845,
      longitude: 77.7064
    },
    {
      id: 4,
      name: "Mountain View Farm",
      location: "Himachal Pradesh, Shimla",
      area: "5.7 Ha",
      crop: "Rice",
      cropType: "Royal Delicious",
      soilType: "Red",
      irrigation: "Rainfed",
      status: "Inactive",
      plantingDate: "2023-08-30",
      waterAvailability: "Low",
      farmingType: "Organic",
      latitude: 31.1048,
      longitude: 77.1734
    },
    {
      id: 5,
      name: "Coastal Farm",
      location: "Kerala, Alappuzha",
      area: "6.8 Ha",
      crop: "Wheat",
      cropType: "Tall Variety",
      soilType: "Sandy",
      irrigation: "Rainfed",
      status: "Active",
      plantingDate: "2024-01-15",
      waterAvailability: "Adequate",
      farmingType: "Conventional",
      latitude: 9.4981,
      longitude: 76.3388
    }
  ]

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [farmSizeRange, setFarmSizeRange] = useState([0, 100])
  const [plantingDate, setPlantingDate] = useState('')

  // Filter states
  const [farmStatus, setFarmStatus] = useState('all')
  const [irrigationType, setIrrigationType] = useState('all')
  const [soilType, setSoilType] = useState('all')
  const [farmingType, setFarmingType] = useState('all')
  const [waterAvailability, setWaterAvailability] = useState('all')

  // Filter farms based on search and filters
  const filteredFarms = farms.filter(farm => {
    if (searchTerm && !farm.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !farm.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (selectedCrop && farm.crop !== selectedCrop) return false
    if (selectedLocation && !farm.location.includes(selectedLocation)) return false
    const farmArea = parseFloat(farm.area.split(' ')[0])
    if (farmArea < farmSizeRange[0] || farmArea > farmSizeRange[1]) return false
    if (plantingDate && farm.plantingDate !== plantingDate) return false
    if (farmStatus !== 'all' && farm.status.toLowerCase() !== farmStatus) return false
    if (irrigationType !== 'all' && farm.irrigation.toLowerCase() !== irrigationType) return false
    if (soilType !== 'all' && farm.soilType.toLowerCase() !== soilType) return false
    if (farmingType !== 'all' && farm.farmingType.toLowerCase() !== farmingType) return false
    if (waterAvailability !== 'all' && farm.waterAvailability.toLowerCase() !== waterAvailability) return false
    return true
  })

  const stats = [
    { label: 'Total Area', value: '48.5 Ha', icon: Ruler, color: 'text-blue-500' },
    { label: 'Active Farms', value: filteredFarms.filter(f => f.status === 'Active').length, icon: Activity, color: 'text-emerald-500' },
    { label: 'Crops Sown', value: [...new Set(farms.map(f => f.crop))].length, icon: Sprout, color: 'text-amber-500' },
    { label: 'Yield Est.', value: '+12%', icon: TrendingUp, color: 'text-indigo-500' },
  ]

  const handleAddNewFarm = () => alert('Add New Farm functionality will be implemented')
  const handleViewFarm = (farm) => { setSelectedFarm(farm); setShowFarmDetails(true); }
  const handleEditFarm = (farm) => alert(`Edit farm: ${farm.name}`)
  const handleDeleteFarm = (farm) => { if (window.confirm(`Are you sure you want to delete ${farm.name}?`)) alert(`Farm ${farm.name} deleted`) }
  const handleFertilizerRecommendation = (farm) => alert(`Fertilizer for ${farm.name}`)
  const handleCropAnalysis = (farm) => alert(`Analysis for ${farm.name}`)

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-800 dark:text-white flex items-center gap-3"
            >
              🌾 {t('My Farm', 'My Farm')}
            </motion.h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              A professional overview of your land assets and agricultural progress.
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddNewFarm}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 dark:shadow-none transition-all"
            >
              <Plus size={20} /> Add New Farm
            </motion.button>
            <div className="bg-white dark:bg-slate-800 p-1 rounded-2xl flex shadow-sm border border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'cards' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'map' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <MapIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-white">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-5 border-none shadow-md overflow-hidden relative group">
                <div className={`absolute top-0 right-0 w-20 h-20 -mr-8 -mt-8 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity ${stat.color.replace('text', 'bg')}`} />
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">{stat.value}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Search and Quick Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center mb-8">
          <div className="flex-1 w-full">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              farmSizeRange={farmSizeRange}
              setFarmSizeRange={setFarmSizeRange}
              plantingDate={plantingDate}
              setPlantingDate={setPlantingDate}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden w-full md:w-auto px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${showFilters ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'
              }`}
          >
            <Filter size={20} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-1/4"
            >
              <GlassCard className="p-0 overflow-hidden sticky top-6">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/20">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Filter size={18} className="text-emerald-500" /> Advanced Filters
                  </h3>
                </div>
                <div className="p-6">
                  <FilterPanel
                    farmStatus={farmStatus}
                    setFarmStatus={setFarmStatus}
                    irrigationType={irrigationType}
                    setIrrigationType={setIrrigationType}
                    soilType={soilType}
                    setSoilType={setSoilType}
                    farmingType={farmingType}
                    setFarmingType={setFarmingType}
                    waterAvailability={waterAvailability}
                    setWaterAvailability={setWaterAvailability}
                  />
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid/Map Content */}
        <div className="lg:flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">
              Results: <span className="text-slate-800 dark:text-slate-200">{filteredFarms.length} Farms</span>
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {viewMode === 'cards' ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredFarms.map((farm, idx) => (
                  <motion.div
                    key={farm.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <FarmCard
                      farm={farm}
                      onView={() => handleViewFarm(farm)}
                      onEdit={() => handleEditFarm(farm)}
                      onDelete={() => handleDeleteFarm(farm)}
                      onFertilizer={() => handleFertilizerRecommendation(farm)}
                      onAnalysis={() => handleCropAnalysis(farm)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[600px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700"
              >
                <MapView farms={filteredFarms} onFarmClick={handleViewFarm} />
              </motion.div>
            )}
          </AnimatePresence>

          {filteredFarms.length === 0 && (
            <div className="py-24 text-center bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50">
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🌾</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No farms found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your search criteria or reset your advanced filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showFarmDetails && selectedFarm && (
          <FarmDetailsModal
            farm={selectedFarm}
            onClose={() => { setShowFarmDetails(false); setSelectedFarm(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MyFarm
