import React from 'react';

function ControlPanel2() {
  const updateSensor2 = (sensor, value) => {
    // Define the functionality to update the sensor for control panel 2
    console.log(`Updating ${sensor} to ${value}`);
  };

  const toggleSlider2 = (sliderId) => {
    const slider = document.getElementById(sliderId);
    slider.classList.toggle('off');
    slider.classList.toggle('on');
  };

  const auto2 = (sliderId) => {
    // Define the functionality to set the sensor to Auto mode for control panel 2
    console.log(`Setting ${sliderId} to Auto mode`);
    toggleSlider2(sliderId);
  };

  const off2 = (sliderId) => {
    // Define the functionality to turn off the sensor for control panel 2
    console.log(`Turning off ${sliderId}`);
    toggleSlider2(sliderId);
  };

  const on2 = (sliderId) => {
    // Define the functionality to turn on the sensor for control panel 2
    console.log(`Turning on ${sliderId}`);
    toggleSlider2(sliderId);
  };

  return (
    <div id="controlPannel_2">
      <div className="knobs">
        {/* Knob 1 */}
        <div id="knob1_2" className="knob">
          <button onClick={() => updateSensor2('sensor1', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor2('sensor1', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor2('sensor1', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider1_2" className="slider off" />
        </div>
        {/* Knob 2 */}
        <div id="knob2_2" className="knob">
          <button onClick={() => updateSensor2('sensor2', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor2('sensor2', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor2('sensor2', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider2_2" className="slider off" />
        </div>
        {/* Knob 3 */}
        <div id="knob3_2" className="knob">
          <button onClick={() => updateSensor2('sensor3', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor2('sensor3', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor2('sensor3', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider3_2" className="slider off" />
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
        <div id="knob4_2" className="knob">
          <button onClick={() => updateSensor2('sensor4', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor2('sensor4', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor2('sensor4', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider4_2" className="slider off" />
        </div>
        {/* Knob 5 */}
        <div id="knob5_2" className="knob">
          <button onClick={() => updateSensor2('sensor5', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor2('sensor5', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor2('sensor5', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider5_2" className="slider off" />
        </div>
        {/* Knob 6 */}
        <div id="knob6_2" className="knob">
          <button onClick={() => updateSensor2('sensor6', 'Low')} className="off">
            Off
          </button>
          <button onClick={() => updateSensor2('sensor6', 'High')} className="on">
            On
          </button>
          <button onClick={() => updateSensor2('sensor6', 'Auto')} className="auto">
            Auto
          </button>
          <img src="../images/knob.png" alt="" id="slider6_2" className="slider off" />
        </div>
      </div>
    </div>
  );
}

export default ControlPanel2;
