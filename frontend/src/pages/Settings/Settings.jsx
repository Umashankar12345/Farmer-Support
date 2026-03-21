// src/pages/Settings/Settings.jsx
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Globe, User, Shield, AlertTriangle, Save, MapPin, Wheat, ChevronRight, LogOut, Trash2, Download, Cloud } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    language: 'English',
    notifications: {
      smsAlerts: true, appNotifications: true, emailDigest: false,
      priceUpdates: true, weatherAlerts: true, govtSchemes: true
    },
    profile: {
      name: 'Rajesh Kumar', phone: '+91 9876543210', email: 'rajesh@farmer.com',
      farmerId: 'FARM2024001', location: 'Punjab', farmSize: '5 acres'
    },
    defaultFarm: {
      id: 'FARM001', name: 'Main Farm', location: 'Ludhiana, Punjab', crops: ['Wheat', 'Rice']
    },
    privacy: {
      shareLocation: true, shareCropData: true,
      anonymousAnalytics: true, dataRetention: '6 months'
    }
  });

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const handleProfileUpdate = (field, value) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 bg-slate-50 min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
          <SettingsIcon className="text-slate-600" size={32} /> Settings
        </h1>
        <p className="text-slate-500 text-lg">Customize your Digital Krishi Officer experience</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Language Preference */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="text-blue-500" size={24} /> Language
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Interface Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              >
                <option>English</option><option>Hindi</option><option>Punjabi</option><option>Marathi</option><option>Tamil</option><option>Telugu</option>
              </select>
              <p className="text-xs text-slate-400 mt-2">Changes will apply after refresh</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="text-yellow-500" size={24} /> Notifications
          </h3>
          <div className="space-y-1">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                <span className="text-slate-700 font-medium text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={value} onChange={(e) => handleNotificationChange(key, e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="text-green-500" size={24} /> Profile
          </h3>
          <div className="space-y-4">
            {Object.entries(settings.profile).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleProfileUpdate(key, e.target.value)}
                  className={`w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all ${key === 'farmerId' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={key === 'farmerId'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Farm Default Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Wheat className="text-amber-500" size={24} /> Farm Selection
          </h3>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <div className="flex justify-between items-start mb-4">
              <span className="font-bold text-slate-800 text-lg">{settings.defaultFarm.name}</span>
              <span className="bg-white text-amber-600 px-2 py-1 rounded text-xs font-bold border border-amber-200 shadow-sm">{settings.defaultFarm.id}</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-500" />
                {settings.defaultFarm.location}
              </div>
              <div className="flex items-center gap-2">
                <Sprout size={16} className="text-green-500" />
                Crops: {settings.defaultFarm.crops.join(', ')}
              </div>
            </div>
            <button className="w-full py-2 bg-white border border-amber-200 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-100 transition-colors shadow-sm">
              Change Default Farm
            </button>
          </div>
        </div>

        {/* Data Privacy Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="text-indigo-500" size={24} /> Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-sm font-medium">Share Location Data</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.privacy.shareLocation} onChange={(e) => handlePrivacyChange('shareLocation', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-sm font-medium">Share Crop Production Data</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.privacy.shareCropData} onChange={(e) => handlePrivacyChange('shareCropData', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700 text-sm font-medium">Anonymous Analytics</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.privacy.anonymousAnalytics} onChange={(e) => handlePrivacyChange('anonymousAnalytics', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Data Retention Period</label>
              <select
                value={settings.privacy.dataRetention}
                onChange={(e) => handlePrivacyChange('dataRetention', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500 transition-all text-sm"
              >
                <option>3 months</option><option>6 months</option><option>1 year</option><option>Indefinitely</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl p-6 shadow-sm border border-red-200">
          <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2 pb-3 border-b border-red-200">
            <AlertTriangle className="text-red-600" size={24} /> Danger Zone
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-red-800 bg-red-100 p-3 rounded-lg border border-red-200">
              These actions are irreversible. Please proceed with caution.
            </p>
            <div className="flex flex-col gap-3">
              <button className="w-full py-2.5 bg-white border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                <Trash2 size={18} /> Delete Account
              </button>
              <button className="w-full py-2.5 bg-white border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                <LogOut size={18} /> Clear All Data
              </button>
              <button className="w-full py-2.5 bg-white border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                <Download size={18} /> Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 text-center max-w-md mx-auto z-10">
        <button
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          onClick={saveSettings}
        >
          <Save size={20} /> Save All Changes
        </button>
      </div>
    </div>
  );
};

// Start of Selection
// Helper icon component for use in the settings page
// Renamed to avoid confusion with Lucide imports if needed, though here using direct import
const Sprout = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.4-3.2-1.6-4.5-3.7-5.4-8.1 3.5 1.5 5.8 2.8 7.9 4.8" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 2.1-1.6 2.5-3.4 2.6-6.5-3.1 1.7-5.8 2.4-5.8 3.9" />
  </svg>
);

export default Settings;