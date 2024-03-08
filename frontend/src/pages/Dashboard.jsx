import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../server/config';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import PolyhouseMap1 from '../components/PolyhouseMap1';
import PolyhouseMap2 from '../components/PolyhouseMap2';
import Polyhouse1Details from '../components/Polyhouse1Details';
import Polyhouse2Details from '../components/Polyhouse2Details';
import ControlPanel1 from '../components/ControlPanel1';
import ControlPanel2 from '../components/ControlPanel2';

function Dashboard() {
  const downloadData = () => {
    console.log("DOWNLOAD :)");
    axios.get(`${SERVER_URL}/user/download`, {
      withCredentials: true,
    })
    .then(function (response) {
      alert("Email sent to your registered mail");
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div>
    <DashboardHeader/>
    <DashboardSidebar/>
    <PolyhouseMap1/>
    <PolyhouseMap2/>
    <Polyhouse1Details/>
    <Polyhouse2Details/>
    <ControlPanel1/>
    <ControlPanel2/>

    <div className="main">
      <div id="download">
        <h2>CCA FACILITY IIT MANDI</h2>
        <h4>Sensor Data Request</h4>
        <p>
          We have developed a system to monitor and analyze sensor data from
          various environmental sensors. The system collects data from sensors
          placed in different locations and provides real-time insights into the
          environmental conditions.
        </p>
        <ul>
          <li>
            Real-time Data: The system continuously gathers data from the
            sensors, providing up-to-date information on various environmental
            attributes.
          </li>
          <li>
            Sensor Integration: It supports integration with a wide range of
            sensors, including temperature, humidity, pressure, light intensity,
            and more.
          </li>
          <li>
            Data Visualization: The collected sensor data is presented using
            interactive charts and graphs, enabling users to easily visualize
            and understand the trends and patterns in the environmental
            conditions.
          </li>
        </ul>
        <button id="download_btn" onClick={downloadData}>Download</button>
        <span>*Click on the button to get CSV file of the data of Polyhouse 1 and Polyhouse 2 on your registered email id</span>
      </div>
    </div>

    </div>

  );
}

export default Dashboard;
