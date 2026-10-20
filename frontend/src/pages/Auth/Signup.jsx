import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  const location = useLocation();
  const roleParam = new URLSearchParams(location.search).get('role') || 'Farmer';
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
    confirmPassword: '',
    role: roleParam
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
      navigate(`/login?role=${roleParam}`, { state: { message: 'Registration successful! Please sign in.' } });
    } catch (err) {
      setError(err.message || 'Authentication service is currently unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authAPI.githubLogin({ role: roleParam || 'Farmer' });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.message || 'GitHub sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Top Navbar */}
      <div className="auth-navbar">
        <div className="nav-logo" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <span className="nav-icon">🌾</span>
          <span className="nav-brand">Digital Krishi Officer</span>
        </div>
        <div className="nav-links">
          <Link to="/are-you-a-farmer" className="nav-item" style={{ textDecoration: 'none' }}>
            ← Change Role
          </Link>
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

              <button 
                type="button" 
                onClick={handleGithubSignup} 
                className="btn-github" 
                disabled={loading}
                id="btn-github-signup"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Sign up with GitHub</span>
              </button>

              <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-text">OR ENTER DETAILS</div>
                <div className="divider-line"></div>
              </div>

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
                  Already have an account? <Link to={roleParam ? `/login?role=${roleParam}` : "/login"}>Sign in</Link>
                </div>
                <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '13px' }}>
                  <Link to="/are-you-a-farmer" style={{ color: '#64748b', textDecoration: 'none' }}>
                    ← Change Role (Farmer / Visitor / Expert)
                  </Link>
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