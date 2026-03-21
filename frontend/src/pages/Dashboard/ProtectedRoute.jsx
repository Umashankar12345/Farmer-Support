// frontend/src/components/Auth/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/logout';

const ProtectedRoute = ({ children }) => {
    const auth = isAuthenticated();
    
    if (!auth) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;