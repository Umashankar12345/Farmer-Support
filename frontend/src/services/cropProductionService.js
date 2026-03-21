// src/services/cropProductionService.js
import { apiRequest } from './api';

const CROP_PRODUCTION_API = {
  // Get summary statistics
  getProductionSummary: async (filters) => {
    return await apiRequest('/crop-production/summary', 'POST', filters);
  },

  // Get production data for charts
  getProductionData: async (filters) => {
    return await apiRequest('/crop-production/data', 'POST', filters);
  },

  // Get AI yield predictions
  getYieldPrediction: async (cropData) => {
    return await apiRequest('/ai/yield-prediction', 'POST', cropData);
  },

  // Get crop-wise details
  getCropDetails: async (filters) => {
    return await apiRequest('/crop-production/details', 'POST', filters);
  },

  // Export data
  exportProductionReport: async (filters) => {
    return await apiRequest('/crop-production/export', 'POST', filters);
  },

  // Get alerts and recommendations
  getAlerts: async (location) => {
    return await apiRequest(`/alerts/${location}`, 'GET');
  }
};

export default CROP_PRODUCTION_API;