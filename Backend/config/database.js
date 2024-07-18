const { Sequelize } = require("sequelize");
require("dotenv").config();
// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOSTNAME,
    port: 3306, // Default to 3306 if not specified
    dialect: "mysql", // You can change this to 'postgres', 'sqlite', 'mariadb', 'mssql', etc.
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
