import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import AIQuery from './pages/Query/AIQuery';
import MyFarm from './pages/MyFarm/MyFarm';
import WeatherPage from './pages/Weather/Weather';
import SchemesPage from './pages/Schemes/SchemesPage';
import Analytics from './pages/Analytics/Analytics';
import SupportPage from './pages/Support/SupportPage';
import PestAlertPage from './pages/Pest/PestAlertPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import PerformanceTicker from './pages/Dashboard/components/PerformanceTicker';
import GenericPlaceholder from './pages/Placeholder/GenericPlaceholder';

// New Features
import CropRecommender from './pages/Features/CropRecommender';
import ROICalculator from './pages/Features/ROICalculator';
import NDVISatellite from './pages/Features/NDVISatellite';
import YieldPrediction from './pages/Features/YieldPrediction';
import CommunityFeed from './pages/Features/CommunityFeed';
import FarmPassport from './pages/Features/FarmPassport';
import OnboardingJourney from './pages/Features/OnboardingJourney';
import OfflineMode from './pages/Features/OfflineMode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') || localStorage.getItem('krishi_jwt');
  return token ? (
    <div className="app-shell">
      <Navbar />
      <Sidebar />
      <div className="main">
        {children}
      </div>
      <PerformanceTicker />
    </div>
  ) : <Navigate to="/login" />;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/query" element={<ProtectedRoute><AIQuery /></ProtectedRoute>} />
        <Route path="/farms" element={<ProtectedRoute><MyFarm /></ProtectedRoute>} />
        <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
        <Route path="/schemes" element={<ProtectedRoute><SchemesPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        
        {/* Advanced Features */}
        <Route path="/crop-rec" element={<ProtectedRoute><CropRecommender /></ProtectedRoute>} />
        <Route path="/roi" element={<ProtectedRoute><ROICalculator /></ProtectedRoute>} />
        <Route path="/ndvi" element={<ProtectedRoute><NDVISatellite /></ProtectedRoute>} />
        <Route path="/yield" element={<ProtectedRoute><YieldPrediction /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityFeed /></ProtectedRoute>} />
        <Route path="/passport" element={<ProtectedRoute><FarmPassport /></ProtectedRoute>} />
        <Route path="/onboard" element={<ProtectedRoute><OnboardingJourney /></ProtectedRoute>} />
        <Route path="/offline" element={<ProtectedRoute><OfflineMode /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;