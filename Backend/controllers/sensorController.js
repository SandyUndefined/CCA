const Sensor = require('../models/sensorModel');

exports.getData = async (req, res) => {
  try {
    const plantId = req.params.plantId; 
    console.log(`\nNew Event: Fetching data for Plant ${plantId} from the server.`);
    
    let data = await Sensor.find({ plantId }); 
    res.status(200).json({
      result: data
    });
  } catch (err) {
    res.json({
      error: err.message
    });
  }
};

exports.addData = async (req, res) => {
  try {
    const plantId = req.params.plantId; 
    let data = req.body;
    console.log(`\nNew Event: Data to be uploaded for Plant ${plantId}:\n`);
    console.log(data);
    
    data.plantId = plantId;

    let uploadedData = await Sensor.create(data);
    res.status(201).json({
      data: uploadedData
    });
  } catch (err) {
    res.json({
      error: err.message
    });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const plantId = req.params.plantId; 
    await Sensor.deleteMany({ plantId }); 
    res.status(200).json({
      message: `All data for Plant ${plantId} deleted successfully.`
    });
  } catch (err) {
    res.json({
      error: err.message
    });
  }
};

exports.filterDataByTimeRange = async (req, res) => {
  try {
    const plantId = req.params.plantId; 
    const { startTime, endTime } = req.body;

    const results = await Sensor.find({
      plantId,
      timestamp: {
        $gte: new Date(startTime),
        $lte: new Date(endTime)
      }
    }).exec();
    console.log(results);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}



// Define the route handler for retrieving the latest actuator values
exports.getLatestActuator = async (req, res) => {
  await Sensor.findOne({}, { 'data.actuators': 1 })
    .sort({ timestamp: -1 })
    .then((latestData) => {
      if (latestData && latestData.data.actuators) {
        const actuatorValues = latestData.data.actuators;
        const latestActuatorValues = {};
        Object.keys(actuatorValues).forEach((sensor) => {
          latestActuatorValues[sensor] = actuatorValues[sensor];
        });
        res.json(latestActuatorValues);
      } else {
        res.status(404).json({ message: 'Actuator data not found' });
      }
    })
    .catch((error) => {
      console.error('Failed to retrieve actuator values:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
};
