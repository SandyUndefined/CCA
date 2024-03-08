import React, { useEffect } from 'react';
import { POLYHOUSE_GET,GET_SENSOR_VALUES_URL, UPDATE_SENSOR_VALUES_URL } from '../server/config';
function ControlPanel1() {

  const updateSensor = (sensor, value) => {
    var data = {
      sensors: {}
    };

    fetch(GET_SENSOR_VALUES_URL)
      .then(response => response.json())
      .then(response => {
        var currentSensorValues = response[0].plants[0].sensors;

        data.sensors = { ...currentSensorValues };
        data.sensors[sensor] = value;

        fetch(UPDATE_SENSOR_VALUES_URL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(result => {
            console.log('Patch request successful', result);

            fetchSensorValues();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error retrieving sensor values:', error);
      });
  };

  const fetchSensorValues = () => {
    fetch(POLYHOUSE_GET)
      .then(response => response.json())
      .then(data => {
        var sensorData = data[0].plants[0].sensors;

        for (var i = 1; i <= 6; i++) {
          var sensorId = "sensor" + i;
          var sensorValue = sensorData[sensorId.toLowerCase()];

          var sensorButton = document.querySelector(
            "#sensors div:nth-child(" + i + ") button"
          );
          var sensorValueSpan = document.getElementById(sensorId + "-value");

          sensorButton.classList.remove("high", "low", "auto");
          sensorButton.classList.add(sensorValue.toLowerCase());

          if (sensorValueSpan) {
            sensorValueSpan.innerText = "Current value: " + sensorValue;
          }
        }

        var buttons = document.querySelectorAll("#sensors button");
        buttons.forEach(function (button) {
          var sensorValue = button.textContent;
          var sensorName = button.parentNode
            .querySelector("h2")
            .textContent.toLowerCase();
          if (sensorValue.toLowerCase() === sensorData[sensorName]) {
            button.classList.add("current-value");
          } else {
            button.classList.remove("current-value");
          }
        });
      })
      .catch(error => {
        console.error("Error retrieving sensor values:", error);
      });
  };

  useEffect(() => {
    fetchSensorValues();
  }, []);


  const toggleSlider = (sliderId) => {
    const slider = document.getElementById(sliderId);
    slider.classList.toggle('off');
    slider.classList.toggle('on');
  };

  const auto = (sliderId) => {
    // Define the functionality to set the sensor to Auto mode
    console.log(`Setting ${sliderId} to Auto mode`);
    toggleSlider(sliderId);
  };

  const off = (sliderId) => {
    // Define the functionality to turn off the sensor
    console.log(`Turning off ${sliderId}`);
    toggleSlider(sliderId);
  };

  const on = (sliderId) => {
    // Define the functionality to turn on the sensor
    console.log(`Turning on ${sliderId}`);
    toggleSlider(sliderId);
  };

  return (
    <div id="controlPannel">
      <div className="knobs">
        {/* Knob 1 */}
        <div id="knob1" className="knob">
          <button onClick={() => updateSensor('sensor1', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor('sensor1', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor('sensor1', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider1" className="slider off" />
        </div>
        {/* Knob 2 */}
        <div id="knob2" className="knob">
          <button onClick={() => updateSensor('sensor2', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor('sensor2', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor('sensor2', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider2" className="slider off" />
        </div>
        {/* Knob 3 */}
        <div id="knob3" className="knob">
          <button onClick={() => updateSensor('sensor3', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor('sensor3', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor('sensor3', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider3" className="slider off" />
        </div>
      </div>
      {/* Display */}
      <div className="display">
        <div id="screen">
          <div id="section1">
            <p>TEMPERATURE</p>
            <p>HUMIDITY</p>
            <p>TIMER</p>
          </div>
          <div id="section2">
            <div className="digits" id="screen_temp">27.2</div>
            <div className="digits" id="screen_humid">66</div>
            <div className="digits">1</div>
          </div>
          <div id="section3">
            <div className="check" id="power"></div>
            <div className="check" id="error"></div>
            <div className="check" id="fogger"></div>
            <div className="check" id="coolingPad"></div>
            <div className="check" id="ventilation"></div>
            <div className="check" id="light-screen"></div>
          </div>
          <div id="section4">
            <p>POWER</p>
            <p>ERROR</p>
            <p>FOGGER</p>
            <p>COOLING PAD</p>
            <p>VENTILATION</p>
            <p>LIGHT</p>
          </div>
        </div>
      </div>
      {/* Knobs */}
      <div className="knobs">
        {/* Knob 4 */}
        <div id="knob4" className="knob">
          <button onClick={() => updateSensor('sensor4', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor('sensor4', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor('sensor4', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider4" className="slider off" />
        </div>
        {/* Knob 5 */}
        <div id="knob5" className="knob">
          <button onClick={() => updateSensor('sensor5', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor('sensor5', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor('sensor5', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider5" className="slider off" />
        </div>
        {/* Knob 6 */}
        <div id="knob6" className="knob">
          <button onClick={() => updateSensor('sensor6', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor('sensor6', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor('sensor6', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider6" className="slider off" />
        </div>
      </div>
    </div>
  );
}

export default ControlPanel1;
