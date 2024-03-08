import React from 'react';

function PolyhouseMap1() {
  return (
    <div id="map1">
      <div className="mapScreen">
        <div className="mapHeading">
          <h2>Polyhouse 1 Sensor Display</h2>
        </div>
        <div className="mapMain">
          <div className="mapPoly">
            <div className="mapPoly-left">
              <div className="map1">
                <a href="#moisture"><img src="../images/soil.png" alt="" /></a>
                <a href="#temp"><img src="../images/air.png" alt="" /></a>
                <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                <a href="#humidity"><img src="../images/humidity.png" alt="" /></a>
                <a href="#co2"><img src="../images/co2.png" alt="" className="small" /></a>
                <a href="#moisture"><img src="../images/soil.png" alt="" /></a>
                <a href="#temp"><img src="../images/air.png" alt="" /></a>
                <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                <a href="#humidity"><img src="../images/humidity.png" alt="" /></a>
              </div>
              <div className="map2">
                <a href="#"><img src="../images/fan.png" alt="" className="small" /></a>
                <a href="#"><img src="../images/fogger.png" alt="" /></a>
                <a href="#pyranometer"><img src="../images/pyranometer.png" alt="" className="small" /></a>
                <a href="#"><img src="../images/fogger.png" alt="" /></a>
                <a href="#"><img src="../images/cooling pad.png" alt="" /></a>
              </div>
              <div className="map3">
                <a href="#moisture"><img src="../images/soil.png" alt="" /></a>
                <a href="#temp"><img src="../images/air.png" alt="" /></a>
                <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                <a href="#humidity"><img src="../images/humidity.png" alt="" /></a>
                <a href="#co2"><img src="../images/co2.png" alt="" className="small" /></a>
                <a href="#moisture"><img src="../images/soil.png" alt="" /></a>
                <a href="#temp"><img src="../images/air.png" alt="" /></a>
                <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                <a href="#humidity"><img src="../images/humidity.png" alt="" /></a>
              </div>
              <div className="map4">
                <div className="map4-l">
                  <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                  <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                  <a href="#"><img src="../images/bulb.png" alt="" /></a>
                </div>
                <div className="map4-r">
                  <a href="#"><img src="../images/bulb.png" alt="" /></a>
                  <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                  <a href="#soilTemp"><img src="../images/soil temp.png" alt="" /></a>
                </div>
              </div>
            </div>
            <div className="mapPoly-right">
              <a href="#waterTemp"><img src="../images/water temp.png" alt="" /></a>
              <a href="#waterTemp"><img src="../images/water temp.png" alt="" /></a>
            </div>
          </div>
          <div className="mapNav">
            <div className="mapNav-images">
              <img src="../images/soil.png" alt="" />
              <img src="../images/air.png" alt="" />
              <img src="../images/soil temp.png" alt="" />
              <img src="../images/humidity.png" alt="" />
              <img src="../images/co2.png" alt="" />
              <img src="../images/water temp.png" alt="" />
              <img src="../images/pyranometer.png" alt="" />
              <img src="../images/fogger.png" alt="" />
              <img src="../images/cooling pad.png" alt="" />
              <img src="../images/fan.png" alt="" />
            </div>
            <div className="mapNav-content">
              <p>Soil Moisture</p>
              <p>Air Temperature</p>
              <p>Soil Temperature</p>
              <p>Humidity</p>
              <p>CO2 Sensor</p>
              <p>Water Temperature</p>
              <p>Solar Irradiance</p>
              <p>Fogger</p>
              <p>Cooling Pad</p>
              <p>Fan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolyhouseMap1;
