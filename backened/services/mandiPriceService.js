// backend/services/mandiPriceService.js
//
// Replaces the SIMULATED fetchLivePrice()/getPriceTrend() functions with a
// real call to the Government of India's open data API (data.gov.in),
// which sources data from AGMARKNET - the official mandi price reporting
// system used across Indian wholesale markets.
//
// Get your own free API key at: https://data.gov.in/user/register
// (Register -> My Account -> API Access -> generate key)
//
// IMPORTANT - verify before production:
// This uses the well-known public resource ID for "Current Daily Price of
// Various Commodities from Various Markets (Mandi)". Field names below
// (state, district, market, commodity, variety, arrival_date, min_price,
// max_price, modal_price) match this dataset's documented schema, but you
// should confirm them against a live response with your own key before
// relying on this in front of real users - government API schemas do
// occasionally change without notice.

const axios = require("axios");

const ENAM_RESOURCE_URL =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const API_KEY = process.env.DATA_GOV_IN_API_KEY; // set this in your .env file

// Simple in-memory cache: mandi prices only update once a day on AGMARKNET,
// so there's no need to hit the API on every single farmer request.
// Key: `${market}_${commodity}` -> { data, fetchedAt }
const priceCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

function getCacheKey(market, commodity) {
  return `${market.toLowerCase()}_${commodity.toLowerCase()}`;
}

/**
 * Fetches today's real price for a commodity at a specific mandi from
 * the government eNAM/AGMARKNET dataset.
 *
 * Returns null if no data is found (some mandis don't report every
 * commodity every day) - the caller should fall back gracefully, NOT
 * crash or show a broken UI.
 */
async function fetchRealMandiPrice(market, commodity, state) {
  const cacheKey = getCacheKey(market, commodity);
  const cached = priceCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  if (!API_KEY) {
    throw new Error(
      "DATA_GOV_IN_API_KEY is not set. Get a free key at https://data.gov.in/user/register"
    );
  }

  const response = await axios.get(ENAM_RESOURCE_URL, {
    params: {
      "api-key": API_KEY,
      format: "json",
      limit: 10,
      "filters[market]": market,
      "filters[commodity]": commodity,
      ...(state ? { "filters[state]": state } : {}),
    },
    timeout: 8000,
  });

  const records = response.data?.records || [];
  if (records.length === 0) {
    return null; // no data reported for this mandi/commodity today
  }

  // Records are typically date-sorted; take the most recent one
  const latest = records[0];

  const result = {
    market: latest.market,
    commodity: latest.commodity,
    variety: latest.variety,
    arrivalDate: latest.arrival_date,
    minPrice: Number(latest.min_price),
    maxPrice: Number(latest.max_price),
    modalPrice: Number(latest.modal_price), // "modal" = most common traded price - use this as THE price
  };

  priceCache.set(cacheKey, { data: result, fetchedAt: Date.now() });
  return result;
}

/**
 * Gets the price to show the farmer for a given mandi/commodity, with a
 * SAFE fallback so the feature never shows a broken "empty box" (the bug
 * from the original Market/eNAM screen) if the government API has no
 * data for that specific mandi today.
 *
 * The `usedFallback` flag is returned so the UI can be honest with the
 * farmer about whether this is live government data or an estimate -
 * never silently pass off a fallback number as if it were live.
 */
async function getMandiPriceWithFallback(market, commodity, state, estimateBasePrice) {
  try {
    const real = await fetchRealMandiPrice(market, commodity, state);
    if (real) {
      return {
        price: real.modalPrice,
        source: "live",
        arrivalDate: real.arrivalDate,
        usedFallback: false,
      };
    }
  } catch (err) {
    console.error(`[mandiPriceService] API error for ${market}/${commodity}:`, err.message);
  }

  // Fallback: no live data available for this specific mandi/commodity today.
  // Be explicit to the farmer that this is an estimate, not live data.
  return {
    price: estimateBasePrice,
    source: "estimate",
    arrivalDate: null,
    usedFallback: true,
  };
}

module.exports = {
  fetchRealMandiPrice,
  getMandiPriceWithFallback,
};
