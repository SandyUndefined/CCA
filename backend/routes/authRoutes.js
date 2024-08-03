const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

router.get("https://research.iitmandi.ac.in:8000/user/auth/google", googleAuthController.signin);
router.get(
  "https://research.iitmandi.ac.in:8000/user/auth/google/callback",
  googleAuthController.signinCallback,
  googleAuthController.dashboard
);


module.exports = router;