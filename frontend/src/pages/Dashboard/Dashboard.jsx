import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import WeatherWidget from './WeatherWidget';
import PestAdvisory from './PestAdvisory';
import GovSchemes from './GovSchemes';
import ChatSection from './ChatSection';
import { dashboardAPI } from '../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      if (error.message.includes('401')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar menuItems={dashboardData?.sidebarMenu} />
        <div className="dashboard-content">
          <div className="dashboard-widgets">
            <div className="widget-column">
              <WeatherWidget weatherData={dashboardData?.weather} />
              <PestAdvisory pestData={dashboardData?.pestAdvisory} />
            </div>
            <div className="widget-column">
              <GovSchemes schemes={dashboardData?.schemes} />
              <ChatSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;