const mongoose = require("mongoose");

const actuatorSchema = new mongoose.Schema({
  plants: [
    {
      name: {
        type: String,
        required: true
      },
      sensors: {
        sensor1: {
          type: String,
          default: "Auto"
        },
        sensor2: {
          type: String,
          default: "Auto"
        },
        sensor3: {
          type: String,
          default: "Auto"
        },
        sensor4: {
          type: String,
          default: "Auto"
        },
        sensor5: {
          type: String,
          default: "Auto"
        },
        sensor6: {
          type: String,
          default: "Auto"
        }
        // Add more sensors as needed
      }
    }
  ]
});

const actuatorModel = mongoose.model("actuatorModel", actuatorSchema);
module.exports = actuatorModel;
