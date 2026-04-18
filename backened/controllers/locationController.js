// Mock reverse geocoding controller
exports.reverseGeocode = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    console.log(`[SIMULATED] Reverse geocoding for coordinates: ${lat}, ${lng}`);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return mock data (Rajasthan based as per user's demo code)
    res.json({
      success: true,
      district: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      village: 'Gram Panchayat'
    });
  } catch (error) {
    res.status(500).json({ error: 'Reverse geocoding failed' });
  }
};
