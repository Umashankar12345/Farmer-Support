// backend/routes/voiceRoutes.js
const express = require('express');
const router = express.Router();
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const { TranslationServiceClient } = require('@google-cloud/translate');
const fs = require('fs');
const path = require('path');

// Initialize Google Cloud clients
const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();
const translateClient = new TranslationServiceClient();

// Convert speech to text
router.post('/speech-to-text', async (req, res) => {
  try {
    const { audio, language } = req.body;
    
    const audioBytes = Buffer.from(audio, 'base64');
    
    const audioConfig = {
      content: audioBytes,
    };
    
    const config = {
      encoding: 'MP3',
      sampleRateHertz: 16000,
      languageCode: language || 'hi-IN',
    };
    
    const request = {
      audio: audioConfig,
      config: config,
    };
    
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    
    res.json({ text: transcription });
  } catch (error) {
    console.error('Speech to text error:', error);
    res.status(500).json({ error: 'Speech recognition failed' });
  }
});

// Text to speech
router.post('/text-to-speech', async (req, res) => {
  try {
    const { text, language } = req.body;
    
    const request = {
      input: { text: text },
      voice: {
        languageCode: language || 'hi-IN',
        ssmlGender: 'NEUTRAL'
      },
      audioConfig: { audioEncoding: 'MP3' },
    };
    
    const [response] = await ttsClient.synthesizeSpeech(request);
    
    // Send audio as base64
    const audioContent = response.audioContent.toString('base64');
    
    res.json({ audio: audioContent });
  } catch (error) {
    console.error('Text to speech error:', error);
    res.status(500).json({ error: 'Speech synthesis failed' });
  }
});

// Translate text
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    const request = {
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      targetLanguageCode: targetLanguage,
    };
    
    const [response] = await translateClient.translateText(request);
    
    res.json({ 
      translatedText: response.translations[0].translatedText,
      detectedLanguage: response.translations[0].detectedLanguageCode 
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Language detection
router.post('/detect-language', async (req, res) => {
  try {
    const { text } = req.body;
    
    const request = {
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
      content: text,
    };
    
    const [response] = await translateClient.detectLanguage(request);
    
    res.json({ 
      language: response.languages[0].languageCode,
      confidence: response.languages[0].confidence 
    });
  } catch (error) {
    console.error('Language detection error:', error);
    res.status(500).json({ error: 'Language detection failed' });
  }
});

module.exports = router;