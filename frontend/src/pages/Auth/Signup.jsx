import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordStrengthBar from './components/PasswordStrengthBar';
import { authAPI } from '../../services/api';
import illustration from '../../assets/auth-illustration.png';
import './Auth.css';

const features = [
  { icon: '🌧', title: 'Live Weather Alerts' },
  { icon: '📈', title: 'Mandi Prices' },
  { icon: '🌿', title: 'Disease Detection' },
  { icon: '🤖', title: 'AI Chat' },
  { icon: '📱', title: 'Offline SMS Support' }
];

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Carousel logic
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleComplete = async () => {
    if (!formData.firstName || !formData.email.includes('@')) {
      setError('Please enter valid name and email');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { confirmPassword, ...data } = formData;
      await authAPI.signup(data);
      // Redirect to login after successful registration
      navigate('/login', { state: { message: 'Registration successful! Please sign in.' } });
    } catch (err) {
      setError(err.message || 'Authentication service is currently unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Top Navbar */}
      <div className="auth-navbar">
        <div className="nav-logo">
          <span className="nav-icon">🌾</span>
          <span className="nav-brand">KrishiOfficer</span>
        </div>
        <div className="nav-links">
          <span className="nav-item">🌐 English</span>
          <span className="nav-item">Help</span>
        </div>
      </div>

      <div className="auth-main-container">
        {/* Left Content */}
        <div className="auth-hero">
          <h1 className="hero-title">Digital Krishi Officer</h1>
          <h2 className="hero-subtitle">AI-powered Smart Farming Platform</h2>
          <p className="hero-tagline">Powered by AI & Real-Time Data</p>

          <p className="hero-description">
            Helping farmers make better decisions using AI, weather intelligence, disease detection and government services.
          </p>
          
          <div className="hero-checklist">
            <div className="check-item"><span className="check-icon">✓</span> Live Weather Forecast</div>
            <div className="check-item"><span className="check-icon">✓</span> Crop Disease Detection</div>
            <div className="check-item"><span className="check-icon">✓</span> AI Farming Assistant</div>
            <div className="check-item"><span className="check-icon">✓</span> Government Schemes</div>
            <div className="check-item"><span className="check-icon">✓</span> Soil Health Insights</div>
            <div className="check-item"><span className="check-icon">✓</span> Market Prices</div>
          </div>

          <div className="feature-carousel-container">
            <div className="feature-carousel-inner" style={{ transform: `translateY(-${currentFeatureIndex * 100}%)` }}>
              {features.map((feature, idx) => (
                <div key={idx} className="feature-slide">
                  <span className="feature-icon-small">{feature.icon}</span>
                  <span className="feature-title-small">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-illustration">
            <img src={illustration} alt="Smart Farming" />
          </div>
        </div>

        {/* Right Content: Signup Form */}
        <div className="auth-form-wrapper">
          <div className="auth-card" style={{ maxWidth: '440px' }}>
            <div className="card-hdr">
              <div className="hdr-title-small">Create Account</div>
              <div className="hdr-sub">Join KrishiOfficer today</div>
            </div>

            <div className="card-body">
              {error && <div className="error-msg">{error}</div>}

              <div className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div className="input-group" style={{ marginBottom: '0' }}>
                    <label>First name</label>
                    <input 
                      className="inp" 
                      name="firstName" 
                      placeholder="First Name" 
                      value={formData.firstName} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group" style={{ marginBottom: '0' }}>
                    <label>Last name</label>
                    <input 
                      className="inp" 
                      name="lastName" 
                      placeholder="Last Name" 
                      value={formData.lastName} 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Email address</label>
                  <input 
                    className="inp" 
                    name="email" 
                    type="email"
                    placeholder="email@example.com" 
                    value={formData.email} 
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Mobile number</label>
                  <input 
                    className="inp" 
                    name="phone" 
                    type="tel"
                    placeholder="9876543210" 
                    value={formData.phone} 
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Password (min 8 characters)</label>
                  <input 
                    className="inp" 
                    name="password" 
                    type="password"
                    placeholder="Create password" 
                    value={formData.password} 
                    onChange={handleChange}
                  />
                  <PasswordStrengthBar password={formData.password} />
                </div>

                <div className="input-group">
                  <label>Confirm password</label>
                  <input 
                    className="inp" 
                    name="confirmPassword" 
                    type="password"
                    placeholder="Repeat password" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                  />
                </div>

                <button className="btn-auth" onClick={handleComplete} disabled={loading}>
                  {loading ? <span className="animate-spin loader-white"></span> : 'Create Account'}
                </button>
                <div className="signup-link">
                  Already have an account? <Link to="/login">Sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;