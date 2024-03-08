import React from 'react';

function DashboardSidebar() {
  const showPannel = () => {
    const poly1 = document.getElementById('Polyhouse1')
    const poly2 = document.getElementById('Polyhouse2')
    const sidebar1 = document.getElementById('attributes')
    const sidebar2 = document.getElementById('attributes_2')
    const pannel = document.getElementById("controlPannel")
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const dashboard = document.getElementById("dashboard")
    const dataRequest = document.getElementById("download")
    dataRequest.style.display = "none"
    dashboard.textContent = "Polyhouse 1"
    poly1.style.display = "none"
    poly2.style.display = "none"
    sidebar1.style.display = "flex"
    sidebar2.style.display = "none"
    pannel.style.display = "flex";
    document.getElementById("logo-l").style.display = "none";
    document.getElementById("logo-d").style.display = "block";
    document.documentElement.setAttribute("data-theme", "black");
    moon.style.display = "block";
    sun.style.display = "none";
    const map1 = document.getElementById("map1")
    const map2 = document.getElementById("map2")
    const pannel_2 = document.getElementById("controlPannel_2")
    pannel_2.style.display = "none"
    map1.style.display = "none"
    map2.style.display = "none"
  };

  const showPannel_2 = () => {
    const poly1 = document.getElementById('Polyhouse1')
    const poly2 = document.getElementById('Polyhouse2')
    const sidebar1 = document.getElementById('attributes')
    const sidebar2 = document.getElementById('attributes_2')
    const pannel = document.getElementById("controlPannel")
    const pannel_2 = document.getElementById("controlPannel_2")
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const dashboard = document.getElementById("dashboard")
    const dataRequest = document.getElementById("download")
    dataRequest.style.display = "none"
    dashboard.textContent = "Polyhouse 2"
    poly1.style.display = "none"
    poly2.style.display = "none"
    sidebar1.style.display = "flex"
    sidebar2.style.display = "none"
    pannel.style.display = "none";
    pannel_2.style.display = "flex";
    document.getElementById("logo-l").style.display = "none";
    document.getElementById("logo-d").style.display = "block";
    document.documentElement.setAttribute("data-theme", "black");
    moon.style.display = "block";
    sun.style.display = "none";
    const map1 = document.getElementById("map1")
    const map2 = document.getElementById("map2")
    map1.style.display = "none"
    map2.style.display = "none"
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img src="../images/profile.png" alt="" />
        <p id="userName">{/* You can dynamically set the username here */}</p>
      </div>
      <div id="polyNo">
        <select name="" id="options">
          <option value="option1">Dashboard</option>
          <option value="option2">Polyhouse 1</option>
          <option value="option3">Polyhouse 2</option>
        </select>
      </div>
      <div id="attributes">
        <a href="#temp">Temperature</a>
        <a href="#humidity">Humidity</a>
        <a href="#soilTemp">Soil Temperature</a>
        <a href="#waterTemp">Water Temperature</a>
        <a href="#co2">CO2</a>
        <a href="#light">Light</a>
        <a href="#moisture">Moisture</a>
        <a href="#actuators">Actuators</a>
        <a href="#pyranometer">Solar Irradiance</a>
      </div>
      <div id="attributes_2">
        <a href="#temp_2">Temperature</a>
        <a href="#humidity_2">Humidity</a>
        <a href="#soilTemp_2">Soil Temperature</a>
        <a href="#waterTemp_2">Water Temperature</a>
        <a href="#co2_2">CO2</a>
        <a href="#light_2">Light</a>
        <a href="#moisture_2">Moisture</a>
        <a href="#actuators_2">Actuators</a>
        <a href="#pyranometer_2">Solar Irradiance</a>
      </div>
      <div className="controlPannel">
        <p>Control Panel</p>
        <a href="#controlPannel" onClick={showPannel}>Polyhouse 1</a>
        <a href="#controlPannel_2" onClick={showPannel_2}>Polyhouse 2</a>
      </div>
    </div>
  );
}

export default DashboardSidebar;
