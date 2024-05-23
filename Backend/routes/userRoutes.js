const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const jwt = require("jsonwebtoken");
const downloadData = require("../controllers/nodemailerController");
const User = require("../services/userService");

router.post("/signup", userController.register);
router.post("/login", userController.login);

// Route to handle email verification
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    try {
        // Decode and verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Verify user based on email extracted from token
        await User.verifyUser(decoded.email);
        res.status(200).send("Email verified successfully!");
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // Handle JWT-specific errors
            res.status(400).send("Invalid or expired token");
        } else {
            // Handle generic errors
            res.status(500).send("An error occurred during the verification process");
        }
    }
});



router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.get("/download", async (req, res) => {
  try {
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const result = await downloadData(userId, req, res);
    res.json(result);
  } catch (error) {
    console.error("Error getting AnalyticsData:", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting AnalyticsData" });
  }
});

module.exports = router;