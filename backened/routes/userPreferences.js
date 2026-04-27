const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { verifyJWT } = require("../middleware/auth"); // Using the existing middleware

// GET /api/user/preferences — load saved preferences
router.get("/preferences", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("preferredState preferredCrop");
    res.json({ 
        success: true, 
        preferredState: user.preferredState || "All States", 
        preferredCrop: user.preferredCrop || "All Crops" 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/user/preferences — save selected state + crop
router.put("/preferences", verifyJWT, async (req, res) => {
  try {
    const { preferredState, preferredCrop } = req.body;
    await User.findByIdAndUpdate(req.user.id, { preferredState, preferredCrop });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
