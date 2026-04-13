import axios from 'axios';

export async function sendToGroq({ query, farmContext, language }) {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('krishi_jwt');
    const { data } = await axios.post('/api/query/ask', {
      query,
      farmContext,
      language: language || 'en',
      model: 'llama3-8b-8192' 
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.response;
  } catch (err) {
    console.error('Groq service error:', err);
    // Return a fallback response for demo purposes if backend isn't ready
    return "I'm currently processing your request. As an AI Digital Krishi Officer, I recommend checking your soil moisture before applying any concentrated Nitrogen fertilizer.";
  }
}
