const Actuator = require("../models/actuatorModel"); // Assuming you've created the Actuator model

exports.updateValue = async (req, res) => {
  try {
    const { plantName } = req.params;
    const { sensors } = req.body;

    // Check if the plant exists
    let actuator = await Actuator.findOne({ where: { plantName } });

    if (!actuator) {
      // If the plant doesn't exist, create a new one
      actuator = await Actuator.create({ plantName, ...sensors });
      return res.json(actuator);
    }

    // If the plant exists, update its sensors
    await Actuator.update(sensors, { where: { plantName } });
    actuator = await Actuator.findOne({ where: { plantName } });

    res.json(actuator);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.getValue = async (req, res) => {
  try {
    const { plantName } = req.params;
    const query = plantName ? { where: { plantName } } : {};

    const values = await Actuator.findAll(query);
    res.json(values);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
