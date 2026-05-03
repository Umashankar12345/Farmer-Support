// Automatically determine the correct API URL based on environment
let API_URL = '/api';

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
  API_URL = 'http://localhost:5000/api';
} else if (import.meta.env.VITE_API_URL) {
  API_URL = import.meta.env.VITE_API_URL;
} else if (window.location.hostname.includes('github.io') || window.location.hostname.includes('vercel.app')) {
  // Fallback for static hosting if no env var is set
  API_URL = 'https://farmer-support-backend.onrender.com/api'; // Replace with actual backend URL
}

export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Server error: ${response.status}`);
    }
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('krishi_jwt');
        window.location.href = '/login';
      }
      throw new Error(result.error || result.message || 'Request failed');
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const authAPI = {
  signup: (userData) => apiRequest('/auth/signup', 'POST', userData),
  login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
  sendOTP: (phoneData) => apiRequest('/auth/send-otp', 'POST', phoneData),
  verifyOTP: (otpData) => apiRequest('/auth/verify-otp', 'POST', otpData),
  googleLogin: () => apiRequest('/auth/google', 'POST'),
};

export const locationAPI = {
  reverseGeocode: (lat, lng) => apiRequest(`/location/reverse?lat=${lat}&lng=${lng}`),
};

export const dashboardAPI = {
  getDashboard: () => apiRequest('/dashboard/data'),
};

export const queryAPI = {
  askAI: (queryData) => apiRequest('/query/ask', 'POST', queryData),
};

export const commentAPI = {
  postComment: (commentData) => apiRequest('/comments', 'POST', commentData),
  getComments: () => apiRequest('/comments', 'GET'),
};

export const visitorAPI = {
  getVisitors: () => apiRequest('/visitors', 'GET'),
};

export const weatherAPI = {
  getForecast: (lat, lon) => apiRequest(`/weather/forecast?lat=${lat}&lon=${lon}`),
};

export const pestAPI = {
  getAlerts: (region, crops) => {
    const params = new URLSearchParams();
    if (region && region !== "All States") params.append("region", region);
    if (crops && crops !== "All Crops") params.append("crops", crops);
    return apiRequest(`/pest-alerts?${params.toString()}`);
  }
};