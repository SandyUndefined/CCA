const Sensor = require("../models/sensorModel"); // Assuming you've created the Sensor model

// Retrieve data for a specific plant
exports.getData = async (req, res) => {
  try {
    const plantId = req.params.plantId;
    console.log(
      `\nNew Event: Fetching data for Plant ${plantId} from the server.`
    );

    let data = await Sensor.findAll({ where: { plantId } });
    res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

// Add data for a specific plant
exports.addData = async (req, res) => {
  try {
    const plantId = req.params.plantId;
    let data = req.body;
    console.log(`\nNew Event: Data to be uploaded for Plant ${plantId}:\n`);
    console.log(data);

    data.plantId = plantId;

    let uploadedData = await Sensor.create(data);
    res.status(201).json({
      data: uploadedData,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

// Delete all data for a specific plant
exports.deleteData = async (req, res) => {
  try {
    const plantId = req.params.plantId;
    await Sensor.destroy({ where: { plantId } });
    res.status(200).json({
      message: `All data for Plant ${plantId} deleted successfully.`,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

// Retrieve data for a specific plant within a time range
exports.filterDataByTimeRange = async (req, res) => {
  try {
    const plantId = req.params.plantId;
    const { startTime, endTime } = req.body;

    const results = await Sensor.findAll({
      where: {
        plantId,
        timestamp: {
          [Sequelize.Op.between]: [new Date(startTime), new Date(endTime)],
        },
      },
    });
    console.log(results);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Retrieve the latest actuator values
exports.getLatestActuator = async (req, res) => {
  try {
    const latestData = await Sensor.findOne({
      attributes: ["data.actuators"],
      order: [["timestamp", "DESC"]],
    });

    if (latestData && latestData.data.actuators) {
      const actuatorValues = latestData.data.actuators;
      const latestActuatorValues = {};
      Object.keys(actuatorValues).forEach((sensor) => {
        latestActuatorValues[sensor] = actuatorValues[sensor];
      });
      res.json(latestActuatorValues);
    } else {
      res.status(404).json({ message: "Actuator data not found" });
    }
  } catch (error) {
    console.error("Failed to retrieve actuator values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
