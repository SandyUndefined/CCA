const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

router.get("/google", googleAuthController.signin);
router.get(
  "/google/callback",
  googleAuthController.signinCallback,
  googleAuthController.dashboard
);


module.exports = router;