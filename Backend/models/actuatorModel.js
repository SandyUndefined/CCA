// const mongoose = require("mongoose");

// const actuatorSchema = new mongoose.Schema({
//   plants: [
//     {
//       name: {
//         type: String,
//         required: true
//       },
//       sensors: {
//         sensor1: {
//           type: String,
//           default: "Auto"
//         },
//         sensor2: {
//           type: String,
//           default: "Auto"
//         },
//         sensor3: {
//           type: String,
//           default: "Auto"
//         },
//         sensor4: {
//           type: String,
//           default: "Auto"
//         },
//         sensor5: {
//           type: String,
//           default: "Auto"
//         },
//         sensor6: {
//           type: String,
//           default: "Auto"
//         }
//         // Add more sensors as needed
//       }
//     }
//   ]
// });

// const actuatorModel = mongoose.model("actuatorModel", actuatorSchema);
// module.exports = actuatorModel;

const { DataTypes, Sequelize } = require("sequelize");
const config = require("../config.json");

const { username, password, host, database } = config.mysql;

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);
const encodedHost = encodeURIComponent(host);
const encodedDatabase = encodeURIComponent(database);

const sequelize = new Sequelize(
  `mysql://${encodedUsername}:${encodedPassword}@${encodedHost}:3306/${encodedDatabase}`
);

const Actuator = sequelize.define("Actuator", {
  plantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sensor1: {
    type: DataTypes.STRING,
    defaultValue: "Auto",
  },
  sensor2: {
    type: DataTypes.STRING,
    defaultValue: "Auto",
  },
  sensor3: {
    type: DataTypes.STRING,
    defaultValue: "Auto",
  },
  sensor4: {
    type: DataTypes.STRING,
    defaultValue: "Auto",
  },
  sensor5: {
    type: DataTypes.STRING,
    defaultValue: "Auto",
  },
  sensor6: {
    type: DataTypes.STRING,
    defaultValue: "Auto",
  },
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Actuator model synchronized with database");
  } catch (error) {
    console.error("Error synchronizing model:", error);
  }
})();

module.exports = Actuator;
