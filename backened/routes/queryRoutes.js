const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { verifyJWT } = require('../middleware/auth');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'gsk_placeholder' });

router.post('/ask', verifyJWT, async (req, res) => {
  try {
    const { query, farmContext, language = 'en' } = req.body;

    // If no real key, return a mock response
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'gsk_placeholder') {
      let advice = `[DEMO MODE] As your Digital Krishi Officer, I've analyzed your query about "${query}". `;
      advice += `For your ${farmContext.crops.join(' & ')} farm in ${farmContext.location}, I recommend checking soil moisture levels. `;
      advice += `Current conditions suggest a high probability of pest activity. Consider a preventive spray of Neem oil.`;
      
      return res.json({ response: advice });
    }

    const systemPrompt = `You are a professional Digital Krishi Officer (Agricultural Advisor). 
    Help the farmer with their query: "${query}". 
    Context: Location ${farmContext.location}, Crops: ${farmContext.crops.join(', ')}.
    Answer concisely in ${language}. Provide specific fertilizer, pest, or crop advice.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      model: 'llama3-8b-8192',
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'AI Query failed', details: error.message });
  }
});

module.exports = router;
