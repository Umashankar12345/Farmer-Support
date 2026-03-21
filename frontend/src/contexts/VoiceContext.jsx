import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import {
  initializeVoiceServices,
  startVoiceRecognition,
  stopVoiceRecognition,
  speakText,
  getSupportedLanguages
} from '../services/voiceService';

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoiceLanguage, setSelectedVoiceLanguage] = useState('hi-IN');
  const { currentLanguage } = useLanguage();

  // Initialize voice services on component mount
  useEffect(() => {
    const initVoice = async () => {
      const success = await initializeVoiceServices();
      if (success) {
        console.log('Voice services initialized successfully');
      }
    };
    initVoice();
  }, []);


  // Language to voice code mapping
  const languageToVoiceMap = {
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'pa': 'pa-IN',
    'en': 'en-IN'
  };

  const toggleVoiceAssistant = useCallback(() => {
    if (isVoiceActive) {
      // Stop voice recognition and cleanup
      stopVoiceRecognition();
      setIsVoiceActive(false);
      setIsListening(false);
      setTranscript('');
      setAiResponse('');
    } else {
      // Start voice assistant with current language
      const voiceCode = languageToVoiceMap[currentLanguage] || 'hi-IN';
      setSelectedVoiceLanguage(voiceCode);
      setIsVoiceActive(true);
    }
  }, [isVoiceActive, currentLanguage]);

  const startListening = useCallback(() => {
    try {
      const voiceCode = languageToVoiceMap[currentLanguage] || 'hi-IN';
      setSelectedVoiceLanguage(voiceCode);

      startVoiceRecognition(voiceCode);
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  }, [currentLanguage]);

  const stopListening = useCallback(() => {
    stopVoiceRecognition();
    setIsListening(false);
  }, []);

  const handleSpeakResponse = useCallback(async (text) => {
    if (!text.trim()) return;

    setIsSpeaking(true);
    try {
      const voiceCode = languageToVoiceMap[currentLanguage] || 'hi-IN';
      await speakText(text, voiceCode);
    } catch (error) {
      console.error('Error speaking text:', error);
    } finally {
      setIsSpeaking(false);
    }
  }, [currentLanguage]);

  const handleQuerySubmit = useCallback(async (query, isVoiceQuery = false) => {
    if (!query.trim()) return;

    // Show the query as processing
    const processingMessages = {
      'hi': 'आपकी क्वेरी प्रोसेस हो रही है...',
      'ta': 'உங்கள் வினவல் செயலாக்கம் செய்யப்படுகிறது...',
      'pa': 'ਤੁਹਾਡੀ ਕੁਵੈਰੀ ਪ੍ਰੋਸੈਸ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
      'en': 'Processing your query...'
    };

    setAiResponse(processingMessages[currentLanguage] || 'Processing your query...');

    try {
      // Call backend API with Gemini (Now using the optimized /ask endpoint)
      const response = await fetch('http://localhost:5001/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query,
          language: currentLanguage
        }),
      });

      const data = await response.json();

      let aiText = '';
      if (data.success) {
        aiText = data.response;
      } else {
        throw new Error(data.error || 'Failed to get response');
      }

      setAiResponse(aiText);

      // Speak the response if it was a voice query
      if (isVoiceQuery) {
        await handleSpeakResponse(aiText);
      }

    } catch (error) {
      console.error('Error processing query:', error);
      const errorMessages = {
        'hi': 'क्षमा करें, आपकी क्वेरी प्रोसेस करते समय त्रुटि हुई। कृपया पुनः प्रयास करें।',
        'ta': 'மன்னிக்கவும், உங்கள் வினவலைச் செயலாக்கும் போது பிழை ஏற்பட்டது. தயவு செய்து மீண்டும் முயற்சிக்கவும்.',
        'pa': 'ਮਾਫ਼ ਕਰਨਾ, ਤੁਹਾਡੀ ਕੁਵੈਰੀ ਪ੍ਰੋਸੈਸ ਕਰਨ ਸਮੇਂ ਗਲਤੀ ਆਈ. ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
        'en': 'Sorry, I encountered an error processing your query. Please try again.'
      };
      setAiResponse(errorMessages[currentLanguage] || 'Sorry, I encountered an error. Please try again.');
    }
  }, [currentLanguage, handleSpeakResponse]);

  const getAvailableLanguages = useCallback(() => {
    return getSupportedLanguages();
  }, []);

  const value = {
    isVoiceActive,
    isListening,
    isSpeaking,
    transcript,
    aiResponse,
    currentLanguage,
    selectedVoiceLanguage,
    toggleVoiceAssistant,
    startListening,
    stopListening,
    setTranscript,
    setAiResponse,
    handleQuerySubmit,
    handleSpeakResponse,
    getAvailableLanguages,
    languageToVoiceMap
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within VoiceProvider');
  }
  return context;
};