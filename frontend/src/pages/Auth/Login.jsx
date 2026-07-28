import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepProgress from './components/StepProgress';
import OTPInput from './components/OTPInput';
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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendShow, setResendShow] = useState(false);
  
  // Carousel logic
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    id: '', 
    password: '',
    dialCode: '+91',
    phone: '',
  });

  const stepLabels = [
    'Step 1 of 3 — Credentials',
    'Step 2 of 3 — Mobile Number',
    'Step 3 of 3 — Verify OTP'
  ];

  // Timer logic for OTP
  useEffect(() => {
    let interval = null;
    if (step === 3 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendShow(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.password) {
      setError('Please enter both ID and password');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login({ id: formData.id, password: formData.password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setStep(99); 
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToOTPFlow = () => {
    setError('');
    setStep(2);
  };

  const handleSendOTP = async () => {
    if (formData.phone.length !== 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authAPI.sendOTP({ phone: formData.phone, dialCode: formData.dialCode });
      setStep(3);
      setTimer(120);
      setResendShow(false);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    setOtpError(false);
    try {
      const response = await authAPI.verifyOTP({ otp });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setStep(99);
    } catch (err) {
      setOtpError(true);
      setError(err.message || 'Incorrect OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await authAPI.sendOTP({ phone: formData.phone, dialCode: formData.dialCode });
      setTimer(120);
      setResendShow(false);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.googleLogin();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setStep(99);
    } catch (err) {
      setError('Google login failed. Please try again.');
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
          <h2 className="hero-subtitle">Smart Farming Platform</h2>
          <p className="hero-tagline">Powered by AI & Real-Time Data</p>

          <p className="hero-description">
            AI-powered farming platform for Indian farmers
          </p>
          
          <div className="hero-checklist">
            <div className="check-item"><span className="check-icon">✓</span> Weather Forecast</div>
            <div className="check-item"><span className="check-icon">✓</span> Disease Detection</div>
            <div className="check-item"><span className="check-icon">✓</span> AI Assistant</div>
            <div className="check-item"><span className="check-icon">✓</span> Mandi Prices</div>
            <div className="check-item"><span className="check-icon">✓</span> Government Schemes</div>
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

        {/* Right Content: Login Card */}
        <div className="auth-form-wrapper">
          <div className="auth-card">
            {step < 99 && (
              <>
                <div className="card-hdr">
                  <div className="hdr-title-small">Welcome Back</div>
                  <div className="hdr-sub">Sign in to your dashboard</div>
                </div>
                {step > 0 && <StepProgress currentStep={step} totalSteps={3} labels={stepLabels} />}
              </>
            )}

            <div className="card-body">
              {error && <div className="error-msg">{error}</div>}

              {step === 0 && (
                <div className="success-wrap animate-fade-in" style={{ textAlign: 'center', padding: '20px' }}>
                  <div className="animate-spin loader-spin"></div>
                  <p className="loader-text">Connecting to Google...</p>
                </div>
              )}

              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="input-group">
                    <label>Email or mobile number</label>
                    <input 
                      className="inp" 
                      name="id" 
                      placeholder="farmer@email.com or 9876543210" 
                      value={formData.id} 
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label>Password</label>
                    <input 
                      className="inp" 
                      name="password" 
                      type="password"
                      placeholder="Enter your password" 
                      value={formData.password} 
                      onChange={handleChange}
                    />
                    <div className="forgot-password">
                      <span>Forgot password?</span>
                    </div>
                  </div>

                  <button className="btn-auth" onClick={handlePasswordLogin} disabled={loading}>
                    {loading ? <span className="animate-spin loader-white"></span> : 'Sign in →'}
                  </button>

                  <div className="divider">
                    <div className="divider-line"></div>
                    <div className="divider-text">or sign in with OTP</div>
                    <div className="divider-line"></div>
                  </div>

                  <button className="btn-outline" onClick={handleGoToOTPFlow}>
                    Sign in with mobile OTP
                  </button>
                  
                  <div className="divider">
                    <div className="divider-line"></div>
                    <div className="divider-text">or continue with</div>
                    <div className="divider-line"></div>
                  </div>

                  <button className="btn-google" onClick={handleGoogleLogin}>
                    <svg viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                    Google
                  </button>

                  <div className="signup-link">
                    New here? <Link to="/signup">Create free account</Link>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="input-group">
                    <label>Mobile number</label>
                    <div className="phone-input">
                      <select 
                        value={formData.dialCode}
                        onChange={(e) => setFormData({ ...formData, dialCode: e.target.value })}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                      </select>
                      <input 
                        className="inp" 
                        name="phone" 
                        placeholder="9876543210" 
                        value={formData.phone} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button className="btn-auth" onClick={handleSendOTP} disabled={loading}>
                    {loading ? <span className="animate-spin loader-white"></span> : 'Send OTP →'}
                  </button>
                  <button className="btn-text" onClick={() => setStep(1)}>← Use password instead</button>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fade-in">
                  <div className="info-box">
                    OTP sent to <strong>{formData.dialCode} {formData.phone}</strong>
                  </div>
                  <div className="otp-label">ENTER 6-DIGIT OTP</div>
                  <OTPInput onComplete={handleVerifyOTP} error={otpError} />
                  
                  <div className="otp-timer-row">
                    <span>Expires in: <span className="timer-text">{formatTime(timer)}</span></span>
                    {resendShow && <button className="btn-resend" onClick={handleResendOTP}>Resend OTP</button>}
                  </div>

                  <button className="btn-auth disabled-look" disabled={loading}>Verify & sign in →</button>
                  <button className="btn-text" onClick={() => setStep(2)}>← Change number</button>
                </div>
              )}

              {step === 99 && (
                <div className="success-wrap animate-fade-in">
                  <div className="success-icon">✓</div>
                  <h2 className="success-title">Signed in!</h2>
                  <p className="success-sub">Welcome back to KrishiOfficer</p>
                  <button className="btn-primary btn-auth" onClick={() => navigate('/')}>Open Dashboard →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
