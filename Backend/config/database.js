// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017", {
//   dbName: "IITMandi_Project",
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// module.exports = db;

const mysql = require("mysql2");
const config = require("../config.json");

// Create a connection pool
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id", connection.threadId);
});

module.exports = pool.promise();
