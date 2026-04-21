const API_URL = 'http://localhost:5000/api';

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
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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