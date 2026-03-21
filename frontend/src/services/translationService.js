// src/services/translationService.js

// Mock translation service - In production, use Google Translate API
export const translateText = async (text, targetLang) => {
  if (targetLang === 'en') return text;
  
  // Mock translations for common agricultural terms
  const agriculturalDictionary = {
    // Hindi translations
    'hi': {
      'rice': 'चावल',
      'wheat': 'गेहूं',
      'paddy': 'धान',
      'fertilizer': 'उर्वरक',
      'irrigation': 'सिंचाई',
      'pest': 'कीट',
      'disease': 'रोग',
      'yield': 'उपज',
      'soil': 'मिट्टी',
      'water': 'पानी',
      'cost': 'लागत',
      'price': 'मूल्य',
      'how to grow': 'कैसे उगाएं',
      'best season': 'सबसे अच्छा मौसम',
      'profit': 'लाभ'
    },
    // Tamil translations
    'ta': {
      'rice': 'அரிசி',
      'wheat': 'கோதுமை',
      'paddy': 'நெல்',
      'fertilizer': 'உரம்',
      'irrigation': 'பாசனம்',
      'pest': 'பூச்சி',
      'disease': 'நோய்',
      'yield': 'மகசூல்',
      'soil': 'மண்',
      'water': 'நீர்',
      'cost': 'செலவு',
      'price': 'விலை',
      'how to grow': 'எப்படி வளர்ப்பது',
      'best season': 'சிறந்த பருவம்',
      'profit': 'லாபம்'
    },
    // Telugu translations
    'te': {
      'rice': 'బియ్యం',
      'wheat': 'గోధుమ',
      'paddy': 'వరి',
      'fertilizer': 'ఎరువు',
      'irrigation': 'నీటిపారుదల',
      'pest': 'పురుగు',
      'disease': 'రోగం',
      'yield': 'పంట',
      'soil': 'నేల',
      'water': 'నీరు',
      'cost': 'ఖర్చు',
      'price': 'ధర',
      'how to grow': 'ఎలా పెంచాలి',
      'best season': 'ఉత్తమ సీజన్',
      'profit': 'లాభం'
    },
    // More languages...
  };
  
  // Simple word-by-word translation for demo
  let translated = text;
  const dict = agriculturalDictionary[targetLang];
  
  if (dict) {
    Object.keys(dict).forEach(key => {
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      translated = translated.replace(regex, dict[key]);
    });
  }
  
  return translated || text;
};

// For production, use actual Google Translate API
export const translateWithGoogle = async (text, targetLang) => {
  try {
    // Note: You need to enable Google Cloud Translate API and get API key
    const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: 'text'
        })
      }
    );
    
    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
};