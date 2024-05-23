const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

router.get("http://localhost:8000/user/auth/google", googleAuthController.signin);
router.get("http://localhost:8000/user/auth/google/callback", googleAuthController.signinCallback, googleAuthController.dashboard);


module.exports = router;