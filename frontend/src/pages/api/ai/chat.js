// API Route: /api/ai/chat
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import QueryParser from '../../utils/queryParser';

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const queryParser = new QueryParser();

// System prompts for different languages
const systemPrompts = {
  en: `You are AgriVoice, an expert agricultural AI assistant. Your role is to provide accurate, practical, and helpful advice to farmers and agricultural professionals.

IMPORTANT GUIDELINES:
1. Provide clear, actionable advice
2. Consider local conditions when relevant
3. Prioritize sustainable and organic solutions
4. Include safety precautions when mentioning chemicals
5. Be specific with measurements and timings
6. Acknowledge limitations when unsure
7. Suggest consulting local experts when appropriate
8. Use simple, easy-to-understand language

RESPONSE FORMAT:
- Start with a brief summary
- Provide step-by-step instructions
- Include important warnings/cautions
- Suggest follow-up actions
- End with availability for further questions

KNOWLEDGE DOMAINS:
- Crop management
- Pest and disease control
- Soil health and fertilization
- Irrigation and water management
- Weather and climate impact
- Farm equipment and machinery
- Market prices and economics
- Agricultural best practices`,

  hi: `आप एग्रीवॉयस हैं, एक विशेषज्ञ कृषि AI सहायक। आपका कार्य किसानों और कृषि पेशेवरों को सटीक, व्यावहारिक और उपयोगी सलाह प्रदान करना है।

महत्वपूर्ण दिशा-निर्देश:
1. स्पष्ट, क्रियात्मक सलाह दें
2. प्रासंगिक होने पर स्थानीय परिस्थितियों पर विचार करें
3. टिकाऊ और जैविक समाधानों को प्राथमिकता दें
4. रसायनों का उल्लेख करते समय सुरक्षा सावधानियां शामिल करें
5. माप और समय के साथ विशिष्ट रहें
6. अनिश्चित होने पर सीमाओं को स्वीकार करें
7. उचित होने पर स्थानीय विशेषज्ञों से परामर्श करने का सुझाव दें
8. सरल, आसानी से समझ में आने वाली भाषा का प्रयोग करें

उत्तर प्रारूप:
- संक्षिप्त सारांश से शुरू करें
- चरण-दर-चरण निर्देश प्रदान करें
- महत्वपूर्ण चेतावनियाँ/सावधानियाँ शामिल करें
- अनुवर्ती कार्यों का सुझाव दें
- आगे के प्रश्नों की उपलब्धता के साथ समाप्त करें

ज्ञान डोमेन:
- फसल प्रबंधन
- कीट और रोग नियंत्रण
- मिट्टी का स्वास्थ्य और उर्वरीकरण
- सिंचाई और जल प्रबंधन
- मौसम और जलवायु प्रभाव
- कृषि उपकरण और मशीनरी
- बाजार मूल्य और अर्थशास्त्र
- कृषि की सर्वोत्तम प्रथाएं`,

  ta: `நீங்கள் அக்ரிவொய்ஸ், ஒரு நிபுணர் விவசாய AI உதவியாளர். விவசாயிகளுக்கும் விவசாய நிபுணர்களுக்கும் துல்லியமான, நடைமுறை மற்றும் பயனுள்ள ஆலோசனைகளை வழங்குவதே உங்கள் பணி.

முக்கிய வழிகாட்டுதல்கள்:
1. தெளிவான, செயல்பாட்டு ஆலோசனைகளை வழங்கவும்
2. பொருத்தமானபோது உள்ளூர் நிலைமைகளை கருத்தில் கொள்ளவும்
3. நிலையான மற்றும் கரிம தீர்வுகளை முன்னுரிமையாகக் கொள்ளவும்
4. இரசாயனங்களைக் குறிப்பிடும்போது பாதுகாப்பு முன்னெச்சரிக்கைகளைச் சேர்க்கவும்
5. அளவீடுகள் மற்றும் நேரங்களுடன் குறிப்பிட்டதாக இருங்கள்
6. உறுதியாக இல்லாதபோது வரம்புகளை ஒப்புக்கொள்ளுங்கள்
7. பொருத்தமானபோது உள்ளூர் நிபுணர்களைக் கலந்தாலோசிக்க பரிந்துரைக்கவும்
8. எளிமையான, எளிதில் புரிந்துகொள்ளக்கூடிய மொழியைப் பயன்படுத்தவும்

பதில் வடிவம்:
- ஒரு சுருக்கமான சுருக்கத்துடன் தொடங்கவும்
- படிப்படியான வழிமுறைகளை வழங்கவும்
- முக்கிய எச்சரிக்கைகள்/முன்னெச்சரிக்கைகளைச் சேர்க்கவும்
- தொடர்ந்து செயல்படுவதற்கான பரிந்துரைகளை முன்வைக்கவும்
- மேலதிக கேள்விகளுக்கான கிடைக்கும் தன்மையுடன் முடிக்கவும்

அறிவு களங்கள்:
- பயிர் மேலாண்மை
- பூச்சி மற்றும் நோய் கட்டுப்பாடு
- மண் ஆரோக்கியம் மற்றும் உரமிடுதல்
- நீர்ப்பாசனம் மற்றும் நீர் மேலாண்மை
- வானிலை மற்றும் காலநிலை தாக்கம்
- விவசாய கருவிகள் மற்றும் இயந்திரங்கள்
- சந்தை விலைகள் மற்றும் பொருளாதாரம்
- விவசாய சிறந்த நடைமுறைகள்`
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      message, 
      language = 'en', 
      model = 'gpt-3.5-turbo', 
      temperature = 0.7,
      context = [],
      image,
      userId 
    } = req.body;

    // Parse and analyze the query
    const parsedQuery = queryParser.parse(message, language);
    
    // Check if escalation is needed
    const requiresEscalation = queryParser.requiresEscalation(parsedQuery);
    
    // Prepare context with parsed query
    const enhancedContext = [
      {
        role: 'system',
        content: systemPrompts[language] || systemPrompts.en
      },
      ...context,
      {
        role: 'user',
        content: `Query: ${message}\n\nParsed Context: ${JSON.stringify(parsedQuery, null, 2)}`
      }
    ];

    let aiResponse;
    let processingTime;
    const startTime = Date.now();

    // Handle different AI models
    if (model.startsWith('gpt')) {
      const response = await openai.chat.completions.create({
        model: model,
        messages: enhancedContext,
        temperature: temperature,
        max_tokens: 1000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });
      
      aiResponse = response.choices[0].message.content;
    } 
    else if (model.startsWith('claude')) {
      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        temperature: temperature,
        system: systemPrompts[language] || systemPrompts.en,
        messages: enhancedContext.map(c => ({
          role: c.role === 'assistant' ? 'assistant' : 'user',
          content: c.content
        }))
      });
      
      aiResponse = response.content[0].text;
    }
    else if (model.startsWith('gemini')) {
      const genModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const chat = genModel.startChat({
        history: enhancedContext.map(c => ({
          role: c.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: c.content }]
        })),
        generationConfig: {
          temperature: temperature,
          maxOutputTokens: 1000,
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      });
      
      const result = await chat.sendMessage(message);
      aiResponse = await result.response.text();
    }
    else {
      // Fallback to simple response
      aiResponse = `I've analyzed your query about "${parsedQuery.categories.length > 0 ? Object.keys(parsedQuery.categories).join(', ') : 'agriculture'}". Based on my analysis, I recommend consulting with local agricultural experts for the most accurate advice specific to your region and conditions.`;
    }

    processingTime = Date.now() - startTime;

    // Generate structured response
    const response = {
      response: aiResponse,
      metadata: {
        queryId: `QRY-${Date.now()}`,
        model,
        language,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString(),
        parsedQuery,
        requiresEscalation,
        confidence: 85 // Mock confidence score
      },
      suggestions: generateFollowUpSuggestions(parsedQuery, language),
      warnings: generateSafetyWarnings(parsedQuery, language)
    };

    // Add escalation info if needed
    if (requiresEscalation) {
      response.escalation = {
        recommended: true,
        priority: parsedQuery.urgency === 'high' ? 'high' : 'normal',
        suggestedExpert: queryParser.determineExpertCategory(parsedQuery),
        estimatedResponseTime: '24 hours'
      };
    }

    res.status(200).json(response);
    
    // Log the interaction (in production, save to database)
    logInteraction({
      userId,
      query: message,
      response: aiResponse,
      metadata: response.metadata,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI API Error:', error);
    
    const errorResponse = {
      error: 'Failed to process request',
      message: error.message,
      fallbackResponse: generateFallbackResponse(req.body.language || 'en'),
      timestamp: new Date().toISOString()
    };
    
    res.status(500).json(errorResponse);
  }
}

// Generate follow-up suggestions based on query
function generateFollowUpSuggestions(parsedQuery, language) {
  const suggestions = [];
  const { categories, cropType } = parsedQuery;
  
  const suggestionTemplates = {
    en: {
      pests: `Would you like more information about organic pest control methods for ${cropType || 'your crops'}?`,
      soil: `Would you like detailed soil testing instructions and interpretation guidelines?`,
      water: `Are you interested in water conservation techniques and irrigation scheduling?`,
      weather: `Would you like weather-based farming recommendations for your region?`,
      market: `Would you like current market prices and selling strategies for ${cropType || 'your produce'}?`
    },
    hi: {
      pests: `क्या आप ${cropType || 'अपनी फसलों'} के लिए जैविक कीट नियंत्रण विधियों के बारे में अधिक जानकारी चाहेंगे?`,
      soil: `क्या आप विस्तृत मिट्टी परीक्षण निर्देश और व्याख्या दिशानिर्देश चाहेंगे?`,
      water: `क्या आप जल संरक्षण तकनीकों और सिंचाई अनुसूची में रुचि रखते हैं?`,
      weather: `क्या आप अपने क्षेत्र के लिए मौसम-आधारित खेती की सिफारिशें चाहेंगे?`,
      market: `क्या आप ${cropType || 'अपने उत्पाद'} के लिए वर्तमान बाजार मूल्य और बिक्री रणनीतियाँ चाहेंगे?`
    },
    ta: {
      pests: `நீங்கள் ${cropType || 'உங்கள் பயிர்கள்'} க்கான கரிம பூச்சி கட்டுப்பாட்டு முறைகள் பற்றி மேலும் தகவல் விரும்புகிறீர்களா?`,
      soil: `நீங்கள் விரிவான மண் சோதனை வழிமுறைகள் மற்றும் விளக்க வழிகாட்டுதல்களை விரும்புகிறீர்களா?`,
      water: `நீர் சேமிப்பு நுட்பங்கள் மற்றும் நீர்ப்பாசன அட்டவணை பற்றி நீங்கள் ஆர்வமாக உள்ளீர்களா?`,
      weather: `உங்கள் பகுதிக்கான வானிலை அடிப்படையிலான விவசாய பரிந்துரைகளை விரும்புகிறீர்களா?`,
      market: `நீங்கள் ${cropType || 'உங்கள் உற்பத்தி'} க்கான தற்போதைய சந்தை விலைகள் மற்றும் விற்பனை உத்திகளை விரும்புகிறீர்களா?`
    }
  };
  
  const templates = suggestionTemplates[language] || suggestionTemplates.en;
  
  Object.keys(categories).forEach(category => {
    if (templates[category]) {
      suggestions.push(templates[category]);
    }
  });
  
  // Add general suggestions if no specific ones
  if (suggestions.length === 0) {
    const general = {
      en: "Would you like information about crop rotation, soil health, or pest prevention?",
      hi: "क्या आप फसल चक्र, मिट्टी का स्वास्थ्य, या कीट निवारण के बारे में जानकारी चाहेंगे?",
      ta: "நீங்கள் பயிர் சுழற்சி, மண் ஆரோக்கியம் அல்லது பூச்சி தடுப்பு பற்றிய தகவலை விரும்புகிறீர்களா?"
    };
    
    suggestions.push(general[language] || general.en);
  }
  
  return suggestions.slice(0, 3); // Return max 3 suggestions
}

// Generate safety warnings based on query content
function generateSafetyWarnings(parsedQuery, language) {
  const warnings = [];
  const { categories, query } = parsedQuery;
  
  const warningTemplates = {
    en: {
      chemical: "⚠️ SAFETY WARNING: When using chemical pesticides or fertilizers, always wear protective gear and follow manufacturer instructions carefully.",
      equipment: "⚠️ SAFETY WARNING: Always follow equipment safety guidelines and ensure proper training before operating farm machinery.",
      general: "⚠️ IMPORTANT: Consult with local agricultural experts before implementing major changes to your farming practices."
    },
    hi: {
      chemical: "⚠️ सुरक्षा चेतावनी: रासायनिक कीटनाशक या उर्वरकों का उपयोग करते समय, हमेशा सुरक्षात्मक गियर पहनें और निर्माता के निर्देशों का ध्यानपूर्वक पालन करें।",
      equipment: "⚠️ सुरक्षा चेतावनी: कृषि मशीनरी चलाने से पहले हमेशा उपकरण सुरक्षा दिशानिर्देशों का पालन करें और उचित प्रशिक्षण सुनिश्चित करें।",
      general: "⚠️ महत्वपूर्ण: अपनी खेती प्रथाओं में बड़े बदलाव लागू करने से पहले स्थानीय कृषि विशेषज्ञों से परामर्श करें।"
    },
    ta: {
      chemical: "⚠️ பாதுகாப்பு எச்சரிக்கை: இரசாயன பூச்சிக்கொல்லிகள் அல்லது உரங்களைப் பயன்படுத்தும்போது, எப்போதும் பாதுகாப்பு கியரை அணியுங்கள் மற்றும் உற்பத்தியாளர் வழிமுறைகளை கவனமாகப் பின்பற்றவும்.",
      equipment: "⚠️ பாதுகாப்பு எச்சரிக்கை: விவசாய இயந்திரங்களை இயக்குவதற்கு முன் எப்போதும் உபகரண பாதுகாப்பு வழிகாட்டுதல்களைப் பின்பற்றவும் மற்றும் சரியான பயிற்சியை உறுதிப்படுத்தவும்.",
      general: "⚠️ முக்கியமானது: உங்கள் விவசாய நடைமுறைகளில் பெரிய மாற்றங்களை செயல்படுத்துவதற்கு முன் உள்ளூர் விவசாய நிபுணர்களைக் கலந்தாலோசிக்கவும்."
    }
  };
  
  const templates = warningTemplates[language] || warningTemplates.en;
  
  // Check for chemical-related terms
  const chemicalTerms = ['chemical', 'pesticide', 'herbicide', 'fungicide', 'fertilizer', 'spray'];
  const hasChemicalTerms = chemicalTerms.some(term => 
    query.toLowerCase().includes(term)
  );
  
  if (hasChemicalTerms || categories.pests) {
    warnings.push(templates.chemical);
  }
  
  // Check for equipment-related terms
  const equipmentTerms = ['tractor', 'machine', 'equipment', 'harvester', 'plough'];
  const hasEquipmentTerms = equipmentTerms.some(term => 
    query.toLowerCase().includes(term)
  );
  
  if (hasEquipmentTerms || categories.equipment) {
    warnings.push(templates.equipment);
  }
  
  // Add general warning for complex queries
  if (Object.keys(categories).length >= 3) {
    warnings.push(templates.general);
  }
  
  return warnings;
}

// Generate fallback response when AI fails
function generateFallbackResponse(language) {
  const fallbacks = {
    en: "I apologize for the technical difficulty. As an agricultural assistant, I recommend: 1) Consulting local agricultural extension services 2) Visiting your nearest Krishi Vigyan Kendra 3) Contacting agricultural helplines for immediate assistance.",
    hi: "तकनीकी कठिनाई के लिए मैं माफी चाहता हूं। एक कृषि सहायक के रूप में, मैं सलाह देता हूं: 1) स्थानीय कृषि विस्तार सेवाओं से परामर्श करें 2) अपने निकटतम कृषि विज्ञान केंद्र पर जाएं 3) तत्काल सहायता के लिए कृषि हेल्पलाइन से संपर्क करें।",
    ta: "தொழில்நுட்ப சிரமத்திற்கு நான் மன்னிப்பு கேட்கிறேன். ஒரு விவசாய உதவியாளராக, நான் பரிந்துரைக்கிறேன்: 1) உள்ளூர் விவசாய நீட்டிப்பு சேவைகளைக் கலந்தாலோசிக்கவும் 2) உங்களுக்கு அருகிலுள்ள க்ரிஷி விக்யான் கேந்திராவைப் பார்வையிடவும் 3) உடனடி உதவிக்கு விவசாய உதவிக்கோட்டியைத் தொடர்பு கொள்ளவும்."
  };
  
  return fallbacks[language] || fallbacks.en;
}

// Log interaction for analytics (mock function)
function logInteraction(data) {
  // In production, save to database or analytics service
  console.log('Interaction logged:', {
    queryId: data.metadata.queryId,
    userId: data.userId,
    timestamp: data.timestamp,
    queryLength: data.query.length,
    responseLength: data.response.length,
    model: data.metadata.model,
    language: data.metadata.language
  });
  
  // Example: Save to a file or database
  // await saveToDatabase(data);
}