import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepProgress from './components/StepProgress';
import OTPInput from './components/OTPInput';
import PasswordStrengthBar from './components/PasswordStrengthBar';
import FarmSizeCounter from './components/FarmSizeCounter';
import RolePicker from './components/RolePicker';
import { authAPI, locationAPI } from '../../services/api';
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
    firstName: '',
    lastName: '',
    email: '',
    role: 'Farmer',
    dialCode: '+91',
    phone: '',
    password: '',
    confirmPassword: '',
    farmSize: 5,
    location: '',
    crop: '',
    state: ''
  });

  const stepLabels = [
    'Step 1 of 4 — Profile',
    'Step 2 of 4 — Mobile & Password',
    'Step 3 of 4 — Verify OTP',
    'Step 4 of 4 — Farm Details'
  ];

  // Timer logic
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

  const handleGoStep2 = () => {
    if (!formData.firstName || !formData.email.includes('@')) {
      setError('Please enter valid name and email');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSendOTP = async () => {
    if (formData.phone.length !== 10) {
      setError('Enter a valid 10-digit mobile number');
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
      await authAPI.verifyOTP({ otp });
      setStep(4);
    } catch (err) {
      setOtpError(true);
      setError('Incorrect OTP. Please try again.');
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

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const data = await locationAPI.reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          setFormData({ ...formData, location: `${data.district}, ${data.state}` });
        } catch (err) {
          setError('Failed to detect location');
        }
      });
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { confirmPassword, ...data } = formData;
      const response = await authAPI.signup(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setStep(5); // Success state
    } catch (err) {
      setError(err.message || 'Signup failed');
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

        {/* Right Content: Signup Form */}
        <div className="auth-form-wrapper">
          <div className="auth-card" style={{ maxWidth: '440px' }}>
            {step < 5 && (
              <>
                <div className="card-hdr">
                  <div className="hdr-title-small">Create Account</div>
                  <div className="hdr-sub">Join KrishiOfficer today</div>
                </div>
                <StepProgress currentStep={step} totalSteps={4} labels={stepLabels} />
              </>
            )}

            <div className="card-body">
              {error && <div className="error-msg">{error}</div>}

              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="otp-label" style={{ marginBottom: '16px' }}>I AM REGISTERING AS</div>
                  <RolePicker value={formData.role} onChange={(r) => setFormData({ ...formData, role: r })} />
                  
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

                  <button className="btn-auth" onClick={handleGoStep2}>Continue →</button>
                  <div className="signup-link">
                    Already have an account? <Link to="/login">Sign in</Link>
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
                        style={{ flex: 1 }}
                      />
                    </div>
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

                  <button className="btn-auth" onClick={handleSendOTP} disabled={loading}>
                    {loading ? <span className="animate-spin loader-white"></span> : 'Send OTP to mobile →'}
                  </button>
                  <button className="btn-text" onClick={() => setStep(1)}>← Back to profile</button>
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

                  <button className="btn-auth disabled-look" disabled={loading}>Verify & continue →</button>
                  <button className="btn-text" onClick={() => setStep(2)}>← Change number</button>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fade-in">
                   <div className="info-box">
                    Mobile verified ✓ Complete your farm profile
                  </div>

                  <div className="input-group">
                    <label>Farm size (acres)</label>
                    <FarmSizeCounter value={formData.farmSize} onChange={(v) => setFormData({ ...formData, farmSize: v })} />
                  </div>

                  <div className="input-group">
                    <label>Location / Village</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        className="inp" 
                        name="location" 
                        placeholder="Village, District" 
                        value={formData.location} 
                        onChange={handleChange}
                        style={{ flex: 1 }}
                      />
                      <button onClick={handleDetectLocation} style={{ padding: '0 16px', background: '#f0fdf4', border: '1px solid #10b981', borderRadius: '12px', color: '#10b981', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Detect</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div className="input-group" style={{ marginBottom: '0' }}>
                      <label>Primary crop</label>
                      <select 
                        className="inp" 
                        name="crop" 
                        value={formData.crop} 
                        onChange={handleChange}
                      >
                        <option value="">Select Crop</option>
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Mustard</option>
                        <option>Sugarcane</option>
                      </select>
                    </div>
                    <div className="input-group" style={{ marginBottom: '0' }}>
                      <label>State</label>
                      <select 
                        className="inp" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                      >
                        <option value="">Select State</option>
                        <option>Rajasthan</option>
                        <option>Punjab</option>
                        <option>Haryana</option>
                        <option>Uttar Pradesh</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn-auth" onClick={handleComplete} disabled={loading}>
                    {loading ? <span className="animate-spin loader-white"></span> : 'Create my account →'}
                  </button>
                  <button className="btn-text" onClick={() => setStep(3)}>← Back</button>
                </div>
              )}

              {step === 5 && (
                <div className="success-wrap animate-fade-in">
                  <div className="success-icon">✓</div>
                  <h2 className="success-title">Account created!</h2>
                  <p className="success-sub" style={{ fontSize: '14px', marginBottom: '24px' }}>Welcome, {formData.firstName}! Your {formData.farmSize}-acre farm in {formData.location} is registered.</p>
                  <button className="btn-primary btn-auth" onClick={() => navigate('/')}>Go to Dashboard →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;