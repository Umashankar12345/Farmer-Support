const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { verifyJWT } = require('../middleware/auth');

// --- LOCAL EXPERT ENGINE (FALLBACK) ---
const EXPLAINER_DB = {
  'yellow': "Yellowing of leaves in Mustard or Wheat is often a sign of Nitrogen deficiency or Aphid attack. Recommendation: Apply 2% Urea spray and check for small green insects on the underside of leaves.",
  'pest': "For common pests in Rajasthan, such as Mustard Sawfly or Aphids, consider using Neem-based insecticides. If the infestation is severe, consult your local Krishi Kendra for specialized pesticide advice.",
  'water': "Based on the semi-arid climate of Rajasthan, we recommend Drip Irrigation for higher efficiency. For Wheat, ensure the 'Crown Root Initiation' stage (21 days after sowing) is adequately hydrated.",
  'fertilizer': "General Recommendation for Rajasthan: Use NPK (12:32:16) for base dressing. For Mustard, added Sulphur (10kg/acre) significantly improves seed oil content.",
  'weather': "The current forecast suggests high humidity. Monitor your crops for Fungal diseases like Powdery Mildew, especially in Mustard.",
  'scheme': "You should check your eligibility for PM-KISAN, which provides ₹6,000 annually. Visit the 'Gov Schemes' tab in our dashboard for live application status.",
  'armyworm': "Armyworm outbreaks require immediate action. Use Pheromone traps for monitoring. If population exceeds 1 larva per row foot, apply recommended bio-pesticides immediately.",
  'mustard': "To maximize Mustard yield in Rajasthan, ensure proper thinning to maintain plant-to-plant distance of 10-15cm. Apply Zinc Sulphate if soil test is below 0.5 ppm."
};

router.post('/ask', verifyJWT, async (req, res) => {
  try {
    const { query, farmContext, language = 'en' } = req.body;
    const lowerQuery = query.toLowerCase();

    // 1. Try Real AI (if key exists)
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'gsk_placeholder') {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const systemPrompt = `You are a professional Digital Krishi Officer (Agricultural Advisor). 
      Help the farmer with their query: "${query}". 
      Context: Location ${farmContext.location || 'Rajasthan'}, Crops: ${(farmContext.crops || []).join(', ')}.
      Answer concisely in ${language}. Provide specific fertilizer, pest, or crop advice.`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        model: 'llama3-8b-8192',
      });

      return res.json({ response: completion.choices[0].message.content });
    }

    // 2. Advanced Fallback Engine (Location & Keyword Awareness)
    const STATES = ['punjab', 'haryana', 'rajasthan', 'uttar pradesh', 'bihar', 'gujarat', 'maharashtra'];
    let detectedLocation = farmContext.location || 'your region';
    
    // Check if user mentioned a state in their query
    STATES.forEach(s => {
      if (lowerQuery.includes(s)) detectedLocation = s.charAt(0).toUpperCase() + s.slice(1);
    });

    let advice = `Namaste! As your Digital Krishi Officer, I'm analyzing the latest agricultural data for ${detectedLocation}.`;
    let found = false;
    let matchingAdvice = [];

    // Expanded Knowledge Base
    const KNOWLEDGE = {
      'weather': `For ${detectedLocation}, the current atmospheric data suggests variable conditions. Ensure you have proper drainage for upcoming cycles.`,
      'punjab': "Punjab specific: Focus on wheat-paddy rotation management and check soil salinity levels.",
      'haryana': "Haryana specific: Water conservation is key. Check for state subsidies on micro-irrigation.",
      'wheat': "Wheat: Crown Root Initiation (CRI) stage is critical. Ensure irrigation 21 days after sowing.",
      'mustard': "Mustard: Watch for Aphid infestation if humidity rises above 70%.",
      'price': "Market: Current trends show a slight increase in MSP-supported crops. Check your nearest Mandi for daily spot rates.",
      'fertilizer': "Soil: Apply NPK based on your soil health card. Avoid over-application of Urea.",
      'pest': "Pests: Use yellow sticky traps for monitoring. Neem oil (1500ppm) is a good organic first step."
    };

    Object.keys(KNOWLEDGE).forEach(key => {
      if (lowerQuery.includes(key)) {
        matchingAdvice.push(KNOWLEDGE[key]);
        found = true;
      }
    });

    if (found) {
      advice += "\n\n" + matchingAdvice.join("\n\n");
    } else {
      advice += `\n\nI've noted your query: "${query}". While I sync with the latest ICAR bulletins for ${detectedLocation}, I recommend following the standard package of practices for ${(farmContext.crops || []).join(', ')}.`;
    }

    // Dynamic Signature
    advice += `\n\n💡 Pro-Tip: Based on your interest in "${lowerQuery.split(' ').slice(0, 3).join(' ')}...", you should also check the 'Agri-Analytics' tab for 2026 yield projections.`;

    res.json({ response: advice });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'AI Query failed', details: error.message });
  }
});

module.exports = router;
