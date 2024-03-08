import React from 'react';

function Polyhouse1Details() {
  return (
    <div id="Polyhouse1">
      <div id="temp">
        <div className="heading">
          <h2>Temperature</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>O1T</p>
            <div className="graph">
              <canvas id="tempEx1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>O2T</p>
            <div className="graph">
              <canvas id="tempEx2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I1T</p>
            <div className="graph">
              <canvas id="tempIn1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I2T</p>
            <div className="graph">
              <canvas id="tempIn2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I3T</p>
            <div className="graph">
              <canvas id="tempIn3"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I4T</p>
            <div className="graph">
              <canvas id="tempIn4"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="humidity">
        <div className="heading">
          <h2>Humidity</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>O1H</p>
            <div className="graph">
              <canvas id="humidEx1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>O2H</p>
            <div className="graph">
              <canvas id="humidEx2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I1H</p>
            <div className="graph">
              <canvas id="humidIn1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I2H</p>
            <div className="graph">
              <canvas id="humidIn2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I3H</p>
            <div className="graph">
              <canvas id="humidIn3"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I4H</p>
            <div className="graph">
              <canvas id="humidIn4"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="soilTemp">
        <div className="heading">
          <h2>Soil Temperature</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>I1ST</p>
            <div className="graph">
              <canvas id="soilTempIn1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I2ST</p>
            <div className="graph">
              <canvas id="soilTempIn2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I3ST</p>
            <div className="graph">
              <canvas id="soilTempIn3"></canvas>
            </div>
          </div>
          <div className="info">
            <p>I4ST</p>
            <div className="graph">
              <canvas id="soilTempIn4"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="waterTemp">
        <div className="heading">
          <h2>Water Temperature</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1WT</p>
            <div className="graph">
              <canvas id="waterTemp1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2WT</p>
            <div className="graph">
              <canvas id="waterTemp2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="co2">
        <div className="heading">
          <h2>CO2</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1CO2</p>
            <div className="graph">
              <canvas id="co2_1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2CO2</p>
            <div className="graph">
              <canvas id="co2_2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="light">
        <div className="heading">
          <h2>Light</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1L</p>
            <div className="graph">
              <canvas id="light1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2L</p>
            <div className="graph">
              <canvas id="light2"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="moisture">
        <div className="heading">
          <h2>Moisture</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1M</p>
            <div className="graph">
              <canvas id="moisture1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2M</p>
            <div className="graph">
              <canvas id="moisture2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>3M</p>
            <div className="graph">
              <canvas id="moisture3"></canvas>
            </div>
          </div>
          <div className="info">
            <p>4M</p>
            <div className="graph">
              <canvas id="moisture4"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="actuators">
        <div className="heading">
          <h2>Actuators</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1AC</p>
            <div className="graph">
              <canvas id="ac1"></canvas>
            </div>
          </div>
          <div className="info">
            <p>2AC</p>
            <div className="graph">
              <canvas id="ac2"></canvas>
            </div>
          </div>
          <div className="info">
            <p>3AC</p>
            <div className="graph">
              <canvas id="ac3"></canvas>
            </div>
          </div>
          <div className="info">
            <p>4AC</p>
            <div className="graph">
              <canvas id="ac4"></canvas>
            </div>
          </div>
          <div className="info">
            <p>5AC</p>
            <div className="graph">
              <canvas id="ac5"></canvas>
            </div>
          </div>
          <div className="info">
            <p>6AC</p>
            <div className="graph">
              <canvas id="ac6"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div id="pyranometer">
        <div className="heading">
          <h2>Solar Irradiance</h2>
        </div>
        <div className="graphs-group">
          <div className="info">
            <p>1SI</p>
            <div className="graph">
              <canvas id="pyro"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Polyhouse1Details