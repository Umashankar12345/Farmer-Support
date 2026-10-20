import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS, AVAILABLE_LANGUAGES } from '../../constants/translations';
import './Welcome.css';

const FARM_CLIPS = [
  { id: 'wheat', label: '🌾 Wheat Field', file: '/videos/wheat-field.mp4' },
  { id: 'tractor', label: '🚜 Tractor Farming', file: '/videos/tractor-farming.mp4' },
  { id: 'paddy', label: '🌱 Paddy Field', file: '/videos/paddy-field.mp4' },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('krishi_lang') || 'en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedClip, setSelectedClip] = useState('wheat');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    setLang(code);
    localStorage.setItem('krishi_lang', code);
    window.dispatchEvent(new Event('krishi_lang_change'));
    setLangMenuOpen(false);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const currentLangObj = AVAILABLE_LANGUAGES.find((l) => l.code === lang) || AVAILABLE_LANGUAGES[0];

  return (
    <div className="welcome-container">
      {/* Cinematic Farming Video Background */}
      {videoEnabled && (
        <div className="welcome-video-bg-wrap" aria-hidden="true">
          <video
            key={selectedClip}
            className="welcome-video-bg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src={FARM_CLIPS.find((c) => c.id === selectedClip)?.file || '/videos/wheat-field.mp4'}
              type="video/mp4"
            />
          </video>
          <div className="welcome-video-overlay" />
        </div>
      )}

      {/* Ambient background glows */}
      <div className="welcome-ambient-1" />
      <div className="welcome-ambient-2" />

      {/* Top Navbar */}
      <nav className="welcome-navbar">
        <div className="welcome-brand" onClick={() => navigate('/welcome')}>
          <div className="welcome-logo-badge" title="Digital Krishi Officer">
            🌾
          </div>
          <div className="welcome-brand-text">
            <span className="welcome-brand-title">Digital Krishi Officer</span>
            <span className="welcome-brand-sub">AI Smart Agriculture</span>
          </div>
        </div>

        <div className="welcome-nav-actions">
          {/* Language Selector Dropdown */}
          <div className="lang-selector-wrapper" ref={dropdownRef}>
            <button
              className="lang-selector-btn"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <span className="text-base">🌐</span>
              <span>{currentLangObj.native}</span>
              <span className="text-xs text-slate-400">▼</span>
            </button>

            {langMenuOpen && (
              <div className="lang-dropdown-menu">
                {AVAILABLE_LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    className={`lang-dropdown-item ${item.code === lang ? 'active' : ''}`}
                    onClick={() => changeLanguage(item.code)}
                  >
                    <span>{item.native}</span>
                    <span className="text-xs text-slate-400">({item.label})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/Umashankar12345/Farmer-Support"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github-link"
            title="View on GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          <Link to="/login" className="nav-signin-link">
            {t.signInLink || "Sign In"}
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="welcome-hero-section">
        {/* Top Badge */}
        <div className="hero-pill-badge">
          <span>{t.welcomeBadge || "🌾 AI-Powered Smart Farming Platform"}</span>
        </div>

        {/* Project Name & Hero Title */}
        <h1 className="welcome-hero-title">
          <span>{t.appName || "Digital Krishi Officer"}</span>
        </h1>

        {/* One-line Tagline */}
        <p className="welcome-tagline">
          “<em>{t.tagline || "Ask anything about your farm, get answers instantly"}</em>”
        </p>

        {/* Subtitle description */}
        <p className="welcome-subtext">
          {t.welcomeSubtext ||
            "Live mandi prices, instant crop disease diagnosis, hyper-local weather alerts, and official government schemes for Indian farmers."}
        </p>

        {/* Primary CTA Button */}
        <div className="welcome-cta-group">
          <button
            onClick={() => navigate('/are-you-a-farmer')}
            className="welcome-btn-primary"
            id="welcome-get-started-btn"
          >
            <span>{t.getStartedBtn || "Get Started →"}</span>
          </button>

          <div className="welcome-cta-secondary">
            <span>{t.signInLink ? t.signInLink.split('?')[0] + '?' : 'Already registered?'} </span>
            <Link to="/login">
              {lang === 'hi' ? 'सीधे लॉगिन करें' : lang === 'pa' ? 'ਸਿੱਧਾ ਲੌਗਇਨ ਕਰੋ' : 'Sign In directly'}
            </Link>
          </div>
        </div>

        {/* Interactive Farm Video Selector */}
        <div className="farm-video-control-bar" role="toolbar" aria-label="Farm Video Live View">
          <span className="farm-video-label">
            <span>🎥</span>
            <span>Live Farm View:</span>
          </span>
          {FARM_CLIPS.map((clip) => (
            <button
              key={clip.id}
              type="button"
              className={`farm-video-pill ${selectedClip === clip.id && videoEnabled ? 'active' : ''}`}
              onClick={() => {
                setSelectedClip(clip.id);
                setVideoEnabled(true);
              }}
              title={`Switch to ${clip.label}`}
            >
              {clip.label}
            </button>
          ))}
          <button
            type="button"
            className="farm-video-toggle-btn"
            onClick={() => setVideoEnabled((prev) => !prev)}
            title={videoEnabled ? "Turn off background video" : "Turn on background video"}
          >
            {videoEnabled ? "Pause ⏸" : "Play ▶"}
          </button>
        </div>

        {/* 4 Feature Highlight Cards */}
        <div className="welcome-features-grid">
          <div className="welcome-feature-card">
            <div className="feature-card-icon">📈</div>
            <div>
              <div className="feature-card-title">{t.featurePill1 || "Live Mandi Rates"}</div>
              <div className="feature-card-sub">Real-time eNAM & Agmarknet spot prices</div>
            </div>
          </div>

          <div className="welcome-feature-card">
            <div className="feature-card-icon">🌦️</div>
            <div>
              <div className="feature-card-title">{t.featurePill2 || "Weather Radar"}</div>
              <div className="feature-card-sub">Hyperlocal rain & field spray advisories</div>
            </div>
          </div>

          <div className="welcome-feature-card">
            <div className="feature-card-icon">📸</div>
            <div>
              <div className="feature-card-title">{t.featurePill3 || "Disease Scanner"}</div>
              <div className="feature-card-sub">AI leaf photo diagnosis with cure dosages</div>
            </div>
          </div>

          <div className="welcome-feature-card">
            <div className="feature-card-icon">🏛️</div>
            <div>
              <div className="feature-card-title">{t.featurePill4 || "Govt Schemes"}</div>
              <div className="feature-card-sub">PM-Kisan, KCC & state subsidy navigator</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
