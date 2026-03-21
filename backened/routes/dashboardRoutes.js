const express = require("express");
const router = express.Router();

// Dashboard routes
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Dashboard API is working",
    data: {
      stats: {
        totalFarmers: 150,
        activeProjects: 12,
        revenue: 500000,
        pendingTasks: 5
      }
    }
  });
});

module.exports = router;