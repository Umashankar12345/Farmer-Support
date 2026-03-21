const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-pro'; // Try the most basic model
const URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;

async function test() {
    console.log('Testing Gemini API (Direct Axios V1) with key: ' + (API_KEY ? 'EXISTS' : 'NOT FOUND'));
    try {
        const response = await axios.post(URL, {
            contents: [{ parts: [{ text: 'Hi' }] }]
        });
        console.log('Gemini Response:', response.data.candidates[0].content.parts[0].text);
        console.log('SUCCESS: API Key is valid and direct call to V1 works.');
    } catch (err) {
        console.error('FAILED: Gemini API error:', err.response ? err.response.data : err.message);
    }
}

test();
