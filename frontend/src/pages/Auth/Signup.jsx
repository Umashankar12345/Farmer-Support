import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepProgress from './components/StepProgress';
import OTPInput from './components/OTPInput';
import PasswordStrengthBar from './components/PasswordStrengthBar';
import FarmSizeCounter from './components/FarmSizeCounter';
import RolePicker from './components/RolePicker';
import { authAPI, locationAPI } from '../../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendShow, setResendShow] = useState(false);

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
      <div className="auth-card">
        {step < 5 && (
          <>
            <div className="card-hdr">
              <div className="hdr-icon-wrap">
                <span style={{ fontSize: '24px' }}>🌾</span>
              </div>
              <div className="hdr-title">Digital Krishi Officer</div>
              <div className="hdr-sub">Create your free farmer account</div>
            </div>
            <StepProgress currentStep={step} totalSteps={4} labels={stepLabels} />
          </>
        )}

        <div className="card-body">
          {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

          {step === 1 && (
            <div className="animate-fade-in">
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#666', marginBottom: '10px' }}>I AM REGISTERING AS</div>
              <RolePicker value={formData.role} onChange={(r) => setFormData({ ...formData, role: r })} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>First name</label>
                  <input 
                    className="inp" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Last name</label>
                  <input 
                    className="inp" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Email address</label>
                <input 
                  className="inp" 
                  name="email" 
                  type="email"
                  placeholder="email@example.com" 
                  value={formData.email} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
                />
              </div>

              <button className="btn-auth" onClick={handleGoStep2}>Continue →</button>
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px' }}>
                Already have an account? <Link to="/login" style={{ color: '#2e7d32', fontWeight: '700' }}>Sign in</Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Mobile number</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                  <select 
                    style={{ width: '90px', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee' }}
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
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1.5px solid #eee' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Password (min 8 characters)</label>
                <input 
                  className="inp" 
                  name="password" 
                  type="password"
                  placeholder="Create password" 
                  value={formData.password} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
                />
                <PasswordStrengthBar password={formData.password} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Confirm password</label>
                <input 
                  className="inp" 
                  name="confirmPassword" 
                  type="password"
                  placeholder="Repeat password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
                />
              </div>

              <button className="btn-auth" onClick={handleSendOTP} disabled={loading}>
                {loading ? <span className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></span> : 'Send OTP to mobile →'}
              </button>
              <button className="btn-auth" style={{ background: 'none', color: '#999', marginTop: '10px', fontSize: '12px' }} onClick={() => setStep(1)}>← Back to profile</button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="info-box" style={{ background: '#e8f5e9', padding: '12px', borderRadius: '10px', fontSize: '12px', color: '#1b5e20', marginBottom: '20px' }}>
                OTP sent to <strong>{formData.dialCode} {formData.phone}</strong>
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#666', marginBottom: '10px' }}>ENTER 6-DIGIT OTP</div>
              <OTPInput onComplete={handleVerifyOTP} error={otpError} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', margin: '15px 0' }}>
                <span>Expires in: <span style={{ color: '#e53935', fontWeight: '700' }}>{formatTime(timer)}</span></span>
                {resendShow && <button onClick={handleResendOTP} style={{ background: 'none', border: 'none', color: '#2e7d32', fontWeight: '700', cursor: 'pointer' }}>Resend OTP</button>}
              </div>

              <button className="btn-auth" disabled={loading} style={{ opacity: 0.5 }}>Verify & continue →</button>
              <button 
                className="btn-auth" 
                style={{ background: 'none', color: '#999', marginTop: '10px', fontSize: '12px' }} 
                onClick={() => setStep(2)}>← Change number</button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
               <div className="info-box" style={{ background: '#e8f5e9', padding: '12px', borderRadius: '10px', fontSize: '12px', color: '#1b5e20', marginBottom: '15px' }}>
                Mobile verified ✓ Complete your farm profile
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Farm size (acres)</label>
                <FarmSizeCounter value={formData.farmSize} onChange={(v) => setFormData({ ...formData, farmSize: v })} />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Location / Village</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                  <input 
                    className="inp" 
                    name="location" 
                    placeholder="Village, District" 
                    value={formData.location} 
                    onChange={handleChange}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1.5px solid #eee' }}
                  />
                  <button onClick={handleDetectLocation} style={{ padding: '0 12px', background: '#e8f5e9', border: '1.5px solid #a5d6a7', borderRadius: '8px', color: '#1b5e20', fontWeight: '600', fontSize: '12px' }}>Detect</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Primary crop</label>
                  <select 
                    className="inp" 
                    name="crop" 
                    value={formData.crop} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
                  >
                    <option value="">Select Crop</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Mustard</option>
                    <option>Sugarcane</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>State</label>
                  <select 
                    className="inp" 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #eee', marginTop: '5px' }}
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
                {loading ? <span className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></span> : 'Create my account →'}
              </button>
              <button className="btn-auth" style={{ background: 'none', color: '#999', marginTop: '10px', fontSize: '12px' }} onClick={() => setStep(3)}>← Back</button>
            </div>
          )}

          {step === 5 && (
            <div className="success-wrap animate-fade-in" style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '3px solid #2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '30px', color: '#2e7d32' }}>✓</div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Account created!</h2>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Welcome, {formData.firstName}! Your {formData.farmSize}-acre farm in {formData.location} is registered.</p>
              <button className="btn-primary btn-auth" onClick={() => navigate('/')}>Go to Dashboard →</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Signup;