const axios = require("axios");
const { performance } = require("perf_hooks");

// In-Memory Cache Store with Stale Data Support
const cacheStore = new Map();

/**
 * Fetches Mandi prices from data.gov.in API with Redis/In-Memory Cache & Fallback
 * @param {string} state - E.g. 'Rajasthan' or 'Bihar'
 * @returns {Promise<Object>} Data payload with full telemetry execution metrics
 */
exports.getMandiPrices = async (state = "Rajasthan") => {
  const startTime = performance.now();
  const cacheKey = `mandi_${state.toLowerCase()}`;
  const now = Date.now();
  const TTL = 10 * 60 * 1000; // 10 minutes cache duration

  const cachedItem = cacheStore.get(cacheKey);

  // 1. Check for valid Cache Hit
  if (cachedItem && (now - cachedItem.timestamp < TTL)) {
    const latency = (performance.now() - startTime).toFixed(2);
    return {
      success: true,
      data: cachedItem.data,
      telemetry: {
        latencyMs: Number(latency),
        cacheStatus: "REDIS HIT",
        source: "In-Memory Cache Layer",
        staleFallback: false
      }
    };
  }

  // 2. Fresh API Fetch
  try {
    const apiKey = process.env.DATA_GOV_IN_API_KEY;
    const response = await axios.get(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070`,
      {
        params: {
          "api-key": apiKey,
          format: "json",
          "filters[state]": state,
          limit: 10
        },
        timeout: 4000 // 4s strict timeout
      }
    );

    const freshData = response.data.records || [];

    // Update Cache Store
    cacheStore.set(cacheKey, {
      timestamp: now,
      data: freshData
    });

    const latency = (performance.now() - startTime).toFixed(2);
    return {
      success: true,
      data: freshData,
      telemetry: {
        latencyMs: Number(latency),
        cacheStatus: "REDIS MISS",
        source: "Govt of India API (data.gov.in)",
        staleFallback: false
      }
    };
  } catch (error) {
    console.warn(`[Mandi Pipeline Warning] API failed or rate limited: ${error.message}`);

    // 3. Stale Data Fallback Strategy
    if (cachedItem) {
      const latency = (performance.now() - startTime).toFixed(2);
      return {
        success: true,
        data: cachedItem.data,
        telemetry: {
          latencyMs: Number(latency),
          cacheStatus: "STALE FALLBACK",
          source: "Cached Stale Snapshot",
          staleFallback: true
        }
      };
    }

    throw new Error("Agmarknet upstream unreachable and no stale cache available.");
  }
};
