// Voice Recorder Utility
class VoiceRecorder {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.transcript = '';
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onEndCallback = null;
  }

  init(language = 'en-US') {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      throw new Error('Speech recognition not supported in this browser');
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.lang = language;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.continuous = false;

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      this.transcript = transcript;
      
      if (this.onResultCallback) {
        this.onResultCallback(transcript, event);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording = false;
      
      if (this.onErrorCallback) {
        this.onErrorCallback(event);
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      
      if (this.onEndCallback) {
        this.onEndCallback(this.transcript);
      }
    };

    return this;
  }

  start() {
    if (this.recognition && !this.isRecording) {
      try {
        this.recognition.start();
        this.isRecording = true;
        this.transcript = '';
        return true;
      } catch (error) {
        console.error('Failed to start recording:', error);
        return false;
      }
    }
    return false;
  }

  stop() {
    if (this.recognition && this.isRecording) {
      try {
        this.recognition.stop();
        this.isRecording = false;
        return true;
      } catch (error) {
        console.error('Failed to stop recording:', error);
        return false;
      }
    }
    return false;
  }

  abort() {
    if (this.recognition) {
      this.recognition.abort();
      this.isRecording = false;
    }
  }

  setLanguage(language) {
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  setContinuous(continuous) {
    if (this.recognition) {
      this.recognition.continuous = continuous;
    }
  }

  setInterimResults(interim) {
    if (this.recognition) {
      this.recognition.interimResults = interim;
    }
  }

  onResult(callback) {
    this.onResultCallback = callback;
    return this;
  }

  onError(callback) {
    this.onErrorCallback = callback;
    return this;
  }

  onEnd(callback) {
    this.onEndCallback = callback;
    return this;
  }

  getTranscript() {
    return this.transcript;
  }

  clearTranscript() {
    this.transcript = '';
  }

  isAvailable() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  getAvailableLanguages() {
    const languages = [
      { code: 'en-US', name: 'English (US)' },
      { code: 'en-GB', name: 'English (UK)' },
      { code: 'hi-IN', name: 'Hindi (India)' },
      { code: 'ta-IN', name: 'Tamil (India)' },
      { code: 'te-IN', name: 'Telugu (India)' },
      { code: 'es-ES', name: 'Spanish' },
      { code: 'fr-FR', name: 'French' }
    ];
    return languages;
  }
}

// Voice Synthesis Utility
class VoiceSynthesis {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voices = [];
    this.currentUtterance = null;
    this.onStartCallback = null;
    this.onEndCallback = null;
    this.onErrorCallback = null;

    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synthesis.getVoices();
    
    if (this.voices.length === 0) {
      setTimeout(() => this.loadVoices(), 100);
    }
  }

  speak(text, options = {}) {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options.rate || 0.8;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || 'en-US';
    
    // Set voice if specified
    if (options.voice) {
      const voice = this.voices.find(v => v.name === options.voice);
      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.onstart = () => {
      if (this.onStartCallback) {
        this.onStartCallback();
      }
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      if (this.onErrorCallback) {
        this.onErrorCallback(event);
      }
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
    
    return utterance;
  }

  stop() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  pause() {
    if (this.synthesis.speaking) {
      this.synthesis.pause();
    }
  }

  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  isSpeaking() {
    return this.synthesis.speaking;
  }

  isPaused() {
    return this.synthesis.paused;
  }

  getVoices() {
    return this.voices;
  }

  getVoiceByLanguage(lang) {
    return this.voices.find(voice => voice.lang.startsWith(lang));
  }

  setRate(rate) {
    if (this.currentUtterance) {
      this.currentUtterance.rate = rate;
    }
  }

  setPitch(pitch) {
    if (this.currentUtterance) {
      this.currentUtterance.pitch = pitch;
    }
  }

  setVolume(volume) {
    if (this.currentUtterance) {
      this.currentUtterance.volume = volume;
    }
  }

  onStart(callback) {
    this.onStartCallback = callback;
    return this;
  }

  onEnd(callback) {
    this.onEndCallback = callback;
    return this;
  }

  onError(callback) {
    this.onErrorCallback = callback;
    return this;
  }
}

// Export utilities
export {
  VoiceRecorder,
  VoiceSynthesis
};