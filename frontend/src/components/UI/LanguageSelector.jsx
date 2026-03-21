// import React, { useState } from 'react';
// import { useLanguage } from '../../contexts/LanguageContext'; // CHANGED THIS LINE
// import './LanguageSelector.css';

// const LanguageSelector = () => {
//     const { language, languages, changeLanguage } = useLanguage();
//     const [isOpen, setIsOpen] = useState(false);

//     const handleLanguageChange = (langCode) => {
//         changeLanguage(langCode);
//         setIsOpen(false);
//     };

//     // Get current language object
//     const currentLang = languages[language] || languages.en || { name: 'English', flag: '🇺🇸' };

//     return (
//         <div className="language-selector">
//             <button 
//                 className="language-selector-btn"
//                 onClick={() => setIsOpen(!isOpen)}
//                 aria-label="Change language"
//             >
//                 <span className="language-flag" role="img" aria-label={currentLang.name}>
//                     {currentLang.flag}
//                 </span>
//                 <span className="language-name">
//                     {currentLang.name}
//                 </span>
//                 <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
//             </button>
            
//             {isOpen && (
//                 <div className="language-dropdown">
//                     {Object.entries(languages).map(([code, lang]) => (
//                         <button
//                             key={code}
//                             className={`language-option ${language === code ? 'active' : ''}`}
//                             onClick={() => handleLanguageChange(code)}
//                         >
//                             <span className="language-flag" role="img" aria-label={lang.name}>
//                                 {lang.flag}
//                             </span>
//                             <span className="language-name">
//                                 {lang.name}
//                             </span>
//                             {language === code && (
//                                 <i className="fas fa-check"></i>
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             )}
            
//             {/* Close dropdown when clicking outside */}
//             {isOpen && (
//                 <div 
//                     style={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         zIndex: 999
//                     }}
//                     onClick={() => setIsOpen(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default LanguageSelector;
import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
    const { languages, changeLanguage, currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="language-selector">
            <button 
                className="language-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Globe size={18} />
                <span>{languages[currentLanguage]?.name || 'Language'}</span>
            </button>
            
            {isOpen && (
                <div className="language-dropdown">
                    {Object.entries(languages).map(([code, lang]) => (
                        <button
                            key={code}
                            className={`language-option ${currentLanguage === code ? 'active' : ''}`}
                            onClick={() => {
                                changeLanguage(code);
                                setIsOpen(false);
                            }}
                        >
                            <span className="language-flag">{lang.flag}</span>
                            <span className="language-name">{lang.name}</span>
                            <span className="language-native">({lang.native})</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;