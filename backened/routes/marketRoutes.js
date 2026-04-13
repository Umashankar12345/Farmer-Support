const express = require('express');
const router = express.Router();

router.get('/prices', async (req, res) => {
  // Simulated eNAM live prices
  res.json({
    prices: [
      { crop: 'Wheat', mandi: 'Jaipur', price: '₹2,450', trend: '+1.2%', variant: 'Raj-3077' },
      { crop: 'Mustard', mandi: 'Alwar', price: '₹5,800', trend: '-0.5%', variant: 'Pusa' },
      { crop: 'Rice', mandi: 'Kota', price: '₹3,100', trend: '+0.8%', variant: 'Basmati' }
    ],
    lastUpdated: new Date().toISOString()
  });
});

module.exports = router;
