// backend/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Helper: try multiple models until one works
// Helper: try a reliable model
async function askGemini(prompt) {
    const modelName = 'gemini-1.5-flash';

    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is missing in .env');
    }

    try {
        console.log(`[Gemini] Requesting: ${modelName}`);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(`[Gemini] Success: ${text.substring(0, 50)}...`);
        return text;
    } catch (err) {
        console.error(`[Gemini CRITICAL ERROR]`, err);
        throw err;
    }
}

// ========= POST /api/ai/chat (legacy) =========
router.post('/chat', async (req, res) => {
    try {
        const { query, language } = req.body;

        const prompt = `You are an expert agriculture assistant named 'AgriVoice'. 
    Answer the following question in ${language || 'English'} language. 
    Keep the answer concise (under 50 words) and helpful for a farmer.
    Question: ${query}`;

        const text = await askGemini(prompt);
        console.log(`Gemini response for "${query}": ${text}`);

        res.json({
            success: true,
            response: text
        });
    } catch (error) {
        console.error('Gemini API error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to get response from AI',
            details: error.message
        });
    }
});

// ========= POST /api/ai/ask (new farmer-optimized) =========
router.post('/ask', async (req, res) => {
    try {
        const { question, language } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Question is required'
            });
        }

        const prompt = `
You are AgriVoiceChat, an expert agriculture AI assistant.

Rules:
- Give simple answers a farmer can understand.
- Use practical, actionable advice.
- Avoid technical jargon.
- Keep answers under 150 words.
- Give step-by-step solutions when appropriate.
- If the question is about weather, mention checking local forecasts.
- Answer in ${language || 'English'} language.

Farmer Question:
${question}
`;

        const text = await askGemini(prompt);
        console.log(`[AgriVoiceChat] Q: "${question}" → A: ${text.substring(0, 100)}...`);

        res.json({
            success: true,
            response: text,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[AgriVoiceChat] Gemini API error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to get AI response. Please try again.',
            details: error.message
        });
    }
});

module.exports = router;
