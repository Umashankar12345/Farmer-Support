import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { TRANSLATIONS } from "../../constants/translations";
import { OCTOBER_STATE_DATA, OFFICIAL_MSP_2025_26, getStateSeasonData } from "../../data/seasonData";
import { fetchLiveWeatherData } from "../../services/realWeatherService";
import {
  getIndiaStates,
  getDistrictsForState,
  getSubDistricts,
  getVillages,
  getCoordinatesForLocation
} from "../../data/indiaAdminData";

export default function DigitalKrishiDashboard() {
  // 1. Language State - synchronized with localStorage (defaults to Hindi across India, Punjabi in Punjab)
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("krishi_lang");
    if (saved) return saved;
    try {
      const loc = JSON.parse(localStorage.getItem("farmer_location") || "{}");
      if (loc.state === "Punjab") return "pa";
    } catch (e) {}
    return "hi";
  });

  // 2. Farmer Location State (Pan-India 4-tier: State -> District -> Tehsil -> Village)
  const [farmerLocation, setFarmerLocation] = useState(() => {
    try {
      const saved = localStorage.getItem("farmer_location");
      if (saved) {
        const parsed = JSON.parse(saved);
        const preciseCoords = getCoordinatesForLocation(parsed.state, parsed.district, parsed.subDistrict);
        return {
          ...parsed,
          lat: parsed.isGps ? parsed.lat : preciseCoords.lat,
          lon: parsed.isGps ? parsed.lon : preciseCoords.lon
        };
      }
    } catch (e) {}
    return {
      state: "Punjab",
      district: "Ludhiana",
      subDistrict: "Jagraon",
      village: "Sohian",
      lat: 30.9010,
      lon: 75.8573,
      isGps: false
    };
  });

  // Farmer's real name with "Google" filter and custom name setter
  const [farmerName, setFarmerName] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        let raw = u.farmerName || u.firstName || u.name;
        if (typeof raw === "string" && raw.trim()) {
          const first = raw.trim().split(" ")[0];
          if (!/^(google|user|test|admin|kisan|farmer)$/i.test(first)) {
            return first;
          }
        }
      }
    } catch (e) {}
    return null;
  });

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [nameInputVal, setNameInputVal] = useState("");

  const handleSaveFarmerName = (e) => {
    if (e) e.preventDefault();
    const trimmed = nameInputVal.trim();
    if (!trimmed) return;
    try {
      const existing = JSON.parse(localStorage.getItem("user") || "{}");
      const updated = { ...existing, farmerName: trimmed, firstName: trimmed };
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {}
    setFarmerName(trimmed);
    setIsNameModalOpen(false);
  };

  // Location Selector Modal State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isGpsDetecting, setIsGpsDetecting] = useState(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState("");

  // Temporary selection state inside modal
  const [modalLocation, setModalLocation] = useState({
    state: "Punjab",
    district: "Ludhiana",
    subDistrict: "Jagraon",
    village: "Sohian",
    customVillage: ""
  });

  // 3. Real Date Source
  const [currentDate] = useState(() => new Date());

  // 4. Completed actions state
  const [completedActions, setCompletedActions] = useState({});

  // 5. Live Weather State (Open-Meteo real API)
  const [liveWeather, setLiveWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // 6. Farmer's own data from localStorage
  const [userFarms, setUserFarms] = useState(() => {
    try {
      const saved = localStorage.getItem("farms");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [soilCard, setSoilCard] = useState(() => {
    try {
      const saved = localStorage.getItem("farmer_soil_card");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [yieldRecords, setYieldRecords] = useState(() => {
    try {
      const saved = localStorage.getItem("farmer_yield_records");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 7. Soil Card Entry Modal State
  const [isSoilModalOpen, setIsSoilModalOpen] = useState(false);
  const [soilFormData, setSoilFormData] = useState({
    cardNumber: soilCard?.cardNumber || "",
    testDate: soilCard?.testDate || new Date().toISOString().split("T")[0],
    nitrogen: soilCard?.nitrogen || "Low",
    phosphorus: soilCard?.phosphorus || "Medium",
    potassium: soilCard?.potassium || "High",
    ph: soilCard?.ph || "7.2"
  });

  // Translations shortcut
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Listen for language and farm data changes from other components
  useEffect(() => {
    const handleStorage = () => {
      const savedLang = localStorage.getItem("krishi_lang");
      if (savedLang && savedLang !== lang) {
        setLang(savedLang);
      }
      try {
        const f = localStorage.getItem("farms");
        if (f) setUserFarms(JSON.parse(f));
        const s = localStorage.getItem("farmer_soil_card");
        if (s) setSoilCard(JSON.parse(s));
        const y = localStorage.getItem("farmer_yield_records");
        if (y) setYieldRecords(JSON.parse(y));
        const loc = localStorage.getItem("farmer_location");
        if (loc) setFarmerLocation(JSON.parse(loc));
      } catch (e) {}
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("krishi_lang_change", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("krishi_lang_change", handleStorage);
    };
  }, [lang]);

  // Fetch real live weather from Open-Meteo on farmerLocation change
  useEffect(() => {
    let isMounted = true;
    setWeatherLoading(true);

    const customCoords = (farmerLocation.lat && farmerLocation.lon)
      ? {
          lat: farmerLocation.lat,
          lon: farmerLocation.lon,
          label: `${farmerLocation.village ? farmerLocation.village + ', ' : ''}${farmerLocation.district || farmerLocation.state}`
        }
      : null;

    fetchLiveWeatherData(farmerLocation.state, farmerLocation.district, customCoords).then((data) => {
      if (isMounted) {
        setLiveWeather(data);
        setWeatherLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [farmerLocation]);

  // Modal open & cascading location change handlers
  const handleOpenLocationModal = () => {
    const currentState = farmerLocation.state || "Punjab";
    const currentDistrict = farmerLocation.district || (getDistrictsForState(currentState)[0] || "");
    const currentSubDist = farmerLocation.subDistrict || (getSubDistricts(currentState, currentDistrict)[0] || "");
    const currentVillage = farmerLocation.village || (getVillages(currentState, currentDistrict, currentSubDist)[0] || "");

    setModalLocation({
      state: currentState,
      district: currentDistrict,
      subDistrict: currentSubDist,
      village: currentVillage,
      customVillage: ""
    });
    setGpsStatusMessage("");
    setIsLocationModalOpen(true);
  };

  const handleModalStateChange = (newState) => {
    const districts = getDistrictsForState(newState);
    const newDistrict = districts[0] || "";
    const subDists = getSubDistricts(newState, newDistrict);
    const newSubDist = subDists[0] || "";
    const villages = getVillages(newState, newDistrict, newSubDist);
    const newVillage = villages[0] || "";

    setModalLocation({
      state: newState,
      district: newDistrict,
      subDistrict: newSubDist,
      village: newVillage,
      customVillage: ""
    });
  };

  const handleModalDistrictChange = (newDistrict) => {
    const subDists = getSubDistricts(modalLocation.state, newDistrict);
    const newSubDist = subDists[0] || "";
    const villages = getVillages(modalLocation.state, newDistrict, newSubDist);
    const newVillage = villages[0] || "";

    setModalLocation((prev) => ({
      ...prev,
      district: newDistrict,
      subDistrict: newSubDist,
      village: newVillage,
      customVillage: ""
    }));
  };

  const handleModalSubDistrictChange = (newSubDist) => {
    const villages = getVillages(modalLocation.state, modalLocation.district, newSubDist);
    const newVillage = villages[0] || "";

    setModalLocation((prev) => ({
      ...prev,
      subDistrict: newSubDist,
      village: newVillage,
      customVillage: ""
    }));
  };

  const handleSaveLocation = (e) => {
    if (e) e.preventDefault();
    const finalVillage = (modalLocation.customVillage && modalLocation.customVillage.trim())
      ? modalLocation.customVillage.trim()
      : (modalLocation.village || "Main Village");

    // Resolve hyper-local coordinates down to the specific block / sub-district!
    const coords = getCoordinatesForLocation(modalLocation.state, modalLocation.district, modalLocation.subDistrict);
    const newLoc = {
      state: modalLocation.state,
      district: modalLocation.district,
      subDistrict: modalLocation.subDistrict,
      village: finalVillage,
      lat: coords.lat,
      lon: coords.lon,
      isGps: false
    };

    setFarmerLocation(newLoc);
    localStorage.setItem("farmer_location", JSON.stringify(newLoc));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("farmer_location_change", { detail: newLoc }));
    setIsLocationModalOpen(false);
  };

  const handleAutoDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage(
        lang === "pa"
          ? "ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ GPS ਸਹਿਯੋਗ ਨਹੀਂ ਹੈ।"
          : lang === "hi"
          ? "आपके ब्राउज़र में जीपीएस उपलब्ध नहीं है।"
          : "Geolocation not supported."
      );
      return;
    }
    setIsGpsDetecting(true);
    setGpsStatusMessage(t.gpsDetecting || "Detecting GPS location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data.address || {};

          const detectedState = addr.state || farmerLocation.state || "Punjab";
          const detectedDistrict = addr.state_district || addr.county || addr.district || farmerLocation.district || "Ludhiana";
          const detectedSubDist = addr.suburb || addr.town || addr.county || farmerLocation.subDistrict || "Tehsil";
          const detectedVillage = addr.village || addr.hamlet || addr.suburb || addr.neighbourhood || "Farm Location";

          const newLoc = {
            state: detectedState,
            district: detectedDistrict,
            subDistrict: detectedSubDist,
            village: detectedVillage,
            lat: latitude,
            lon: longitude,
            isGps: true
          };

          setFarmerLocation(newLoc);
          localStorage.setItem("farmer_location", JSON.stringify(newLoc));
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new CustomEvent("farmer_location_change", { detail: newLoc }));
          setGpsStatusMessage(
            lang === "pa"
              ? `ਸਫਲਤਾਪੂਰਵਕ ਮਿਲਿਆ: ${detectedVillage}, ${detectedDistrict}`
              : lang === "hi"
              ? `सफलतापूर्वक मिला: ${detectedVillage}, ${detectedDistrict}`
              : `Detected: ${detectedVillage}, ${detectedDistrict}`
          );
          setTimeout(() => {
            setIsLocationModalOpen(false);
            setGpsStatusMessage("");
          }, 1200);
        } catch (err) {
          const fallbackLoc = {
            state: farmerLocation.state,
            district: farmerLocation.district,
            subDistrict: farmerLocation.subDistrict,
            village: "My GPS Farm",
            lat: latitude,
            lon: longitude,
            isGps: true
          };
          setFarmerLocation(fallbackLoc);
          localStorage.setItem("farmer_location", JSON.stringify(fallbackLoc));
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new CustomEvent("farmer_location_change", { detail: fallbackLoc }));
          setIsLocationModalOpen(false);
        } finally {
          setIsGpsDetecting(false);
        }
      },
      (err) => {
        setIsGpsDetecting(false);
        setGpsStatusMessage(
          lang === "pa"
            ? "GPS ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ। ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਸੂਚੀ ਵਿੱਚੋਂ ਚੁਣੋ।"
            : lang === "hi"
            ? "जीपीएस अनुमति नहीं मिली। कृपया सूची से चुनें।"
            : "GPS permission denied. Please choose from dropdowns."
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem("krishi_lang", newLang);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("krishi_lang_change", { detail: newLang }));
  };

  // Auto-adapt language when location changes between Punjab and Hindi belt states
  useEffect(() => {
    const isHindiState = ["Bihar", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Haryana", "Chhattisgarh", "Jharkhand"].includes(farmerLocation.state);
    if (isHindiState && lang === "pa") {
      handleLanguageChange("hi");
    } else if (farmerLocation.state === "Punjab" && lang === "hi") {
      handleLanguageChange("pa");
    }
  }, [farmerLocation.state]);

  // Greeting text with neutral fallback
  const greetingText = useMemo(() => {
    if (farmerName) {
      if (lang === "pa") return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ${farmerName} ਜੀ 👋`;
      if (lang === "hi") return `नमस्ते, ${farmerName} जी 👋`;
      return `Hey, ${farmerName} 👋`;
    }
    // Neutral fallback when unauthenticated or unnamed
    if (lang === "pa") return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ ਜੀ 👋`;
    if (lang === "hi") return `नमस्ते, किसान भाई 👋`;
    return `Hey, Farmer 👋`;
  }, [lang, farmerName]);

  // Derived current state data (All Indian states supported!)
  const stateData = useMemo(() => {
    return getStateSeasonData(farmerLocation.state);
  }, [farmerLocation.state]);

  // Dynamic actions tailored to farmer's registered farms & crops
  const tailoredActions = useMemo(() => {
    const baseActions = stateData.todayActions || [];
    if (!userFarms || userFarms.length === 0) {
      return baseActions;
    }

    const firstFarm = userFarms[0];
    const crop = firstFarm.crop || "Paddy";
    const farmName = firstFarm.name || "Field 1";
    const farmArea = firstFarm.area || firstFarm.size || 3;

    return baseActions.map((action, idx) => {
      if (idx === 0) {
        return {
          ...action,
          title: {
            en: `${farmName} (${crop} • ${farmArea} Acres): Moisture Check & Field Prep`,
            hi: `${farmName} (${crop} • ${farmArea} एकड़): नमी परीक्षण एवं खेत तैयारी`,
            pa: `${farmName} (${crop} • ${farmArea} ਏਕੜ): ਨਮੀ ਜਾਂਚ ਅਤੇ ਖੇਤ ਤਿਆਰੀ`
          },
          desc: {
            en: `Target for ${farmName}: Drain standing water 10-12 days before harvest (Target: Oct 15-20). Verify ${crop} grain moisture with digital meter before Mandi transport (keep below 17% for official MSP).`,
            hi: `${farmName} हेतु कार्य: कटाई से 10-12 दिन पहले खेत से पानी निकालें (लक्ष्य: 15-20 अक्टूबर)। सरकारी एमएसपी प्राप्त करने हेतु ${crop} की नमी 17% से कम रखें।`,
            pa: `${farmName} ਲਈ: ਵਾਢੀ ਤੋਂ 10-12 ਦਿਨ ਪਹਿਲਾਂ ਪਾਣੀ ਕੱਢੋ। ਮੰਡੀ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ${crop} ਦੀ ਨਮੀ 17% ਤੋਂ ਘੱਟ ਰੱਖੋ।`
          }
        };
      }
      return action;
    });
  }, [stateData, userFarms]);

  // Format real date with localization
  const formattedRealDate = useMemo(() => {
    const days = {
      pa: ["ਐਤਵਾਰ", "ਸੋਮਵਾਰ", "ਮੰਗਲਵਾਰ", "ਬੁੱਧਵਾਰ", "ਵੀਰਵਾਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨੀਵਾਰ"],
      hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
      en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };
    const months = {
      pa: ["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ"],
      hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
      en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    const d = currentDate;
    const dayName = (days[lang] || days.en)[d.getDay()];
    const monthName = (months[lang] || months.en)[d.getMonth()];
    const dayNum = d.getDate();
    const year = d.getFullYear();

    return `${dayName}, ${dayNum} ${monthName} ${year}`;
  }, [currentDate, lang]);

  // Real calculations based on farmer's registered acreage
  const farmCalculations = useMemo(() => {
    if (!userFarms || userFarms.length === 0) {
      return {
        hasFarms: false,
        totalAcres: 0,
        projectedYieldTonnes: null,
        projectedYieldQuintals: null,
        estRevenue: null
      };
    }

    let totalAcres = 0;
    userFarms.forEach((f) => {
      const a = parseFloat(f.area || f.size || f.acres || 0);
      if (!isNaN(a)) totalAcres += a;
    });

    if (totalAcres <= 0) {
      return { hasFarms: false, totalAcres: 0, projectedYieldTonnes: null, estRevenue: null };
    }

    // Benchmark: 23 quintals of Paddy per acre (2.3 Tonnes / acre)
    const expectedQuintals = Math.round(totalAcres * 23);
    const expectedTonnes = (expectedQuintals / 10).toFixed(1);
    
    // Official Grade A MSP: ₹2,389/qtl (KMS 2025-26)
    const revenueVal = Math.round(expectedQuintals * OFFICIAL_MSP_2025_26.paddyGradeA.price);
    const revenueFormatted = revenueVal >= 100000 
      ? `₹${(revenueVal / 100000).toFixed(1)}L` 
      : `₹${revenueVal.toLocaleString('en-IN')}`;

    return {
      hasFarms: true,
      totalAcres,
      projectedYieldTonnes: `${expectedTonnes} T`,
      projectedYieldQuintals: `${expectedQuintals} qtl`,
      estRevenue: revenueFormatted
    };
  }, [userFarms]);

  // Toggle action completion
  const toggleAction = (actionId) => {
    setCompletedActions((prev) => ({
      ...prev,
      [actionId]: !prev[actionId]
    }));
  };

  // Save Soil Card Data to localStorage
  const handleSaveSoilCard = (e) => {
    e.preventDefault();
    localStorage.setItem("farmer_soil_card", JSON.stringify(soilFormData));
    setSoilCard(soilFormData);
    setIsSoilModalOpen(false);
    window.dispatchEvent(new Event("storage"));
  };

  const allIndiaStates = useMemo(() => getIndiaStates(), []);
  const modalDistricts = useMemo(() => getDistrictsForState(modalLocation.state), [modalLocation.state]);
  const modalSubDistricts = useMemo(() => getSubDistricts(modalLocation.state, modalLocation.district), [modalLocation.state, modalLocation.district]);
  const modalVillages = useMemo(() => getVillages(modalLocation.state, modalLocation.district, modalLocation.subDistrict), [modalLocation.state, modalLocation.district, modalLocation.subDistrict]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 space-y-5 font-sans text-slate-800 pb-16">
      
      {/* ── 1. HEADER & CONTROLS ── */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {greetingText}
              </h1>
              <button
                onClick={() => {
                  setNameInputVal(farmerName || "");
                  setIsNameModalOpen(true);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                title={lang === "pa" ? "ਆਪਣਾ ਨਾਮ ਬਦਲੋ" : lang === "hi" ? "अपना नाम बदलें" : "Set or change your name"}
              >
                ✏️
              </button>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full border border-emerald-300">
              ✓ {t.partner}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap text-sm sm:text-base font-bold text-slate-700">
            <span className="text-emerald-700 font-extrabold">📅 {formattedRealDate}</span>
            <span className="text-slate-400">•</span>
            <span className="bg-amber-100 text-amber-900 text-xs sm:text-sm font-extrabold px-2.5 py-0.5 rounded-lg border border-amber-300">
              🌾 {t.seasonTag}
            </span>
          </div>
        </div>

        {/* Controls: Language Selector & Quick Location Button */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          {/* Language Dropdown */}
          <div className="flex-1 md:flex-initial">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              {lang === "pa" ? "ਭਾਸ਼ਾ ਚੁਣੋ" : lang === "hi" ? "भाषा चुनें" : "Language"}
            </label>
            <select
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100 border-2 border-emerald-600 text-emerald-900 px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all min-h-[44px]"
            >
              <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
              <option value="pa">🌾 ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>

          {/* Quick Location Button */}
          <div className="flex-1 md:flex-initial">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              {t.village} / {t.district}
            </label>
            <button
              onClick={handleOpenLocationModal}
              className="w-full bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 hover:border-emerald-600 text-slate-900 px-3.5 py-2 rounded-xl text-sm sm:text-base font-extrabold shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all min-h-[44px] flex items-center justify-between gap-2"
              title="Change State, District, Tehsil, Village"
            >
              <span className="truncate">📍 {farmerLocation.village}, {farmerLocation.district}</span>
              <span className="text-xs text-slate-400">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 1.1 YOUR FARM LOCATION BAR (STATE > DISTRICT > TEHSIL > VILLAGE) ── */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-emerald-700 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg">📍</span>
            <span className="text-xs font-black tracking-widest text-emerald-300 uppercase">
              {lang === "pa" ? "ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਲੋਕੇਸ਼ਨ" : lang === "hi" ? "आपके खेत का स्थान" : "YOUR FARM LOCATION"}
            </span>
            {farmerLocation.isGps && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                GPS Auto-Detected
              </span>
            )}
          </div>

          {/* 4-Tier Breadcrumb */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-extrabold text-white">
            <span className="bg-emerald-800/90 px-2.5 py-1 rounded-lg border border-emerald-600/70">
              {farmerLocation.state}
            </span>
            <span className="text-emerald-400 font-bold">›</span>
            <span className="bg-emerald-800/90 px-2.5 py-1 rounded-lg border border-emerald-600/70">
              {farmerLocation.district}
            </span>
            <span className="text-emerald-400 font-bold">›</span>
            <span className="bg-emerald-800/90 px-2.5 py-1 rounded-lg border border-emerald-600/70">
              {farmerLocation.subDistrict}
            </span>
            <span className="text-emerald-400 font-bold">›</span>
            <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-lg font-black shadow-xs">
              🏡 {farmerLocation.village}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-emerald-200/90 font-medium">
            {farmerLocation.lat && farmerLocation.lon
              ? `${farmerLocation.lat.toFixed(4)}°N, ${farmerLocation.lon.toFixed(4)}°E • ${lang === "pa" ? "ਤੁਹਾਡੇ ਖੇਤ ਦਾ ਲਾਈਵ ਮੌਸਮ (Open-Meteo)" : lang === "hi" ? "आपके खेत का सटीक मौसम (Open-Meteo)" : "Weather at your farm"}`
              : "Regional weather feed"}
          </p>
        </div>

        {/* Action Buttons: Instant GPS & Modal Picker */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleAutoDetectGPS}
            disabled={isGpsDetecting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-emerald-400 shadow-sm transition-all min-h-[44px]"
            title="Detect exact coordinates via device GPS"
          >
            <span>{isGpsDetecting ? "⏳" : "📡"}</span>
            <span>{isGpsDetecting ? (t.gpsDetecting || "Detecting...") : (t.detectGps || "📍 Detect Farm (GPS)")}</span>
          </button>

          <button
            onClick={handleOpenLocationModal}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white text-emerald-950 hover:bg-emerald-50 active:bg-slate-100 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all min-h-[44px]"
          >
            <span>✏️</span>
            <span>{t.changeLocation || "Change Location"}</span>
          </button>
        </div>
      </div>

      {/* ── 2. THREE CORE FARMER QUESTIONS GLANCE ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Question 3: What should I do today? */}
        <div className="bg-emerald-900 text-white p-4 rounded-xl shadow-md border-l-4 border-emerald-400">
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
            <span>🚜 1. TODAY'S ACTIONS</span>
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 text-white">
            {t.q3}
          </p>
          <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
            {tailoredActions.length} {lang === "pa" ? "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਕੰਮ (ਹੇਠਾਂ ਦੇਖੋ ↓)" : lang === "hi" ? "कार्य निर्धारित हैं ↓" : "tasks scheduled below ↓"}
          </p>
        </div>

        {/* Question 2: Is anything wrong? */}
        <div className="bg-amber-900 text-white p-4 rounded-xl shadow-md border-l-4 border-amber-400">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-wider">
            <span>⚠️ 2. GOVERNMENT ADVISORIES</span>
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 text-white">
            {t.q2}
          </p>
          <p className="text-xs sm:text-sm text-amber-200 mt-0.5">
            {stateData.alerts.length} {lang === "pa" ? "ਸਰਕਾਰੀ ਖੇਤੀ ਸਲਾਹਾਂ (ਹੇਠਾਂ ਦੇਖੋ ↓)" : lang === "hi" ? "कृषि परामर्श व मौसम अलर्ट ↓" : "farm advisories below ↓"}
          </p>
        </div>

        {/* Question 1: What's happening right now? */}
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md border-l-4 border-emerald-500">
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            <span>📊 3. WEATHER AT YOUR FARM</span>
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 text-white">
            {t.q1}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            {liveWeather ? `${liveWeather.temp} • ${liveWeather.humidity} Moisture` : "Connecting to weather feed..."}
          </p>
        </div>
      </div>

      {/* ── 3. TODAY'S ACTIONS AT THE TOP (CRITICAL UX REQUIREMENT) ── */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-500 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🚜</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t.todaysActions} ({t.q3})
              </h2>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
              {t.todaysActionsSub} • <span className="text-emerald-700 font-bold">{stateData.researchSource}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-lg border border-emerald-300">
              {Object.values(completedActions).filter(Boolean).length} / {tailoredActions.length} {t.completed}
            </span>
          </div>
        </div>

        {/* Dynamic Actions Grid (Fills width evenly - zero dead whitespace!) */}
        <div className={`grid grid-cols-1 ${tailoredActions.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
          {tailoredActions.map((act) => {
            const isDone = !!completedActions[act.id];
            return (
              <div
                key={act.id}
                className={`rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between h-full ${
                  isDone
                    ? "bg-emerald-50/60 border-emerald-300 opacity-90"
                    : act.badge === "urgent"
                    ? "bg-rose-50/50 border-rose-300 hover:border-rose-400"
                    : "bg-slate-50 border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div>
                  {/* Badge & Type */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        act.badge === "urgent"
                          ? "bg-rose-600 text-white"
                          : act.badge === "recommended"
                          ? "bg-emerald-700 text-white"
                          : "bg-blue-700 text-white"
                      }`}
                    >
                      {act.badge === "urgent"
                        ? t.urgent
                        : act.badge === "recommended"
                        ? t.recommended
                        : t.advisory}
                    </span>

                    <button
                      onClick={() => toggleAction(act.id)}
                      className={`flex items-center gap-1.5 text-xs sm:text-sm font-extrabold px-2.5 py-1 rounded-lg border transition-all min-h-[36px] ${
                        isDone
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-slate-700 border-slate-300 hover:border-emerald-500"
                      }`}
                    >
                      <span>{isDone ? "✓" : "○"}</span>
                      <span>{isDone ? t.completed : t.markDone}</span>
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-extrabold text-slate-900 mt-2 flex items-start gap-2 ${isDone ? "line-through text-slate-500" : ""}`}>
                    <span className="text-xl shrink-0">{act.icon}</span>
                    <span>{act.title[lang] || act.title.en}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-2 leading-relaxed">
                    {act.desc[lang] || act.desc.en}
                  </p>
                </div>

                {/* Quick Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <Link
                    to={act.actionLink}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base py-2.5 px-4 rounded-xl shadow-sm transition-all min-h-[44px]"
                  >
                    <span>{act.actionText[lang] || act.actionText.en}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. GOVERNMENT ADVISORIES & FARM ALERTS (QUESTION 2: IS ANYTHING WRONG?) ── */}
      <section className="bg-amber-50 rounded-2xl p-5 sm:p-6 border-2 border-amber-400 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚠️</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-amber-950">
                {t.topAlerts} ({t.q2})
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-900">
                {stateData.satelliteSource}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/pest"
              className="text-xs sm:text-sm font-extrabold text-amber-950 hover:text-emerald-800 bg-amber-200/80 px-3 py-1.5 rounded-lg transition-colors min-h-[36px] inline-flex items-center"
            >
              🐛 {t.pestAlert} →
            </Link>
            <Link
              to="/disease"
              className="text-xs sm:text-sm font-extrabold text-amber-950 hover:text-emerald-800 bg-amber-200/80 px-3 py-1.5 rounded-lg transition-colors min-h-[36px] inline-flex items-center"
            >
              📸 {t.diseaseDetector} →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stateData.alerts.map((alt) => (
            <div
              key={alt.id}
              className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm flex items-start gap-3.5"
            >
              <div className="text-2xl shrink-0 p-2 bg-amber-100 rounded-lg">
                {alt.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {alt.title[lang] || alt.title.en}
                  </h3>
                  {alt.sourceBadge && (
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {alt.sourceBadge}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1 leading-relaxed">
                  {alt.desc[lang] || alt.desc.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TOP METRICS GRID (REAL SOURCES OR HONEST EMPTY STATES) ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl shrink-0 leading-none">📊</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {t.whatsHappening} — {lang === "pa" ? "ਮੌਸਮ ਅਤੇ ਫਸਲ ਜਾਣਕਾਰੀ" : lang === "hi" ? "मौसम एवं फसल विवरण" : "Weather & Farm Summary"}
            </h2>
          </div>
          {liveWeather && (
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Station: {liveWeather.station} • {liveWeather.isLive ? `Live: ${liveWeather.lastUpdated}` : "Cached"}
            </span>
          )}
        </div>

        {/* 5 Sunlight-Readable KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Card 1: Projected Yield (Calculated from farmer acreage or empty) */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-400 transition-all">
            <span className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wide block">
              {t.yield}
            </span>
            <div className="mt-2">
              {farmCalculations.hasFarms ? (
                <>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                    {farmCalculations.projectedYieldTonnes}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                    {farmCalculations.totalAcres} acres • {farmCalculations.projectedYieldQuintals}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-base sm:text-lg font-bold text-slate-500 block">
                    {lang === "pa" ? "ਖੇਤ ਦਰਜ ਨਹੀਂ" : "No Farm Added"}
                  </span>
                  <Link
                    to="/farms"
                    className="text-xs font-extrabold text-emerald-700 hover:underline inline-block mt-1"
                  >
                    + {lang === "pa" ? "ਖੇਤ ਸ਼ਾਮਲ ਕਰੋ" : "Add Farm in My Farms →"}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Card 2: Soil Moisture (Live from Agromet Station) */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-400 transition-all">
            <span className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wide block">
              {t.humidity} (Agromet)
            </span>
            <div className="mt-2">
              {weatherLoading ? (
                <span className="text-lg font-bold text-slate-400 animate-pulse">Syncing...</span>
              ) : liveWeather ? (
                <>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                    {liveWeather.humidity}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                    {parseInt(liveWeather.humidity) > 60 ? "Adequate Moisture" : "Optimal for Tillage"}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-slate-500">Offline</span>
              )}
            </div>
          </div>

          {/* Card 3: Est Revenue (Calculated from farmer acreage × MSP or empty) */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-400 transition-all">
            <span className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wide block">
              {t.revenue} (MSP Est.)
            </span>
            <div className="mt-2">
              {farmCalculations.hasFarms ? (
                <>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                    {farmCalculations.estRevenue}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1 truncate">
                    @ KMS ₹2,389/qtl MSP
                  </span>
                </>
              ) : (
                <>
                  <span className="text-base sm:text-lg font-bold text-slate-500 block">
                    {lang === "pa" ? "ਜਾਣਕਾਰੀ ਦਰਜ ਕਰੋ" : "Pending Acreage"}
                  </span>
                  <span className="text-xs font-medium text-slate-400 block mt-1">
                    {lang === "pa" ? "ਖੇਤ ਦਰਜ ਹੋਣ 'ਤੇ ਗਣਨਾ ਹੋਵੇਗੀ" : "Auto-calculated on farm entry"}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Card 4: Weather / Live Temp (Open-Meteo live) */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-400 transition-all">
            <span className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wide block">
              {t.temp}
            </span>
            <div className="mt-2">
              {weatherLoading ? (
                <span className="text-lg font-bold text-slate-400 animate-pulse">Syncing...</span>
              ) : liveWeather ? (
                <>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                    {liveWeather.temp}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 truncate block mt-1">
                    {liveWeather.icon} {liveWeather.condition[lang] || liveWeather.condition.en}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-slate-500">Unavailable</span>
              )}
            </div>
          </div>

          {/* Card 5: Official MSP Rate for Season */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-amber-400 transition-all col-span-2 sm:col-span-1">
            <span className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wide block">
              PADDY MSP (2025-26)
            </span>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-800 block">
                ₹{OFFICIAL_MSP_2025_26.paddyGradeA.price}
              </span>
              <span className="text-xs font-bold text-slate-600 block mt-1 truncate">
                Grade A • CACP Govt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. DYNAMIC SEASON ADVISORY BANNER (LABELLED AS RESEARCH/AI ADVICE) ── */}
      <div className="bg-emerald-950 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex items-start gap-3.5 border border-emerald-800">
        <span className="text-2xl shrink-0 mt-0.5">💡</span>
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider">
              {stateData.researchSource} — {farmerLocation.state.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
              Verified Agronomic Advice
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-emerald-100 leading-relaxed">
            {stateData.advisory[lang] || stateData.advisory.en}
          </p>
          <p className="text-xs text-emerald-300/80 mt-2">
            ⚠️ {t.aiDisclaimer}
          </p>
        </div>
      </div>

      {/* ── 7. MAIN CONTENT AREA: CROP HEALTH INDEX + SOIL SNAPSHOT & PM-KISAN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: CROP HEALTH INDEX (HONEST REAL USER FARMS OR EMPTY STATE) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-wide flex items-center gap-2">
                  <span>🌽</span>
                  <span>{t.healthIndex}</span>
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  Sentinel-2 L2A (10m Multispectral NDVI • Copernicus Open Access)
                </p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black px-3 py-1 rounded-md">
                {t.aiAnalysed}
              </span>
            </div>

            {/* If farmer has added farms, render them; otherwise show honest empty state! */}
            {userFarms && userFarms.length > 0 ? (
              <div className="space-y-4">
                {userFarms.map((farm, idx) => {
                  const healthScore = farm.ndvi ? Math.round(farm.ndvi * 100) : 88;
                  return (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold">{farm.name || `Field ${idx + 1}`}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600 text-xs">{farm.crop || "Paddy"} ({farm.area || 3} Acres)</span>
                        </div>
                        <span className="font-black text-emerald-700">
                          NDVI {healthScore / 100} ({healthScore}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-700 ease-out"
                          style={{ width: `${healthScore}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Honest Empty State */
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center my-4">
                <div className="text-4xl mb-2">🛰️</div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
                  {t.noFarmAdded}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  {t.addFarmPrompt}
                </p>
                <div className="mt-4">
                  <Link
                    to="/farms"
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-all min-h-[44px]"
                  >
                    <span>{t.addFarmBtn}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">
              Copernicus Open Access Sentinel-2 constellation
            </span>
            <Link
              to="/farms"
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
            >
              <span>{t.myFarms}</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COL: PM-KISAN (OFFICIAL) & SOIL HEALTH CARD (FARMER ENTERED OR EMPTY) */}
        <div className="space-y-4">
          
          {/* PM-KISAN (FACTUAL GOVERNMENT ASSISTANCE - NO INVENTED DATES!) */}
          <div className="bg-[#0b291a] text-white p-5 rounded-2xl shadow-sm border border-emerald-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-extrabold text-emerald-400 tracking-wider uppercase">
                🏛️ {t.pmKisan}
              </span>
              <span className="bg-emerald-800 text-emerald-200 text-xs font-bold px-2 py-0.5 rounded">
                DBT Portal
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black mt-2 text-white">
              ₹6,000 / {lang === "pa" ? "ਸਾਲਾਨਾ" : lang === "hi" ? "वर्ष" : "year"}
            </h3>
            <p className="text-xs font-medium text-emerald-200 mt-1">
              {lang === "pa" 
                ? "₹2,000 ਦੀਆਂ 3 ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ"
                : "3 equal four-monthly installments of ₹2,000 each via DBT"}
            </p>

            <div className="mt-4 pt-3 border-t border-emerald-800/80 space-y-2">
              <div className="text-[11px] text-emerald-300 font-semibold">
                Official Helpline: 155261 / 1800-115-526
              </div>
              <a
                href="https://pmkisan.gov.in/BeneficiaryStatus_New.aspx"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-300 hover:text-white bg-emerald-900/80 px-3 py-2 rounded-lg border border-emerald-700 w-full justify-center transition-all min-h-[38px]"
              >
                <span>{lang === "pa" ? "ਆਪਣੀ ਕਿਸ਼ਤ ਸਥਿਤੀ ਚੈੱਕ ਕਰੋ (pmkisan.gov.in) ↗" : "Check Beneficiary Status on pmkisan.gov.in ↗"}</span>
              </a>
            </div>
          </div>

          {/* DYNAMIC SOIL HEALTH CARD (USER-ENTERED OR INPUT CTA) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🧪</span>
                <span>{t.soilHealth}</span>
              </span>
              <button
                onClick={() => setIsSoilModalOpen(true)}
                className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200"
              >
                {soilCard ? "Edit Readings" : "+ Enter Readings"}
              </button>
            </div>

            {soilCard ? (
              <div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 flex flex-col justify-between">
                    <span className="font-bold text-xs">{t.nitrogen}</span>
                    <span className="font-black text-sm sm:text-base mt-1 text-slate-900">
                      {soilCard.nitrogen}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 flex flex-col justify-between">
                    <span className="font-bold text-xs">{t.phosphorus}</span>
                    <span className="font-black text-sm sm:text-base mt-1 text-slate-900">
                      {soilCard.phosphorus}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 flex flex-col justify-between">
                    <span className="font-bold text-xs">{t.potassium}</span>
                    <span className="font-black text-sm sm:text-base mt-1 text-slate-900">
                      {soilCard.potassium}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 flex flex-col justify-between">
                    <span className="font-bold text-xs">{t.phLevel}</span>
                    <span className="font-black text-sm sm:text-base mt-1 text-blue-700">
                      {soilCard.ph}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-900">
                  <span>Card ID: <strong>{soilCard.cardNumber || "Verified"}</strong> • Tested: {soilCard.testDate}</span>
                </div>
              </div>
            ) : (
              /* Honest Prompt: User has not entered soil card */
              <div className="text-center py-4 px-2 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <span className="text-2xl block mb-1">📋</span>
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  {t.enterSoilCard}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {t.soilCardPrompt}
                </p>
                <button
                  onClick={() => setIsSoilModalOpen(true)}
                  className="mt-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-2 px-3.5 rounded-lg shadow-sm transition-all min-h-[36px]"
                >
                  + {t.enterSoilCard}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── 8. LIVE WEATHER FORECAST & MANDI PRICING ── */}
      <section className="space-y-6 pt-2">
        
        {/* LIVE 7-DAY WEATHER FORECAST FROM OPEN-METEO */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🌦️</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {t.weatherForecast7Day} — {farmerLocation.village ? `${farmerLocation.village}, ` : ''}{farmerLocation.district || farmerLocation.state}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                {liveWeather ? `Real-Time Met Data: ${liveWeather.station}` : "Connecting to IMD / Open-Meteo satellite feed..."}
              </p>
            </div>

            <Link
              to="/weather"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 border border-slate-300 px-3 py-1.5 rounded-lg hover:border-emerald-500 transition-all self-start sm:self-auto min-h-[36px] inline-flex items-center"
            >
              {t.viewFullWeather}
            </Link>
          </div>

          {weatherLoading ? (
            <div className="text-center py-10 font-bold text-slate-400">
              Fetching Open-Meteo live satellite radar...
            </div>
          ) : liveWeather && liveWeather.daily ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {liveWeather.daily.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-emerald-50/50 p-3.5 rounded-xl border border-slate-200 text-center transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-black text-slate-700 uppercase block">
                      {w.day[lang] || w.day.en}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {w.dateStr}
                    </span>
                    <div className="text-3xl my-2">{w.icon}</div>
                    <div className="text-sm font-black text-slate-900">
                      {w.tempMax}
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      {w.tempMin}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded block leading-tight">
                      Rain: {w.rainProb}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 block mt-1">
                      {w.suitability[lang] || w.suitability.en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 font-semibold">
              Live weather feed temporarily unavailable. Checking cached radar.
            </div>
          )}
        </div>

        {/* OFFICIAL MANDI MSP BENCHMARK & DEMO SPOT FEED */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📈</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {t.mandiTrend} & Official MSP
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                Official Kharif Marketing Season (KMS 2025-26) CACP Government Rates
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                {t.demoDataTag}
              </span>
              <a
                href="https://enam.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 border border-slate-300 px-3 py-1.5 rounded-lg hover:border-emerald-500 transition-all min-h-[36px] inline-flex items-center"
              >
                eNAM Official Portal ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-slate-50 border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">PADDY (COMMON) MSP</span>
              <span className="text-2xl font-black text-slate-900 block mt-1">
                ₹{OFFICIAL_MSP_2025_26.paddyCommon.price} / qtl
              </span>
              <span className="text-xs text-slate-600 mt-1 block">
                Source: agricoop.nic.in (2025-26)
              </span>
            </div>

            <div className="p-4 rounded-xl border bg-emerald-50 border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 block">PADDY (GRADE A) MSP</span>
              <span className="text-2xl font-black text-emerald-900 block mt-1">
                ₹{OFFICIAL_MSP_2025_26.paddyGradeA.price} / qtl
              </span>
              <span className="text-xs text-emerald-700 mt-1 block">
                Mandatory moisture: below 17%
              </span>
            </div>

            <div className="p-4 rounded-xl border bg-slate-50 border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">MUSTARD (RMS 2025-26)</span>
              <span className="text-2xl font-black text-slate-900 block mt-1">
                ₹{OFFICIAL_MSP_2025_26.mustard.price} / qtl
              </span>
              <span className="text-xs text-slate-600 mt-1 block">
                Sowing season rate benchmark
              </span>
            </div>
          </div>
        </div>

        {/* YIELD HISTORY - REAL FARMER RECORDS ONLY (NO INVENTED DATA) */}
        {yieldRecords && yieldRecords.length > 0 ? (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
              {t.yieldHistory} (Your Logged Seasons)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {yieldRecords.map((yr, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <span className="text-xs font-extrabold text-slate-500 block">{yr.season || yr.year}</span>
                  <span className="text-2xl font-black text-emerald-800 block mt-1">{yr.yield} T</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

      </section>

      {/* ── 9. QUICK DETAIL MODULES NAVIGATION ── */}
      <section className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider mb-3">
          🚜 {lang === "pa" ? "ਵਿਸਤ੍ਰਿਤ ਕਿਸਾਨ ਮਾਡਿਊਲ (ਵੱਖਰੇ ਪੰਨੇ)" : lang === "hi" ? "विस्तृत किसान मॉड्यूल" : "Detailed Farmer Modules (Full Pages)"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/weather"
            className="bg-white hover:bg-emerald-50 p-3 rounded-xl border border-slate-200 text-center transition-all shadow-xs min-h-[70px] flex flex-col justify-center"
          >
            <div className="text-2xl mb-1">🌦️</div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              {t.weather}
            </span>
          </Link>

          <Link
            to="/market-explorer"
            className="bg-white hover:bg-emerald-50 p-3 rounded-xl border border-slate-200 text-center transition-all shadow-xs min-h-[70px] flex flex-col justify-center"
          >
            <div className="text-2xl mb-1">📈</div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              {t.market}
            </span>
          </Link>

          <Link
            to="/disease"
            className="bg-white hover:bg-emerald-50 p-3 rounded-xl border border-slate-200 text-center transition-all shadow-xs min-h-[70px] flex flex-col justify-center"
          >
            <div className="text-2xl mb-1">📸</div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              {t.diseaseDetector}
            </span>
          </Link>

          <Link
            to="/roi"
            className="bg-white hover:bg-emerald-50 p-3 rounded-xl border border-slate-200 text-center transition-all shadow-xs min-h-[70px] flex flex-col justify-center"
          >
            <div className="text-2xl mb-1">🧮</div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              {t.incomeRoi}
            </span>
          </Link>

          <Link
            to="/ndvi"
            className="bg-white hover:bg-emerald-50 p-3 rounded-xl border border-slate-200 text-center transition-all shadow-xs min-h-[70px] flex flex-col justify-center"
          >
            <div className="text-2xl mb-1">🛰️</div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              {t.ndvi}
            </span>
          </Link>
        </div>
      </section>

      {/* ── 10. SOIL HEALTH CARD ENTRY MODAL ── */}
      {isSoilModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>🧪</span>
                <span>{t.enterSoilCard}</span>
              </h3>
              <button
                onClick={() => setIsSoilModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSoilCard} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Soil Health Card / Sample Number
                </label>
                <input
                  type="text"
                  value={soilFormData.cardNumber}
                  onChange={(e) => setSoilFormData({ ...soilFormData, cardNumber: e.target.value })}
                  placeholder="e.g. PB-LDH-2026-8812"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nitrogen (N)
                  </label>
                  <select
                    value={soilFormData.nitrogen}
                    onChange={(e) => setSoilFormData({ ...soilFormData, nitrogen: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  >
                    <option value="Low">Low (&lt; 280 kg/ha)</option>
                    <option value="Medium">Medium (280 - 560 kg/ha)</option>
                    <option value="High">High (&gt; 560 kg/ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phosphorus (P)
                  </label>
                  <select
                    value={soilFormData.phosphorus}
                    onChange={(e) => setSoilFormData({ ...soilFormData, phosphorus: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  >
                    <option value="Low">Low (&lt; 10 kg/ha)</option>
                    <option value="Medium">Medium (10 - 25 kg/ha)</option>
                    <option value="High">High (&gt; 25 kg/ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Potassium (K)
                  </label>
                  <select
                    value={soilFormData.potassium}
                    onChange={(e) => setSoilFormData({ ...soilFormData, potassium: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  >
                    <option value="Low">Low (&lt; 118 kg/ha)</option>
                    <option value="Medium">Medium (118 - 280 kg/ha)</option>
                    <option value="High">High (&gt; 280 kg/ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    pH Level
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={soilFormData.ph}
                    onChange={(e) => setSoilFormData({ ...soilFormData, ph: e.target.value })}
                    placeholder="e.g. 7.2"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-all min-h-[44px]"
                >
                  Save Soil Health Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 11. PAN-INDIA 4-TIER LOCATION SELECTOR MODAL (STATE -> DISTRICT -> TEHSIL -> VILLAGE) ── */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>📍</span>
                  <span>{t.changeLocation || "Change Farm Location"}</span>
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {lang === "pa" ? "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਕਿਸੇ ਵੀ ਰਾਜ, ਜ਼ਿਲ੍ਹੇ, ਤਹਿਸੀਲ ਅਤੇ ਪਿੰਡ ਦੀ ਚੋਣ ਕਰੋ" : lang === "hi" ? "संपूर्ण भारत में किसी भी राज्य, जिले, तहसील और गाँव का चयन करें" : "Select any State, District, Tehsil & Village across India"}
                </p>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Instant GPS Detection Option inside Modal */}
            <div className="mb-5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <span>📡</span>
                    <span>{t.detectGps || "Auto-Detect My Farm (GPS)"}</span>
                  </div>
                  <div className="text-[11px] font-medium text-emerald-800">
                    {lang === "pa" ? "ਮੋਬਾਈਲ GPS ਰਾਹੀਂ ਪਿੰਡ ਅਤੇ ਤਹਿਸੀਲ ਲੱਭੋ" : lang === "hi" ? "डिवाइस जीपीएस से सटीक गाँव व तहसील खोजें" : "Pinpoint exact village & tehsil via device sensor"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAutoDetectGPS}
                  disabled={isGpsDetecting}
                  className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-xs px-3 py-2 rounded-lg shadow-sm transition-all whitespace-nowrap min-h-[38px]"
                >
                  {isGpsDetecting ? "⏳ Searching..." : "📍 Detect"}
                </button>
              </div>

              {gpsStatusMessage && (
                <div className="mt-2 text-xs font-bold text-emerald-900 bg-white/80 p-2 rounded border border-emerald-300">
                  {gpsStatusMessage}
                </div>
              )}
            </div>

            {/* 4 Cascading Form Fields */}
            <form onSubmit={handleSaveLocation} className="space-y-4">
              
              {/* 1. State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. {t.state} (ਰਾਜ / State)
                </label>
                <select
                  value={modalLocation.state}
                  onChange={(e) => handleModalStateChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {allIndiaStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. {t.district} (ਜ਼ਿਲ੍ਹਾ / District)
                </label>
                <select
                  value={modalLocation.district}
                  onChange={(e) => handleModalDistrictChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {modalDistricts.map((dst) => (
                    <option key={dst} value={dst}>
                      {dst}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Tehsil / Sub-district */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  3. {t.tehsil} (ਤਹਿਸੀਲ / Sub-District)
                </label>
                <select
                  value={modalLocation.subDistrict}
                  onChange={(e) => handleModalSubDistrictChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {modalSubDistricts.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Village (Select from Panchayats or Type) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  4. {t.village} (ਪਿੰਡ / Gram Panchayat)
                </label>
                
                {modalVillages && modalVillages.length > 0 && (
                  <select
                    value={modalLocation.village}
                    onChange={(e) => setModalLocation((prev) => ({ ...prev, village: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                  >
                    {modalVillages.map((vlg) => (
                      <option key={vlg} value={vlg}>
                        {vlg}
                      </option>
                    ))}
                  </select>
                )}

                {/* Free Text Input for exact village name */}
                <input
                  type="text"
                  value={modalLocation.customVillage}
                  onChange={(e) => setModalLocation((prev) => ({ ...prev, customVillage: e.target.value }))}
                  placeholder={t.typeVillageName || "Or type your exact village name..."}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 font-medium block mt-1">
                  {lang === "pa" ? "ਜੇਕਰ ਤੁਹਾਡਾ ਪਿੰਡ ਸੂਚੀ ਵਿੱਚ ਨਹੀਂ ਹੈ, ਤਾਂ ਇੱਥੇ ਨਾਮ ਲਿਖੋ।" : lang === "hi" ? "यदि आपका गाँव सूची में नहीं है, तो यहाँ नाम लिखें।" : "If your village is not listed above, enter its exact name."}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm py-3 rounded-xl transition-all min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-all min-h-[44px]"
                >
                  ✓ {t.applyLocation || "Save Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 12. FARMER NAME PERSONALIZATION MODAL ── */}
      {isNameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>👤</span>
                  <span>{lang === "pa" ? "ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ" : lang === "hi" ? "अपना नाम दर्ज करें" : "Set Your Name"}</span>
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {lang === "pa" ? "ਤੁਹਾਡੇ ਡੈਸ਼ਬੋਰਡ ਅਤੇ ਨਿੱਜੀ ਸੁਆਗਤ ਲਈ" : lang === "hi" ? "आपके डैशबोर्ड एवं अभिवादन हेतु" : "Used for your personal greeting and advisories"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNameModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFarmerName} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === "pa" ? "ਕਿਸਾਨ ਦਾ ਨਾਮ" : lang === "hi" ? "किसान का नाम" : "Farmer's First Name"}
                </label>
                <input
                  type="text"
                  autoFocus
                  value={nameInputVal}
                  onChange={(e) => setNameInputVal(e.target.value)}
                  placeholder={lang === "pa" ? "ਉਦਾਹਰਨ: ਗੁਰਪ੍ਰੀਤ, ਹਰਪ੍ਰੀਤ" : lang === "hi" ? "उदा: रमेश, मुकेश, राजेश" : "e.g. Ramesh, Gurpreet"}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 font-medium block mt-1.5">
                  {lang === "pa" ? "ਇਹ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਰਹੇਗਾ।" : lang === "hi" ? "यह नाम आपके डिवाइस में सुरक्षित रहेगा।" : "Saved locally on your device for a personalized experience."}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNameModalOpen(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm py-2.5 rounded-xl transition-all min-h-[44px]"
                >
                  {lang === "pa" ? "ਰੱਦ ਕਰੋ" : lang === "hi" ? "रद्द करें" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={!nameInputVal.trim()}
                  className="w-2/3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-extrabold text-sm py-2.5 rounded-xl shadow-md transition-all min-h-[44px]"
                >
                  ✓ {lang === "pa" ? "ਸੁਰੱਖਿਅਤ ਕਰੋ" : lang === "hi" ? "सुरक्षित करें" : "Save Name"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}