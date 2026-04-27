const express   = require("express");
const router    = express.Router();
const PestAlert = require("../models/PestAlert");

// ── GET /api/pest-alerts
// Query params: ?region=Punjab&crops=Wheat
router.get("/", async (req, res) => {
  try {
    const { region, crops } = req.query;
    const query = { isActive: true };

    if (region && region !== "All States") {
      query.region = region;
    }
    if (crops && crops !== "All Crops") {
      query.affectedCrops = { $in: crops.split(",") };
    }

    const alerts = await PestAlert.find(query).sort({
      severity: -1,  // high first
      createdAt: -1,
    });

    res.json({ success: true, count: alerts.length, alerts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/pest-alerts (admin adds new alert)
router.post("/", async (req, res) => {
  try {
    const alert = new PestAlert(req.body);
    await alert.save();
    res.json({ success: true, alert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── DELETE /api/pest-alerts/:id
router.delete("/:id", async (req, res) => {
  try {
    await PestAlert.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
