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

    const systemInstruction = `
      You are AgriVoice AI, an expert agricultural officer assisting farmers in ${detectedLocation}, India.
      - Provide practical, localized agricultural advice for crops, pests, soil, weather, and mandi prices in ${detectedLocation}.
      - Language: ${language}
      - Context Crops: ${(farmContext?.crops || []).join(', ')}
      - Use clear markdown formatting (bold headers, bullet points).
      - Keep answers concise, factual, and actionable.
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel(
      { 
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction 
      },
      { apiVersion: 'v1beta' }
    );

    // Map the messages to the expected format
    const mappedHistory = (chatHistory || [])
      .filter((msg, index) => !(index === 0 && msg.role === 'ai')) // skip the default UI greeting
      .filter(msg => msg.role !== 'system' && msg.text && !msg.text.includes("encountered an error"))
      .map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

    // Strictly enforce alternating user/model sequence
    const formattedHistory = [];
    for (const msg of mappedHistory) {
      if (formattedHistory.length === 0) {
        if (msg.role === "user") formattedHistory.push(msg);
      } else {
        const lastRole = formattedHistory[formattedHistory.length - 1].role;
        if (msg.role !== lastRole) {
          formattedHistory.push(msg);
        } else {
          // If two of the same role appear sequentially, overwrite the last one
          formattedHistory[formattedHistory.length - 1] = msg;
        }
      }
    }

    // History MUST end with 'model' so the next sendMessage (which is 'user') is valid
    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === "user") {
      formattedHistory.pop();
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(query);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error("DETAILED GEMINI ERROR:", error.message || error);
    res.status(500).json({ 
      error: error.message || "Server Error",
      response: `⚠️ **Detailed Diagnostic Error:** ${String(error)}`
    });
  }
});

module.exports = router;
