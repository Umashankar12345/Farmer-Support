const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/auth');

router.get('/', verifyJWT, async (req, res) => {
  // Simulated govt scheme data
  res.json({
    enrolled: [
      { id: 'PMK-123', name: 'PM-KISAN', benefit: '₹6000/yr', status: 'Active', progress: 66, nextInstallment: 'May 2026' }
    ],
    available: [
      { id: 'PKSY-01', name: 'PM Krishi Sinchai Yojana', benefit: 'Drip Irrigation Subsidy', eligibility: 'High', deadline: '2026-06-15' },
      { id: 'SHC-02', name: 'Soil Health Card', benefit: 'Free Lab Testing', eligibility: 'Eligible', deadline: 'Ongoing' },
      { id: 'PMFBY-03', name: 'Fasal Bima Yojana', benefit: 'Crop Insurance', eligibility: 'Recommended', deadline: 'Season Start' }
    ]
  });
});

module.exports = router;
