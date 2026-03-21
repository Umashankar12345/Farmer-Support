import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
    const { currentLanguage, languages, changeLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    // Get language name for display
    const getCurrentLanguageName = () => {
        const lang = languages[currentLanguage];
        if (lang) {
            // Return only the native script part (before the parentheses)
            return lang.split('(')[0].trim();
        }
        return 'English';
    };

    // Get flag emoji based on language code
    const getFlagEmoji = (languageCode) => {
        const flagMap = {
            'en': '🇺🇸',
            'hi': '🇮🇳',
            'ta': '🇮🇳',
            'te': '🇮🇳',
            'bn': '🇮🇳',
            'mr': '🇮🇳',
            'gu': '🇮🇳',
            'kn': '🇮🇳',
            'ml': '🇮🇳',
            'pa': '🇮🇳',
            'or': '🇮🇳',
            'as': '🇮🇳'
        };
        return flagMap[languageCode] || '🌐';
    };

    return (
        <div className="language-selector">
            <button 
                className="language-selector-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={t('changeLanguage') || 'Change language'}
                aria-expanded={isOpen}
            >
                <span className="language-flag" role="img" aria-label={currentLanguage}>
                    {getFlagEmoji(currentLanguage)}
                </span>
                <span className="language-name">
                    {getCurrentLanguageName()}
                </span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
            </button>
            
            {isOpen && (
                <div className="language-dropdown">
                    <div className="language-dropdown-header">
                        <h4>{t('selectLanguage') || 'Select Language'}</h4>
                        <button 
                            className="close-dropdown"
                            onClick={() => setIsOpen(false)}
                            aria-label={t('close') || 'Close'}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div className="language-options">
                        {Object.entries(languages).map(([code, name]) => (
                            <button
                                key={code}
                                className={`language-option ${currentLanguage === code ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(code)}
                                aria-label={`Switch to ${name}`}
                                aria-current={currentLanguage === code ? 'true' : 'false'}
                            >
                                <span className="language-option-flag" role="img" aria-label={code}>
                                    {getFlagEmoji(code)}
                                </span>
                                <div className="language-option-text">
                                    <span className="language-option-native">
                                        {name.split('(')[0].trim()}
                                    </span>
                                    <span className="language-option-english">
                                        {name.includes('(') ? name.split('(')[1].replace(')', '') : name}
                                    </span>
                                </div>
                                {currentLanguage === code && (
                                    <i className="fas fa-check language-check"></i>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Backdrop for closing dropdown when clicking outside */}
            {isOpen && (
                <div 
                    className="language-dropdown-backdrop"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default LanguageSelector;