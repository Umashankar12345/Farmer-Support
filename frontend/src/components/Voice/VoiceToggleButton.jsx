import React from 'react';
import { Mic } from 'lucide-react';
import { useVoice } from '../../contexts/VoiceContext';
import './VoiceToggleButton.css';

const VoiceToggleButton = () => {
  const { isVoiceActive, toggleVoiceAssistant } = useVoice();

  return (
    <button
      className={`voice-toggle-btn ${isVoiceActive ? 'active' : ''}`}
      onClick={toggleVoiceAssistant}
      aria-label={isVoiceActive ? 'Close voice assistant' : 'Open voice assistant'}
      title="AgriVoice Assistant"
    >
      <Mic size={20} />
      {isVoiceActive ? 'Close' : 'AgriVoice'}
    </button>
  );
};

export default VoiceToggleButton;