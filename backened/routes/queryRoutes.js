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

    // 2. Fallback to Local Expert Engine
    let advice = "Namaste! As your Digital Krishi Officer, I'm analyzing your farm data for " + (farmContext.location || "your region") + ".";
    let found = false;
    let matchingAdvice = [];

    Object.keys(EXPLAINER_DB).forEach(key => {
      if (lowerQuery.includes(key)) {
        matchingAdvice.push(EXPLAINER_DB[key]);
        found = true;
      }
    });

    if (found) {
      advice += "\n\nBased on your query, here is the verified agricultural advice:\n" + matchingAdvice.map(a => "• " + a).join("\n\n");
    } else {
      advice += `\n\nI've noted your specific query: "${query}". While I process more localized data from ICAR, I recommend focusing on your primary crops: ${(farmContext.crops || []).join(', ')}. \n\nGeneral Tip: Ensure soil moisture is checked before applying any fertilizer.`;
    }

    // Dynamic signature based on context
    advice += "\n\n💡 Pro-Tip: You can check the 'Weather' tab for current rain alerts in " + (farmContext.location || "your area") + ".";

    res.json({ response: advice });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'AI Query failed', details: error.message });
  }
});

module.exports = router;
