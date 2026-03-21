// src/utils/agriculturalKB.js

// Agricultural knowledge database with crop-specific information
export const AGRICULTURAL_KB = {
  // Rice/Paddy information
  'rice': {
    'hi': {
      title: 'चावल की खेती',
      steps: [
        '1. भूमि की तैयारी: मिट्टी को 2-3 बार जोतें और समतल करें',
        '2. बीज दर: 20-25 किलोग्राम प्रति हेक्टेयर',
        '3. बुआई का समय: जून-जुलाई (खरीफ)',
        '4. सिंचाई: खेत में 5-7 सेमी पानी रखें',
        '5. उर्वरक: 100:60:40 किग्रा NPK प्रति हेक्टेयर',
        '6. कीट नियंत्रण: नीम का तेल या कीटनाशक का प्रयोग करें',
        '7. कटाई: 120-150 दिनों के बाद'
      ],
      cost: '₹25,000 - ₹35,000 प्रति हेक्टेयर',
      yield: '25-30 क्विंटल प्रति हेक्टेयर',
      profit: '₹40,000 - ₹60,000 प्रति हेक्टेयर',
      season: 'खरीफ (जून-नवंबर)',
      duration: '4-5 महीने'
    },
    'ta': {
      title: 'நெல் சாகுபடி',
      steps: [
        '1. நிலம் தயாரிப்பு: மண்ணை 2-3 முறை உழுது சமன்படுத்தவும்',
        '2. விதை விகிதம்: ஹெக்டேருக்கு 20-25 கிலோ',
        '3. விதைக்கும் நேரம்: ஜூன்-ஜூலை (கரிப்பு பருவம்)',
        '4. நீர்ப்பாசனம்: வயலில் 5-7 செ.மீ நீர் வைத்திருங்கள்',
        '5. உரம்: ஹெக்டேருக்கு 100:60:40 கிலோ NPK',
        '6. பூச்சி கட்டுப்பாடு: வேப்ப எண்ணெய் அல்லது பூச்சிக்கொல்லி பயன்படுத்தவும்',
        '7. அறுவடை: 120-150 நாட்களுக்குப் பிறகு'
      ],
      cost: 'ஹெக்டேருக்கு ₹25,000 - ₹35,000',
      yield: 'ஹெக்டேருக்கு 25-30 குவிண்டல்',
      profit: 'ஹெக்டேருக்கு ₹40,000 - ₹60,000',
      season: 'கரிப்பு பருவம் (ஜூன்-நவம்பர்)',
      duration: '4-5 மாதங்கள்'
    },
    'te': {
      title: 'వరి సాగు',
      steps: [
        '1. నేల సిద్ధం: నేలను 2-3 సార్లు దున్ని సమం చేయండి',
        '2. విత్తన రేటు: హెక్టారుకు 20-25 కిలోలు',
        '3. విత్తన సమయం: జూన్-జూలై (ఖరీఫ్)',
        '4. నీటిపారుదల: పొలంలో 5-7 సెం.మీ నీరు ఉంచండి',
        '5. ఎరువు: హెక్టారుకు 100:60:40 కిలోల NPK',
        '6. పురుగు నియంత్రణ: వేప నూనె లేదా పురుగుమందులు ఉపయోగించండి',
        '7. కోత: 120-150 రోజుల తర్వాత'
      ],
      cost: 'హెక్టారుకు ₹25,000 - ₹35,000',
      yield: 'హెక్టారుకు 25-30 క్వింటల్స్',
      profit: 'హెక్టారుకు ₹40,000 - ₹60,000',
      season: 'ఖరీఫ్ (జూన్-నవంబర్)',
      duration: '4-5 నెలలు'
    },
    // Add more languages as needed
  },
  
  // Wheat information
  'wheat': {
    'hi': {
      title: 'गेहूं की खेती',
      steps: [
        '1. भूमि की तैयारी: मिट्टी को गहराई से जोतें',
        '2. बीज दर: 100 किलोग्राम प्रति हेक्टेयर',
        '3. बुआई का समय: नवंबर-दिसंबर (रबी)',
        '4. सिंचाई: 3-4 सिंचाई (बुवाई, कल्ले, फूल)',
        '5. उर्वरक: 120:60:40 किग्रा NPK प्रति हेक्टेयर',
        '6. रोग नियंत्रण: फफूंदनाशक का छिड़काव',
        '7. कटाई: 120-140 दिनों के बाद'
      ],
      cost: '₹20,000 - ₹30,000 प्रति हेक्टेयर',
      yield: '40-50 क्विंटल प्रति हेक्टेयर',
      profit: '₹50,000 - ₹70,000 प्रति हेक्टेयर',
      season: 'रबी (नवंबर-मार्च)',
      duration: '4-5 महीने'
    }
  },
  
  // Cotton information
  'cotton': {
    'hi': {
      title: 'कपास की खेती',
      steps: [
        '1. भूमि: दोमट मिट्टी सर्वोत्तम',
        '2. बीज दर: 8-10 किलोग्राम प्रति हेक्टेयर',
        '3. बुआई: अप्रैल-मई',
        '4. सिंचाई: 8-10 सिंचाई आवश्यक',
        '5. उर्वरक: 80:40:40 किग्रा NPK',
        '6. कीट नियंत्रण: अंडे समय से नष्ट करें',
        '7. चुनाई: 150-180 दिनों में शुरू'
      ],
      cost: '₹40,000 - ₹60,000 प्रति हेक्टेयर',
      yield: '15-20 क्विंटल प्रति हेक्टेयर',
      profit: '₹60,000 - ₹1,00,000 प्रति हेक्टेयर',
      season: 'खरीफ (अप्रैल-दिसंबर)',
      duration: '6-7 महीने'
    }
  }
};

// Query processor
export const processAgriculturalQuery = (query, area, language = 'hi') => {
  const queryLower = query.toLowerCase();
  
  // Detect crop from query
  let crop = null;
  if (queryLower.includes('rice') || queryLower.includes('paddy') || 
      queryLower.includes('चावल') || queryLower.includes('धान') || 
      queryLower.includes('நெல்') || queryLower.includes('వరి')) {
    crop = 'rice';
  } else if (queryLower.includes('wheat') || queryLower.includes('गेहूं') || 
             queryLower.includes('கோதுமை') || queryLower.includes('గోధుమ')) {
    crop = 'wheat';
  } else if (queryLower.includes('cotton') || queryLower.includes('कपास') || 
             queryLower.includes('பருத்தி') || queryLower.includes('పత్తి')) {
    crop = 'cotton';
  } else if (queryLower.includes('sugarcane') || queryLower.includes('गन्ना')) {
    crop = 'sugarcane';
  } else if (queryLower.includes('maize') || queryLower.includes('मक्का')) {
    crop = 'maize';
  }
  
  if (!crop) {
    return {
      title: 'Crop not recognized',
      message: 'Please ask about rice, wheat, cotton, sugarcane, or maize.',
      language
    };
  }
  
  const cropInfo = AGRICULTURAL_KB[crop]?.[language] || AGRICULTURAL_KB[crop]?.['hi'];
  
  if (!cropInfo) {
    return {
      title: 'Information not available in this language',
      message: 'Switching to Hindi...',
      language: 'hi'
    };
  }
  
  // Calculate based on area if provided
  let areaMessage = '';
  let calculatedCost = '';
  let calculatedYield = '';
  let calculatedProfit = '';
  
  if (area && !isNaN(parseFloat(area))) {
    const areaNum = parseFloat(area);
    const costMatch = cropInfo.cost.match(/₹([\d,]+)/);
    const yieldMatch = cropInfo.yield.match(/([\d,]+)/);
    const profitMatch = cropInfo.profit.match(/₹([\d,]+)/);
    
    if (costMatch) {
      const baseCost = parseInt(costMatch[1].replace(',', ''));
      calculatedCost = `₹${(baseCost * areaNum).toLocaleString('en-IN')} for ${areaNum} hectare`;
    }
    
    if (yieldMatch) {
      const baseYield = parseInt(yieldMatch[1].replace(',', ''));
      calculatedYield = `${(baseYield * areaNum).toLocaleString('en-IN')} quintals from ${areaNum} hectare`;
    }
    
    if (profitMatch) {
      const baseProfit = parseInt(profitMatch[1].replace(',', ''));
      calculatedProfit = `₹${(baseProfit * areaNum).toLocaleString('en-IN')} from ${areaNum} hectare`;
    }
    
    areaMessage = `For ${areaNum} hectare field:\n• Cost: ${calculatedCost}\n• Expected Yield: ${calculatedYield}\n• Expected Profit: ${calculatedProfit}\n\n`;
  }
  
  return {
    title: cropInfo.title,
    steps: cropInfo.steps,
    summary: `${areaMessage}Season: ${cropInfo.season}\nDuration: ${cropInfo.duration}\nCost: ${cropInfo.cost}\nYield: ${cropInfo.yield}\nProfit: ${cropInfo.profit}`,
    language
  };
};