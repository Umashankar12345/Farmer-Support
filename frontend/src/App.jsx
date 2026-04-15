import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import AIQuery from './pages/Query/AIQuery';
import MyFarm from './pages/MyFarm/MyFarm';
import WeatherPage from './pages/Weather/Weather';
import SchemesPage from './pages/Schemes/SchemesPage';
import Analytics from './pages/Analytics/Analytics';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') || localStorage.getItem('krishi_jwt');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-shell">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/query" element={
            <ProtectedRoute>
              <AIQuery />
            </ProtectedRoute>
          } />
          <Route path="/farms" element={
            <ProtectedRoute>
              <MyFarm />
            </ProtectedRoute>
          } />
          <Route path="/weather" element={
            <ProtectedRoute>
              <WeatherPage />
            </ProtectedRoute>
          } />
          <Route path="/schemes" element={
            <ProtectedRoute>
              <SchemesPage />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;