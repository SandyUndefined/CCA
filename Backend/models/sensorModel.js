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


const SensorData = sequelize.define("SensorData", {
  plantId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  temperature_internal_Sensor1: DataTypes.STRING,
  temperature_internal_Sensor2: DataTypes.STRING,
  temperature_internal_Sensor3: DataTypes.STRING,
  temperature_internal_Sensor4: DataTypes.STRING,
  temperature_external_Sensor1: DataTypes.STRING,
  temperature_external_Sensor2: DataTypes.STRING,
  humidity_internal_Sensor1: DataTypes.STRING,
  humidity_internal_Sensor2: DataTypes.STRING,
  humidity_internal_Sensor3: DataTypes.STRING,
  humidity_internal_Sensor4: DataTypes.STRING,
  humidity_external_Sensor1: DataTypes.STRING,
  humidity_external_Sensor2: DataTypes.STRING,
  soilTemperature_internal_Sensor1: DataTypes.STRING,
  soilTemperature_internal_Sensor2: DataTypes.STRING,
  soilTemperature_internal_Sensor3: DataTypes.STRING,
  soilTemperature_internal_Sensor4: DataTypes.STRING,
  pyranometer_Sensor1: DataTypes.STRING,
  waterTemperature_Sensor1: DataTypes.STRING,
  waterTemperature_Sensor2: DataTypes.STRING,
  co2_Sensor1: DataTypes.STRING,
  co2_Sensor2: DataTypes.STRING,
  light_Sensor1: DataTypes.STRING,
  light_Sensor2: DataTypes.STRING,
  moisture_Sensor1: DataTypes.STRING,
  moisture_Sensor2: DataTypes.STRING,
  moisture_Sensor3: DataTypes.STRING,
  moisture_Sensor4: DataTypes.STRING,
  actuators_Sensor1: DataTypes.STRING,
  actuators_Sensor2: DataTypes.STRING,
  actuators_Sensor3: DataTypes.STRING,
  actuators_Sensor4: DataTypes.STRING,
  actuators_Sensor5: DataTypes.STRING,
  actuators_Sensor6: DataTypes.STRING,
});

(async () => {
  try {
    await sequelize.sync();
    console.log("SensorData model synchronized with database");
  } catch (error) {
    console.error("Error synchronizing model:", error);
  }
})();

module.exports = SensorData;
