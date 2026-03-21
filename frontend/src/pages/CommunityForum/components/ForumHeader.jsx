// src/pages/CommunityForum/components/ForumHeader.jsx
import React from 'react';

const ForumHeader = ({ filters, onFilterChange, onAskQuestion }) => {
  return (
    <div className="forum-header">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">👨‍🌾 Community Forum</h1>
          <p className="text-gray-600">Peer learning + officer interaction platform</p>
        </div>
        <button onClick={onAskQuestion} className="btn-primary text-lg px-6 py-3">
          + Ask a Question
        </button>
      </div>
      
      <div className="search-filters bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input type="text" placeholder="Search questions..." className="w-full p-2 border border-gray-300 rounded" value={filters.searchQuery} onChange={(e) => onFilterChange({...filters, searchQuery: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
            <select className="w-full p-2 border border-gray-300 rounded" value={filters.crop} onChange={(e) => onFilterChange({...filters, crop: e.target.value})}>
              <option>All Crops</option><option>Rice</option><option>Wheat</option><option>Cotton</option><option>Tomato</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <select className="w-full p-2 border border-gray-300 rounded" value={filters.topic} onChange={(e) => onFilterChange({...filters, topic: e.target.value})}>
              <option>All Topics</option><option>Pest Control</option><option>Fertilizer</option><option>Govt Scheme</option><option>Irrigation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full p-2 border border-gray-300 rounded" value={filters.status} onChange={(e) => onFilterChange({...filters, status: e.target.value})}>
              <option>All</option><option>Answered</option><option>Unanswered</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select className="w-full p-2 border border-gray-300 rounded" value={filters.language} onChange={(e) => onFilterChange({...filters, language: e.target.value})}>
              <option>All</option><option>English</option><option>Hindi</option><option>Regional</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={filters.expertVerified} onChange={(e) => onFilterChange({...filters, expertVerified: e.target.checked})} />
            <span className="text-sm">Expert Verified Only</span>
          </label>
          <button className="ml-auto btn-secondary">Clear Filters</button>
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;