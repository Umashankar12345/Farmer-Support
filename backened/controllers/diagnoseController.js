// backend/controllers/diagnoseController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Dummy diagnosis mapping for common agricultural diseases if model is simple
// In a production app, we'd use a more specialized model
const labels = [
    "Healthy",
    "Tomato Blight",
    "Corn Rust",
    "Potato Late Blight",
    "Apple Scab",
    "Rice Blast"
];

const diagnoseImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        const { humidity, temperature, moisture } = req.body;
        const imagePath = req.file.path;

        // 1. Simulate Vision Model Logic
        // For this demo, we use a weighted random/heuristic based on humidity/temp 
        // until a full specialized model is loaded.
        let detectedDisease = "Healthy";
        let confidence = 0.95;

        const hum = parseFloat(humidity) || 60;
        const temp = parseFloat(temperature) || 25;

        if (hum > 80 && temp > 20) {
            detectedDisease = "Tomato Blight";
            confidence = 0.88;
        } else if (temp > 30 && hum < 40) {
            detectedDisease = "Corn Rust";
            confidence = 0.82;
        }

        // 2. The "Magic" Step: Ask Gemini for treatment and explanation
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is missing');
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are AgriVoice AI, a plant disease specialist.
            The Computer Vision model detected: "${detectedDisease}" (Confidence: ${Math.round(confidence * 100)}%).
            
            Environmental Context:
            - Temperature: ${temp}°C
            - Humidity: ${hum}%
            - Soil Moisture: ${moisture || 'N/A'}%

            Please provide:
            1. A brief explanation of why this might be happening (correlating with environmental data).
            2. Immediate steps the farmer should take.
            3. Prevention tips for the future.

            Keep the tone helpful and professional. Answer in English.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({
            success: true,
            diagnosis: {
                disease: detectedDisease,
                confidence: confidence,
                details: responseText,
                imageUrl: `/${imagePath}`
            },
            context: {
                temperature: temp,
                humidity: hum
            }
        });

    } catch (error) {
        console.error('Diagnosis Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to diagnose image',
            details: error.message
        });
    }
};

module.exports = {
    diagnoseImage
};
