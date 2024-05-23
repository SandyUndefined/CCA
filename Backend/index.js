require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const passport = require("passport");
const PORT = process.env.PORT || 8000;
const userRoutes = require("./routes/userRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const actuatorRoutes = require("./routes/actuatorRoutes");
const session = require("express-session");
const authService = require("./services/authService");
const cors = require("cors");
require("./utils/passport-setup"); 

// Configure session management
app.use(
  session({
    secret: "replace_with_a_real_secret", // Ensure this is a secure secret and ideally environment-specific
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }, // Consider using secure: true in production
  })
);

// Initialize passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware to parse JSON payloads
app.use(bodyParser.json());
app.use(cors());

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, issue token and redirect to the home page.
    const token = authService.generateToken(req.user);
    res.cookie("postitgooglejwt", token, { httpOnly: true }); // Send JWT in HTTP-only cookie
    res
      .status(201)
      .json({ success: true, message: "Google Auth Success!" });
    // res.redirect("{process.env.FRONTEND_URL}/dashboard"); // Adjust redirect as necessary // Send response code to frontend
  }
);

app.use("/sensor", sensorRoutes);
app.use("/user", userRoutes);
app.use("/act", actuatorRoutes);
app.get("/", (req, res) => {
  res.json({ message: "CCA API is working..." });
});
// HTTPS Configuration
const options = {
  cert: fs.readFileSync("SSL.crt"),
  key: fs.readFileSync("SSL.key"),
  ca: fs.readFileSync("SSL_Bundle.crt"),
};


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// --------------- simple logging with winston-----------------------//


// logging with winston

const winston = require('winston');
const { error } = require("console");

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
   
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});




logger.info('Log files');

logger.error('Something Went Wrong', {error: new Error('Something went Wrong')});

logger.log({
  level: 'info',
  message: 'Hello CCA IIT MANDI!'
});





//------------------- another code of logging with winston using different format setting ----------------






// const winston = require('winston');
// const { format, transports } = winston;

// // Create a logger instance
// const logger = winston.createLogger({
//   level: 'info', // Default level for logging
//   format: format.combine(
//     format.timestamp(), // Adds timestamp to logs
//     format.printf(({ level, message, timestamp }) => {
//       // return `${timestamp} [${level.toUpperCase()}]: ${message}`;
//     })
//   ),
//   transports: [
//     // Console transport for development
//     new transports.Console({
//       level: 'debug', // Logs all levels to the console
//       format: format.combine(
//         format.colorize(), // Adds colors to console logs
//         format.simple()   // Simplifies console log output
//       ),
//     }),
//     // File transport for production
//     new transports.File({
//       filename: 'application.log', // Logs to a file
//       level: 'info', // Only logs 'info' level and higher to the file
//     }),
//   ],
// });

// // Test the logger with different log levels
// logger.debug('This is a debug message');
// logger.info('This is an info message');
// logger.warn('This is a warning message');
// logger.error('This is an error message');

// module.exports = logger;



























