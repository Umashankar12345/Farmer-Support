// src/services/languageDetector.js

// Indian language codes mapping
export const INDIAN_LANGUAGES = {
  'hi': { name: 'Hindi', native: 'हिंदी', voiceCode: 'hi-IN' },
  'ta': { name: 'Tamil', native: 'தமிழ்', voiceCode: 'ta-IN' },
  'te': { name: 'Telugu', native: 'తెలుగు', voiceCode: 'te-IN' },
  'kn': { name: 'Kannada', native: 'ಕನ್ನಡ', voiceCode: 'kn-IN' },
  'ml': { name: 'Malayalam', native: 'മലയാളം', voiceCode: 'ml-IN' },
  'bn': { name: 'Bengali', native: 'বাংলা', voiceCode: 'bn-IN' },
  'gu': { name: 'Gujarati', native: 'ગુજરાતી', voiceCode: 'gu-IN' },
  'mr': { name: 'Marathi', native: 'मराठी', voiceCode: 'mr-IN' },
  'pa': { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', voiceCode: 'pa-IN' },
  'or': { name: 'Odia', native: 'ଓଡ଼ିଆ', voiceCode: 'or-IN' },
  'as': { name: 'Assamese', native: 'অসমীয়া', voiceCode: 'as-IN' },
  'mai': { name: 'Maithili', native: 'मैथिली', voiceCode: 'hi-IN' },
  'sat': { name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', voiceCode: 'sat-IN' },
  'ks': { name: 'Kashmiri', native: 'کٲشُر', voiceCode: 'ks-IN' },
  'ne': { name: 'Nepali', native: 'नेपाली', voiceCode: 'ne-IN' },
  'sd': { name: 'Sindhi', native: 'सिन्धी', voiceCode: 'sd-IN' },
  'kok': { name: 'Konkani', native: 'कोंकणी', voiceCode: 'kok-IN' },
  'doi': { name: 'Dogri', native: 'डोगरी', voiceCode: 'doi-IN' },
  'mni': { name: 'Manipuri', native: 'মৈতৈলোন্', voiceCode: 'mni-IN' },
  'bho': { name: 'Bhojpuri', native: 'भोजपुरी', voiceCode: 'hi-IN' }, // Using Hindi as fallback
  'awa': { name: 'Awadhi', native: 'अवधी', voiceCode: 'hi-IN' },
  'raj': { name: 'Rajasthani', native: 'राजस्थानी', voiceCode: 'hi-IN' }
};

// Simple language detection based on common words
export const detectLanguage = (text) => {
  if (!text) return 'en';
  
  const textLower = text.toLowerCase();
  
  // Hindi detection
  if (/[\u0900-\u097F]/.test(text) || 
      textLower.includes('क्या') || textLower.includes('है') || 
      textLower.includes('में') || textLower.includes('के')) {
    return 'hi';
  }
  
  // Tamil detection
  if (/[\u0B80-\u0BFF]/.test(text) || 
      textLower.includes('என்ன') || textLower.includes('எப்படி') || 
      textLower.includes('நன்றி')) {
    return 'ta';
  }
  
  // Telugu detection
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
  
  // Kannada detection
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
  
  // Bengali detection
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  
  // Gujarati detection
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
  
  // Marathi detection
  if (/[\u0900-\u097F]/.test(text) && 
      (textLower.includes('आहे') || textLower.includes('मी'))) {
    return 'mr';
  }
  
  // Punjabi detection
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';
  
  // Malayalam detection
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
  
  // Odia detection
  if (/[\u0B00-\u0B7F]/.test(text)) return 'or';
  
  // For Roman script - detect based on common words
  if (textLower.includes('kaise') || textLower.includes('kyon')) return 'hi';
  if (textLower.includes('eppadi') || textLower.includes('enna')) return 'ta';
  if (textLower.includes('ela') || textLower.includes('enduku')) return 'te';
  if (textLower.includes('hege') || textLower.includes('yake')) return 'kn';
  if (textLower.includes('kemon') || textLower.includes('keno')) return 'bn';
  if (textLower.includes('kem') || textLower.includes('shu')) return 'gu';
  if (textLower.includes('kas') || textLower.includes('kaay')) return 'mr';
  
  return 'en'; // Default to English
};