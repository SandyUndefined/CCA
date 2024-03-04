// const mongoose = require("mongoose")

// var validateEmail = function (email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         minLength: 4

//     },
//     lastName: {
//         type: String,
//         required: true,
//         minLength: 4
//     },
//     email: {

//         type: String,
//         unique: true,
//         required: 'Email address is required',
//         validate: [validateEmail, 'Please fill a valid email address'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 8,
//         default: "Google_SignIn"
//     },
//     confirmPassword: {
//         type: String,
//         required: true,
//         minLength: 8,
//         default: "Google_SignIn",
//         validate: {
//             validator: function (confirmPassword) {
//                 return confirmPassword === this.password;
//             },
//             message: "Passwords do not match"
//         }
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'user', 'other'],
//         default: 'user'
//     },
//     accountType: {
//         type: String,
//         default: 'other',
//     },
//     organizationName: {
//         type: String,
//         default : "Google_SignIn",
//         required: true
//     },
//     dataAccess: {
//         type: Boolean,
//         default: true
//     }

// }
// )

// const userModel = mongoose.model("userModel", userSchema);
// module.exports = userModel

const { DataTypes, Sequelize } = require("sequelize");
const config = require("./config.json");
const sequelize = new Sequelize(
  "mysql://'user':'password'@'host'/'database'"
);

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 255], // Minimum length of 4 characters
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 255], // Minimum length of 4 characters
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
