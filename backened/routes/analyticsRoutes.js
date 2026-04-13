const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/auth');

router.get('/dashboard', verifyJWT, async (req, res) => {
  res.json({
    aiAccuracy: '94.2%',
    avgLatency: '142ms',
    farmersServed: '12.4k',
    queryCategories: [
      { category: 'Pest Control', count: 450 },
      { category: 'Fertilizer', count: 320 },
      { category: 'Weather', count: 280 },
      { category: 'Gov Schemes', count: 150 }
    ],
    techStack: {
      cacheHitRate: '98.5%',
      uptime: '99.99%',
      processedImages: 1420
    }
  });
});

module.exports = router;
