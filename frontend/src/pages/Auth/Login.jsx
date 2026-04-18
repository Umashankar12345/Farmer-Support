import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepProgress from './components/StepProgress';
import OTPInput from './components/OTPInput';
import { authAPI } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendShow, setResendShow] = useState(false);

  const [formData, setFormData] = useState({
    id: '', // email or mobile
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
      setStep(99); // Success state
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
      await authAPI.verifyOTP({ otp });
      // In a real flow, OTP verification would return a token
      // For now, we simulate success
      setStep(99);
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

  const handleGoogleLogin = () => {
    setLoading(true);
    setStep(0); // Mock connecting state
    setTimeout(() => {
      setLoading(false);
      setStep(99);
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {step < 99 && (
          <>
            <div className="card-hdr">
              <div className="hdr-icon-wrap">
                <span style={{ fontSize: '24px' }}>🌾</span>
              </div>
              <div className="hdr-title">Digital Krishi Officer</div>
              <div className="hdr-sub">Sign in to your dashboard</div>
            </div>
            {step > 0 && <StepProgress currentStep={step} totalSteps={3} labels={stepLabels} />}
          </>
        )}

        <div className="card-body">
          {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

          {step === 0 && (
            <div className="success-wrap animate-fade-in" style={{ textAlign: 'center', padding: '20px' }}>
               <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid #eee', borderTopColor: '#4285F4', borderRadius: '50%', margin: '0 auto 20px' }}></div>
               <p style={{ fontSize: '14px', fontWeight: '600', color: '#4285F4' }}>Connecting to Google...</p>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <button className="btn-google" onClick={handleGoogleLogin}>
                <svg viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0', color: '#ccc' }}>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                <div style={{ fontSize: '11px' }}>or sign in with email / mobile</div>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Email or mobile number</label>
                <input 
                  className="inp" 
                  name="id" 
                  placeholder="farmer@email.com or 9876543210" 
                  value={formData.id} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #eee', marginTop: '5px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600' }}>Password</label>
                <input 
                  className="inp" 
                  name="password" 
                  type="password"
                  placeholder="Enter your password" 
                  value={formData.password} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #eee', marginTop: '5px' }}
                />
                <div style={{ textAlign: 'right', marginTop: '5px' }}>
                  <span style={{ fontSize: '12px', color: '#2e7d32', fontWeight: '600', cursor: 'pointer' }}>Forgot password?</span>
                </div>
              </div>

              <button className="btn-auth" onClick={handlePasswordLogin} disabled={loading}>
                {loading ? <span className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></span> : 'Sign in →'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0', color: '#ccc' }}>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                <div style={{ fontSize: '11px' }}>or sign in with OTP</div>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
              </div>

              <button className="btn-auth" style={{ background: '#fff', border: '1.5px solid #2e7d32', color: '#2e7d32' }} onClick={handleGoToOTPFlow}>
                Sign in with mobile OTP
              </button>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
                New here? <Link to="/signup" style={{ color: '#2e7d32', fontWeight: '700' }}>Create free account</Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '20px' }}>
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

              <button className="btn-auth" onClick={handleSendOTP} disabled={loading}>
                {loading ? <span className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></span> : 'Send OTP →'}
              </button>
              <button 
                className="btn-auth" 
                style={{ background: 'none', color: '#999', marginTop: '10px', fontSize: '12px' }} 
                onClick={() => setStep(1)}>← Use password instead</button>
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

              <button className="btn-auth" disabled={loading} style={{ opacity: 0.5 }}>Verify & sign in →</button>
              <button 
                className="btn-auth" 
                style={{ background: 'none', color: '#999', marginTop: '10px', fontSize: '12px' }} 
                onClick={() => setStep(2)}>← Change number</button>
            </div>
          )}

          {step === 99 && (
            <div className="success-wrap animate-fade-in" style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '3px solid #2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '30px', color: '#2e7d32' }}>✓</div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Signed in!</h2>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Welcome back to Digital Krishi Officer</p>
              <button className="btn-primary btn-auth" onClick={() => navigate('/')}>Open Dashboard →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
