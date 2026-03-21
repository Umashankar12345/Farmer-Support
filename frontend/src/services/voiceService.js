// src/services/voiceService.js
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpeakTTS from 'speak-tts';

// Initialize Text-to-Speech
const speech = new SpeakTTS();

export const initializeVoiceServices = async () => {
  try {
    // Initialize TTS
    await speech.init({
      volume: 1,
      lang: 'hi-IN',
      rate: 1,
      pitch: 1,
      splitSentences: true,
      listeners: {
        onvoiceschanged: (voices) => {
          console.log('Voices available:', voices);
        }
      }
    });
    
    console.log('Voice services initialized');
    return true;
  } catch (error) {
    console.error('Voice initialization error:', error);
    return false;
  }
};

// Voice Recognition Functions
export const startVoiceRecognition = (language = 'hi-IN') => {
  try {
    SpeechRecognition.startListening({
      continuous: true,
      language: language,
      interimResults: true
    });
  } catch (error) {
    console.error('Voice recognition error:', error);
  }
};

export const stopVoiceRecognition = () => {
  SpeechRecognition.stopListening();
};

export const getSupportedLanguages = () => {
  return [
    { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' },
    { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
    { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'en-IN', name: 'English', native: 'English' }
  ];
};

// Text-to-Speech Functions
export const speakText = async (text, language = 'hi-IN') => {
  try {
    await speech.setLanguage(language);
    await speech.setVoice(language); // Auto-select voice for language
    
    speech.speak({
      text: text,
      queue: false,
      listeners: {
        onstart: () => {
          console.log('Speech started');
        },
        onend: () => {
          console.log('Speech ended');
        }
      }
    });
  } catch (error) {
    console.error('Speech error:', error);
    // Fallback to Web Speech API
    fallbackSpeak(text, language);
  }
};

// Fallback using Web Speech API
const fallbackSpeak = (text, language) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
};

// Record Audio
export const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];
    
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    
    mediaRecorder.start();
    
    return new Promise((resolve, reject) => {
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        resolve({ audioBlob, audioUrl });
      });
      
      mediaRecorder.addEventListener("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error('Recording error:', error);
    throw error;
  }
};

export default {
  initializeVoiceServices,
  startVoiceRecognition,
  stopVoiceRecognition,
  speakText,
  startRecording,
  getSupportedLanguages
};