const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({
    token: "mock-login-token",
    email: req.body.email
  });
});

router.post("/register", (req, res) => {
  res.json({
    message: "Signup successful",
    user: req.body
  });
});

module.exports = router;
