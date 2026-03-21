import React, { useState, useEffect, useRef } from 'react';
import { useVoice } from '../../contexts/VoiceContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Mic, MicOff, X, Send, Volume2, VolumeX,
  Globe, Check, Sparkles, MessageSquare,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const {
    isVoiceActive,
    isListening,
    isSpeaking,
    transcript,
    aiResponse,
    toggleVoiceAssistant,
    startListening,
    stopListening,
    setTranscript,
    handleQuerySubmit,
    handleSpeakResponse,
    getAvailableLanguages,
    languageToVoiceMap,
    currentLanguage
  } = useVoice();

  const { languages, changeLanguage } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiResponse, transcript, isTyping]);

  if (!isVoiceActive) return null;

  const handleStartListening = () => {
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
  };

  const handleTextSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsTyping(true);
    await handleQuerySubmit(inputText, false);
    setIsTyping(false);
    setInputText('');
  };

  const handleSuggestionClick = async (suggestion) => {
    setIsTyping(true);
    await handleQuerySubmit(suggestion, false);
    setIsTyping(false);
  };

  const suggestions = {
    hi: ['धान की खेती कैसे करें?', 'आज का मौसम क्या है?', 'पेस्ट कंट्रोल टिप्स'],
    en: ['How to grow rice?', 'What is the weather today?', 'Pest control tips'],
    ta: ['நெல் வளர்ப்பது எப்படி?', 'இன்றைய வானிலை என்ன?', 'பூச்சி கட்டுப்பாடு குறிப்புகள்'],
    pa: ['ਚਾਵਲ ਕਿਵੇਂ ਉਗਾਈਏ?', 'ਅੱਜ ਦਾ ਮੌਸਮ ਕੀ ਹੈ?', 'ਕੀੜੇ ਕੰਟਰੋਲ ਸੁਝਾਅ']
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="voice-assistant-overlay"
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="voice-assistant-modal glass-morphism"
      >
        {/* Header */}
        <div className="voice-header">
          <div className="header-info">
            <div className="ai-badge">
              <Sparkles size={14} className="text-amber-400" />
              <span>AgriVoice AI</span>
            </div>
            <h3>Expert Assistant</h3>
          </div>

          <div className="header-actions">
            <button
              className="lang-toggle-btn"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <Globe size={18} />
              <span>{languages[currentLanguage]?.name}</span>
            </button>

            <button className="close-btn" onClick={toggleVoiceAssistant}>
              <X size={20} />
            </button>
          </div>

          <AnimatePresence>
            {showLanguageMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="language-dropdown glass-morphism"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    className={`lang-option ${currentLanguage === code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(code);
                      setShowLanguageMenu(false);
                    }}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                    {currentLanguage === code && <Check size={14} className="ml-auto" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat Area */}
        <div className="chat-area custom-scrollbar">
          <div className="welcome-msg">
            <div className="bot-icon">👨‍🌾</div>
            <p>
              {currentLanguage === 'hi' ? 'नमस्ते! मैं आपका एग्रीवॉइस असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?' :
                currentLanguage === 'ta' ? 'வணக்கம்! நான் உங்கள் அக்ரிவாய்ஸ் உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?' :
                  'Hello! I am your AgriVoice assistant. How can I help you today?'}
            </p>
          </div>

          {/* Transcript / User Message */}
          {transcript && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="user-msg"
            >
              <p>{transcript}</p>
            </motion.div>
          )}

          {/* AI Response Message */}
          {aiResponse && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="ai-msg"
            >
              <div className="ai-msg-header">
                <MessageSquare size={14} />
                <span>AgriVoice Response</span>
                <button
                  className={`speak-btn ${isSpeaking ? 'active' : ''}`}
                  onClick={() => handleSpeakResponse(aiResponse)}
                >
                  {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
              <p>{aiResponse}</p>
            </motion.div>
          )}

          {/* Thinking Indicator */}
          {isTyping && (
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        {!transcript && !aiResponse && !isTyping && (
          <div className="suggestions-container">
            <p className="suggest-title flex items-center gap-2">
              <ArrowRight size={14} />
              {currentLanguage === 'hi' ? 'कोशिश करें:' : 'Try asking:'}
            </p>
            <div className="suggestion-chips">
              {(suggestions[currentLanguage] || suggestions.en).map((s, i) => (
                <button
                  key={i}
                  className="suggest-chip"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Controls */}
        <div className="voice-footer">
          <div className="input-wrapper glass-morphism">
            <form onSubmit={handleTextSubmit} className="text-input-form">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={currentLanguage === 'hi' ? 'यहाँ अपना प्रश्न लिखें...' : 'Type your question here...'}
                disabled={isTyping}
              />
              <button type="submit" className="send-btn" disabled={!inputText.trim() || isTyping}>
                <Send size={18} />
              </button>
            </form>

            <div className="divider"></div>

            <button
              className={`mic-toggle-btn ${isListening ? 'listening' : ''}`}
              onClick={isListening ? handleStopListening : handleStartListening}
              disabled={isTyping}
            >
              {isListening ? (
                <div className="listening-state">
                  <div className="audio-bars">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <MicOff size={20} />
                </div>
              ) : (
                <Mic size={20} />
              )}
            </button>
          </div>

          {isListening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="listening-hint"
            >
              {currentLanguage === 'hi' ? 'मैं सुन रहा हूँ...' : 'Listening...'}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceAssistant;