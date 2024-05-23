const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../services/userService");
const emailService = require("../services/emailService");

const userController = {
  // Handles user registration
  async register(req, res) {
    const {
      name,
      email,
      password,
      role,
      accountType,
      organizationName,
      dataAccess,
    } = req.body;

    // Enhanced password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters long, include upper and lower case letters, and contain numbers and special characters.",
        });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const newUser = await User.createUser({
        name,
        email,
        password: hashedPassword,
        role,
        accountType,
        organizationName,
        dataAccess
      });

      await emailService.sendVerificationEmail(email, verificationToken);
      res
        .status(201)
        .json({
          userId: newUser.id,
          email: newUser.email,
          message: "Verification email sent. Please check your email.",
        });
    } catch (error) {
      console.error("Registration Error:", error);
      res
        .status(500)
        .json({ message: "Could not register user", error: error.message });
    }
  },

  // Handles user login
  async login(req, res) {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const user = await User.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.is_verified) {
        return res
          .status(401)
          .json({ message: "Please verify your email before logging in." });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        // Possible account lockout implementation here
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token, userId: user.id, email: user.email });
    } catch (error) {
      console.error("Login Error:", error);
      res
        .status(500)
        .json({ message: "Could not log in", error: error.message });
    }
  },

  // Handles forgot password request
  async forgotPassword(req, res) {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await User.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "20m",
      });
      const tokenTimestamp = new Date(); // Current timestamp
      console.log(tokenTimestamp);
      // Store the reset token and timestamp in the database
      await User.updateResetToken(user.id, resetToken, tokenTimestamp);

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      await emailService.sendPasswordResetEmail(email, resetLink);
      res.json({ message: "Password reset link has been sent to your email." });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res
        .status(500)
        .json({
          message: "Error in sending password reset link",
          error: error.message,
        });
    }
  },

  // Handles resetting the user's password
  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    // Check if token and new password are provided
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findUserById(decoded.userId);

      // Check if token matches the one in the database and check timestamp
      if (!user.reset_token || user.reset_token !== token) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }

      const tokenAge =
        (new Date() - new Date(user.token_timestamp)) / 1000 / 60; // Convert to minutes
      if (tokenAge > 20) {
        // Assuming token validity is 20 minutes
        return res.status(401).json({ message: "Invalid or expired token." });
      }

      // Enhanced password validation
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res
          .status(400)
          .json({
            message:
              "Password must be at least 8 characters long, include upper and lower case letters, and contain numbers and special characters.",
          });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updatePassword(decoded.userId, hashedPassword);
      await User.clearResetToken(decoded.userId); // Optionally clear the token after use
      res.json({ message: "Your password has been updated successfully." });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
      console.error("Reset Password Error:", error);
      res
        .status(500)
        .json({ message: "Could not reset password", error: error.message });
    }
  },
};

module.exports = userController;
