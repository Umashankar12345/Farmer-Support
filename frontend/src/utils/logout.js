// frontend/src/utils/logout.js
import { useNavigate } from 'react-router-dom';

/**
 * Utility function to handle user logout
 * @param {Function} navigate - React Router navigate function (optional)
 */
export const logout = (navigate) => {
    try {
        // Clear all user data from localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('language');
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        // Clear cookies if any
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });
        
        // Navigate to login
        if (navigate && typeof navigate === 'function') {
            navigate('/login');
        } else {
            window.location.href = '/login';
        }
        
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
};

/**
 * Get current user data
 * @returns {Object|null} User data or null
 */
export const getCurrentUser = () => {
    try {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout(navigate);
    };
    
    const checkAuth = () => {
        return isAuthenticated();
    };
    
    const getUser = () => {
        return getCurrentUser();
    };
    
    return { 
        logout: handleLogout, 
        isAuthenticated: checkAuth,
        getUser 
    };
};