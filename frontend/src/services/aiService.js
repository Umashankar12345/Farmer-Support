// AI Service for Q&A and NLP
const AIService = {
  // Simulated AI responses - In production, connect to GPT/ML model
  async processQuery(query, context = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const queries = {
      // Weather related
      'weather': {
        pattern: /weather|rain|temperature|forecast/i,
        response: "The weather forecast shows moderate rainfall in the next 3 days. Ideal for rice cultivation. Temperature: 25-32°C.",
        action: 'show_weather',
        confidence: 0.9
      },
      // Crop disease
      'disease': {
        pattern: /disease|pest|yellow leaves|brown spots|fungus/i,
        response: "Based on your description, this could be Brown Spot Fungus. Treatment: Apply Carbendazim (1g/liter) weekly for 3 weeks.",
        action: 'show_disease_info',
        confidence: 0.85
      },
      // Fertilizer
      'fertilizer': {
        pattern: /fertilizer|nutrient|urea|dap|manure/i,
        response: "For your crop stage, recommend: Urea (50kg/acre), DAP (25kg/acre), and organic compost (2 tons/acre).",
        action: 'show_fertilizer',
        confidence: 0.88
      },
      // Machinery
      'machinery': {
        pattern: /tractor|harvester|machine|equipment|rent/i,
        response: "For 5 acres of wheat, I recommend a 45HP tractor with harvester attachment. Rental: ₹4,000/day, Subsidy available.",
        action: 'show_machinery',
        confidence: 0.87
      },
      // Market prices
      'market': {
        pattern: /price|market|sell|rate|mandi/i,
        response: "Current market rates: Rice ₹2,800/quintal, Wheat ₹2,400/quintal, Cotton ₹6,500/quintal.",
        action: 'show_market',
        confidence: 0.92
      },
      // Government schemes
      'scheme': {
        pattern: /scheme|subsidy|government|pm kisan/i,
        response: "Available schemes: PM-KISAN (₹6,000/year), Crop Insurance (premium 2%), Farm Mechanization (50% subsidy).",
        action: 'show_schemes',
        confidence: 0.95
      },
      // General farming advice
      'general': {
        pattern: /how to|when to|best time|sowing|harvesting/i,
        response: "For rice cultivation: Sow in June-July, transplant after 25 days, harvest in November. Maintain water level 5cm.",
        action: 'general_advice',
        confidence: 0.8
      }
    };

    // Find best match
    let bestMatch = { response: "I'm not sure about that. Could you provide more details?", confidence: 0 };
    
    for (const [key, config] of Object.entries(queries)) {
      if (config.pattern.test(query)) {
        if (config.confidence > bestMatch.confidence) {
          bestMatch = {
            response: config.response,
            action: config.action,
            confidence: config.confidence
          };
        }
      }
    }

    // Add context awareness
    if (context.crop) {
      bestMatch.response += ` Specifically for ${context.crop}.`;
    }
    if (context.location) {
      bestMatch.response += ` Based on ${context.location} conditions.`;
    }

    return {
      query,
      response: bestMatch.response,
      action: bestMatch.action,
      confidence: bestMatch.confidence,
      timestamp: new Date().toISOString(),
      sources: [
        "ICAR Database",
        "State Agriculture Department",
        "Historical Farming Data",
        "Expert Recommendations"
      ]
    };
  },

  // Escalate to human expert
  async escalateToHuman(query, userId) {
    const escalationData = {
      query,
      userId,
      timestamp: new Date().toISOString(),
      priority: this.calculatePriority(query),
      assignedExpert: null,
      status: 'pending'
    };

    // Simulate escalation
    return {
      ...escalationData,
      ticketId: 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      estimatedResponse: 'Within 24 hours',
      contactNumber: '1800-180-1551'
    };
  },

  calculatePriority(query) {
    const urgentKeywords = ['emergency', 'urgent', 'immediate', 'dying', 'critical'];
    const hasUrgent = urgentKeywords.some(keyword => query.toLowerCase().includes(keyword));
    return hasUrgent ? 'high' : 'normal';
  },

  // Image analysis simulation
  async analyzeImage(imageData, cropType) {
    // Simulate ML model analysis
    const diseases = {
      'Rice': ['Brown Spot', 'Blast', 'Sheath Blight'],
      'Wheat': ['Rust', 'Smut', 'Powdery Mildew'],
      'Cotton': ['Boll Rot', 'Leaf Curl', 'Wilt']
    };

    const cropDiseases = diseases[cropType] || ['General Fungal Infection'];
    const randomDisease = cropDiseases[Math.floor(Math.random() * cropDiseases.length)];

    return {
      crop: cropType,
      disease: randomDisease,
      confidence: (Math.random() * 0.3 + 0.7).toFixed(2), // 70-100% confidence
      severity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      recommendations: [
        "Apply recommended fungicide immediately",
        "Remove infected plants",
        "Maintain proper spacing",
        "Ensure good drainage"
      ],
      preventiveMeasures: [
        "Use disease-resistant varieties",
        "Practice crop rotation",
        "Maintain field hygiene",
        "Regular monitoring"
      ]
    };
  }
};

export default AIService;