const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "other"),
      defaultValue: "user",
    },
    accountType: {
      type: DataTypes.STRING,
      defaultValue: "other",
    },
    organizationName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Google_SignIn",
    },
    dataAccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

sequelize
  .sync({ alter: true, force: true }) // Use `force: true` to drop tables first
  .then(() => {
    console.log("User Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });

module.exports = User;
