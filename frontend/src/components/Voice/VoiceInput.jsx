import React, { useState, useContext, useEffect } from 'react';
import { VoiceContext } from '../../contexts/VoiceContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Volume2, 
  Settings,
  Globe,
  Clock,
  Copy,
  Check
} from 'lucide-react';

const VoiceInput = ({ onSend, disabled }) => {
  const { 
    isRecording, 
    transcript, 
    startRecording, 
    stopRecording, 
    speakText 
  } = useContext(VoiceContext);
  
  const { currentLanguage, translate } = useContext(LanguageContext);
  const [inputText, setInputText] = useState('');
  const [voiceHistory, setVoiceHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' }
  ];

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(currentLanguage);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setVoiceHistory(prev => [
        {
          text: inputText,
          language: currentLanguage,
          timestamp: new Date().toLocaleTimeString(),
          type: 'sent'
        },
        ...prev.slice(0, 9)
      ]);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakTranscript = () => {
    if (inputText) {
      speakText(inputText, currentLanguage);
    }
  };

  return (
    <div className="voice-input-container">
      <div className="input-header">
        <div className="language-selector">
          <Globe size={16} />
          <select 
            value={currentLanguage}
            onChange={(e) => {}}
            className="lang-select"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="header-actions">
          <button 
            className="history-btn"
            onClick={() => setShowHistory(!showHistory)}
            title="Voice history"
          >
            <Clock size={18} />
          </button>
          <button className="settings-btn" title="Voice settings">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="input-area">
        <div className="textarea-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or speak your message..."
            className="voice-textarea"
            rows="3"
            disabled={disabled}
          />
          
          <div className="textarea-actions">
            <button
              onClick={speakTranscript}
              disabled={!inputText}
              className="action-btn"
              title="Speak text"
            >
              <Volume2 size={18} />
            </button>
            <button
              onClick={() => copyToClipboard(inputText)}
              disabled={!inputText}
              className="action-btn"
              title="Copy text"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <div className="voice-controls">
          <button
            className={`voice-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceToggle}
            disabled={disabled}
            title={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? (
              <>
                <MicOff size={20} />
                <span className="recording-text">Recording...</span>
                <div className="pulse-dot"></div>
              </>
            ) : (
              <>
                <Mic size={20} />
                <span>Voice Input</span>
              </>
            )}
          </button>
          
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!inputText.trim() || disabled}
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {showHistory && voiceHistory.length > 0 && (
        <div className="voice-history">
          <div className="history-header">
            <h4>Voice History</h4>
            <button 
              className="close-history"
              onClick={() => setShowHistory(false)}
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="history-list">
            {voiceHistory.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-text">{item.text}</div>
                <div className="history-meta">
                  <span className="history-lang">{item.language.toUpperCase()}</span>
                  <span className="history-time">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .voice-input-container {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 2px solid #e5e7eb;
          transition: border-color 0.3s ease;
        }
        
        .voice-input-container:focus-within {
          border-color: #3b82f6;
        }
        
        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .language-selector {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .lang-select {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background: white;
          font-size: 14px;
          cursor: pointer;
        }
        
        .header-actions {
          display: flex;
          gap: 10px;
        }
        
        .history-btn, .settings-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #f3f4f6;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .history-btn:hover, .settings-btn:hover {
          background: #e5e7eb;
        }
        
        .input-area {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .textarea-container {
          position: relative;
        }
        
        .voice-textarea {
          width: 100%;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          line-height: 1.5;
          resize: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        
        .voice-textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }
        
        .voice-textarea:disabled {
          background: #f9fafb;
          cursor: not-allowed;
        }
        
        .textarea-actions {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 8px;
        }
        
        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover:not(:disabled) {
          background: #f3f4f6;
          transform: scale(1.05);
        }
        
        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .voice-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .voice-btn {
          flex: 1;
          padding: 14px 24px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
        }
        
        .voice-btn:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
        }
        
        .voice-btn.recording {
          background: #dc2626;
          animation: pulse 2s infinite;
        }
        
        .voice-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        .recording-text {
          font-weight: 500;
        }
        
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .send-btn {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: #10b981;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .send-btn:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-1px);
        }
        
        .send-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        .voice-history {
          margin-top: 20px;
          border-top: 2px solid #f3f4f6;
          padding-top: 15px;
        }
        
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .history-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }
        
        .close-history {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #f3f4f6;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .close-history:hover {
          background: #e5e7eb;
        }
        
        .history-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .history-item {
          background: #f9fafb;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #e5e7eb;
        }
        
        .history-text {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        
        .history-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .history-lang {
          font-size: 12px;
          background: #dbeafe;
          color: #1e40af;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }
        
        .history-time {
          font-size: 12px;
          color: #9ca3af;
        }
        
        @media (max-width: 640px) {
          .voice-controls {
            flex-direction: column;
          }
          
          .send-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceInput;