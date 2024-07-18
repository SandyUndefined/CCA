require('dotenv').config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const PORT = 8000;
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const actuatorRoutes = require("./routes/actuatorRoutes");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csv = require("csv-parser");
require("./controllers/googleAuthController"); 
const corsOptions = {
  origin: "https://research.iitmandi.ac.in:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  session({
    secret: "IITMANDI",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/sensor", sensorRoutes);
app.use("/user", userRoutes);
app.use("/act", actuatorRoutes);
app.use("/user/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("CCA Backend is working...");
});


// HTTPS Configuration
const options = {
  cert: fs.readFileSync("SSL.crt"),
  key: fs.readFileSync("SSL.key"),
  ca: fs.readFileSync("SSL_Bundle.crt"),
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});



// Import routes




























