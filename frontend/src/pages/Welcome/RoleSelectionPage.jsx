import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS, AVAILABLE_LANGUAGES } from '../../constants/translations';
import './Welcome.css';

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('krishi_lang') || 'en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleEnterAsVisitor = () => {
    // Setup visitor guest session
    localStorage.setItem('guest_mode', 'true');
    localStorage.setItem('user_role', 'Visitor');
    localStorage.setItem(
      'user',
      JSON.stringify({
        firstName: 'Guest',
        lastName: 'Visitor',
        role: 'Visitor',
        email: 'visitor@krishi.demo',
      })
    );
    navigate('/');
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const currentLangObj = AVAILABLE_LANGUAGES.find((l) => l.code === lang) || AVAILABLE_LANGUAGES[0];

  return (
    <div className="role-page-container">
      {/* Cinematic Farming Video Background */}
      <div className="welcome-video-bg-wrap" aria-hidden="true">
        <video
          className="welcome-video-bg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/wheat-field.mp4" type="video/mp4" />
        </video>
        <div className="welcome-video-overlay" />
      </div>

      {/* Ambient background glows */}
      <div className="welcome-ambient-1" />
      <div className="welcome-ambient-2" />

      {/* Header */}
      <header className="role-header-nav">
        <div className="flex items-center gap-4">
          <Link to="/welcome" className="role-back-btn">
            {t.backToWelcome || "← Back to Welcome"}
          </Link>

          <div className="welcome-brand hidden sm:flex" onClick={() => navigate('/welcome')}>
            <div className="welcome-logo-badge" style={{ width: '36px', height: '36px', fontSize: '18px' }}>
              🌾
            </div>
            <span className="welcome-brand-title" style={{ fontSize: '16px' }}>
              Digital Krishi Officer
            </span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="lang-selector-wrapper" ref={dropdownRef}>
          <button
            className="lang-selector-btn"
            onClick={() => setLangMenuOpen((prev) => !prev)}
            aria-label="Select Language"
          >
            <span>🌐</span>
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
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </header>

      {/* Main Role Selection Area */}
      <main className="role-main-section">
        <h1 className="role-question-heading">
          {t.areYouFarmerTitle || "Are you a farmer?"}
        </h1>
        <p className="role-question-sub">
          {t.areYouFarmerSub || "Choose how you would like to proceed into Digital Krishi Officer"}
        </p>

        {/* 2 Big Action Cards */}
        <div className="role-cards-grid">
          {/* Card 1: Yes, I am a farmer */}
          <div className="role-card role-card-farmer">
            <div className="role-card-header">
              <div className="role-card-avatar role-avatar-farmer">
                🌾
              </div>
              <span className="role-pill-recommended">
                {lang === 'hi' ? 'अनुशंसित' : lang === 'pa' ? 'ਸਿਫਾਰਸ਼ੀ' : 'Recommended'}
              </span>
            </div>

            <h2 className="role-card-title">
              {t.yesFarmerTitle || "Yes, I am a farmer"}
            </h2>
            <p className="role-card-tagline">
              {t.yesFarmerTagline || "Cultivator, landowner, or agricultural worker"}
            </p>

            <ul className="role-features-list">
              <li className="role-feature-item">
                <span className="role-check-icon">✓</span>
                <span>{t.yesFarmerFeature1 || "Personalized field tracking & crop stages"}</span>
              </li>
              <li className="role-feature-item">
                <span className="role-check-icon">✓</span>
                <span>{t.yesFarmerFeature2 || "AI leaf disease diagnosis with instant treatment"}</span>
              </li>
              <li className="role-feature-item">
                <span className="role-check-icon">✓</span>
                <span>{t.yesFarmerFeature3 || "Soil Health Card records & fertilizer calculator"}</span>
              </li>
              <li className="role-feature-item">
                <span className="role-check-icon">✓</span>
                <span>{t.yesFarmerFeature4 || "Farm Passport & season harvest logs"}</span>
              </li>
            </ul>

            <div className="role-actions-group">
              <button
                onClick={() => navigate('/login?role=Farmer')}
                className="btn-farmer-primary"
                id="btn-farmer-signin"
              >
                <span>👨‍🌾</span>
                <span>{t.farmerSignInBtn || "Farmer Sign In"}</span>
              </button>

              <button
                onClick={() => navigate('/signup?role=Farmer')}
                className="btn-farmer-outline"
                id="btn-farmer-register"
              >
                <span>{t.farmerRegisterBtn || "New Farmer Registration"}</span>
              </button>
            </div>
          </div>

          {/* Card 2: No, I am a visitor / expert */}
          <div className="role-card role-card-visitor">
            <div className="role-card-header">
              <div className="role-card-avatar role-avatar-visitor">
                🔬
              </div>
              <span className="role-pill-recommended" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                {lang === 'hi' ? 'अतिथि / विशेषज्ञ' : lang === 'pa' ? 'ਮਹਿਮਾਨ / ਮਾਹਰ' : 'Guest / Expert'}
              </span>
            </div>

            <h2 className="role-card-title">
              {t.noVisitorTitle || "No, I am a visitor / expert"}
            </h2>
            <p className="role-card-tagline">
              {t.noVisitorTagline || "Researcher, agronomist, officer, or public guest"}
            </p>

            <ul className="role-features-list">
              <li className="role-feature-item">
                <span className="role-check-icon role-check-icon-blue">✓</span>
                <span>{t.noVisitorFeature1 || "Explore real-time Agmarknet / eNAM mandi commodities"}</span>
              </li>
              <li className="role-feature-item">
                <span className="role-check-icon role-check-icon-blue">✓</span>
                <span>{t.noVisitorFeature2 || "Check regional 7-day weather & rain radar"}</span>
              </li>
              <li className="role-feature-item">
                <span className="role-check-icon role-check-icon-blue">✓</span>
                <span>{t.noVisitorFeature3 || "Browse central and state subsidy schemes"}</span>
              </li>
              <li className="role-feature-item">
                <span className="role-check-icon role-check-icon-blue">✓</span>
                <span>{t.noVisitorFeature4 || "Agronomic officer and researcher tools"}</span>
              </li>
            </ul>

            <div className="role-actions-group">
              <button
                onClick={handleEnterAsVisitor}
                className="btn-visitor-primary"
                id="btn-visitor-guest"
              >
                <span>👀</span>
                <span>{t.visitorExploreBtn || "Explore as Visitor (Guest View)"}</span>
              </button>

              <button
                onClick={() => navigate('/login?role=Expert')}
                className="btn-visitor-outline"
                id="btn-expert-signin"
              >
                <span>🏛️</span>
                <span>{t.expertSignInBtn || "Expert / Officer Login"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
