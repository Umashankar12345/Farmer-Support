// Query Parser Utility for Agricultural Queries
class QueryParser {
  constructor() {
    this.keywords = {
      crops: [
        'crop', 'plant', 'seed', 'harvest', 'yield', 'vegetable', 'fruit',
        'rice', 'wheat', 'maize', 'corn', 'tomato', 'potato', 'onion',
        'chilli', 'cotton', 'sugarcane', 'soybean', 'pulse', 'legume'
      ],
      pests: [
        'pest', 'insect', 'bug', 'worm', 'larva', 'infection', 'disease',
        'fungus', 'bacteria', 'virus', 'aphid', 'caterpillar', 'mite',
        'whitefly', 'thrips', 'borer', 'weevil', 'locust'
      ],
      soil: [
        'soil', 'fertility', 'nutrient', 'ph', 'compost', 'manure', 'organic',
        'inorganic', 'nitrogen', 'phosphorus', 'potassium', 'micronutrient',
        'fertilizer', 'urea', 'dap', 'npk', 'vermicompost'
      ],
      water: [
        'water', 'irrigation', 'rain', 'drought', 'moisture', 'flood',
        'drip', 'sprinkler', 'watering', 'hydroponic', 'aquaponic'
      ],
      weather: [
        'weather', 'climate', 'temperature', 'forecast', 'rainfall',
        'humidity', 'season', 'monsoon', 'summer', 'winter', 'autumn',
        'spring', 'frost', 'hail', 'storm', 'cyclone'
      ],
      equipment: [
        'equipment', 'machine', 'tractor', 'tool', 'implement', 'mechanization',
        'plough', 'harvester', 'seeder', 'sprayer', 'tiller', 'cultivator'
      ],
      market: [
        'market', 'price', 'sell', 'buy', 'cost', 'profit', 'loss',
        'investment', 'subsidy', 'loan', 'insurance', 'mandi', 'export'
      ],
      general: [
        'how', 'what', 'when', 'where', 'why', 'which', 'best', 'method',
        'technique', 'practice', 'improve', 'increase', 'reduce', 'control',
        'prevent', 'treat', 'cure', 'solution', 'problem', 'issue'
      ]
    };

    this.languageKeywords = {
      en: this.keywords,
      hi: {
        crops: ['फसल', 'पौधा', 'बीज', 'कटाई', 'उपज', 'सब्जी', 'फल'],
        pests: ['कीट', 'रोग', 'संक्रमण', 'फंगस', 'बैक्टीरिया'],
        soil: ['मिट्टी', 'उर्वरता', 'पोषक', 'खाद', 'जैविक'],
        water: ['पानी', 'सिंचाई', 'बारिश', 'सूखा', 'नमी'],
        weather: ['मौसम', 'जलवायु', 'तापमान', 'बारिश', 'आर्द्रता'],
        equipment: ['उपकरण', 'मशीन', 'ट्रैक्टर', 'यंत्र'],
        market: ['बाजार', 'कीमत', 'बिक्री', 'खरीद', 'लाभ'],
        general: ['कैसे', 'क्या', 'कब', 'कहाँ', 'क्यों']
      },
      ta: {
        crops: ['பயிர்', 'தாவரம்', 'விதை', 'அறுவடை', 'மகசூல்'],
        pests: ['பூச்சி', 'நோய்', 'தொற்று', 'பூஞ்சை', 'பாக்டீரியா'],
        soil: ['மண்', 'சத்து', 'உரம்', 'கூட்டு', 'கரிம'],
        water: ['நீர்', 'பாசனம்', 'மழை', 'வறட்சி', 'ஈரப்பதம்'],
        weather: ['வானிலை', 'காலநிலை', 'வெப்பநிலை', 'மழை', 'ஈரப்பதம்'],
        equipment: ['கருவி', 'இயந்திரம்', 'டிராக்டர்', 'உபகரணம்'],
        market: ['சந்தை', 'விலை', 'விற்பனை', 'கொள்முதல்', 'லாபம்'],
        general: ['எப்படி', 'எது', 'எப்போது', 'எங்கே', 'ஏன்']
      }
    };
  }

  parse(query, language = 'en') {
    const queryLower = query.toLowerCase().trim();
    const keywords = this.languageKeywords[language] || this.keywords;
    
    const categories = {};
    const urgency = this.detectUrgency(queryLower);
    const intent = this.detectIntent(queryLower);
    const entities = this.extractEntities(queryLower, language);
    
    // Detect categories
    Object.keys(keywords).forEach(category => {
      const matches = keywords[category].filter(keyword => 
        queryLower.includes(keyword.toLowerCase())
      );
      
      if (matches.length > 0) {
        categories[category] = {
          matches,
          confidence: Math.min(100, matches.length * 20)
        };
      }
    });
    
    // Detect location if mentioned
    const location = this.extractLocation(queryLower, language);
    
    // Detect crop type if mentioned
    const cropType = this.extractCropType(queryLower, language);
    
    // Detect severity level
    const severity = this.detectSeverity(queryLower, language);
    
    return {
      query: queryLower,
      categories,
      intent,
      urgency,
      entities,
      location,
      cropType,
      severity,
      timestamp: new Date().toISOString(),
      language
    };
  }

  detectUrgency(query) {
    const urgentWords = [
      'urgent', 'emergency', 'immediately', 'now', 'quick', 'fast',
      'critical', 'severe', 'serious', 'help', 'asap'
    ];
    
    const urgentWordsHi = ['तत्काल', 'आपात', 'जल्दी', 'अभी', 'गंभीर'];
    const urgentWordsTa = ['அவசர', 'உடனடி', 'விரைவாக', 'இப்போது', 'கடுமையான'];
    
    const allUrgentWords = [...urgentWords, ...urgentWordsHi, ...urgentWordsTa];
    
    const matches = allUrgentWords.filter(word => 
      query.toLowerCase().includes(word.toLowerCase())
    );
    
    return matches.length > 0 ? 'high' : 'normal';
  }

  detectIntent(query) {
    const intents = {
      question: ['how', 'what', 'when', 'where', 'why', 'which', 'कैसे', 'क्या', 'कब', 'कहाँ', 'எப்படி', 'எது', 'எப்போது'],
      command: ['tell', 'show', 'explain', 'describe', 'बताओ', 'दिखाओ', 'वर्णन', 'கூறு', 'காட்டு', 'விவரி'],
      comparison: ['vs', 'versus', 'compare', 'difference', 'बनाम', 'तुलना', 'வெர்சஸ்', 'ஒப்பிடு', 'வித்தியாசம்'],
      recommendation: ['best', 'recommend', 'suggest', 'should', 'अच्छा', 'सुझाव', 'சிறந்த', 'பரிந்துரை'],
      problem: ['problem', 'issue', 'wrong', 'not working', 'समस्या', 'मुद्दा', 'பிரச்சனை', 'சிக்கல்']
    };
    
    for (const [intent, words] of Object.entries(intents)) {
      if (words.some(word => query.includes(word))) {
        return intent;
      }
    }
    
    return 'general';
  }

  extractEntities(query, language) {
    const entities = [];
    
    // Extract measurements
    const measurementPattern = /(\d+(\.\d+)?)\s*(kg|g|litre|l|ml|acre|hectare|cm|m|km)/gi;
    let match;
    while ((match = measurementPattern.exec(query)) !== null) {
      entities.push({
        type: 'measurement',
        value: match[1],
        unit: match[3],
        text: match[0]
      });
    }
    
    // Extract dates
    const datePattern = /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4}|\d{2})\b|\b(today|tomorrow|yesterday|next week|last week)\b/gi;
    while ((match = datePattern.exec(query)) !== null) {
      entities.push({
        type: 'date',
        value: match[0],
        text: match[0]
      });
    }
    
    // Extract percentages
    const percentPattern = /(\d+)%/gi;
    while ((match = percentPattern.exec(query)) !== null) {
      entities.push({
        type: 'percentage',
        value: match[1],
        text: match[0]
      });
    }
    
    // Extract prices
    const pricePattern = /₹\s*(\d+(,\d+)*(\.\d+)?)|\$(\d+(,\d+)*(\.\d+)?)|(\d+)\s*(rupees|dollars)/gi;
    while ((match = pricePattern.exec(query)) !== null) {
      entities.push({
        type: 'price',
        value: match[1] || match[4] || match[7],
        currency: match[0].includes('₹') || match[0].includes('rupees') ? 'INR' : 'USD',
        text: match[0]
      });
    }
    
    return entities;
  }

  extractLocation(query, language) {
    const locations = {
      en: [
        'north', 'south', 'east', 'west', 'coastal', 'mountain', 'plain',
        'tropical', 'temperate', 'arid', 'semi-arid', 'humid'
      ],
      hi: [
        'उत्तर', 'दक्षिण', 'पूर्व', 'पश्चिम', 'तटीय', 'पहाड़ी', 'मैदानी',
        'उष्णकटिबंधीय', 'समशीतोष्ण', 'शुष्क', 'अर्ध-शुष्क', 'आर्द्र'
      ],
      ta: [
        'வடக்கு', 'தெற்கு', 'கிழக்கு', 'மேற்கு', 'கடலோர', 'மலை', 'சமவெளி',
        'வெப்பமண்டல', 'மிதவெப்பமண்டல', 'வறண்ட', 'அரை வறண்ட', 'ஈரப்பதமான'
      ]
    };
    
    const langLocations = locations[language] || locations.en;
    const foundLocation = langLocations.find(loc => 
      query.toLowerCase().includes(loc.toLowerCase())
    );
    
    return foundLocation || null;
  }

  extractCropType(query, language) {
    const crops = {
      en: [
        'rice', 'wheat', 'maize', 'corn', 'sugarcane', 'cotton', 'soybean',
        'tomato', 'potato', 'onion', 'chilli', 'brinjal', 'okra', 'cabbage',
        'cauliflower', 'spinach', 'carrot', 'radish', 'cucumber', 'pumpkin'
      ],
      hi: [
        'चावल', 'गेहूं', 'मक्का', 'गन्ना', 'कपास', 'सोयाबीन', 'टमाटर',
        'आलू', 'प्याज', 'मिर्च', 'बैंगन', 'भिंडी', 'पत्तागोभी', 'फूलगोभी',
        'पालक', 'गाजर', 'मूली', 'खीरा', 'कद्दू'
      ],
      ta: [
        'அரிசி', 'கோதுமை', 'சோளம்', 'கரும்பு', 'பருத்தி', 'சோயாபீன்ஸ்', 'தக்காளி',
        'உருளைக்கிழங்கு', 'வெங்காயம்', 'மிளகாய்', 'கத்தரி', 'வெண்டை', 'முட்டைக்கோஸ்',
        'காலிஃபிளவர்', 'பாலக்கீரை', 'கேரட்', 'முள்ளங்கி', 'வெள்ளரி', 'பூசணி'
      ]
    };
    
    const langCrops = crops[language] || crops.en;
    const foundCrop = langCrops.find(crop => 
      query.toLowerCase().includes(crop.toLowerCase())
    );
    
    return foundCrop || null;
  }

  detectSeverity(query, language) {
    const severityWords = {
      high: {
        en: ['severe', 'critical', 'emergency', 'dying', 'dead', 'destroyed'],
        hi: ['गंभीर', 'आपात', 'मर रहा', 'मृत', 'नष्ट'],
        ta: ['கடுமையான', 'அவசர', 'இறந்து', 'மரணம்', 'அழிந்த']
      },
      medium: {
        en: ['moderate', 'serious', 'problem', 'issue', 'affected'],
        hi: ['मध्यम', 'गंभीर', 'समस्या', 'प्रभावित'],
        ta: ['மிதமான', 'தீவிர', 'பிரச்சனை', 'பாதிக்கப்பட்ட']
      },
      low: {
        en: ['minor', 'slight', 'small', 'beginning', 'early'],
        hi: ['मामूली', 'थोड़ा', 'छोटा', 'शुरुआत'],
        ta: ['சிறிய', 'சற்று', 'சிறிய', 'தொடக்கம்']
      }
    };
    
    const langSeverity = severityWords[language] || severityWords.en;
    
    for (const [level, words] of Object.entries(langSeverity)) {
      if (words.some(word => query.toLowerCase().includes(word.toLowerCase()))) {
        return level;
      }
    }
    
    return 'unknown';
  }

  // Generate response based on parsed query
  generateResponse(parsedQuery) {
    const { categories, intent, urgency, cropType, severity } = parsedQuery;
    
    let responseTemplate = '';
    
    // Based on urgency
    if (urgency === 'high') {
      responseTemplate += "I understand this is urgent. ";
    }
    
    // Based on intent
    switch(intent) {
      case 'question':
        responseTemplate += "Based on your question about ";
        break;
      case 'problem':
        responseTemplate += "I understand you're facing an issue with ";
        break;
      case 'recommendation':
        responseTemplate += "For your request about ";
        break;
      default:
        responseTemplate += "Regarding your query about ";
    }
    
    // Add crop type if mentioned
    if (cropType) {
      responseTemplate += `${cropType}, `;
    }
    
    // Add categories
    const categoryNames = Object.keys(categories);
    if (categoryNames.length > 0) {
      responseTemplate += `I'll provide information about ${categoryNames.join(', ')}. `;
    }
    
    // Add severity if mentioned
    if (severity !== 'unknown') {
      responseTemplate += `This appears to be a ${severity} situation. `;
    }
    
    // Add specific recommendations based on categories
    categoryNames.forEach(category => {
      switch(category) {
        case 'pests':
          responseTemplate += "For pest control, I recommend integrated pest management. ";
          break;
        case 'soil':
          responseTemplate += "For soil issues, soil testing is recommended first. ";
          break;
        case 'water':
          responseTemplate += "For water management, consider drip irrigation. ";
          break;
      }
    });
    
    responseTemplate += "Here are some specific recommendations:";
    
    return responseTemplate;
  }

  // Extract keywords for search/analysis
  extractKeywords(query, language = 'en') {
    const parsed = this.parse(query, language);
    const keywords = [];
    
    // Add category keywords
    Object.values(parsed.categories).forEach(category => {
      keywords.push(...category.matches);
    });
    
    // Add entities
    parsed.entities.forEach(entity => {
      keywords.push(entity.text);
    });
    
    // Add crop type
    if (parsed.cropType) {
      keywords.push(parsed.cropType);
    }
    
    // Add location
    if (parsed.location) {
      keywords.push(parsed.location);
    }
    
    // Remove duplicates
    return [...new Set(keywords)];
  }

  // Check if query requires expert escalation
  requiresEscalation(parsedQuery) {
    const { urgency, severity, categories } = parsedQuery;
    
    // High urgency or severity requires expert attention
    if (urgency === 'high' || severity === 'high') {
      return true;
    }
    
    // Multiple complex categories might need expert help
    const complexCategories = ['pests', 'diseases', 'market'];
    const complexCount = Object.keys(categories).filter(cat => 
      complexCategories.includes(cat)
    ).length;
    
    return complexCount >= 2;
  }

  // Format query for AI processing
  formatForAI(parsedQuery) {
    return {
      prompt: `As an agricultural expert, provide advice for: ${parsedQuery.query}`,
      context: {
        categories: Object.keys(parsedQuery.categories),
        crop: parsedQuery.cropType,
        location: parsedQuery.location,
        urgency: parsedQuery.urgency,
        language: parsedQuery.language
      },
      constraints: [
        "Provide practical, actionable advice",
        "Consider local conditions if location is specified",
        "Prioritize organic solutions when possible",
        "Include safety precautions if chemicals are mentioned"
      ]
    };
  }
}

export default QueryParser;