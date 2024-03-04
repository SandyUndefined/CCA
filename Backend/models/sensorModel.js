const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  plantId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  data: {
    temperature: {
      internal: {
        Sensor1: String,
        Sensor2: String,
        Sensor3: String,
        Sensor4: String,
      },
      external: {
        Sensor1: String,
        Sensor2: String,
      }
    },
    humidity: {
      internal: {
        Sensor1: String,
        Sensor2: String,
        Sensor3: String,
        Sensor4: String,
      },
      external: {
        Sensor1: String,
        Sensor2: String,
      }
    },
    soilTemperature: {
      internal: {
        Sensor1: String,
        Sensor2: String,
        Sensor3: String,
        Sensor4: String,
      }
    },
    pyranometer: {
      Sensor1: String
    },
    waterTemperature: {
      Sensor1: String,
      Sensor2: String
    },
    co2: {
      Sensor1: String,
      Sensor2: String
    },
    light: {
      Sensor1: String,
      Sensor2: String
    },
    moisture: {
      Sensor1: String,
      Sensor2: String,
      Sensor3: String,
      Sensor4: String
    },
    actuators: {
      Sensor1: String,
      Sensor2: String,
      Sensor3: String,
      Sensor4: String,
      Sensor5: String,
      Sensor6: String
    }
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
