const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");
const sensorModel = require("../models/sensorModel"); 
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");

async function sendSensorDataAsCSV(data, email) {
  try {
    const plants = {};

    // Group data by plantId
    data.forEach((item) => {
      const plantId = item.plantId;
      if (!plants[plantId]) {
        plants[plantId] = [];
      }
      plants[plantId].push(item);
    });

    // Prepare and send email for each plant
    for (const plantId in plants) {
      const plantData = plants[plantId];
      const csvWriter = createObjectCsvWriter({
        path: `${plantId}_data.csv`,
        header: [
          { id: "timestamp", title: "Timestamp" },
          {
            id: "temperature.internal.Sensor1",
            title: "Internal Temperature Sensor 1",
          },
          {
            id: "temperature.internal.Sensor2",
            title: "Internal Temperature Sensor 2",
          },
          {
            id: "temperature.internal.Sensor3",
            title: "Internal Temperature Sensor 3",
          },
          {
            id: "temperature.internal.Sensor4",
            title: "Internal Temperature Sensor 4",
          },
          {
            id: "temperature.external.Sensor1",
            title: "External Temperature Sensor 1",
          },
          {
            id: "temperature.external.Sensor2",
            title: "External Temperature Sensor 2",
          },
          {
            id: "humidity.internal.Sensor1",
            title: "Internal Humidity Sensor 1",
          },
          {
            id: "humidity.internal.Sensor2",
            title: "Internal Humidity Sensor 2",
          },
          {
            id: "humidity.internal.Sensor3",
            title: "Internal Humidity Sensor 3",
          },
          {
            id: "humidity.internal.Sensor4",
            title: "Internal Humidity Sensor 4",
          },
          {
            id: "humidity.external.Sensor1",
            title: "External Humidity Sensor 1",
          },
          {
            id: "humidity.external.Sensor2",
            title: "External Humidity Sensor 2",
          },
          {
            id: "humidity.external.Sensor3",
            title: "External Humidity Sensor 3",
          },
          {
            id: "soilTemperature.internal.Sensor1",
            title: "Internal Soil Temperature Sensor 1",
          },
          {
            id: "soilTemperature.internal.Sensor2",
            title: "Internal Soil Temperature Sensor 2",
          },
          {
            id: "soilTemperature.internal.Sensor3",
            title: "Internal Soil Temperature Sensor 3",
          },
          {
            id: "soilTemperature.internal.Sensor4",
            title: "Internal Soil Temperature Sensor 4",
          },
          { id: "pyranometer.Sensor1", title: "Pyranometer Sensor 1" },
          {
            id: "waterTemperature.Sensor1",
            title: "Water Temperature Sensor 1",
          },
          {
            id: "waterTemperature.Sensor2",
            title: "Water Temperature Sensor 2",
          },
          { id: "co2.Sensor1", title: "CO2 Sensor 1" },
          { id: "co2.Sensor2", title: "CO2 Sensor 2" },
          { id: "light.Sensor1", title: "Light Sensor 1" },
          { id: "light.Sensor2", title: "Light Sensor 2" },
          { id: "moisture.Sensor1", title: "Moisture Sensor 1" },
          { id: "moisture.Sensor2", title: "Moisture Sensor 2" },
          { id: "moisture.Sensor3", title: "Moisture Sensor 3" },
          { id: "moisture.Sensor4", title: "Moisture Sensor 4" },
          { id: "actuators.Sensor1", title: "Actuator Sensor 1" },
          { id: "actuators.Sensor2", title: "Actuator Sensor 2" },
          { id: "actuators.Sensor3", title: "Actuator Sensor 3" },
          { id: "actuators.Sensor4", title: "Actuator Sensor 4" },
          { id: "actuators.Sensor5", title: "Actuator Sensor 5" },
          { id: "actuators.Sensor6", title: "Actuator Sensor 6" },
        ],
      });

      const csvData = plantData.map((item) => ({
        timestamp: item.timestamp,
        "temperature.internal.Sensor1": item.data.temperature.internal.Sensor1,
        "temperature.internal.Sensor2": item.data.temperature.internal.Sensor2,
        "temperature.internal.Sensor3": item.data.temperature.internal.Sensor3,
        "temperature.internal.Sensor4": item.data.temperature.internal.Sensor4,
        "temperature.external.Sensor1": item.data.temperature.external.Sensor1,
        "temperature.external.Sensor2": item.data.temperature.external.Sensor2,
        "humidity.internal.Sensor1": item.data.humidity.internal.Sensor1,
        "humidity.internal.Sensor2": item.data.humidity.internal.Sensor2,
        "humidity.internal.Sensor3": item.data.humidity.internal.Sensor3,
        "humidity.internal.Sensor4": item.data.humidity.internal.Sensor4,
        "humidity.external.Sensor1": item.data.humidity.external.Sensor1,
        "humidity.external.Sensor2": item.data.humidity.external.Sensor2,
        "soilTemperature.internal.Sensor1":
          item.data.soilTemperature.internal.Sensor1,
        "soilTemperature.internal.Sensor2":
          item.data.soilTemperature.internal.Sensor2,
        "soilTemperature.internal.Sensor3":
          item.data.soilTemperature.internal.Sensor3,
        "soilTemperature.internal.Sensor4":
          item.data.soilTemperature.internal.Sensor4,
        "soilTemperature.internal.Sensor5":
          item.data.soilTemperature.internal.Sensor5,
        "soilTemperature.internal.Sensor6":
          item.data.soilTemperature.internal.Sensor6,
        "soilTemperature.internal.Sensor7":
          item.data.soilTemperature.internal.Sensor7,
        "soilTemperature.internal.Sensor8":
          item.data.soilTemperature.internal.Sensor8,
        "pyranometer.Sensor1": item.data.pyranometer.Sensor1,
        "waterTemperature.Sensor1": item.data.waterTemperature.Sensor1,
        "waterTemperature.Sensor2": item.data.waterTemperature.Sensor2,
        "co2.Sensor1": item.data.co2.Sensor1,
        "co2.Sensor2": item.data.co2.Sensor2,
        "light.Sensor1": item.data.light.Sensor1,
        "light.Sensor2": item.data.light.Sensor2,
        "moisture.Sensor1": item.data.moisture.Sensor1,
        "moisture.Sensor2": item.data.moisture.Sensor2,
        "moisture.Sensor3": item.data.moisture.Sensor3,
        "moisture.Sensor4": item.data.moisture.Sensor4,
        "actuators.Sensor1": item.data.actuators.Sensor1,
        "actuators.Sensor2": item.data.actuators.Sensor2,
        "actuators.Sensor3": item.data.actuators.Sensor3,
        "actuators.Sensor4": item.data.actuators.Sensor4,
        "actuators.Sensor5": item.data.actuators.Sensor5,
        "actuators.Sensor6": item.data.actuators.Sensor6,
      }));

      // Write CSV data for the current plant
      await csvWriter.writeRecords(csvData);

      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "process.env.EMAIL_USER",
          pass: "process.env.EMAIL_USER",
        },
      });

      const mailOptions = {
        from: "sender@example.com",
        to: email,
        subject: `${plantId} - Sensor Data CSV`,
        text: `Please find the attached CSV file with the sensor data for ${plantId}.`,
        html: `<p>Please find the attached CSV file with the sensor data for ${plantId}.</p>`,
        attachments: [
          {
            filename: `${plantId}_data.csv`,
            path: `${plantId}_data.csv`,
          },
        ],
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      fs.unlinkSync(`${plantId}_data.csv`);
    }
  } catch (error) {
    console.error("Failed to convert data to CSV and send email:", error);
    throw new Error(
      "An error occurred while converting data to CSV and sending the email."
    );
  }
}

async function downloadData(req, res) {
  try {
    const id = req.body.id;
    const user = await userModel.findByPk(id); 
    console.log(user.email);
    const email = user.email;

    const data = await sensorModel.findAll(); 

    await sendSensorDataAsCSV(data, email);
    console.log("Email sent successfully.");
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Failed to send email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
}

module.exports = downloadData;
