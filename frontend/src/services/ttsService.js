// src/services/ttsService.js

export const speakText = (text, language = 'hi-IN') => {
  if ('speechSynthesis' in window) {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language and voice
    utterance.lang = language;
    
    // Try to find Indian language voice
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang.startsWith(language.split('-')[0]) || 
      voice.name.includes('India')
    );
    
    if (indianVoice) {
      utterance.voice = indianVoice;
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
    }
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
    
    return true;
  }
  return false;
};

// Initialize voices
export const loadVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};

// Get available Indian language voices
export const getIndianVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => 
    voice.lang.includes('IN') || 
    ['hi', 'ta', 'te', 'kn', 'ml', 'bn', 'gu', 'mr', 'pa'].some(lang => 
      voice.lang.startsWith(lang)
    )
  );
};