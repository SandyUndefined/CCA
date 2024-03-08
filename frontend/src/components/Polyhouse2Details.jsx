import React from 'react';

function Polyhouse2Details() {
  return (
    <div id="Polyhouse2">
      <div id="temp_2">
        <div className="heading">
          <h2>Temperature</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>O1T</p>
            <div className="graph">
              <canvas id="tempEx1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>O2T</p>
            <div className="graph">
              <canvas id="tempEx2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I1T</p>
            <div className="graph">
              <canvas id="tempIn1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I2T</p>
            <div className="graph">
              <canvas id="tempIn2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I3T</p>
            <div className="graph">
              <canvas id="tempIn3_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I4T</p>
            <div className="graph">
              <canvas id="tempIn4_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="humidity_2">
        <div className="heading">
          <h2>Humidity</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>E1H</p>
            <div className="graph">
              <canvas id="humidEx1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>E2H</p>
            <div className="graph">
              <canvas id="humidEx2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I1H</p>
            <div className="graph">
              <canvas id="humidIn1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I2H</p>
            <div className="graph">
              <canvas id="humidIn2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I3H</p>
            <div className="graph">
              <canvas id="humidIn3_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I4H</p>
            <div className="graph">
              <canvas id="humidIn4_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="soilTemp_2">
        <div className="heading">
          <h2>Soil Temperature</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>I1ST</p>
            <div className="graph">
              <canvas id="soilTempIn1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I2ST</p>
            <div className="graph">
              <canvas id="soilTempIn2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I3ST</p>
            <div className="graph">
              <canvas id="soilTempIn3_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I4ST</p>
            <div className="graph">
              <canvas id="soilTempIn4_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="waterTemp_2">
        <div className="heading">
          <h2>Water Temperature</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1WT</p>
            <div className="graph">
              <canvas id="waterTemp1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2WT</p>
            <div className="graph">
              <canvas id="waterTemp2_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="co2_2">
        <div className="heading">
          <h2>CO2</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1CO2</p>
            <div className="graph">
              <canvas id="co2_1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2CO2</p>
            <div className="graph">
              <canvas id="co2_2_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="light_2">
        <div className="heading">
          <h2>Light</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1L</p>
            <div className="graph">
              <canvas id="light1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2L</p>
            <div className="graph">
              <canvas id="light2_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="moisture_2">
        <div className="heading">
          <h2>Moisture</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1M</p>
            <div className="graph">
              <canvas id="moisture1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2M</p>
            <div className="graph">
              <canvas id="moisture2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>3M</p>
            <div className="graph">
              <canvas id="moisture3_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>4M</p>
            <div className="graph">
              <canvas id="moisture4_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="actuators_2">
        <div className="heading">
          <h2>Actuators</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1AC</p>
            <div className="graph">
              <canvas id="ac1_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2AC</p>
            <div className="graph">
              <canvas id="ac2_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>3AC</p>
            <div className="graph">
              <canvas id="ac3_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>4AC</p>
            <div className="graph">
              <canvas id="ac4_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>5AC</p>
            <div className="graph">
              <canvas id="ac5_2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>6AC</p>
            <div className="graph">
              <canvas id="ac6_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="pyranometer_2">
        <div className="heading">
          <h2>Solar Irradiance</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1SI</p>
            <div className="graph">
              <canvas id="pyro_2"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Polyhouse2Details;
