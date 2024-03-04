const actuatorModel = require("../models/actuatorModel");

exports.updateValue = async (req, res) => {
    try {
      const { plantName } = req.params;
      const { sensors } = req.body;
  
      const filter = { "plants.name": plantName };
      const updatedValue = await actuatorModel.findOne(filter);
  
      if (!updatedValue) {
        // Plant doesn't exist, create a new document
        const newPlant = { name: plantName, sensors };
        await actuatorModel.create({ plants: [newPlant] });
        return res.json(newPlant);
      }
  
      // Update the existing plant's sensors
      const updatedPlant = updatedValue.plants.find((plant) => plant.name === plantName);
      updatedPlant.sensors = sensors;
      await updatedValue.save();
  
      console.log(updatedValue);
      res.json(updatedValue);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };
  

exports.getValue = async (req, res) => {
  try {
    const { plantName } = req.params;
    const query = plantName ? { "plants.name": plantName } : {};

    const values = await actuatorModel.find(query);
    res.json(values);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
