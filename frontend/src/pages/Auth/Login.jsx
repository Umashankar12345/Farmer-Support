import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');

  // Carousel logic
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const data = await authAPI.login({ id: email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
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

        {/* Right Content */}
        <div className="auth-form-wrapper">
          <div className="auth-card" style={{ maxWidth: '400px' }}>
            <div className="card-hdr">
              <div className="hdr-title-small">Welcome Back</div>
              <div className="hdr-sub">Please enter your details to sign in</div>
            </div>

            <div className="card-body">
              {message && <div className="success-msg" style={{ padding: '12px', background: '#ecfdf5', color: '#059669', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{message}</div>}
              {error && <div className="error-msg" style={{ padding: '12px', background: '#fef2f2', color: '#dc2626', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

              <form onSubmit={handleLogin} className="animate-fade-in">
                <div className="input-group">
                  <label>Email address</label>
                  <input 
                    className="inp" 
                    type="email" 
                    placeholder="email@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input 
                    className="inp" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="remember-forgot" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '24px' }}>
                  <label className="checkbox-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#4b5563' }}>
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                </div>

                <button type="submit" className="btn-auth" disabled={loading}>
                  {loading ? <span className="animate-spin loader-white"></span> : 'Sign In'}
                </button>

                <div className="signup-link">
                  Don't have an account? <Link to="/signup">Create Account</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
