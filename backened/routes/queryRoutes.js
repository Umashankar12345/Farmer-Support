const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { verifyJWT } = require('../middleware/auth');

router.post('/ask', verifyJWT, async (req, res) => {
  try {
    const { query, farmContext, language = 'en', chatHistory = [] } = req.body;
    let detectedLocation = farmContext?.location || 'Rajasthan';
    
    // Check if GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'gsk_placeholder') {
       return res.status(500).json({ 
         error: "AI Config Error", 
         response: "Warning: GEMINI_API_KEY is missing in backend .env file. Please add it to use the AI advisory." 
       });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `
      You are AgriVoice AI, an expert agricultural officer assisting farmers in ${detectedLocation}, India.
      - Provide practical, localized agricultural advice for crops, pests, soil, weather, and mandi prices in ${detectedLocation}.
      - Language: ${language}
      - Context Crops: ${(farmContext?.crops || []).join(', ')}
      - Use clear markdown formatting (bold headers, bullet points).
      - Keep answers concise, factual, and actionable.
    `;

    // Filter chat history to ensure correct format for Gemini and exclude system messages
    const formattedHistory = chatHistory
      .filter(msg => msg.role !== 'system' && msg.text) // Remove empty or invalid messages
      .map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemInstruction }],
        },
        {
          role: "model",
          parts: [{ text: `Understood. I am online and configured for ${detectedLocation}.` }],
        },
        ...formattedHistory,
      ],
    });

    const result = await chat.sendMessage(query);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "AI Advisory service is currently offline. Please try again.", 
      response: "⚠️ **Service Notice:** Unable to reach AI servers. Please check your configuration and API key." 
    });
  }
});

module.exports = router;
