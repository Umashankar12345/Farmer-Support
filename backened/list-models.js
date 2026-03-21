const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

async function listModels() {
    try {
        const response = await axios.get(URL);
        let list = '';
        response.data.models.forEach(m => {
            list += `- ${m.name} (${m.displayName})\n`;
        });
        fs.writeFileSync('authorized_models.txt', list);
        console.log('SUCCESS: Wrote authorized_models.txt');
    } catch (err) {
        console.error('FAILED to list models:', err.response ? err.response.data : err.message);
    }
}

listModels();
