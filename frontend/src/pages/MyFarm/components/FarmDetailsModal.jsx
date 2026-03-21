import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Droplet,
  ThermometerSun,
  Leaf,
  BarChart3,
  Edit,
  Download,
  Share2,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  ChevronDown,
  X,
} from 'lucide-react';

const FarmDetailsModal = ({ isOpen, onClose, farmData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedEquipment, setExpandedEquipment] = useState({});

  if (!isOpen || !farmData) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'crops', label: 'Crops', icon: <Leaf size={16} /> },
    { id: 'workers', label: 'Workers', icon: <Users size={16} /> },
    { id: 'equipment', label: 'Equipment', icon: <ThermometerSun size={16} /> },
    { id: 'irrigation', label: 'Irrigation', icon: <Droplet size={16} /> },
  ];

  const cropData = [
    { name: 'Wheat', area: '50 acres', status: 'Growing', progress: 75 },
    { name: 'Corn', area: '30 acres', status: 'Harvesting', progress: 90 },
    { name: 'Soybean', area: '20 acres', status: 'Planted', progress: 30 },
    { name: 'Rice', area: '40 acres', status: 'Planning', progress: 10 },
  ];

  const workerData = [
    { name: 'John Smith', role: 'Farm Manager', phone: '+1-555-0123', status: 'Active' },
    { name: 'Maria Garcia', role: 'Irrigation Specialist', phone: '+1-555-0124', status: 'Active' },
    { name: 'Raj Patel', role: 'Equipment Operator', phone: '+1-555-0125', status: 'On Leave' },
    { name: 'Lisa Wong', role: 'Crop Supervisor', phone: '+1-555-0126', status: 'Active' },
  ];

  const equipmentData = [
    { name: 'Tractor', model: 'John Deere 5075E', status: 'Operational', lastService: '2024-01-15' },
    { name: 'Harvester', model: 'Case IH 8250', status: 'Maintenance', lastService: '2023-12-20' },
    { name: 'Irrigation Pump', model: 'Grundfos 4', status: 'Operational', lastService: '2024-01-10' },
    { name: 'Sprayer', model: 'Ag Spray 1000', status: 'Operational', lastService: '2024-01-05' },
  ];

  const irrigationData = [
    { zone: 'North Field', type: 'Drip', status: 'Active', waterUsage: '5000L/day' },
    { zone: 'South Field', type: 'Sprinkler', status: 'Active', waterUsage: '8000L/day' },
    { zone: 'East Field', type: 'Center Pivot', status: 'Inactive', waterUsage: '0L/day' },
    { zone: 'West Field', type: 'Drip', status: 'Maintenance', waterUsage: '2000L/day' },
  ];

  const toggleEquipment = (index) => {
    setExpandedEquipment(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Operational':
      case 'Growing':
      case 'Harvesting':
        return 'status-active';
      case 'Maintenance':
      case 'On Leave':
        return 'status-warning';
      case 'Inactive':
      case 'Planning':
        return 'status-inactive';
      default:
        return 'status-default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Active':
      case 'Operational':
        return 'Active';
      case 'Maintenance':
        return 'Maintenance';
      case 'Inactive':
        return 'Inactive';
      case 'Growing':
        return 'Growing';
      case 'Harvesting':
        return 'Harvesting';
      case 'Planted':
        return 'Planted';
      case 'Planning':
        return 'Planning';
      case 'On Leave':
        return 'On Leave';
      default:
        return status;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
      <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start p-6 border-b border-gray-200 bg-gray-50 gap-4 sm:gap-0">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3">
                <h2 className="text-2xl font-bold text-gray-800 m-0">{farmData.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${farmData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {farmData.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={16} />
                  <span>{farmData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar size={16} />
                  <span>Est. {farmData.established}</span>
                </div>
              </div>
            </div>
            <button className="text-gray-500 hover:bg-gray-200 hover:text-gray-700 p-2 rounded-lg transition-colors absolute top-4 right-4 sm:static" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Left Sidebar - Tabs */}
            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto shrink-0">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-4 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Farm Stats Summary */}
              <div className="p-4 border-t border-gray-200 hidden lg:block mt-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Farm Stats</h3>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Total Area</span>
                    <span className="text-lg font-semibold text-gray-800">{farmData.area}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Crop Types</span>
                    <span className="text-lg font-semibold text-gray-800">{cropData.length}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Active Workers</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {workerData.filter(w => w.status === 'Active').length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Yield This Season</span>
                    <span className="text-lg font-semibold text-gray-800">{farmData.yield}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {activeTab === 'overview' && (
                <div className="flex flex-col gap-6">
                  {/* Farm Image */}
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={farmData.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200'}
                      alt={farmData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                      <span>Farm ID: {farmData.id}</span>
                    </div>
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Farm Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-500 text-sm">Owner</span>
                          <span className="font-medium text-gray-800">{farmData.owner}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-500 text-sm">Soil Type</span>
                          <span className="font-medium text-gray-800">{farmData.soilType}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-500 text-sm">Water Source</span>
                          <span className="font-medium text-gray-800">{farmData.waterSource}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-500 text-sm">Climate Zone</span>
                          <span className="font-medium text-gray-800">{farmData.climateZone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Production Metrics</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Yield Efficiency</span>
                            <span className="text-sm font-bold text-gray-800">85%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Water Efficiency</span>
                            <span className="text-sm font-bold text-gray-800">78%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Soil Health</span>
                            <span className="text-sm font-bold text-gray-800">92%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-600 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Recent Activities</h3>
                    <div className="space-y-3">
                      {[
                        { activity: 'Harvest completed for Wheat field', date: 'Today, 10:30 AM' },
                        { activity: 'Irrigation system maintenance', date: 'Yesterday, 2:15 PM' },
                        { activity: 'Soil testing conducted', date: 'Jan 12, 2024' },
                        { activity: 'New equipment purchased', date: 'Jan 10, 2024' },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <span className="text-gray-700 text-sm font-medium">{item.activity}</span>
                          <span className="text-gray-500 text-xs">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'crops' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Crop Management</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 bg-gray-50 p-4 border-b border-gray-200 text-sm font-semibold text-gray-600">
                      <div className="col-span-2 sm:col-span-1">Crop Name</div>
                      <div className="hidden sm:block">Area</div>
                      <div>Status</div>
                      <div className="col-span-2 sm:col-span-1">Progress</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {cropData.map((crop, index) => (
                        <div key={index} className="grid grid-cols-5 p-4 items-center gap-4 hover:bg-gray-50 transition-colors">
                          <div className="col-span-2 sm:col-span-1 font-medium text-gray-800">
                            {crop.name}
                          </div>
                          <div className="hidden sm:block text-sm text-gray-600">{crop.area}</div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status) === 'status-active' ? 'bg-green-100 text-green-800' :
                              getStatusColor(crop.status) === 'status-warning' ? 'bg-yellow-100 text-yellow-800' :
                                getStatusColor(crop.status) === 'status-inactive' ? 'bg-gray-100 text-gray-600' :
                                  'bg-gray-100 text-gray-600'
                              }`}>
                              {getStatusText(crop.status)}
                            </span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <div className="flex items-center gap-2">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex-1">
                                <div
                                  className="h-full bg-green-600 rounded-full"
                                  style={{ width: `${crop.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">{crop.progress}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <button className="px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 bg-white">Details</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'workers' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Workforce Management</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workerData.map((worker, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-gray-800 m-0">{worker.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status) === 'status-active' ? 'bg-green-100 text-green-800' :
                            getStatusColor(worker.status) === 'status-warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                            {getStatusText(worker.status)}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm my-2">{worker.role}</p>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-3 pt-3 border-t border-gray-100">
                          <Phone size={14} />
                          <span>{worker.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Farm Equipment</h3>
                  <div className="flex flex-col gap-3">
                    {equipmentData.map((equipment, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                          onClick={() => toggleEquipment(index)}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div>
                              <h4 className="text-base font-semibold text-gray-800 m-0">{equipment.name}</h4>
                              <p className="text-gray-500 text-sm m-0 mt-1">{equipment.model}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ml-auto sm:ml-4 ${getStatusColor(equipment.status) === 'status-active' ? 'bg-green-100 text-green-800' :
                              getStatusColor(equipment.status) === 'status-warning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                              {getStatusText(equipment.status)}
                            </span>
                          </div>
                          <ChevronDown className={`ml-4 text-gray-400 transition-transform duration-300 ${expandedEquipment[index] ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {expandedEquipment[index] && (
                          <div className="p-4 bg-white border-t border-gray-200 animate-fadeIn">
                            <div className="flex flex-col gap-3">
                              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-gray-500 text-sm">Last Service</span>
                                <span className="font-medium text-gray-800 text-sm">{equipment.lastService}</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-gray-500 text-sm">Next Service Due</span>
                                <span className="font-medium text-gray-800 text-sm">2024-02-15</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-gray-500 text-sm">Operating Hours</span>
                                <span className="font-medium text-gray-800 text-sm">1,250 hrs</span>
                              </div>
                              <button className="mt-2 text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors self-start">
                                Schedule Maintenance
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'irrigation' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Irrigation Systems</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {irrigationData.map((system, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-base font-semibold text-gray-800 m-0">{system.zone}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status) === 'status-active' ? 'bg-green-100 text-green-800' :
                            getStatusColor(system.status) === 'status-warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                            {getStatusText(system.status)}
                          </span>
                        </div>
                        <div className="space-y-2 mb-3">
                          <p className="text-gray-500 text-sm m-0">Type: {system.type}</p>
                          <p className="text-gray-500 text-sm m-0">Water Usage: {system.waterUsage}</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                          <div
                            className={`h-full rounded-full ${system.status === 'Active' ? 'bg-blue-500' :
                              system.status === 'Maintenance' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}
                            style={{
                              width: system.status === 'Active' ? '80%' :
                                system.status === 'Maintenance' ? '30%' : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 z-10">
            <div className="flex gap-3 justify-end flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-500 text-blue-600 bg-white hover:bg-blue-50">
                <Edit size={18} />
                <span>Edit Farm</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300 text-gray-700 bg-white hover:bg-gray-100">
                <Download size={18} />
                <span>Export Data</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-green-600 text-green-700 bg-white hover:bg-green-50">
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-600 text-white hover:bg-green-700 border border-green-600" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetailsModal;