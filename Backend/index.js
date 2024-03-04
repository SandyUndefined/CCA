const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const PORT = 8000;
const db = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const actuatorRoutes = require('./routes/actuatorRoutes')
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csv = require('csv-parser');

app.use(cookieParser());
app.use(
  cors({
    origin: 'https://research.iitmandi.ac.in',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'IITMANDI',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/sensor', sensorRoutes);
app.use('/user', userRoutes);
app.use('/act',actuatorRoutes)

// HTTPS Configuration
const options = {
  cert: fs.readFileSync('./SSL.crt'),
  key: fs.readFileSync('./SSL.key'),
  ca: fs.readFileSync('./SSL_Bundle.crt'),
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});