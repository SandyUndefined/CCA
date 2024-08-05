const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Allow minimum length of 1 character
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Allow minimum length of 1 character
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255], // Minimum length of 8 characters
    },
    defaultValue: "Google_SignIn",
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255], // Minimum length of 8 characters
      isConfirmed(value) {
        if (value !== this.password) {
          throw new Error("Passwords do not match");
        }
      },
    },
    defaultValue: "Google_SignIn",
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
});

(async () => {
  try {
    await sequelize.sync();
    console.log("User model synchronized with database");
  } catch (error) {
    console.error("Error synchronizing model:", error);
  }
})();

module.exports = User;