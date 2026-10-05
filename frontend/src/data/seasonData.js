// Season-Aware October 2026 Agricultural Database for Digital Krishi across all of India
// Sourced from: ICAR, State Agricultural Universities (PAU, HAU, MPKV, AAU, TNAU, UAS, etc.), CACP, and PRSAC/NASA FIRMS

export const OFFICIAL_MSP_2025_26 = {
  paddyCommon: { price: 2369, unit: "₹ / quintal", season: "KMS 2025-26", source: "CACP / agricoop.nic.in" },
  paddyGradeA: { price: 2389, unit: "₹ / quintal", season: "KMS 2025-26", source: "CACP / agricoop.nic.in" },
  mustard: { price: 5950, unit: "₹ / quintal", season: "RMS 2025-26", source: "CACP / agricoop.nic.in" },
  cottonMedium: { price: 7521, unit: "₹ / quintal", season: "KMS 2025-26", source: "CACP / agricoop.nic.in" },
  wheat: { price: 2425, unit: "₹ / quintal", season: "RMS 2025-26", source: "CACP / agricoop.nic.in" },
  gram: { price: 5650, unit: "₹ / quintal", season: "RMS 2025-26", source: "CACP / agricoop.nic.in" }
};

export const OCTOBER_STATE_DATA = {
  Punjab: {
    stateCode: "PB",
    researchSource: "Punjab Agricultural University (PAU) Advisory Bulletin",
    satelliteSource: "PRSAC & NASA FIRMS Active Fire Satellite Feed (VIIRS 375m)",
    advisory: {
      en: "Peak Paddy (PR-126) harvesting active. Keep moisture below 17% for mandi procurement. Note: PAU recommended wheat sowing window is Oct 25 to Nov 15 when temperatures drop below 22°C. Early October tasks: apply bio-decomposer/SMS for stubble, avoid field burning, and procure certified wheat seed (PBW-826, DBW-187).",
      pa: "ਝੋਨੇ (PR-126) ਦੀ ਵਾਢੀ ਚੱਲ ਰਹੀ ਹੈ। ਸਰਕਾਰੀ ਖਰੀਦ ਲਈ ਨਮੀ 17% ਤੋਂ ਘੱਟ ਰੱਖੋ। ਧਿਆਨ ਦਿਓ: ਪੀ.ਏ.ਯੂ. ਅਨੁਸਾਰ ਕਣਕ ਦੀ ਬਿਜਾਈ ਦਾ ਸਹੀ ਸਮਾਂ 25 ਅਕਤੂਬਰ ਤੋਂ 15 ਨਵੰਬਰ ਹੈ। ਅਕਤੂਬਰ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ: ਪਰਾਲੀ ਨਾ ਸਾੜੋ, ਬਾਇਓ-ਡੀਕੰਪੋਜ਼ਰ ਜਾਂ ਮਲਚਰ ਵਰਤੋ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਬੀਜ (PBW-826) ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।",
      hi: "धान (PR-126) कटाई जारी। सरकारी खरीद हेतु नमी 17% से कम रखें। पीएयू के अनुसार गेहूं बुवाई का सही समय 25 अक्टूबर से 15 नवंबर है। अक्टूबर में पराली न जलाएं, सुपर सीडर तैयार रखें।"
    },
    todayActions: [
      {
        id: "pb-act-1",
        type: "sell",
        badge: "urgent",
        icon: "🌾",
        title: {
          en: "Harvest & Check Grain Moisture (<17%)",
          pa: "ਝੋਨੇ ਦੀ ਵਾਢੀ ਅਤੇ ਨਮੀ ਜਾਂਚ (<17%)",
          hi: "धान कटाई एवं नमी परीक्षण (<17%)"
        },
        desc: {
          en: "PR-126 paddy is ready for harvest. Test moisture with digital meter before loading trolleys for Mandi. Official KMS 2025-26 MSP is ₹2,369 (Common) and ₹2,389 (Grade A). Deductions apply if moisture exceeds 17%.",
          pa: "PR-126 ਝੋਨਾ ਪੱਕ ਚੁੱਕਾ ਹੈ। ਮੰਡੀ ਲਿਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਨਮੀ ਮੀਟਰ ਨਾਲ ਚੈੱਕ ਕਰੋ। ਸਰਕਾਰੀ ਐੱਮ.ਐੱਸ.ਪੀ ₹2,369 (ਆਮ) ਅਤੇ ₹2,389 (ਗ੍ਰੇਡ-ਏ) ਹੈ। 17% ਤੋਂ ਵੱਧ ਨਮੀ 'ਤੇ ਕਟੌਤੀ ਹੁੰਦੀ ਹੈ।",
          hi: "PR-126 धान की कटाई करें। मंडी ले जाने से पहले नमी मीटर से जांचें। सरकारी एमएसपी ₹2,369 (सामान्य) व ₹2,389 (ग्रेड-ए) है।"
        },
        actionLink: "/market-explorer",
        actionText: { en: "View MSP & Mandi Details", pa: "ਐੱਮ.ਐੱਸ.ਪੀ ਅਤੇ ਮੰਡੀ ਵੇਰਵਾ", hi: "एमएसपी व मंडी विवरण" }
      },
      {
        id: "pb-act-2",
        type: "stubble",
        badge: "urgent",
        icon: "🚜",
        title: {
          en: "In-situ Stubble Management (Zero Burning)",
          pa: "ਪਰਾਲੀ ਦਾ ਖੇਤ ਵਿੱਚ ਪ੍ਰਬੰਧ (ਅੱਗ ਨਾ ਲਗਾਓ)",
          hi: "पराली का खेत में प्रबंधन (आग न लगाएं)"
        },
        desc: {
          en: "PRSAC & NASA satellite monitoring active. Individual farmers get 50% subsidy; Cooperatives & CHCs get up to 80% on Super Seeder, Happy Seeder & Mulchers. Check eligibility at agrimachinery.nic.in.",
          pa: "ਪੀ.ਆਰ.ਐੱਸ.ਏ.ਸੀ ਅਤੇ ਨਾਸਾ ਸੈਟੇਲਾਈਟ ਨਿਗਰਾਨੀ ਚਾਲੂ ਹੈ। ਨਿੱਜੀ ਕਿਸਾਨਾਂ ਨੂੰ 50% ਅਤੇ ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ/CHCs ਨੂੰ 80% ਤੱਕ ਸਬਸਿਡੀ ਮਿਲਦੀ ਹੈ। agrimachinery.nic.in 'ਤੇ ਯੋਗਤਾ ਚੈੱਕ ਕਰੋ।",
          hi: "उपग्रह निगरानी सक्रिय। व्यक्तिगत किसानों को 50% और सहकारी समितियों/सीएचसी को 80% तक सब्सिडी मिलती है। agrimachinery.nic.in पर पात्रता जांचें।"
        },
        actionLink: "/schemes",
        actionText: { en: "Check CRM Machinery Subsidy", pa: "ਮਸ਼ੀਨਰੀ ਸਬਸਿਡੀ ਚੈੱਕ ਕਰੋ", hi: "मशीनरी सब्सिडी जांचें" }
      },
      {
        id: "pb-act-3",
        type: "seed",
        badge: "recommended",
        icon: "🌱",
        title: {
          en: "Procure & Test Wheat Seed for Oct 25 Window",
          pa: "25 ਅਕਤੂਬਰ ਬਿਜਾਈ ਲਈ ਕਣਕ ਦੇ ਪ੍ਰਮਾਣਿਤ ਬੀਜ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ",
          hi: "25 अक्टूबर बुवाई हेतु गेहूं बीज का प्रबंध करें"
        },
        desc: {
          en: "Do not sow wheat before Oct 25 (high temps cause poor tillering). Procure PAU recommended seed (PBW-826, DBW-187). Conduct home germination test and arrange Trichoderma for seed treatment.",
          pa: "25 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਕਣਕ ਨਾ ਬੀਜੋ (ਗਰਮੀ ਕਾਰਨ ਫੁਟਾਰਾ ਘਟਦਾ ਹੈ)। ਪੀ.ਏ.ਯੂ. ਸਿਫਾਰਸ਼ੀ ਬੀਜ (PBW-826) ਲਵੋ ਅਤੇ ਬੀਜ ਸੋਧ ਲਈ ਟ੍ਰਾਈਕੋਡਰਮਾ ਤਿਆਰ ਰੱਖੋ।",
          hi: "25 अक्टूबर से पहले गेहूं न बोएं (गर्मी से फुटाव कम होता है)। पीएयू अनुशंसित बीज (PBW-826) खरीदें और बीज उपचार हेतु ट्राइकोडर्मा रखें।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "PAU Seed Package Guide", pa: "ਪੀ.ਏ.ਯੂ. ਬੀਜ ਗਾਈਡ", hi: "बीज पैकेज गाइड" }
      }
    ],
    alerts: [
      {
        id: "pb-alt-1",
        severity: "critical",
        icon: "🛰️",
        sourceBadge: "PRSAC & NASA FIRMS Satellite",
        title: {
          en: "Satellite Fire Monitoring Notice (CAQM Enforcement)",
          pa: "ਸੈਟੇਲਾਈਟ ਫਾਇਰ ਨਿਗਰਾਨੀ ਨੋਟਿਸ (ਹਵਾ ਗੁਣਵੱਤਾ ਕਮਿਸ਼ਨ)",
          hi: "उपग्रह आग निगरानी नोटिस (सीएक्यूएम नियम)"
        },
        desc: {
          en: "Remote sensing active across Punjab. Air Quality Commission imposing strict environmental damages for farm fires. Avail Custom Hiring Centres for zero-till machinery.",
          pa: "ਪੰਜਾਬ ਭਰ ਵਿੱਚ ਰਿਮੋਟ ਸੈਂਸਿੰਗ ਨਿਗਰਾਨੀ ਚਾਲੂ ਹੈ। ਪਰਾਲੀ ਸਾੜਨ 'ਤੇ ਜੁਰਮਾਨਾ ਹੋ ਸਕਦਾ ਹੈ। ਨਜ਼ਦੀਕੀ ਕਸਟਮ ਹਾਇਰਿੰਗ ਸੈਂਟਰ ਤੋਂ ਮਸ਼ੀਨਾਂ ਬੁੱਕ ਕਰੋ।",
          hi: "पंजाब में सैटेलाइट निगरानी सक्रिय। खेत में आग लगाने पर चालान का प्रावधान। नजदीकी कस्टम हायरिंग सेंटर से मशीनें लें।"
        }
      }
    ]
  },

  Haryana: {
    stateCode: "HR",
    researchSource: "ICAR-CSSRI & CCS HAU Advisory",
    satelliteSource: "NASA FIRMS & HARSAC Active Fire Monitoring",
    advisory: {
      en: "Basmati rice harvesting in progress across Karnal & Kaithal. Apply for Haryana Govt CRM incentive (₹1,000/acre) for non-burning stubble management on Meri Fasal Mera Byora. Mustard sowing window is open (Oct 1 - Oct 20). Wheat sowing starts late October.",
      pa: "ਕਰਨਾਲ ਅਤੇ ਕੈਥਲ ਵਿੱਚ ਬਾਸਮਤੀ ਦੀ ਵਾਢੀ ਚੱਲ ਰਹੀ ਹੈ। ਪਰਾਲੀ ਨਾ ਸਾੜਨ ਲਈ 'ਮੇਰੀ ਫਸਲ ਮੇਰਾ ਬਿਓਰਾ' 'ਤੇ ₹1,000 ਪ੍ਰਤੀ ਏਕੜ ਪ੍ਰੋਤਸਾਹਨ ਅਪਲਾਈ ਕਰੋ। ਸਰ੍ਹੋਂ ਦੀ ਬਿਜਾਈ ਦਾ ਸਮਾਂ ਚੱਲ ਰਿਹਾ ਹੈ। ਕਣਕ ਦੀ ਬਿਜਾਈ ਅਕਤੂਬਰ ਦੇ ਅਖ਼ੀਰ ਵਿੱਚ ਸ਼ੁਰੂ ਹੋਵੇਗੀ।",
      hi: "करनाल व कैथल में बासमती कटाई जारी। 'मेरी फसल मेरा ब्योरा' पर पराली प्रबंधन हेतु ₹1,000/एकड़ प्रोत्साहन दर्ज करें। सरसों बुवाई का सही समय है। गेहूं बुवाई अक्टूबर अंत में करें।"
    },
    todayActions: [
      {
        id: "hr-act-1",
        type: "sell",
        badge: "urgent",
        icon: "🌾",
        title: {
          en: "Harvest Basmati (CSR-30) at 17% Moisture",
          pa: "ਬਾਸਮਤੀ (CSR-30) ਦੀ 17% ਨਮੀ 'ਤੇ ਵਾਢੀ ਕਰੋ",
          hi: "बासमती (CSR-30) की 17% नमी पर कटाई करें"
        },
        desc: {
          en: "Ensure grain moisture does not exceed 17% to avoid dockage at Taraori and Karnal mandis.",
          pa: "ਤਰਾਵੜੀ ਅਤੇ ਕਰਨਾਲ ਮੰਡੀ ਵਿੱਚ ਵਧੀਆ ਭਾਅ ਲਈ ਨਮੀ 17% ਤੋਂ ਘੱਟ ਰੱਖੋ।",
          hi: "तराओड़ी व करनाल मंडी में उचित मूल्य हेतु नमी 17% से कम रखें।"
        },
        actionLink: "/market-explorer",
        actionText: { en: "Check Mandi Rates", pa: "ਮੰਡੀ ਭਾਅ ਦੇਖੋ", hi: "मंडी भाव देखें" }
      },
      {
        id: "hr-act-2",
        type: "seed",
        badge: "recommended",
        icon: "🌱",
        title: {
          en: "Sow Mustard (RH-749) in Oct 1-20 Window",
          pa: "ਸਰ੍ਹੋਂ (RH-749) ਦੀ ਬਿਜਾਈ ਮੁਕੰਮਲ ਕਰੋ",
          hi: "सरसों (RH-749) की बुवाई 20 अक्टूबर से पूर्व करें"
        },
        desc: {
          en: "Sow 1.5 kg seed/acre with seed drill at 4-5 cm depth. Basal dose: 50 kg SSP (for phosphorus & sulphur) + 20 kg Urea.",
          pa: "1.5 ਕਿਲੋ ਬੀਜ ਪ੍ਰਤੀ ਏਕੜ ਸੀਡ ਡਰਿੱਲ ਨਾਲ ਬੀਜੋ। ਸਲਫਰ ਲਈ 50 ਕਿਲੋ ਸਿੰਗਲ ਸੁਪਰ ਫਾਸਫੇਟ ਪਾਓ।",
          hi: "1.5 किग्रा बीज प्रति एकड़ ड्रिल करें। सल्फर व फास्फोरस हेतु 50 किग्रा एसएसपी डालें।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "HAU Mustard Guide", pa: "ਸਰ੍ਹੋਂ ਗਾਈਡ", hi: "सरसों गाइड" }
      }
    ],
    alerts: [
      {
        id: "hr-alt-1",
        severity: "critical",
        icon: "🛰️",
        sourceBadge: "HARSAC & CAQM Enforcement",
        title: {
          en: "Stubble Management Incentive Notice",
          pa: "ਪਰਾਲੀ ਪ੍ਰੋਤਸਾਹਨ ਸਕੀਮ ਨੋਟਿਸ (₹1,000/ਏਕੜ)",
          hi: "पराली प्रबंधन प्रोत्साहन नोटिस (₹1,000/एकड़)"
        },
        desc: {
          en: "Register operational CRM machinery on Meri Fasal Mera Byora portal to receive direct account incentive. Satellite thermal imaging active.",
          pa: "'ਮੇਰੀ ਫਸਲ ਮੇਰਾ ਬਿਓਰਾ' 'ਤੇ ਰਜਿਸਟਰ ਕਰਕੇ ₹1,000 ਪ੍ਰਤੀ ਏਕੜ ਪ੍ਰੋਤਸਾਹਨ ਲਓ। ਸੈਟੇਲਾਈਟ ਨਿਗਰਾਨੀ ਚਾਲੂ ਹੈ।",
          hi: "मेरी फसल मेरा ब्योरा पर पंजीकरण कर ₹1,000 प्रति एकड़ प्रोत्साहन पाएं। सैटेलाइट थर्मल इमेजिंग सक्रिय।"
        }
      }
    ]
  },

  "Uttar Pradesh": {
    stateCode: "UP",
    researchSource: "ICAR-IISR & CSA University of Agriculture",
    satelliteSource: "UP Remote Sensing Applications Centre",
    advisory: {
      en: "Early potato (Kufri Pukhraj) planting underway in Western UP. Harvest medium duration paddy and clear stubble. Wheat seedbed preparation to begin in late October.",
      pa: "ਪੱਛਮੀ ਯੂ.ਪੀ ਵਿੱਚ ਅਗੇਤੇ ਆਲੂ ਦੀ ਬਿਜਾਈ ਚੱਲ ਰਹੀ ਹੈ। ਝੋਨੇ ਦੀ ਵਾਢੀ ਕਰੋ। ਕਣਕ ਦੀ ਤਿਆਰੀ ਅਕਤੂਬਰ ਦੇ ਅਖ਼ੀਰ ਵਿੱਚ ਸ਼ੁਰੂ ਹੋਵੇਗੀ।",
      hi: "आगरा व पश्चिमी यूपी में अगेती आलू (कुफरी पुखराज) रोपाई जारी। धान कटाई कर अवशेष प्रबंधन करें। गेहूं की तैयारी अक्टूबर अंत में करें।"
    },
    todayActions: [
      {
        id: "up-act-1",
        type: "seed",
        badge: "urgent",
        icon: "🥔",
        title: {
          en: "Plant Early Potato Tubers with Fungicide Dip",
          pa: "ਆਲੂ ਦੇ ਬੀਜ ਨੂੰ ਉੱਲੀਨਾਸ਼ਕ ਵਿੱਚ ਡੁਬੋ ਕੇ ਬੀਜੋ",
          hi: "आलू कंद को फफूंदनाशी उपचार कर लगाएं"
        },
        desc: {
          en: "Dip seed tubers in Mancozeb (2.5g/L water) for 10 mins before planting on ridges. Apply 10 T/ha well-decomposed FYM.",
          pa: "ਆਲੂਆਂ ਨੂੰ ਮੈਨਕੋਜ਼ੇਬ ਘੋਲ ਵਿੱਚ 10 ਮਿੰਟ ਡੁਬੋ ਕੇ ਵੱਟਾਂ 'ਤੇ ਲਗਾਓ। ਖੇਤ ਵਿੱਚ ਚੰਗੀ ਰੂੜੀ ਖਾਦ ਪਾਓ।",
          hi: "आलू कंद को मैंकोजेब (2.5g/L) में 10 मिनट डुबोकर मेड़ों पर लगाएं।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "Potato Planting Guide", pa: "ਆਲੂ ਬਿਜਾਈ ਗਾਈਡ", hi: "आलू रोपाई गाइड" }
      }
    ],
    alerts: [
      {
        id: "up-alt-1",
        severity: "warning",
        icon: "🌾",
        sourceBadge: "UP Food & Civil Supplies",
        title: {
          en: "Paddy e-Uparjan Procurement Registration",
          pa: "ਝੋਨੇ ਦੀ ਸਰਕਾਰੀ ਖਰੀਦ ਈ-ਉਪਾਰਜਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
          hi: "धान सरकारी खरीद ई-उपार्जन पंजीकरण"
        },
        desc: {
          en: "Book procurement slot on fcs.up.gov.in for Paddy MSP (₹2,369 Common / ₹2,389 Grade A).",
          pa: "ਸਰਕਾਰੀ ਖਰੀਦ ਐੱਮ.ਐੱਸ.ਪੀ (₹2,369) ਲਈ fcs.up.gov.in 'ਤੇ ਸਲਾਟ ਬੁੱਕ ਕਰੋ।",
          hi: "सरकारी खरीद एमएसपी (₹2,369) हेतु fcs.up.gov.in पर स्लॉट बुक करें।"
        }
      }
    ]
  },

  Rajasthan: {
    stateCode: "RJ",
    researchSource: "SKNAU Jobner & Directorate of Rapeseed-Mustard Research (DRMR)",
    satelliteSource: "State Agromet & NASA FIRMS",
    advisory: {
      en: "Peak temperature window for Mustard (Sarson) sowing across Alwar, Bharatpur and Jaipur. Complete field plowing and apply basal fertilizer before soil moisture dries up. Bajra harvesting active.",
      pa: "ਅਲਵਰ, ਭਰਤਪੁਰ ਅਤੇ ਜੈਪੁਰ ਖੇਤਰਾਂ ਵਿੱਚ ਸਰ੍ਹੋਂ ਦੀ ਬਿਜਾਈ ਦਾ ਅਨੁਕੂਲ ਸਮਾਂ। ਮਿੱਟੀ ਦੀ ਨਮੀ ਖਤਮ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਵਹਾਈ ਅਤੇ ਬਿਜਾਈ ਕਰੋ। ਬਾਜਰੇ ਦੀ ਗਹਾਈ ਜਾਰੀ ਹੈ।",
      hi: "अलवर, भरतपुर व जयपुर में सरसों बुवाई का अनुकूल समय। नमी सूखने से पहले जुताई व बुवाई पूर्ण करें। बाजरा गहाई कार्य जारी है।"
    },
    todayActions: [
      {
        id: "rj-act-1",
        type: "seed",
        badge: "urgent",
        icon: "🌱",
        title: {
          en: "Sow Mustard (Giriraj / DRMRIJ-31)",
          pa: "ਸਰ੍ਹੋਂ (ਗਿਰੀਰਾਜ / ਪੂਸਾ ਬੋਲਡ) ਦੀ ਬਿਜਾਈ ਕਰੋ",
          hi: "सरसों (गिरिराज / पूसा बोल्ड) बुवाई करें"
        },
        desc: {
          en: "Treat seed with Carbendazim (2g/kg seed). Drill at 30cm row spacing. Official 2025-26 Mustard MSP is ₹5,950/qtl.",
          pa: "ਕਾਰਬੈਂਡਾਜ਼ਿਮ (2 ਗ੍ਰਾਮ/ਕਿਲੋ) ਨਾਲ ਬੀਜ ਸੋਧੋ। ਸਰ੍ਹੋਂ ਦਾ ਸਰਕਾਰੀ ਐੱਮ.ਐੱਸ.ਪੀ ₹5,950 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ।",
          hi: "कार्बेन्डाजिम से बीज उपचार करें। 2025-26 सरसों सरकारी एमएसपी ₹5,950/क्विंटल है।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "Mustard Sowing Calculator", pa: "ਸਰ੍ਹੋਂ ਕੈਲਕੁਲੇਟਰ", hi: "सरसों कैलकुलेटर" }
      }
    ],
    alerts: [
      {
        id: "rj-alt-1",
        severity: "warning",
        icon: "💧",
        sourceBadge: "State Agromet Cell",
        title: {
          en: "Conserve Soil Moisture for Rabi Pulses",
          pa: "ਹਾੜ੍ਹੀ ਫਸਲਾਂ ਲਈ ਨਮੀ ਸੰਭਾਲਣ ਦੀ ਸਲਾਹ",
          hi: "रबी फसलों हेतु नमी संरक्षण सलाह"
        },
        desc: {
          en: "Perform planking (suhaga) immediately after evening plowing to conserve moisture for Gram (Chana) sowing.",
          pa: "ਸ਼ਾਮ ਦੀ ਵਹਾਈ ਤੋਂ ਤੁਰੰਤ ਬਾਅਦ ਸੁਹਾਗਾ ਮਾਰੋ ਤਾਂ ਜੋ ਛੋਲਿਆਂ ਦੀ ਬਿਜਾਈ ਲਈ ਨਮੀ ਬਚੀ ਰਹੇ।",
          hi: "शाम की जुताई के तुरंत बाद पाटा लगाएं ताकि चना बुवाई हेतु नमी सुरक्षित रहे।"
        }
      }
    ]
  },

  "Madhya Pradesh": {
    stateCode: "MP",
    researchSource: "JNKVV Jabalpur & RVSKVV Gwalior Advisory",
    satelliteSource: "MP Agromet & NASA FIRMS",
    advisory: {
      en: "Soybean harvesting in final stages. Utilize black soil residual moisture for early sowing of Desi Chana (JG-14) and Garlic. Wheat sowing to commence late October.",
      pa: "ਸੋਇਆਬੀਨ ਦੀ ਵਾਢੀ ਆਖ਼ਰੀ ਪੜਾਅ 'ਤੇ। ਕਾਲੀ ਮਿੱਟੀ ਦੀ ਨਮੀ ਦਾ ਲਾਭ ਲੈ ਕੇ ਦੇਸੀ ਛੋਲਿਆਂ (JG-14) ਦੀ ਬਿਜਾਈ ਸ਼ੁਰੂ ਕਰੋ।",
      hi: "सोयाबीन कटाई अंतिम चरण में। काली मिट्टी की बची नमी में देसी चना (JG-14) की समय पर बुवाई करें।"
    },
    todayActions: [
      {
        id: "mp-act-1",
        type: "seed",
        badge: "urgent",
        icon: "🌱",
        title: {
          en: "Sow Chickpea (JG-14 / JG-16) with Bio-Fertilizer",
          pa: "ਛੋਲੇ (JG-14) ਦੀ ਬਿਜਾਈ ਰਾਈਜ਼ੋਬੀਅਮ ਨਾਲ ਸੋਧ ਕੇ ਕਰੋ",
          hi: "चना (JG-14) राइजोबियम उपचारित कर बोएं"
        },
        desc: {
          en: "Inoculate seeds with Rhizobium + PSB culture (20g/kg). Sow at 8-10 cm depth in moist soil.",
          pa: "ਬੀਜ ਨੂੰ ਰਾਈਜ਼ੋਬੀਅਮ ਕਲਚਰ ਨਾਲ ਸੋਧ ਕੇ 8-10 ਸੈਂਟੀਮੀਟਰ ਡੂੰਘਾਈ 'ਤੇ ਬੀਜੋ।",
          hi: "बीज को राइजोबियम व पीएसबी से उपचारित कर 8-10 सेमी गहराई पर बोएं।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "Chana Package Guide", pa: "ਛੋਲੇ ਗਾਈਡ", hi: "चना पैकेज गाइड" }
      }
    ],
    alerts: [
      {
        id: "mp-alt-1",
        severity: "warning",
        icon: "💧",
        sourceBadge: "JNKVV Soil Advisory",
        title: {
          en: "Soil Moisture Window Closing for Gram",
          pa: "ਛੋਲਿਆਂ ਲਈ ਨਮੀ ਦਾ ਸਮਾਂ ਸੀਮਤ",
          hi: "चना बुवाई हेतु नमी समय सीमित"
        },
        desc: {
          en: "Expedite Chana sowing in heavy soils before top 10cm moisture depletes.",
          pa: "ਉੱਪਰਲੀ ਨਮੀ ਸੁੱਕਣ ਤੋਂ ਪਹਿਲਾਂ ਛੋਲਿਆਂ ਦੀ ਬਿਜਾਈ ਮੁਕੰਮਲ ਕਰੋ।",
          hi: "ऊपरी नमी सूखने से पहले चना बुवाई शीघ्र पूर्ण करें।"
        }
      }
    ]
  },

  Maharashtra: {
    stateCode: "MH",
    researchSource: "MPKV Rahuri, PDKV Akola & VNMKV Parbhani",
    satelliteSource: "Maharashtra Remote Sensing Application Centre (MRSAC)",
    advisory: {
      en: "Peak picking of Kharif Cotton across Vidarbha and Marathwada. Install pheromone traps for Pink Bollworm (PBW). Complete Soybean harvesting and threshing before unseasonal rain. Sow Rabi Jowar (Maldandi) and Chickpea (Digvijay) in residual moisture.",
      pa: "ਮਹਾਰਾਸ਼ਟਰ ਵਿੱਚ ਕਪਾਹ ਦੀ ਚੁਗਾਈ ਅਤੇ ਸੋਇਆਬੀਨ ਦੀ ਵਾਢੀ ਚੱਲ ਰਹੀ ਹੈ। ਗੁਲਾਬੀ ਸੁੰਡੀ ਤੋਂ ਬਚਾਅ ਲਈ ਫੇਰੋਮੋਨ ਟਰੈਪ ਲਗਾਓ। ਹਾੜ੍ਹੀ ਜਵਾਰ ਅਤੇ ਛੋਲਿਆਂ ਦੀ ਬਿਜਾਈ ਕਰੋ।",
      hi: "विदर्भ व मराठवाड़ा में कपास चुनाई व सोयाबीन कटाई चरम पर। गुलाबी सुंडी निगरानी हेतु फेरोमोन प्रपंच लगाएं। रबी ज्वार (मालदांडी) व चना (दिग्विजय) की बुवाई करें।"
    },
    todayActions: [
      {
        id: "mh-act-1",
        type: "spray",
        badge: "urgent",
        icon: "🐛",
        title: {
          en: "Pink Bollworm (PBW) Monitoring in Cotton",
          pa: "ਨਰਮੇ ਵਿੱਚ ਗੁਲਾਬੀ ਸੁੰਡੀ ਦੀ ਨਿਗਰਾਨੀ",
          hi: "कपास में गुलाबी सुंडी निगरानी एवं नियंत्रण"
        },
        desc: {
          en: "Install 5 pheromone traps/ha. If trap catch exceeds 8 moths/day for 3 consecutive days, spray Profenofos 50EC (2ml/L) or Emamectin Benzoate (0.5g/L).",
          pa: "ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ 5 ਫੇਰੋਮੋਨ ਟਰੈਪ ਲਗਾਓ। ਜੇਕਰ ਕੀੜੇ ਜ਼ਿਆਦਾ ਹੋਣ ਤਾਂ ਇਮਾਮੈਕਟਿਨ ਬੈਂਜ਼ੋਏਟ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।",
          hi: "प्रति हेक्टेयर 5 फेरोमोन ट्रैप लगाएं। 8 पतंगे/दिन से अधिक होने पर इमामेक्टिन बेंजोएट (0.5g/L) का छिड़काव करें।"
        },
        actionLink: "/pest",
        actionText: { en: "PBW Advisory Protocol", pa: "ਕੀਟ ਸਲਾਹ ਪ੍ਰੋਟੋਕੋਲ", hi: "कीट नियंत्रण प्रोटोकॉल" }
      },
      {
        id: "mh-act-2",
        type: "seed",
        badge: "recommended",
        icon: "🌾",
        title: {
          en: "Sow Rabi Jowar (M-35-1 / Maldandi)",
          pa: "ਹਾੜ੍ਹੀ ਜਵਾਰ (ਮਾਲਦੰਡੀ) ਦੀ ਬਿਜਾਈ ਕਰੋ",
          hi: "रबी ज्वार (मालदांडी M-35-1) की बुवाई करें"
        },
        desc: {
          en: "Sow by Oct 15 at 45cm row spacing to capture deep soil moisture. Seed rate: 10 kg/ha with Azotobacter treatment.",
          pa: "ਨਮੀ ਖਤਮ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ 15 ਅਕਤੂਬਰ ਤੱਕ ਹਾੜ੍ਹੀ ਜਵਾਰ ਦੀ ਬਿਜਾਈ ਮੁਕੰਮਲ ਕਰੋ।",
          hi: "गहरी नमी का लाभ लेने हेतु 15 अक्टूबर तक बुवाई पूर्ण करें। एजोटोबैक्टर से बीज उपचारित करें।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "Rabi Jowar Guide", pa: "ਜਵਾਰ ਬਿਜਾਈ ਗਾਈਡ", hi: "रबी ज्वार गाइड" }
      }
    ],
    alerts: [
      {
        id: "mh-alt-1",
        severity: "warning",
        icon: "🌧️",
        sourceBadge: "IMD Pune Agro-Met Division",
        title: {
          en: "Post-Monsoon Showers Risk in Southern Marathwada",
          pa: "ਮਰਾਠਵਾੜਾ ਵਿੱਚ ਬੇਮੌਸਮੀ ਮੀਂਹ ਦਾ ਖ਼ਤਰਾ",
          hi: "दक्षिणी मराठवाड़ा में बेमौसम बारिश सतर्कता"
        },
        desc: {
          en: "Move threshed soybean and picked cotton to covered storage yards immediately.",
          pa: "ਕੱਢੀ ਹੋਈ ਸੋਇਆਬੀਨ ਅਤੇ ਕਪਾਹ ਨੂੰ ਤੁਰੰਤ ਢੱਕ ਕੇ ਸੁਰੱਖਿਅਤ ਥਾਂ 'ਤੇ ਰੱਖੋ।",
          hi: "निकाली गई सोयाबीन और चुनी हुई कपास को तुरंत सुरक्षित शेड में रखें।"
        }
      }
    ]
  },

  Gujarat: {
    stateCode: "GJ",
    researchSource: "Anand Agricultural University (AAU) & JAU Junagadh",
    satelliteSource: "BISAG-N Gujarat Satellite Cell",
    advisory: {
      en: "Groundnut (Mungfali) digging and drying in Saurashtra. BT Cotton 2nd/3rd picking active. Prepare land for winter Cumin (Jeera), Wheat (GW-496) and Mustard in North Gujarat.",
      pa: "ਗੁਜਰਾਤ ਵਿੱਚ ਮੂੰਗਫਲੀ ਦੀ ਪੁਟਾਈ ਅਤੇ ਕਪਾਹ ਦੀ ਚੁਗਾਈ ਚੱਲ ਰਹੀ ਹੈ। ਜੀਰਾ ਅਤੇ ਹਾੜ੍ਹੀ ਕਣਕ ਲਈ ਖੇਤ ਤਿਆਰ ਕਰੋ।",
      hi: "सौराष्ट्र में मूंगफली खुदाई एवं कपास चुनाई जारी। उत्तर गुजरात में जीरा, गेहूं (GW-496) एवं सरसों बुवाई हेतु खेत तैयार करें।"
    },
    todayActions: [
      {
        id: "gj-act-1",
        type: "sell",
        badge: "urgent",
        icon: "🥜",
        title: {
          en: "Sun-Dry Harvested Groundnut Pods (<8% Moisture)",
          pa: "ਮੂੰਗਫਲੀ ਨੂੰ ਧੁੱਪ ਵਿੱਚ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਕਾਓ (<8% ਨਮੀ)",
          hi: "मूंगफली की फलियां धूप में सुखाएं (<8% नमी)"
        },
        desc: {
          en: "Invert groundnut plants for 3-5 days field curing. Dry pods below 8% moisture to prevent aflatoxin contamination before Mandi auction.",
          pa: "ਐਫਲਾਟੌਕਸਿਨ ਉੱਲੀ ਤੋਂ ਬਚਾਅ ਲਈ ਮੂੰਗਫਲੀ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਕਾ ਕੇ ਨਮੀ 8% ਤੋਂ ਘੱਟ ਕਰੋ।",
          hi: "एफ्लाटॉक्सिन फफूंद से बचाव हेतु फलियों को धूप में अच्छी तरह सुखाकर नमी 8% से कम करें।"
        },
        actionLink: "/market-explorer",
        actionText: { en: "Groundnut Mandi Rates", pa: "ਮੂੰਗਫਲੀ ਮੰਡੀ ਭਾਅ", hi: "मूंगफली मंडी भाव" }
      }
    ],
    alerts: [
      {
        id: "gj-alt-1",
        severity: "warning",
        icon: "🌿",
        sourceBadge: "JAU Agro Advisory",
        title: {
          en: "Whitefly & Jassid Surveillance in Cotton",
          pa: "ਕਪਾਹ ਵਿੱਚ ਚਿੱਟੀ ਮੱਖੀ ਦੀ ਨਿਗਰਾਨੀ",
          hi: "कपास में सफेद मक्खी एवं थ्रिप्स निगरानी"
        },
        desc: {
          en: "Monitor underside of leaves. Use yellow sticky traps (15/ha) for sucking pests.",
          pa: "ਪੱਤਿਆਂ ਦੇ ਹੇਠਾਂ ਚਿੱਟੀ ਮੱਖੀ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਪੀਲੇ ਚਿਪਕਵੇਂ ਟਰੈਪ ਲਗਾਓ।",
          hi: "सफेद मक्खी नियंत्रण हेतु 15 पीले चिपचिपे कार्ड प्रति हेक्टेयर लगाएं।"
        }
      }
    ]
  },

  Karnataka: {
    stateCode: "KA",
    researchSource: "UAS Bangalore, UAS Dharwad & KSNUAHS Shivamogga",
    satelliteSource: "Karnataka State Remote Sensing Applications Centre (KSRSAC)",
    advisory: {
      en: "Harvest Kharif Maize and early Ragi in southern dry zone. Watch for Pod Borer in Tur (Pigeonpea). Prepare seedbed for Rabi Jowar, Bengal Gram (JG-11) and Safflower in northern transition zone.",
      pa: "ਕਰਨਾਟਕ ਵਿੱਚ ਮੱਕੀ ਅਤੇ ਰਾਗੀ ਦੀ ਵਾਢੀ। ਅਰਹਰ ਵਿੱਚ ਸੁੰਡੀ ਦੀ ਨਿਗਰਾਨੀ ਰੱਖੋ ਅਤੇ ਹਾੜ੍ਹੀ ਛੋਲਿਆਂ ਦੀ ਬਿਜਾਈ ਕਰੋ।",
      hi: "कर्नाटक में मक्का एवं रागी कटाई। अरहर में फली छेदक कीट की निगरानी करें। उत्तरी क्षेत्र में चना एवं कुसुम बुवाई की तैयारी करें।"
    },
    todayActions: [
      {
        id: "ka-act-1",
        type: "seed",
        badge: "urgent",
        icon: "🌱",
        title: {
          en: "Sow Bengal Gram (JG-11 / Annigeri-1)",
          pa: "ਛੋਲਿਆਂ (JG-11) ਦੀ ਬਿਜਾਈ ਕਰੋ",
          hi: "चना (JG-11 / अन्नीगेरी-1) की बुवाई करें"
        },
        desc: {
          en: "Sow in black soil residual moisture by Oct 20. Seed treatment with Trichoderma (4g/kg) and Rhizobium culture.",
          pa: "ਕਾਲੀ ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਸੁੱਕਣ ਤੋਂ ਪਹਿਲਾਂ ਛੋਲਿਆਂ ਦੀ ਬਿਜਾਈ ਕਰੋ।",
          hi: "काली मिट्टी में नमी उड़ने से पहले 20 अक्टूबर तक चना बुवाई पूर्ण करें।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "Bengal Gram Guide", pa: "ਛੋਲੇ ਗਾਈਡ", hi: "चना बुवाई गाइड" }
      }
    ],
    alerts: [
      {
        id: "ka-alt-1",
        severity: "warning",
        icon: "🐛",
        sourceBadge: "KSDA Agri Advisory",
        title: {
          en: "Helicoverpa Pod Borer Watch in Redgram",
          pa: "ਅਰਹਰ ਵਿੱਚ ਫਲੀ ਛੇਦਕ ਸੁੰਡੀ ਦੀ ਰੋਕਥਾਮ",
          hi: "अरहर में फली छेदक (हेलिकोवर्पा) निगरानी"
        },
        desc: {
          en: "Install 10 pheromone traps/ha at flower bud initiation stage.",
          pa: "ਫੁੱਲ ਨਿਕਲਣ ਵੇਲੇ ਫੇਰੋਮੋਨ ਟਰੈਪ ਲਗਾਓ।",
          hi: "फूल आने की अवस्था में 10 फेरोमोन ट्रैप प्रति हेक्टेयर लगाएं।"
        }
      }
    ]
  },

  "Tamil Nadu": {
    stateCode: "TN",
    researchSource: "Tamil Nadu Agricultural University (TNAU) Coimbatore",
    satelliteSource: "Institute of Remote Sensing (IRS) Anna University & TNAU",
    advisory: {
      en: "Samba/Thaladi Paddy transplanting in Cauvery Delta districts (Thanjavur, Tiruvarur). Clean field drainage channels to handle anticipated North-East Monsoon rains. Apply Zinc Sulphate basal dose.",
      pa: "ਤਾਮਿਲਨਾਡੂ ਵਿੱਚ ਸਾਂਬਾ ਝੋਨੇ ਦੀ ਲਵਾਈ। ਉੱਤਰ-ਪੂਰਬੀ ਮਾਨਸੂਨ ਦੇ ਮੀਂਹ ਲਈ ਖੇਤਾਂ ਦੇ ਨਿਕਾਸ ਨਾਲੇ ਸਾਫ਼ ਕਰੋ।",
      hi: "कावेरी डेल्टा में सांबा/थालाडी धान रोपाई जारी। पूर्वोत्तर मानसून की बारिश हेतु जल निकासी नालियों को साफ रखें। जिंक सल्फेट डालें।"
    },
    todayActions: [
      {
        id: "tn-act-1",
        type: "irrigate",
        badge: "urgent",
        icon: "🌊",
        title: {
          en: "Delta Drainage Preparedness for NE Monsoon",
          pa: "ਮਾਨਸੂਨ ਮੀਂਹ ਲਈ ਖੇਤ ਦੇ ਨਿਕਾਸ ਦਾ ਪ੍ਰਬੰਧ",
          hi: "पूर्वोत्तर मानसून हेतु जल निकासी प्रबंध"
        },
        desc: {
          en: "Clear inlets and outlets in low-lying delta fields to prevent submergence of newly transplanted young paddy seedlings.",
          pa: "ਨਵੇਂ ਲਗਾਏ ਝੋਨੇ ਦੇ ਬੂਟਿਆਂ ਨੂੰ ਪਾਣੀ ਵਿੱਚ ਡੁੱਬਣ ਤੋਂ ਬਚਾਉਣ ਲਈ ਨਿਕਾਸ ਰਸਤੇ ਸਾਫ਼ ਕਰੋ।",
          hi: "नव-रोपित धान की पौध को जलभराव से बचाने हेतु निकासी नालियों की सफाई करें।"
        },
        actionLink: "/weather",
        actionText: { en: "NE Monsoon Radar", pa: "ਮੌਸਮ ਰਡਾਰ", hi: "मानसून रडार देखें" }
      }
    ],
    alerts: [
      {
        id: "tn-alt-1",
        severity: "warning",
        icon: "🌧️",
        sourceBadge: "Regional Met Centre Chennai",
        title: {
          en: "North-East Monsoon Onset Advisory",
          pa: "ਉੱਤਰ-ਪੂਰਬੀ ਮਾਨਸੂਨ ਅਲਰਟ",
          hi: "पूर्वोत्तर मानसून आगमन सतर्कता"
        },
        desc: {
          en: "Intense convective rain anticipated in coastal districts. Protect harvested pulses and fertilizers.",
          pa: "ਤੱਟਵਰਤੀ ਇਲਾਕਿਆਂ ਵਿੱਚ ਭਾਰੀ ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ।",
          hi: "तटीय जिलों में भारी बारिश की संभावना। खाद व बीज को सुरक्षित स्थान पर रखें।"
        }
      }
    ]
  },

  "West Bengal": {
    stateCode: "WB",
    researchSource: "Bidhan Chandra Krishi Viswavidyalaya (BCKV) & UBKV",
    satelliteSource: "State Disaster Management & NASA FIRMS",
    advisory: {
      en: "Aman Paddy grain-filling to maturity stage in Burdwan and Hooghly. Monitor for Brown Plant Hopper (BPH). Prepare uplands for early Potato (Kufri Jyoti / Pokhraj) planting and Mustard in early November.",
      pa: "ਪੱਛਮੀ ਬੰਗਾਲ ਵਿੱਚ ਅਮਨ ਝੋਨੇ ਦਾ ਦਾਣਾ ਭਰਨਾ ਅਤੇ ਪੱਕਣਾ। ਤੇਲੇ ਦੀ ਨਿਗਰਾਨੀ ਰੱਖੋ ਅਤੇ ਅਗੇਤੇ ਆਲੂ ਦੀ ਬਿਜਾਈ ਲਈ ਖੇਤ ਤਿਆਰ ਕਰੋ।",
      hi: "अमन धान दाना भराव व परिपक्वता अवस्था में। भूरा फुदका (BPH) की निगरानी करें। अगेती आलू (कुफरी ज्योति) की तैयारी करें।"
    },
    todayActions: [
      {
        id: "wb-act-1",
        type: "spray",
        badge: "urgent",
        icon: "🔍",
        title: {
          en: "Brown Plant Hopper (BPH) Base Inspection",
          pa: "ਝੋਨੇ ਦੇ ਮੁੱਢਾਂ ਵਿੱਚ ਤੇਲੇ (BPH) ਦੀ ਜਾਂਚ",
          hi: "धान के तनों में भूरा फुदका (BPH) निरीक्षण"
        },
        desc: {
          en: "Part the rice canopy and inspect plant bases near water level. If ETL exceeds 5-10 hoppers/hill, drain standing water and spray Triflumezopyrim (94ml/ha).",
          pa: "ਝੋਨੇ ਦੇ ਮੁੱਢਾਂ ਕੋਲ ਤੇਲੇ ਦੀ ਜਾਂਚ ਕਰੋ। ਜੇਕਰ ਤੇਲਾ ਜ਼ਿਆਦਾ ਹੋਵੇ ਤਾਂ ਖੇਤ ਦਾ ਪਾਣੀ ਕੱਢ ਦਿਓ।",
          hi: "धान के पौधों की जड़ के पास फुदका कीट देखें। कीट अधिक होने पर पानी निकाल दें।"
        },
        actionLink: "/pest",
        actionText: { en: "BPH Management Guide", pa: "ਕੀਟ ਗਾਈਡ", hi: "बीपीएच नियंत्रण गाइड" }
      }
    ],
    alerts: [
      {
        id: "wb-alt-1",
        severity: "warning",
        icon: "🌊",
        sourceBadge: "BCKV Plant Pathology",
        title: {
          en: "Drain Excess Water Before Harvest",
          pa: "ਵਾਢੀ ਤੋਂ ਪਹਿਲਾਂ ਵਾਧੂ ਪਾਣੀ ਕੱਢੋ",
          hi: "कटाई से 10 दिन पूर्व खेत से पानी निकालें"
        },
        desc: {
          en: "Drain field water 10-12 days before harvest to firm soil for combine harvesting and prevent grain sprouting.",
          pa: "ਵਾਢੀ ਤੋਂ 10 ਦਿਨ ਪਹਿਲਾਂ ਪਾਣੀ ਕੱਢੋ ਤਾਂ ਜੋ ਕੰਬਾਈਨ ਚੱਲ ਸਕੇ ਅਤੇ ਦਾਣਾ ਨਾ ਖ਼ਰਾਬ ਹੋਵੇ।",
          hi: "कटाई में सुगमता हेतु कटाई से 10 दिन पूर्व पानी की निकासी करें।"
        }
      }
    ]
  }
};

// Generic Fallback generator for ANY State in India
export function getStateSeasonData(stateName = "Punjab") {
  if (OCTOBER_STATE_DATA[stateName]) {
    return OCTOBER_STATE_DATA[stateName];
  }

  // Universal Fallback for any other Indian State / UT
  return {
    stateCode: stateName.substring(0, 2).toUpperCase(),
    researchSource: `ICAR & State Agricultural Department (${stateName})`,
    satelliteSource: "National Remote Sensing Centre (NRSC / ISRO) & NASA FIRMS",
    advisory: {
      en: `Kharif harvest transition active in ${stateName}. Sun-dry harvested grains below recommended procurement moisture. Conserve residual soil moisture for upcoming Rabi sowing. Avail state farm machinery subsidies on agrimachinery.nic.in.`,
      pa: `${stateName} ਵਿੱਚ ਖਰੀਫ਼ ਫਸਲਾਂ ਦੀ ਵਾਢੀ ਅਤੇ ਹਾੜ੍ਹੀ ਦੀ ਤਿਆਰੀ ਚੱਲ ਰਹੀ ਹੈ। ਦਾਣਿਆਂ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਕਾਓ ਅਤੇ ਨਮੀ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਕਰੋ।`,
      hi: `${stateName} में खरीफ फसलों की कटाई एवं रबी बुवाई की तैयारी जारी। अनाज को अच्छी तरह सुखाएं और अवशेष न जलाएं।`
    },
    todayActions: [
      {
        id: "gen-act-1",
        type: "sell",
        badge: "urgent",
        icon: "🌾",
        title: {
          en: "Harvest Maturity & Moisture Testing",
          pa: "ਫਸਲ ਦੀ ਵਾਢੀ ਅਤੇ ਨਮੀ ਦੀ ਜਾਂਚ",
          hi: "फसल कटाई एवं नमी परीक्षण"
        },
        desc: {
          en: "Harvest mature Kharif crops at physiological maturity. Dry grain before loading for APMC mandis to secure official MSP.",
          pa: "ਪੱਕੀ ਫਸਲ ਦੀ ਵਾਢੀ ਕਰੋ ਅਤੇ ਮੰਡੀ ਲਿਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਦਾਣੇ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਕਾਓ।",
          hi: "परिपक्व फसलों की कटाई करें और मंडी लाने से पहले अनाज को सुखाएं।"
        },
        actionLink: "/market-explorer",
        actionText: { en: "Check Mandi & MSP", pa: "ਮੰਡੀ ਤੇ ਐੱਮ.ਐੱਸ.ਪੀ ਦੇਖੋ", hi: "मंडी व एमएसपी देखें" }
      },
      {
        id: "gen-act-2",
        type: "seed",
        badge: "recommended",
        icon: "🌱",
        title: {
          en: "Procure Certified Rabi Seeds",
          pa: "ਹਾੜ੍ਹੀ ਫਸਲਾਂ ਲਈ ਪ੍ਰਮਾਣਿਤ ਬੀਜ ਦਾ ਪ੍ਰਬੰਧ",
          hi: "रबी बुवाई हेतु प्रमाणित बीज का प्रबंध"
        },
        desc: {
          en: "Procure verified seeds from government seed corporations or Krishi Kendras. Treat seed with recommended bio-fertilizers.",
          pa: "ਸਰਕਾਰੀ ਖੇਤੀਬਾੜੀ ਕੇਂਦਰਾਂ ਤੋਂ ਪ੍ਰਮਾਣਿਤ ਬੀਜ ਲਵੋ ਅਤੇ ਬੀਜ ਸੋਧ ਕਰੋ।",
          hi: "कृषि विज्ञान केंद्र से प्रमाणित बीज प्राप्त करें और बीजोपचार करें।"
        },
        actionLink: "/crop-rec",
        actionText: { en: "Seed Advisory", pa: "ਬੀਜ ਸਲਾਹ", hi: "बीज सिफारिश देखें" }
      }
    ],
    alerts: [
      {
        id: "gen-alt-1",
        severity: "warning",
        icon: "⚠️",
        sourceBadge: "State Agromet Advisory",
        title: {
          en: `Rabi Soil Moisture & Pre-Sowing Protocol (${stateName})`,
          pa: `ਹਾੜ੍ਹੀ ਫਸਲਾਂ ਲਈ ਨਮੀ ਸੰਭਾਲ ਸਲਾਹ (${stateName})`,
          hi: `रबी फसलों हेतु नमी संरक्षण सलाह (${stateName})`
        },
        desc: {
          en: "Utilize post-monsoon soil moisture for land leveling and seedbed preparation.",
          pa: "ਮੀਂਹ ਤੋਂ ਬਾਅਦ ਦੀ ਮਿੱਟੀ ਦੀ ਨਮੀ ਦਾ ਲਾਭ ਲੈ ਕੇ ਖੇਤ ਤਿਆਰ ਕਰੋ।",
          hi: "खेत की जुताई के बाद तुरंत पाटा लगाकर नमी को सुरक्षित करें।"
        }
      }
    ]
  };
}
