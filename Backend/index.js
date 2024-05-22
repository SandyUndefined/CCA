require('dotenv').config();
const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();
const PORT = 8000;
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const actuatorRoutes = require("./routes/actuatorRoutes");
const session = require("express-session");
 const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csv = require("csv-parser");

app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const corsOptions = {
  origin: "http://13.235.128.105:3000",
  credentials: true,
};

app.use(cors(corsOptions));


app.use(
  session({
    secret: "IITMANDI",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/sensor", sensorRoutes);
app.use("/user", userRoutes);
app.use("/act", actuatorRoutes);

// HTTPS Configuration
const options = {
  cert: fs.readFileSync("SSL.crt"),
  key: fs.readFileSync("SSL.key"),
  ca: fs.readFileSync("SSL_Bundle.crt"),
};

// Create HTTPS server
// const server = https.createServer(options, app);

const localServer = http.createServer(options, app);

localServer.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

// server.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT}`);
// });





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








// google auth

// // const express = require("express");
// // const passport = require("passport");
// // const session = require("express-session");
// // const cookieParser = require("cookie-parser");
// const { signin, signinCallback, dashboard } = require("./controllers/googleAuthController");

// // // // const app = express();

// app.use(cookieParser());
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
// // app.use(passport.initialize());
// // app.use(passport.session());

// app.get("/user/auth/google", signin);
// app.get("/user/auth/google/callback", signinCallback, dashboard);

// // app.listen(8000, () => {
// //   console.log("Server running on http://localhost:8000");
// // });




// const express = require("express");
// const passport = require("passport");
// const cookieParser = require("cookie-parser");
require("./controllers/googleAuthController"); 

// const app = express();

app.use(passport.initialize());
app.use(cookieParser());

// Import routes
const authRoutes = require("./routes/authRoutes");

app.use("/user/auth", authRoutes);

// const PORT = 8000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




























