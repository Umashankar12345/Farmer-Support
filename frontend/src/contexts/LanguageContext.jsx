// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('hi');
    
    const translations = {
        hi: { // Hindi
            welcome: 'वापसी पर स्वागत है',
            dashboard: 'डैशबोर्ड',
            myFarm: 'मेरा खेत',
            fertilizer: 'उर्वरक सिफारिशें',
            weather: 'मौसम पूर्वानुमान',
            pest: 'कीट एवं रोग',
            schemes: 'सरकारी योजनाएं',
            calendar: 'फसल कैलेंडर',
            analysis: 'फसल विश्लेषण',
            mechanization: 'कृषि यंत्रीकरण',
            drought: 'सूखा चेतावनी',
            totalLand: 'कुल भूमि',
            activeCrops: 'सक्रिय फसलें',
            yieldPrediction: 'उपज अनुमान',
            waterRequired: 'आवश्यक पानी',
            logout: 'लॉग आउट',
            profile: 'प्रोफाइल',
            lastLogin: 'आखिरी लॉगिन',
            pmKisan: 'पीएम-किसान योजना',
            applyNow: 'अभी आवेदन करें',
            eligibility: 'योग्यता',
            government: 'सरकार'
        },
        en: { // English
            welcome: 'Welcome back',
            dashboard: 'Dashboard',
            myFarm: 'My Farm',
            fertilizer: 'Fertilizer Recommendations',
            weather: 'Weather Forecast',
            pest: 'Pest & Disease',
            schemes: 'Government Schemes',
            calendar: 'Crop Calendar',
            analysis: 'Crop Analysis',
            mechanization: 'Farm Mechanization',
            drought: 'Drought Alert',
            totalLand: 'Total Land',
            activeCrops: 'Active Crops',
            yieldPrediction: 'Yield Prediction',
            waterRequired: 'Water Required',
            logout: 'Logout',
            profile: 'Profile',
            lastLogin: 'Last login',
            pmKisan: 'PM-KISAN Scheme',
            applyNow: 'Apply Now',
            eligibility: 'Eligibility',
            government: 'Government'
        },
        ta: { // Tamil
            welcome: 'மீண்டும் வரவேற்கிறோம்',
            dashboard: 'டாஷ்போர்டு',
            myFarm: 'என் பண்ணை',
            fertilizer: 'உர பரிந்துரைகள்',
            weather: 'வானிலை முன்னறிவிப்பு',
            pest: 'பூச்சி & நோய்',
            schemes: 'அரசு திட்டங்கள்',
            calendar: 'பயிர் காலண்டர்',
            analysis: 'பயிர் பகுப்பாய்வு',
            mechanization: 'பண்ணை இயந்திரமயமாக்கல்',
            drought: 'வறட்சி எச்சரிக்கை',
            totalLand: 'மொத்த நிலம்',
            activeCrops: 'செயலில் உள்ள பயிர்கள்',
            yieldPrediction: 'மகசூல் கணிப்பு',
            waterRequired: 'தேவையான நீர்',
            logout: 'வெளியேறு',
            profile: 'சுயவிவரம்',
            lastLogin: 'கடைசி உள்நுழைவு',
            pmKisan: 'பிஎம்-கிசான் திட்டம்',
            applyNow: 'இப்போதே விண்ணப்பிக்கவும்',
            eligibility: 'தகுதி',
            government: 'அரசு'
        },
        pa: { // Punjabi
            welcome: 'ਵਾਪਸੀ ਤੇ ਸੁਆਗਤ ਹੈ',
            dashboard: 'ਡੈਸ਼ਬੋਰਡ',
            myFarm: 'ਮੇਰਾ ਖੇਤ',
            fertilizer: 'ਖਾਦ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ',
            weather: 'ਮੌਸਮ ਦਾ ਪੂਰਵ-ਅਨੁਮਾਨ',
            pest: 'ਕੀੜੇ ਅਤੇ ਬੀਮਾਰੀ',
            schemes: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
            calendar: 'ਫਸਲ ਕੈਲੰਡਰ',
            analysis: 'ਫਸਲ ਵਿਸ਼ਲੇਸ਼ਣ',
            mechanization: 'ਖੇਤ ਮਸ਼ੀਨੀਕਰਨ',
            drought: 'ਸੋਕਾ ਚੇਤਾਵਨੀ',
            totalLand: 'ਕੁੱਲ ਜ਼ਮੀਨ',
            activeCrops: 'ਸਰਗਰਮ ਫਸਲਾਂ',
            yieldPrediction: 'ਪੈਦਾਵਾਰ ਦਾ ਅੰਦਾਜ਼ਾ',
            waterRequired: 'ਲੋੜੀਂਦਾ ਪਾਣੀ',
            logout: 'ਲੌਗ ਆਉਟ',
            profile: 'ਪ੍ਰੋਫਾਈલ',
            lastLogin: 'ਆਖਰੀ ਲੌਗਇਨ',
            pmKisan: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਕੀਮ',
            applyNow: 'ਹੁਣੇ ਅਪਲਾਈ ਕਰੋ',
            eligibility: 'ਯੋਗਤਾ',
            government: 'ਸਰਕਾਰ'
        },
        bn: { // Bengali
            welcome: 'ফিরে আসার জন্য স্বাগতম',
            dashboard: 'ড্যাশবোর্ড',
            myFarm: 'আমার খামার',
            fertilizer: 'সারের সুপারিশ',
            weather: 'আবহাওয়ার পূর্বাভাস',
            pest: 'পোকা ও রোগ',
            schemes: 'সরকারী স্কিম',
            calendar: 'ফসল ক্যালেন্ডার',
            analysis: 'ফসল বিশ্লেষণ',
            mechanization: 'কৃষি যন্ত্রকরণ',
            drought: 'খরা সতর্কতা',
            totalLand: 'মোট জমি',
            activeCrops: 'সক্রিয় ফসল',
            yieldPrediction: 'উৎপাদন পূর্বাভাস',
            waterRequired: 'প্রয়োজনীয় পানি',
            logout: 'লগ আউট',
            profile: 'প্রোফাইল',
            lastLogin: 'শেষ লগইন',
            pmKisan: 'পিএম-কিসান স্কিম',
            applyNow: 'এখনই আবেদন করুন',
            eligibility: 'যোগ্যতা',
            government: 'সরকার'
        },
        te: { // Telugu
            welcome: 'తిరిగి వచ్చినందుకు స్వాగతం',
            dashboard: 'డాష్బోర్డ్',
            myFarm: 'నా ఫార్మ్',
            fertilizer: 'ఎరువు సిఫార్సులు',
            weather: 'వాతావరణ సూచన',
            pest: 'కీటకాలు మరియు వ్యాధి',
            schemes: 'ప్రభుత్వ పథకాలు',
            calendar: 'పంట క్యాలెండర్',
            analysis: 'పంట విశ్లేషణ',
            mechanization: 'ఫార్మ్ యంత్రీకరణ',
            drought: 'కరువు హెచ్చరిక',
            totalLand: 'మొత్తం భూమి',
            activeCrops: 'సక్రియ పంటలు',
            yieldPrediction: 'పంట అంచనా',
            waterRequired: 'అవసరమైన నీరు',
            logout: 'లాగ్అవుట్',
            profile: 'ప్రొఫైల్',
            lastLogin: 'చివరి లాగిన్',
            pmKisan: 'పీఎం-కిసాన్ పథకం',
            applyNow: 'ఇప్పుడే దరఖాస్తు చేయండి',
            eligibility: 'లాభాధికారం',
            government: 'ప్రభుత్వం'
        },
        mr: { // Marathi
            welcome: 'परत आल्याबद्दल स्वागत आहे',
            dashboard: 'डॅशबोर्ड',
            myFarm: 'माझे शेत',
            fertilizer: 'खताच्या शिफारसी',
            weather: 'हवामान अंदाज',
            pest: 'कीटक आणि रोग',
            schemes: 'सरकारी योजना',
            calendar: 'पीक कॅलेंडर',
            analysis: 'पीक विश्लेषण',
            mechanization: 'शेती यंत्रीकरण',
            drought: 'दुष्काळ चेतावणी',
            totalLand: 'एकूण जमीन',
            activeCrops: 'सक्रिय पिके',
            yieldPrediction: 'उत्पादन अंदाज',
            waterRequired: 'आवश्यक पाणी',
            logout: 'लॉग आऊट',
            profile: 'प्रोफाइल',
            lastLogin: 'शेवटची लॉगिन',
            pmKisan: 'पीएम-किसान योजना',
            applyNow: 'आत्ताच अर्ज करा',
            eligibility: 'पात्रता',
            government: 'सरकार'
        },
        gu: { // Gujarati
            welcome: 'પાછા આવવા પર સ્વાગત છે',
            dashboard: 'ડેશબોર્ડ',
            myFarm: 'મારું ખેતર',
            fertilizer: 'ખાતરની ભલામણો',
            weather: 'હવામાન પૂર્વાનુમાન',
            pest: 'કીટકો અને રોગ',
            schemes: 'સરકારી યોજનાઓ',
            calendar: 'પાક કેલેન્ડર',
            analysis: 'પાક વિશ્લેષણ',
            mechanization: 'ખેત યંત્રીકરણ',
            drought: 'દુષ્કાળ ચેતવણી',
            totalLand: 'કુલ જમીન',
            activeCrops: 'સક્રિય પાક',
            yieldPrediction: 'ઉત્પાદન આગાહી',
            waterRequired: 'જરૂરી પાણી',
            logout: 'લોગ આઉટ',
            profile: 'પ્રોફાઇલ',
            lastLogin: 'છેલ્લું લૉગિન',
            pmKisan: 'પીએમ-કિસાન યોજના',
            applyNow: 'હમણાં જ અરજી કરો',
            eligibility: 'પાત્રતા',
            government: 'સરકાર'
        },
        or: { // Odia
            welcome: 'ଫେରି ଆସିବା ପାଇଁ ସ୍ୱାଗତ',
            dashboard: 'ଡାସବୋର୍ଡ',
            myFarm: 'ମୋର କ୍ଷେତ',
            fertilizer: 'ସାରର ପରାମର୍ଶ',
            weather: 'ପାଣିପାଗ ପୂର୍ବାନୁମାନ',
            pest: 'କୀଟ ଏବଂ ରୋଗ',
            schemes: 'ସରକାରୀ ଯୋଜନା',
            calendar: 'ଫସଲ କ୍ୟାଲେଣ୍ଡର',
            analysis: 'ଫସଲ ବିଶ୍ଳେଷଣ',
            mechanization: 'କୃଷି ଯାନ୍ତ୍ରିକରଣ',
            drought: 'ଦୁର୍ଭିକ୍ଷ ସତର୍କତା',
            totalLand: 'ସମୁଦାୟ ଜମି',
            activeCrops: 'ସକ୍ରିୟ ଫସଲ',
            yieldPrediction: 'ଫଳନ ଅନୁମାନ',
            waterRequired: 'ଆବଶ୍ୟକ ପାଣି',
            logout: 'ଲଗଆଉଟ',
            profile: 'ପ୍ରୋଫାଇଲ',
            lastLogin: 'ଶେଷ ଲଗଇନ',
            pmKisan: 'ପିଏମ-କିସାନ ଯୋଜନା',
            applyNow: 'ବର୍ତ୍ତମାନ ଆବେଦନ କରନ୍ତୁ',
            eligibility: 'ଯୋଗ୍ୟତା',
            government: 'ସରକାର'
        },
        bho: { // Bhojpuri
            welcome: 'वापस आवे के स्वागत बा',
            dashboard: 'डैशबोर्ड',
            myFarm: 'हमार खेत',
            fertilizer: 'खाद के सलाह',
            weather: 'मौसम के पूर्वानुमान',
            pest: 'कीड़ा आ रोग',
            schemes: 'सरकारी योजना',
            calendar: 'फसल कैलेंडर',
            analysis: 'फसल बिबेचन',
            mechanization: 'खेती के यंत्रीकरण',
            drought: 'सूखा चेतावनी',
            totalLand: 'कुल जमीन',
            activeCrops: 'सक्रिय फसल',
            yieldPrediction: 'उपज के अनुमान',
            waterRequired: 'जरूरी पानी',
            logout: 'लोग आउट',
            profile: 'प्रोफाइल',
            lastLogin: 'आखिरी लोगिन',
            pmKisan: 'पीएम-किसान योजना',
            applyNow: 'अभी आवेदन करीं',
            eligibility: 'योग्यता',
            government: 'सरकार'
        },
        ml: { // Malayalam
            welcome: 'തിരിച്ചുവന്നതിന് സ്വാഗതം',
            dashboard: 'ഡാഷ്ബോർഡ്',
            myFarm: 'എന്റെ ഫാം',
            fertilizer: 'വള ശുപാർശകൾ',
            weather: 'കാലാവസ്ഥാ പ്രവചനം',
            pest: 'കീടം & രോഗം',
            schemes: 'സർക്കാർ സ്കീമുകൾ',
            calendar: 'ഫസൽ കലണ്ടർ',
            analysis: 'ഫസൽ വിശകലനം',
            mechanization: 'ഫാം യന്ത്രവൽക്കരണം',
            drought: 'വരൾച്ച മുന്നറിയിപ്പ്',
            totalLand: 'മൊത്തം ഭൂമി',
            activeCrops: 'സജീവമായ ഫസലുകൾ',
            yieldPrediction: 'വിളവ് പ്രവചനം',
            waterRequired: 'ആവശ്യമുള്ള വെള്ളം',
            logout: 'ലോഗൗട്ട്',
            profile: 'പ്രൊഫൈൽ',
            lastLogin: 'അവസാന ലോഗിൻ',
            pmKisan: 'പിഎം-കിസാൻ സ്കീം',
            applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കുക',
            eligibility: 'തക്കതായ',
            government: 'സർക്കാർ'
        },
        kn: { // Kannada
            welcome: 'ಮರಳಿ ಬಂದುದಕ್ಕೆ ಸ್ವಾಗತ',
            dashboard: 'ಡ್ಯಾಶ್ಬೋರ್ಡ್',
            myFarm: 'ನನ್ನ ಕೃಷಿ',
            fertilizer: 'ಎರೆಹುಳು ಶಿಫಾರಸುಗಳು',
            weather: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
            pest: 'ಕೀಟ ಮತ್ತು ರೋಗ',
            schemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
            calendar: 'ಪೈರು ಕ್ಯಾಲೆಂಡರ್',
            analysis: 'ಪೈರು ವಿಶ್ಲೇಷಣೆ',
            mechanization: 'ಕೃಷಿ ಯಾಂತ್ರೀಕರಣ',
            drought: 'ಬರ ಎಚ್ಚರಿಕೆ',
            totalLand: 'ಒಟ್ಟು ಭೂಮಿ',
            activeCrops: 'ಸಕ್ರಿಯ ಬೆಳೆಗಳು',
            yieldPrediction: 'ಉತ್ಪಾದನೆ ಊಹೆ',
            waterRequired: 'ಅಗತ್ಯ ನೀರು',
            logout: 'ಲಾಗ್ ಔಟ್',
            profile: 'ಪ್ರೊಫೈಲ್',
            lastLogin: 'ಕೊನೆಯ ಲಾಗಿನ್',
            pmKisan: 'ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆ',
            applyNow: 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
            eligibility: 'ಅರ್ಹತೆ',
            government: 'ಸರ್ಕಾರ'
        }
    };

    const languages = {
        hi: { name: 'हिन्दी', flag: '🇮🇳', native: 'हिंदी' },
        en: { name: 'English', flag: '🇺🇸', native: 'English' },
        ta: { name: 'தமிழ்', flag: '🇮🇳', native: 'தமிழ்' },
        pa: { name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', native: 'ਪੰਜਾਬੀ' },
        bn: { name: 'বাংলা', flag: '🇧🇩', native: 'বাংলা' },
        te: { name: 'తెలుగు', flag: '🇮🇳', native: 'తెలుగు' },
        mr: { name: 'मराठी', flag: '🇮🇳', native: 'मराठी' },
        gu: { name: 'ગુજરાતી', flag: '🇮🇳', native: 'ગુજરાતી' },
        or: { name: 'ଓଡ଼ିଆ', flag: '🇮🇳', native: 'ଓଡ଼ିଆ' },
        bho: { name: 'भोजपुरी', flag: '🇮🇳', native: 'भोजपुरी' },
        ml: { name: 'മലയാളം', flag: '🇮🇳', native: 'മലയാളം' },
        kn: { name: 'ಕನ್ನಡ', flag: '🇮🇳', native: 'ಕನ್ನಡ' }
    };

    useEffect(() => {
        const savedLang = localStorage.getItem('appLanguage');
        if (savedLang && languages[savedLang]) {
            setLanguage(savedLang);
        }
    }, []);

    const changeLanguage = (langCode) => {
        if (languages[langCode]) {
            setLanguage(langCode);
            localStorage.setItem('appLanguage', langCode);
        }
    };

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    const value = {
        language,
        languages,
        changeLanguage,
        t,
        currentLanguage: language,
        translate: t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;