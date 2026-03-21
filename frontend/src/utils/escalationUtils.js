// Escalation Utilities for Expert Support
class EscalationUtils {
  constructor() {
    this.expertCategories = {
      pest: {
        name: 'Pest Control Expert',
        description: 'Specializes in insect and disease management',
        responseTime: '2-4 hours',
        languages: ['en', 'hi', 'ta', 'te'],
        availability: '9 AM - 6 PM',
        expertise: ['Organic pest control', 'Chemical treatments', 'IPM strategies']
      },
      soil: {
        name: 'Soil Scientist',
        description: 'Expert in soil health and fertility management',
        responseTime: '4-6 hours',
        languages: ['en', 'hi'],
        availability: '10 AM - 4 PM',
        expertise: ['Soil testing', 'Fertilizer recommendations', 'pH management']
      },
      irrigation: {
        name: 'Irrigation Specialist',
        description: 'Expert in water management and irrigation systems',
        responseTime: '24 hours',
        languages: ['en', 'ta'],
        availability: '8 AM - 5 PM',
        expertise: ['Drip irrigation', 'Water conservation', 'System design']
      },
      market: {
        name: 'Agricultural Economist',
        description: 'Expert in market trends and pricing',
        responseTime: '48 hours',
        languages: ['en', 'hi'],
        availability: '11 AM - 3 PM',
        expertise: ['Price analysis', 'Market trends', 'Profit optimization']
      },
      general: {
        name: 'General Agricultural Expert',
        description: 'Broad knowledge across all farming aspects',
        responseTime: '6-8 hours',
        languages: ['en', 'hi', 'ta', 'te'],
        availability: '9 AM - 7 PM',
        expertise: ['Crop management', 'Best practices', 'Problem diagnosis']
      }
    };
  }

  // Determine which expert category is needed
  determineExpertCategory(parsedQuery) {
    const { categories, urgency } = parsedQuery;
    const categoryNames = Object.keys(categories);
    
    // Priority order for expert matching
    if (categories.pests && categories.pests.confidence > 50) {
      return 'pest';
    }
    
    if (categories.soil && categories.soil.confidence > 50) {
      return 'soil';
    }
    
    if (categories.water && categories.water.confidence > 50) {
      return 'irrigation';
    }
    
    if (categories.market && categories.market.confidence > 50) {
      return 'market';
    }
    
    // For urgent queries, assign general expert
    if (urgency === 'high') {
      return 'general';
    }
    
    // Default to general expert for complex queries
    if (categoryNames.length >= 3) {
      return 'general';
    }
    
    return null; // No expert needed
  }

  // Create escalation request
  createEscalationRequest(parsedQuery, chatHistory = []) {
    const expertCategory = this.determineExpertCategory(parsedQuery);
    
    if (!expertCategory) {
      return null;
    }
    
    const expert = this.expertCategories[expertCategory];
    const requestId = `ESC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const request = {
      id: requestId,
      timestamp: new Date().toISOString(),
      status: 'pending',
      priority: parsedQuery.urgency === 'high' ? 'high' : 'normal',
      expertCategory,
      expertDetails: expert,
      userQuery: parsedQuery.query,
      parsedQuery,
      chatContext: chatHistory.slice(-10), // Last 10 messages
      estimatedResponseTime: expert.responseTime,
      assignedExpert: null,
      updates: []
    };
    
    return request;
  }

  // Format escalation for display
  formatEscalationDisplay(request) {
    const expert = this.expertCategories[request.expertCategory];
    
    return {
      title: `Escalated to ${expert.name}`,
      description: expert.description,
      responseTime: expert.responseTime,
      priority: request.priority,
      status: request.status,
      requestId: request.id,
      timestamp: request.timestamp,
      languages: expert.languages.join(', '),
      availability: expert.availability,
      expertise: expert.expertise
    };
  }

  // Generate escalation message for user
  generateEscalationMessage(request, language = 'en') {
    const expert = this.expertCategories[request.expertCategory];
    
    const messages = {
      en: {
        title: "Expert Assistance Requested",
        message: `Your query has been escalated to ${expert.name}. ` +
                `You should receive a response within ${expert.responseTime}. ` +
                `A ${expert.description.toLowerCase()} will review your case.`,
        instructions: "Please ensure your contact information is up to date for the expert to reach you."
      },
      hi: {
        title: "विशेषज्ञ सहायता का अनुरोध किया गया",
        message: `आपकी क्वेरी ${expert.name} को भेजी गई है। ` +
                `आपको ${expert.responseTime} के भीतर प्रतिक्रिया प्राप्त होनी चाहिए। ` +
                `एक ${expert.description.toLowerCase()} आपके मामले की समीक्षा करेगा।`,
        instructions: "कृपया सुनिश्चित करें कि विशेषज्ञ के संपर्क करने के लिए आपकी संपर्क जानकारी अपडेट है।"
      },
      ta: {
        title: "நிபுணர் உதவி கோரப்பட்டது",
        message: `உங்கள் கேள்வி ${expert.name} க்கு அனுப்பப்பட்டது. ` +
                `நீங்கள் ${expert.responseTime} க்குள் பதில் பெற வேண்டும். ` +
                `ஒரு ${expert.description.toLowerCase()} உங்கள் வழக்கை மதிப்பாய்வு செய்வார்.`,
        instructions: "நிபுணர் உங்களை அணுகுவதற்கு உங்கள் தொடர்புத் தகவல் புதுப்பிக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும்."
      }
    };
    
    return messages[language] || messages.en;
  }

  // Track escalation status
  updateEscalationStatus(request, status, updates = {}) {
    request.status = status;
    request.updates.push({
      timestamp: new Date().toISOString(),
      status,
      ...updates
    });
    
    return request;
  }

  // Calculate SLA (Service Level Agreement) compliance
  calculateSLA(request) {
    const created = new Date(request.timestamp);
    const now = new Date();
    const hoursElapsed = (now - created) / (1000 * 60 * 60);
    
    const expectedHours = {
      high: 2,    // 2 hours for high priority
      normal: 24  // 24 hours for normal priority
    };
    
    const slaStatus = hoursElapsed <= expectedHours[request.priority] ? 'within_sla' : 'breached_sla';
    const hoursRemaining = Math.max(0, expectedHours[request.priority] - hoursElapsed);
    
    return {
      slaStatus,
      hoursElapsed: hoursElapsed.toFixed(2),
      hoursRemaining: hoursRemaining.toFixed(2),
      expectedResponseTime: expectedHours[request.priority]
    };
  }

  // Match expert based on language and expertise
  findMatchingExpert(expertCategory, language) {
    const expert = this.expertCategories[expertCategory];
    
    if (!expert.languages.includes(language)) {
      // Find alternative expert with language support
      const alternatives = Object.entries(this.expertCategories)
        .filter(([cat, exp]) => 
          exp.languages.includes(language) && 
          cat !== expertCategory
        )
        .map(([cat, exp]) => ({ category: cat, ...exp }));
      
      return alternatives.length > 0 ? alternatives[0] : expert;
    }
    
    return expert;
  }

  // Generate follow-up questions for expert
  generateExpertQuestions(parsedQuery) {
    const questions = [];
    const { categories, cropType } = parsedQuery;
    
    if (categories.pests) {
      questions.push(
        "What are the specific symptoms you're observing?",
        "How long has the issue been present?",
        "Have you tried any treatments already?",
        "What percentage of the crop is affected?"
      );
    }
    
    if (categories.soil) {
      questions.push(
        "When was the last soil test done?",
        "What were the results?",
        "What crops have been grown previously?",
        "What fertilizers have been used recently?"
      );
    }
    
    if (cropType) {
      questions.push(
        `What is the current growth stage of your ${cropType}?`,
        `How old are the ${cropType} plants?`,
        `What variety of ${cropType} are you growing?`
      );
    }
    
    return questions.slice(0, 5); // Return top 5 questions
  }

  // Create expert response template
  createExpertResponseTemplate(request, expertInfo) {
    return {
      template: `
# Expert Response - ${expertInfo.name}
**Case ID:** ${request.id}
**Priority:** ${request.priority}
**Query:** ${request.userQuery}

## Analysis:
[Expert's analysis goes here]

## Recommendations:
1. [Primary recommendation]
2. [Secondary recommendation]
3. [Preventive measures]

## Immediate Actions:
- [Action 1]
- [Action 2]

## Follow-up Schedule:
- Day 1: [Task]
- Day 3: [Follow-up]
- Day 7: [Evaluation]

## Contact Information:
Expert: ${expertInfo.name}
Availability: ${expertInfo.availability}
Languages: ${expertInfo.languages.join(', ')}

## Additional Notes:
[Any additional notes or warnings]
      `,
      metadata: {
        expertName: expertInfo.name,
        expertCategory: request.expertCategory,
        responseTime: new Date().toISOString(),
        querySummary: request.userQuery.substring(0, 100) + '...'
      }
    };
  }

  // Validate escalation request
  validateEscalationRequest(request) {
    const errors = [];
    
    if (!request.userQuery || request.userQuery.trim().length < 10) {
      errors.push("Query must be at least 10 characters long");
    }
    
    if (!request.expertCategory) {
      errors.push("Expert category must be specified");
    }
    
    if (!this.expertCategories[request.expertCategory]) {
      errors.push("Invalid expert category");
    }
    
    if (!request.priority || !['high', 'normal'].includes(request.priority)) {
      errors.push("Priority must be 'high' or 'normal'");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Escalate to external service (mock)
  async sendToExternalService(request) {
    // Mock external service API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const externalId = `EXT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
        
        resolve({
          success: true,
          externalId,
          message: "Escalation request submitted successfully",
          estimatedProcessingTime: "1-2 business days"
        });
      }, 1000);
    });
  }

  // Get escalation statistics
  getEscalationStats(requests = []) {
    const stats = {
      total: requests.length,
      byCategory: {},
      byPriority: { high: 0, normal: 0 },
      byStatus: { pending: 0, assigned: 0, resolved: 0, closed: 0 },
      avgResponseTime: 0,
      slaCompliance: 0
    };
    
    if (requests.length === 0) {
      return stats;
    }
    
    requests.forEach(request => {
      // By category
      stats.byCategory[request.expertCategory] = (stats.byCategory[request.expertCategory] || 0) + 1;
      
      // By priority
      stats.byPriority[request.priority] = (stats.byPriority[request.priority] || 0) + 1;
      
      // By status
      stats.byStatus[request.status] = (stats.byStatus[request.status] || 0) + 1;
    });
    
    // Calculate average response time (mock)
    stats.avgResponseTime = "24 hours";
    
    // Calculate SLA compliance (mock)
    stats.slaCompliance = "85%";
    
    return stats;
  }
}

export default EscalationUtils;