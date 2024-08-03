// DOWNLOAD DATA CSV FORMAT
const downloadData = () => {
    console.log("DOWNLOAD :)");
    axios.get('https://research.iitmandi.ac.in:8000/user/download')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function fetchSensorValues() {
    $.ajax({
        url: "https://research.iitmandi.ac.in:8000/act/getvalues/polyhouse1",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var sensorData = data[0].plants[0].sensors;

            for (var i = 1; i <= 6; i++) {
                var sensorId = "sensor" + i;
                var sensorValue = sensorData[sensorId.toLowerCase()];

                var sensorButton = document.querySelector("#sensors div:nth-child(" + i + ") button");
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
                var sensorName = button.parentNode.querySelector("h2").textContent.toLowerCase();
                if (sensorValue.toLowerCase() === sensorData[sensorName]) {
                    button.classList.add("current-value");
                } else {
                    button.classList.remove("current-value");
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving sensor values:', error);
        }
    });
}

fetchSensorValues();

function updateSensor(sensor, value) {
    var data = {
        sensors: {}
    };

    $.ajax({
        url: "https://research.iitmandi.ac.in:8000/act/getvalues/polyhouse1",
        method: "GET",
        dataType: "json",
        success: function (response) {
            var currentSensorValues = response[0].plants[0].sensors;

            data.sensors = { ...currentSensorValues };
            data.sensors[sensor] = value;

            fetch('https://research.iitmandi.ac.in:8000/act/updatevalues/polyhouse1', {
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
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving sensor values:', error);
        }
    });
}
const sliders = {
    slider1: {
        rotationAngle: 0,
        pos: 1,
    },
    slider2: {
        rotationAngle: 0,
        pos: 1,
    },
    slider3: {
        rotationAngle: 0,
        pos: 1,
    },
    slider4: {
        rotationAngle: 0,
        pos: 1,
    },
    slider5: {
        rotationAngle: 0,
        pos: 1,
    },
    slider6: {
        rotationAngle: 0,
        pos: 1,
    },
}
function auto(sliderId) {
    const slider = document.getElementById(`${sliderId.id}`);
    let rotationAngle = sliders[`${sliderId.id}`].rotationAngle
    let pos = sliders[`${sliderId.id}`].pos
    if (pos === 2) {
        rotationAngle -= 90;
        slider.style.transform = `rotate(${rotationAngle}deg)`;
    } else if (pos === 3) {
        rotationAngle -= 180;
        slider.style.transform = `rotate(${rotationAngle}deg)`;
    }
    sliders[`${sliderId.id}`].rotationAngle = rotationAngle;
    sliders[`${sliderId.id}`].pos = 1;
    console.log(pos);
    console.log(rotationAngle);
}


function on(sliderId) {
    const slider = document.getElementById(`${sliderId.id}`);
    let rotationAngle = sliders[`${sliderId.id}`].rotationAngle
    let pos = sliders[`${sliderId.id}`].pos
    if (pos === 1) {
        rotationAngle += 90;
        slider.style.transform = `rotate(${rotationAngle}deg)`;
    } else if (pos === 3) {
        rotationAngle -= 90;
        slider.style.transform = `rotate(${rotationAngle}deg)`;
    }
    sliders[`${sliderId.id}`].rotationAngle = rotationAngle;
    sliders[`${sliderId.id}`].pos = 2;
    console.log(pos);
    console.log(rotationAngle);
}

function off(sliderId) {
    const slider = document.getElementById(`${sliderId.id}`);
    let rotationAngle = sliders[`${sliderId.id}`].rotationAngle
    let pos = sliders[`${sliderId.id}`].pos
    if (pos === 1) {
        rotationAngle += 180;
        slider.style.transform = `rotate(${rotationAngle}deg)`;
    } else if (pos === 2) {
        rotationAngle += 90;
        slider.style.transform = `rotate(${rotationAngle}deg)`;
    }
    sliders[`${sliderId.id}`].rotationAngle = rotationAngle;
    sliders[`${sliderId.id}`].pos = 3;
    console.log(pos);
    console.log(rotationAngle);;
}

// theme change
const themeChange = () => {
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const mapbg = document.getElementById("map");
    if (sun.style.display == "none") {
        sun.style.display = "block";
        moon.style.display = "none";
        document.getElementById("logo-l").style.display = "block";
        document.getElementById("logo-d").style.display = "none";
        document.documentElement.setAttribute("data-theme", "light");
        mapbg.style.backgroundImage = "url('../images/map\ light\ bg.png')"

    }
    else {
        moon.style.display = "block";
        sun.style.display = "none";

        document.getElementById("logo-l").style.display = "none";
        document.getElementById("logo-d").style.display = "block";
        document.documentElement.setAttribute("data-theme", "dark");
        mapbg.style.backgroundImage = "url('../images/map\ bg\ dark.png')"
    }
}
// show pannel
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
    dashboard.textContent = "Dashboards"
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
}
//Data Request
const dataRequest = () => {
    const poly1 = document.getElementById('Polyhouse1')
    const poly2 = document.getElementById('Polyhouse2')
    const sidebar1 = document.getElementById('attributes')
    const sidebar2 = document.getElementById('attributes_2')
    const pannel = document.getElementById("controlPannel")
    const dataDownloadRequest = document.getElementById("download")
    poly1.style.display = "none"
    poly2.style.display = "none"
    sidebar1.style.display = "flex"
    sidebar2.style.display = "none"
    pannel.style.display = "none"
    dataDownloadRequest.style.display = "flex"
}
// drop down
const dropdown = document.getElementById('options');
dropdown.addEventListener('change', function () {
    const selectedOption = dropdown.value;
    const poly1 = document.getElementById('Polyhouse1')
    const poly2 = document.getElementById('Polyhouse2')
    const sidebar1 = document.getElementById('attributes')
    const sidebar2 = document.getElementById('attributes_2')
    const pannel = document.getElementById("controlPannel")
    const dashboard = document.getElementById("dashboard")
    const dataRequest = document.getElementById("download")
    switch (selectedOption) {
        case 'option2':
            poly1.style.display = "block"
            poly2.style.display = "none"
            sidebar1.style.display = "flex"
            sidebar2.style.display = "none"
            pannel.style.display = "none";
            dataRequest.style.display = "none"
            document.documentElement.setAttribute("data-theme", "dark");
            dashboard.textContent = "Polyhouse 1"
            break;
        case 'option3':
            poly2.style.display = "block"
            poly1.style.display = "none"
            sidebar2.style.display = "flex"
            sidebar1.style.display = "none"
            pannel.style.display = "none";
            dataRequest.style.display = "none"
            document.documentElement.setAttribute("data-theme", "dark");
            dashboard.textContent = "Polyhouse 2"
            console.log(2);

            break;
        default:
            poly1.style.display = "block"
            poly2.style.display = "none"
            sidebar1.style.display = "flex"
            sidebar2.style.display = "none"
            dataRequest.style.display = "none"
            pannel.style.display = "none";
            dashboard.textContent = "Dashboards"
            dataRequest.style.display = "none"
            break;
    }
});

"use strict"
// time stamps
const getTimeStamps = (num) => {
    if (num && num.timestamp)
        return new Date(num.timestamp);
    else
        return null;
}

////////////////////TEMPERATURE///////////////////////
// ==========EXTERNAL========== //
// Sensor 1
const tempEx1 = (num) => {
    if (num && num.data && num.data.temperature && num.data.temperature.external && num.data.temperature.external.Sensor1) {
        return num.data.temperature.external.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const tempEx2 = (num) => {
    if (num && num.data && num.data.temperature && num.data.temperature.external && num.data.temperature.external.Sensor2) {
        return num.data.temperature.external.Sensor2;
    }
    else {
        return null;
    }
}
// ==========INTERNAL========== //
// Sensor 1
const tempIn1 = (num) => {
    if (num && num.data && num.data.temperature && num.data.temperature.internal && num.data.temperature.internal.Sensor1) {
        return num.data.temperature.internal.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const tempIn2 = (num) => {
    if (num && num.data && num.data.temperature && num.data.temperature.internal && num.data.temperature.internal.Sensor2) {
        return num.data.temperature.internal.Sensor2;
    }
    else {
        return null;
    }
}
// Sensor 3
const tempIn3 = (num) => {
    if (num && num.data && num.data.temperature && num.data.temperature.internal && num.data.temperature.internal.Sensor3) {
        return num.data.temperature.internal.Sensor3;
    }
    else {
        return null;
    }
}
// Sensor 4
const tempIn4 = (num) => {
    if (num && num.data && num.data.temperature && num.data.temperature.internal && num.data.temperature.internal.Sensor4) {
        return num.data.temperature.internal.Sensor4;
    }
    else {
        return null;
    }
}
////////////////////HUMIDITY///////////////////////
// ==========EXTERNAL========== //
// Sensor 1
const humidEx1 = (num) => {
    if (num && num.data && num.data.humidity && num.data.humidity.external && num.data.humidity.external.Sensor1) {
        return num.data.humidity.external.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const humidEx2 = (num) => {
    if (num && num.data && num.data.humidity && num.data.humidity.external && num.data.humidity.external.Sensor2) {
        return num.data.humidity.external.Sensor2;
    }
    else {
        return null;
    }
}
// ==========INTERNAL========== //
// Sensor 1
const humidIn1 = (num) => {
    if (num && num.data && num.data.humidity && num.data.humidity.internal && num.data.humidity.internal.Sensor1) {
        return num.data.humidity.internal.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const humidIn2 = (num) => {
    if (num && num.data && num.data.humidity && num.data.humidity.internal && num.data.humidity.internal.Sensor2) {
        return num.data.humidity.internal.Sensor2;
    }
    else {
        return null;
    }
}
// Sensor 3
const humidIn3 = (num) => {
    if (num && num.data && num.data.humidity && num.data.humidity.internal && num.data.humidity.internal.Sensor3) {
        return num.data.humidity.internal.Sensor3;
    }
    else {
        return null;
    }
}
// Sensor 4
const humidIn4 = (num) => {
    if (num && num.data && num.data.humidity && num.data.humidity.internal && num.data.humidity.internal.Sensor4) {
        return num.data.humidity.internal.Sensor4;
    }
    else {
        return null;
    }
}
////////////////////SOIL TEMPERATURE///////////////////////
// ==========INTERNAL========== //
// Sensor 1
const soilTempIn1 = (num) => {
    if (num && num.data && num.data.soilTemperature && num.data.soilTemperature.internal && num.data.soilTemperature.internal.Sensor1) {
        return num.data.soilTemperature.internal.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const soilTempIn2 = (num) => {
    if (num && num.data && num.data.soilTemperature && num.data.soilTemperature.internal && num.data.soilTemperature.internal.Sensor2) {
        return num.data.soilTemperature.internal.Sensor2;
    }
    else {
        return null;
    }
}
// Sensor 3
const soilTempIn3 = (num) => {
    if (num && num.data && num.data.soilTemperature && num.data.soilTemperature.internal && num.data.soilTemperature.internal.Sensor3) {
        return num.data.soilTemperature.internal.Sensor3;
    }
    else {
        return null;
    }
}
// Sensor 4
const soilTempIn4 = (num) => {
    if (num && num.data && num.data.soilTemperature && num.data.soilTemperature.internal && num.data.soilTemperature.internal.Sensor4) {
        return num.data.soilTemperature.internal.Sensor4;
    }
    else {
        return null;
    }
}
////////////////////WATER TEMPERATURE///////////////////////
// Sensor 1
const waterTemp1 = (num) => {
    if (num && num.data && num.data.waterTemperature && num.data.waterTemperature.Sensor1) {
        return num.data.waterTemperature.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const waterTemp2 = (num) => {
    if (num && num.data && num.data.waterTemperature && num.data.waterTemperature.Sensor2) {
        return num.data.waterTemperature.Sensor2;
    }
    else {
        return null;
    }
}
/////////////////////////CO2/////////////////////////////////
// Sensor 1
const co2_1 = (num) => {
    if (num && num.data && num.data.co2 && num.data.co2.Sensor1) {
        return num.data.co2.Sensor1;
    } else {
        return null; // or return a default value or handle the error case
    }
}
// Sensor 2
const co2_2 = (num) => {
    if (num && num.data && num.data.co2 && num.data.co2.Sensor2) {
        return num.data.co2.Sensor2;
    } else {
        return null; // or return a default value or handle the error case
    }
}
/////////////////////////LIGHT/////////////////////////////////
// Sensor 1
const light1 = (num) => {
    if (num && num.data && num.data.light && num.data.light.Sensor1) {
        return num.data.light.Sensor1;
    } else {
        return null; // or return a default value or handle the error case
    }
}
// Sensor 2
const light2 = (num) => {
    if (num && num.data && num.data.light && num.data.light.Sensor2) {
        return num.data.light.Sensor2;
    } else {
        return null; // or return a default value or handle the error case
    }
}
////////////////////MOISTURE///////////////////////
// ==========INTERNAL========== //
// Sensor 1
const moisture1 = (num) => {
    if (num && num.data && num.data.moisture && num.data.moisture.Sensor1) {
        return num.data.moisture.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const moisture2 = (num) => {
    if (num && num.data && num.data.moisture && num.data.moisture.Sensor2) {
        return num.data.moisture.Sensor2;
    }
    else {
        return null;
    }
}
// Sensor 3
const moisture3 = (num) => {
    if (num && num.data && num.data.moisture && num.data.moisture.Sensor3) {
        return num.data.moisture.Sensor3;
    }
    else {
        return null;
    }
}
// Sensor 4
const moisture4 = (num) => {
    if (num && num.data && num.data.moisture && num.data.moisture.Sensor4) {
        return num.data.moisture.Sensor4;
    }
    else {
        return null;
    }
}
/////////////////////////ACTUATORS/////////////////////////////////
// Sensor 1
const ac1 = (num) => {
    if (num && num.data && num.data.actuators && num.data.actuators.Sensor1) {
        return num.data.actuators.Sensor1;
    }
    else {
        return null;
    }
}
// Sensor 2
const ac2 = (num) => {
    if (num && num.data && num.data.actuators && num.data.actuators.Sensor2) {
        return num.data.actuators.Sensor2;
    }
    else {
        return null;
    }
}
// Sensor 3
const ac3 = (num) => {
    if (num && num.data && num.data.actuators && num.data.actuators.Sensor3) {
        return num.data.actuators.Sensor3;
    }
    else {
        return null;
    }
}
// Sensor 4
const ac4 = (num) => {
    if (num && num.data && num.data.actuators && num.data.actuators.Sensor4) {
        return num.data.actuators.Sensor4;
    }
    else {
        return null;
    }
}
// Sensor 5
const ac5 = (num) => {
    if (num && num.data && num.data.actuators && num.data.actuators.Sensor5) {
        return num.data.actuators.Sensor5;
    }
    else {
        return null;
    }
}
// Sensor 6
const ac6 = (num) => {
    if (num && num.data && num.data.actuators && num.data.actuators.Sensor6) {
        return num.data.actuators.Sensor6;
    }
    else {
        return null;
    }
}
////////////////////PYRANOMETER///////////////////////
// Sensor 1
const pyro = (num) => {
    if (num && num.data && num.data.pyranometer && num.data.pyranometer.Sensor1) {
        return num.data.pyranometer.Sensor1;
    }
    else {
        return null;
    }
}


axios.get('https://research.iitmandi.ac.in:8000/sensor/polyhouse1/data')
    .then(response => {
        const data = response.data;
        const timeStamps = data.result.map(getTimeStamps);
        const latestEntry = data.result.slice(-1)[0].timestamp;
        let istDate = (new Date(latestEntry));
        const startTime = new Date(istDate.getTime() - 60 * 60 * 1000);
        const timeWindow = timeStamps.filter((entry) => {
            const entryTime = new Date(entry);
            return (entryTime >= startTime && entryTime <= istDate);
        });

        ///////////////Temperature///////////////
        // Sensor 1 External Temperature
        const TempEx1 = data.result.map(tempEx1).slice(-(timeWindow.length));
        // Sensor 2 External Temperature
        const TempEx2 = data.result.map(tempEx2).slice(-(timeWindow.length));
        // Sensor 1 Internal Temperature
        const TempIn1 = data.result.map(tempIn1).slice(-(timeWindow.length));
        // Sensor 2 Internal Temperature
        const TempIn2 = data.result.map(tempIn2).slice(-(timeWindow.length));
        // Sensor 3 Internal Temperature
        const TempIn3 = data.result.map(tempIn3).slice(-(timeWindow.length));
        // Sensor 4 Internal Temperature
        const TempIn4 = data.result.map(tempIn4).slice(-(timeWindow.length));

        ///AVG TEMP///
        const tempVal1 = Number(TempIn1.slice(-1));
        const tempVal2 = Number(TempIn2.slice(-1));
        const tempVal3 = Number(TempIn3.slice(-1));
        const tempVal4 = Number(TempIn4.slice(-1));
        console.log((tempVal1 + tempVal2 + tempVal3 + tempVal4) / 4);
        const avg_temp = ((tempVal1 + tempVal2 + tempVal3 + tempVal4) / 4);
        const screen_temp = document.getElementById("screen_temp");
        screen_temp.textContent = avg_temp.toFixed(1);


        ////////////////HUMIDITY/////////////////
        // Sensor 1 External Humidity
        const HumidEx1 = data.result.map(humidEx1).slice(-(timeWindow.length));
        // Sensor 2 External Humidity
        const HumidEx2 = data.result.map(humidEx2).slice(-(timeWindow.length));
        // Sensor 1 Internal Humidity
        const HumidIn1 = data.result.map(humidIn1).slice(-(timeWindow.length));
        // Sensor 2 Internal Humidity
        const HumidIn2 = data.result.map(humidIn2).slice(-(timeWindow.length));
        // Sensor 3 Internal Humidity
        const HumidIn3 = data.result.map(humidIn3).slice(-(timeWindow.length));
        // Sensor 4 Internal Humidity
        const HumidIn4 = data.result.map(humidIn4).slice(-(timeWindow.length));


        ///AVG HUMIDITY///
        const HumidVal1 = Number(HumidIn1.slice(-1));
        const HumidVal2 = Number(HumidIn2.slice(-1));
        const HumidVal3 = Number(HumidIn3.slice(-1));
        const HumidVal4 = Number(HumidIn4.slice(-1));
        console.log((HumidVal1 + HumidVal2 + HumidVal3 + HumidVal4) / 4);
        const avg_humid = ((HumidVal1 + HumidVal2 + HumidVal3 + HumidVal4) / 4);
        const screen_humid = document.getElementById("screen_humid");
        screen_humid.textContent = avg_humid.toFixed(1);
        //////////////SOIL TEMPERATURE//////////////
        // Sensor 1 Internal Soil Temperature
        const SoilTempIn1 = data.result.map(soilTempIn1).slice(-(timeWindow.length));
        // Sensor 2 Internal Soil Temperature
        const SoilTempIn2 = data.result.map(soilTempIn2).slice(-(timeWindow.length));
        // Sensor 3 Internal Soil Temperature
        const SoilTempIn3 = data.result.map(soilTempIn3).slice(-(timeWindow.length));
        // Sensor 4 Internal Soil Temperatur
        const SoilTempIn4 = data.result.map(soilTempIn4).slice(-(timeWindow.length));

        //Sensor 1 Water Temperature
        //////////////WATER TEMPERATURE//////////////
        const WaterTemp1 = data.result.map(waterTemp1).slice(-(timeWindow.length));
        //Sensor 2 Water Temperature
        const WaterTemp2 = data.result.map(waterTemp2).slice(-(timeWindow.length));

        /////////////////////CO2///////////////////////
        //Sensor 1 CO2
        const CO2_1 = data.result.map(co2_1).slice(-(timeWindow.length));
        //Sensor 2 CO2
        const CO2_2 = data.result.map(co2_2).slice(-(timeWindow.length));
        /////////////////////LIGHT///////////////////////
        //Sensor 1 Light
        const Light1 = data.result.map(light1).slice(-(timeWindow.length));
        //Sensor 2 Light
        const Light2 = data.result.map(light2).slice(-(timeWindow.length));

        ////////////////////MOISTURE////////////////////
        // Sensor 1 Moisture
        const Moisture1 = data.result.map(moisture1).slice(-(timeWindow.length));
        // Sensor 2 Moisture
        const Moisture2 = data.result.map(moisture2).slice(-(timeWindow.length));
        // Sensor 3 Moisture
        const Moisture3 = data.result.map(moisture3).slice(-(timeWindow.length));
        // Sensor 4 Moisture
        const Moisture4 = data.result.map(moisture4).slice(-(timeWindow.length));

        ////////////////////ACTUATORS////////////////////
        const Ac1 = data.result.map(ac1).slice(-(timeWindow.length));
        const Ac2 = data.result.map(ac2).slice(-(timeWindow.length));
        const Ac3 = data.result.map(ac3).slice(-(timeWindow.length));
        const Ac4 = data.result.map(ac4).slice(-(timeWindow.length));
        const Ac5 = data.result.map(ac5).slice(-(timeWindow.length));
        const Ac6 = data.result.map(ac6).slice(-(timeWindow.length));

        ////////////////////PYRANOMETER////////////////////
        const Pyro = data.result.map(pyro).slice(-(timeWindow.length));

        const chart1 = document.getElementById('tempEx1');
        new Chart(chart1, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | External | Polyhouse 1`,
                        // Display Sensor 1 External Temperature
                        data: TempEx1,
                        borderWidth: 1,
                        borderColor: 'rgba(26, 220, 22, 1)',
                        fill: false,
                        backgroundColor: "rgba(26, 220, 22, 1)",
                        tension: 0.4,


                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 External Temperature
        const chart2 = document.getElementById('tempEx2');
        new Chart(chart2, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | External | Polyhouse 1`,
                        data: TempEx2,
                        borderWidth: 1,
                        borderColor: 'rgba(26, 220, 22, 1)',
                        fill: false,
                        backgroundColor: "rgba(26, 220, 22, 1)",
                        tension: 0.4,


                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Internal Temperature
        const chart3 = document.getElementById('tempIn1');
        new Chart(chart3, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 1`,
                        data: TempIn1,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Internal Temperature
        const chart4 = document.getElementById('tempIn2');
        new Chart(chart4, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 1`,
                        data: TempIn2,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Internal Temperature
        const chart5 = document.getElementById('tempIn3');
        new Chart(chart5, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 1`,
                        data: TempIn3,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Internal Temperature
        const chart6 = document.getElementById('tempIn4');
        new Chart(chart6, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 1`,
                        data: TempIn4,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 External Humidity
        const chart7 = document.getElementById('humidEx1');
        new Chart(chart7, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | External | Polyhouse2`,
                        data: HumidEx1,
                        borderWidth: 1,
                        borderColor: 'pink',
                        fill: false,
                        backgroundColor: "pink",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 External Humidity
        const chart8 = document.getElementById('humidEx2');
        new Chart(chart8, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | External | Polyhouse2`,
                        data: HumidEx2,
                        borderWidth: 1,
                        borderColor: 'pink',
                        fill: false,
                        backgroundColor: "pink",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Internal Humidity
        const chart9 = document.getElementById('humidIn1');
        new Chart(chart9, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse2`,
                        data: HumidIn1,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Internal Humidity
        const chart10 = document.getElementById('humidIn2');
        new Chart(chart10, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse2`,
                        data: HumidIn2,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Internal Humidity
        const chart11 = document.getElementById('humidIn3');
        new Chart(chart11, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse2`,
                        data: HumidIn3,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Internal Humidity
        const chart12 = document.getElementById('humidIn4');
        new Chart(chart12, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse2`,
                        data: HumidIn4,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Internal soil Temperature
        const chart13 = document.getElementById('soilTempIn1');
        new Chart(chart13, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 1`,
                        data: SoilTempIn1,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Internal Soil Temperature
        const chart14 = document.getElementById('soilTempIn2');
        new Chart(chart14, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 1`,
                        data: SoilTempIn2,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Internal Soil Temperature
        const chart15 = document.getElementById('soilTempIn3');
        new Chart(chart15, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 1`,
                        data: SoilTempIn3,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Internal Soil Temperature
        const chart16 = document.getElementById('soilTempIn4');
        new Chart(chart16, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 1`,
                        data: SoilTempIn4,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Water Temperature
        const chart17 = document.getElementById('waterTemp1');
        new Chart(chart17, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Water Temperature | Polyhouse 1`,
                        data: WaterTemp1,
                        borderWidth: 1,
                        borderColor: 'rgb(138, 224, 236)',
                        fill: false,
                        backgroundColor: "rgb(138, 224, 236)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Water Temperature
        const chart18 = document.getElementById('waterTemp2');
        new Chart(chart18, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Water Temperature | Polyhouse 1`,
                        data: WaterTemp2,
                        borderWidth: 1,
                        borderColor: 'rgb(138, 224, 236)',
                        fill: false,
                        backgroundColor: "rgb(138, 224, 236)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 CO2
        const chart19 = document.getElementById('co2_1');
        new Chart(chart19, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `CO2 | Polyhouse 1`,
                        data: CO2_1,
                        borderWidth: 1,
                        borderColor: ' rgb(236, 138, 179)',
                        fill: false,
                        backgroundColor: " rgb(236, 138, 179)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 CO2
        const chart20 = document.getElementById('co2_2');
        new Chart(chart20, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `CO2 | Polyhouse 1`,
                        data: CO2_2,
                        borderWidth: 1,
                        borderColor: ' rgb(236, 138, 179)',
                        fill: false,
                        backgroundColor: " rgb(236, 138, 179)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Light
        const chart21 = document.getElementById('light1');
        new Chart(chart21, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Light | Polyhouse 1`,
                        data: Light1,
                        borderWidth: 1,
                        borderColor: 'orange',
                        fill: false,
                        backgroundColor: "orange",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Light
        const chart22 = document.getElementById('light2');
        new Chart(chart22, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Light | Polyhouse 1`,
                        data: Light2,
                        borderWidth: 1,
                        borderColor: 'orange',
                        fill: false,
                        backgroundColor: "orange",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Moisture
        const chart23 = document.getElementById('moisture1');
        new Chart(chart23, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 1`,
                        data: Moisture1,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Moisture
        const chart24 = document.getElementById('moisture2');
        new Chart(chart24, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 1`,
                        data: Moisture2,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Moisture
        const chart25 = document.getElementById('moisture3');
        new Chart(chart25, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 1`,
                        data: Moisture3,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Moisture
        const chart26 = document.getElementById('moisture4');
        new Chart(chart26, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 1`,
                        data: Moisture4,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Actuator
        const chart27 = document.getElementById('ac1');
        new Chart(chart27, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 1`,
                        data: Ac1,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Actuator
        const chart28 = document.getElementById('ac2');
        new Chart(chart28, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 1`,
                        data: Ac2,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Actuator
        const chart29 = document.getElementById('ac3');
        new Chart(chart29, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 1`,
                        data: Ac3,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Actuator
        const chart30 = document.getElementById('ac4');
        new Chart(chart30, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 1`,
                        data: Ac4,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 5 Actuator
        const chart31 = document.getElementById('ac5');
        new Chart(chart31, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 1`,
                        data: Ac5,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 6 Actuator
        const chart32 = document.getElementById('ac6');
        new Chart(chart32, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 1`,
                        data: Ac6,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Pyranometer
        const chart33 = document.getElementById('pyro');
        new Chart(chart33, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Pyranometer | Polyhouse 1`,
                        data: Pyro,
                        borderWidth: 1,
                        borderColor: 'brown',
                        fill: false,
                        backgroundColor: "brown",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
    });
axios.get('https://research.iitmandi.ac.in:8000/sensor/polyhouse2/data')
    .then(response => {
        const data = response.data;
        const timeStamps = data.result.map(getTimeStamps);
        const latestEntry = data.result.slice(-1)[0].timestamp;
        let istDate = (new Date(latestEntry));
        const startTime = new Date(istDate.getTime() - 60 * 60 * 1000);
        const timeWindow = timeStamps.filter((entry) => {
            const entryTime = new Date(entry);
            return (entryTime >= startTime && entryTime <= istDate);
        });

        ///////////////Temperature///////////////
        // Sensor 1 External Temperature
        const TempEx1 = data.result.map(tempEx1).slice(-(timeWindow.length));
        // Sensor 2 External Temperature
        const TempEx2 = data.result.map(tempEx2).slice(-(timeWindow.length));
        // Sensor 1 Internal Temperature
        const TempIn1 = data.result.map(tempIn1).slice(-(timeWindow.length));
        // Sensor 2 Internal Temperature
        const TempIn2 = data.result.map(tempIn2).slice(-(timeWindow.length));
        // Sensor 3 Internal Temperature
        const TempIn3 = data.result.map(tempIn3).slice(-(timeWindow.length));
        // Sensor 4 Internal Temperature
        const TempIn4 = data.result.map(tempIn4).slice(-(timeWindow.length));

        ////////////////HUMIDITY/////////////////
        // Sensor 1 External Humidity
        const HumidEx1 = data.result.map(humidEx1).slice(-(timeWindow.length));
        // Sensor 2 External Humidity
        const HumidEx2 = data.result.map(humidEx2).slice(-(timeWindow.length));
        // Sensor 1 Internal Humidity
        const HumidIn1 = data.result.map(humidIn1).slice(-(timeWindow.length));
        // Sensor 2 Internal Humidity
        const HumidIn2 = data.result.map(humidIn2).slice(-(timeWindow.length));
        // Sensor 3 Internal Humidity
        const HumidIn3 = data.result.map(humidIn3).slice(-(timeWindow.length));
        // Sensor 4 Internal Humidity
        const HumidIn4 = data.result.map(humidIn4).slice(-(timeWindow.length));

        //////////////SOIL TEMPERATURE//////////////
        // Sensor 1 Internal Soil Temperature
        const SoilTempIn1 = data.result.map(soilTempIn1).slice(-(timeWindow.length));
        // Sensor 2 Internal Soil Temperature
        const SoilTempIn2 = data.result.map(soilTempIn2).slice(-(timeWindow.length));
        // Sensor 3 Internal Soil Temperature
        const SoilTempIn3 = data.result.map(soilTempIn3).slice(-(timeWindow.length));
        // Sensor 4 Internal Soil Temperatur
        const SoilTempIn4 = data.result.map(soilTempIn4).slice(-(timeWindow.length));

        //Sensor 1 Water Temperature
        //////////////WATER TEMPERATURE//////////////
        const WaterTemp1 = data.result.map(waterTemp1).slice(-(timeWindow.length));
        //Sensor 2 Water Temperature
        const WaterTemp2 = data.result.map(waterTemp2).slice(-(timeWindow.length));

        /////////////////////CO2///////////////////////
        //Sensor 1 CO2
        const CO2_1 = data.result.map(co2_1).slice(-(timeWindow.length));
        //Sensor 2 CO2
        const CO2_2 = data.result.map(co2_2).slice(-(timeWindow.length));
        /////////////////////LIGHT///////////////////////
        //Sensor 1 Light
        const Light1 = data.result.map(light1).slice(-(timeWindow.length));
        //Sensor 2 Light
        const Light2 = data.result.map(light2).slice(-(timeWindow.length));

        ////////////////////MOISTURE////////////////////
        // Sensor 1 Moisture
        const Moisture1 = data.result.map(moisture1).slice(-(timeWindow.length));
        // Sensor 2 Moisture
        const Moisture2 = data.result.map(moisture2).slice(-(timeWindow.length));
        // Sensor 3 Moisture
        const Moisture3 = data.result.map(moisture3).slice(-(timeWindow.length));
        // Sensor 4 Moisture
        const Moisture4 = data.result.map(moisture4).slice(-(timeWindow.length));

        ////////////////////ACTUATORS////////////////////
        const Ac1 = data.result.map(ac1).slice(-(timeWindow.length));
        const Ac2 = data.result.map(ac2).slice(-(timeWindow.length));
        const Ac3 = data.result.map(ac3).slice(-(timeWindow.length));
        const Ac4 = data.result.map(ac4).slice(-(timeWindow.length));
        const Ac5 = data.result.map(ac5).slice(-(timeWindow.length));
        const Ac6 = data.result.map(ac6).slice(-(timeWindow.length));

        ////////////////////PYRANOMETER////////////////////
        const Pyro = data.result.map(pyro).slice(-(timeWindow.length));

        const chart1 = document.getElementById('tempEx1_2');
        new Chart(chart1, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | External | Polyhouse 2`,
                        // Display Sensor 1 External Temperature
                        data: TempEx1,
                        borderWidth: 1,
                        borderColor: 'rgba(26, 220, 22, 1)',
                        fill: false,
                        backgroundColor: "rgba(26, 220, 22, 1)",
                        tension: 0.4,


                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 External Temperature
        const chart2 = document.getElementById('tempEx2_2');
        new Chart(chart2, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | External | Polyhouse 2`,
                        data: TempEx2,
                        borderWidth: 1,
                        borderColor: 'rgba(26, 220, 22, 1)',
                        fill: false,
                        backgroundColor: "rgba(26, 220, 22, 1)",
                        tension: 0.4,


                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Internal Temperature
        const chart3 = document.getElementById('tempIn1_2');
        new Chart(chart3, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 2`,
                        data: TempIn1,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Internal Temperature
        const chart4 = document.getElementById('tempIn2_2');
        new Chart(chart4, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 2`,
                        data: TempIn2,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Internal Temperature
        const chart5 = document.getElementById('tempIn3_2');
        new Chart(chart5, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 2`,
                        data: TempIn3,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Internal Temperature
        const chart6 = document.getElementById('tempIn4_2');
        new Chart(chart6, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Temperature | Internal | Polyhouse 2`,
                        data: TempIn4,
                        borderWidth: 1,
                        borderColor: '#36A2EB',
                        fill: false,
                        backgroundColor: "rgba(12, 117, 193, 1)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 External Humidity
        const chart7 = document.getElementById('humidEx1_2');
        new Chart(chart7, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | External | Polyhouse 2`,
                        data: HumidEx1,
                        borderWidth: 1,
                        borderColor: 'pink',
                        fill: false,
                        backgroundColor: "pink",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 External Humidity
        const chart8 = document.getElementById('humidEx2_2');
        new Chart(chart8, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | External | Polyhouse 2`,
                        data: HumidEx2,
                        borderWidth: 1,
                        borderColor: 'pink',
                        fill: false,
                        backgroundColor: "pink",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Internal Humidity
        const chart9 = document.getElementById('humidIn1_2');
        new Chart(chart9, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse 2`,
                        data: HumidIn1,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Internal Humidity
        const chart10 = document.getElementById('humidIn2_2');
        new Chart(chart10, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse 2`,
                        data: HumidIn2,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Internal Humidity
        const chart11 = document.getElementById('humidIn3_2');
        new Chart(chart11, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse 2`,
                        data: HumidIn3,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Internal Humidity
        const chart12 = document.getElementById('humidIn4_2');
        new Chart(chart12, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Humidity | Internal | Polyhouse 2`,
                        data: HumidIn4,
                        borderWidth: 1,
                        borderColor: 'rgb(218, 101, 218)',
                        fill: false,
                        backgroundColor: "rgb(218, 101, 218)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Internal soil Temperature
        const chart13 = document.getElementById('soilTempIn1_2');
        new Chart(chart13, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 2`,
                        data: SoilTempIn1,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Internal Soil Temperature
        const chart14 = document.getElementById('soilTempIn2_2');
        new Chart(chart14, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 2`,
                        data: SoilTempIn2,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Internal Soil Temperature
        const chart15 = document.getElementById('soilTempIn3_2');
        new Chart(chart15, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 2`,
                        data: SoilTempIn3,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Internal Soil Temperature
        const chart16 = document.getElementById('soilTempIn4_2');
        new Chart(chart16, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Soil Temperature | Internal | Polyhouse 2`,
                        data: SoilTempIn4,
                        borderWidth: 1,
                        borderColor: 'rgb(233, 233, 137)',
                        fill: false,
                        backgroundColor: "rgb(233, 233, 137)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Water Temperature
        const chart17 = document.getElementById('waterTemp1_2');
        new Chart(chart17, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Water Temperature | Polyhouse 2`,
                        data: WaterTemp1,
                        borderWidth: 1,
                        borderColor: 'rgb(138, 224, 236)',
                        fill: false,
                        backgroundColor: "rgb(138, 224, 236)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Water Temperature
        const chart18 = document.getElementById('waterTemp2_2');
        new Chart(chart18, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Water Temperature | Polyhouse 2`,
                        data: WaterTemp2,
                        borderWidth: 1,
                        borderColor: 'rgb(138, 224, 236)',
                        fill: false,
                        backgroundColor: "rgb(138, 224, 236)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 CO2
        const chart19 = document.getElementById('co2_1_2');
        new Chart(chart19, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `CO2 | Polyhouse 2`,
                        data: CO2_1,
                        borderWidth: 1,
                        borderColor: ' rgb(236, 138, 179)',
                        fill: false,
                        backgroundColor: " rgb(236, 138, 179)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 CO2
        const chart20 = document.getElementById('co2_2_2');
        new Chart(chart20, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `CO2 | Polyhouse 2`,
                        data: CO2_2,
                        borderWidth: 1,
                        borderColor: ' rgb(236, 138, 179)',
                        fill: false,
                        backgroundColor: " rgb(236, 138, 179)",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Light
        const chart21 = document.getElementById('light1_2');
        new Chart(chart21, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Light | Polyhouse 2`,
                        data: Light1,
                        borderWidth: 1,
                        borderColor: 'orange',
                        fill: false,
                        backgroundColor: "orange",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Light
        const chart22 = document.getElementById('light2_2');
        new Chart(chart22, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Light | Polyhouse 2`,
                        data: Light2,
                        borderWidth: 1,
                        borderColor: 'orange',
                        fill: false,
                        backgroundColor: "orange",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Moisture
        const chart23 = document.getElementById('moisture1_2');
        new Chart(chart23, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 2`,
                        data: Moisture1,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Moisture
        const chart24 = document.getElementById('moisture2_2');
        new Chart(chart24, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 2`,
                        data: Moisture2,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Moisture
        const chart25 = document.getElementById('moisture3_2');
        new Chart(chart25, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 2`,
                        data: Moisture3,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Moisture
        const chart26 = document.getElementById('moisture4_2');
        new Chart(chart26, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Moisture | Polyhouse 2`,
                        data: Moisture4,
                        borderWidth: 1,
                        borderColor: 'lightBlue',
                        fill: false,
                        backgroundColor: "lightBlue",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Actuator
        const chart27 = document.getElementById('ac1_2');
        new Chart(chart27, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 2`,
                        data: Ac1,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 2 Actuator
        const chart28 = document.getElementById('ac2_2');
        new Chart(chart28, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 2`,
                        data: Ac2,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 3 Actuator
        const chart29 = document.getElementById('ac3_2');
        new Chart(chart29, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 2`,
                        data: Ac3,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 4 Actuator
        const chart30 = document.getElementById('ac4_2');
        new Chart(chart30, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 2`,
                        data: Ac4,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 5 Actuator
        const chart31 = document.getElementById('ac5_2');
        new Chart(chart31, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 2`,
                        data: Ac5,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 6 Actuator
        const chart32 = document.getElementById('ac6_2');
        new Chart(chart32, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Actuator | Polyhouse 2`,
                        data: Ac6,
                        borderWidth: 1,
                        borderColor: 'Red',
                        fill: false,
                        backgroundColor: "Red",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
        // Display Sensor 1 Pyranometer
        const chart33 = document.getElementById('pyro_2');
        new Chart(chart33, {
            type: 'line',
            data: {
                labels: timeWindow,
                datasets: [
                    {
                        label: `Pyranometer | Polyhouse 2`,
                        data: Pyro,
                        borderWidth: 1,
                        borderColor: 'brown',
                        fill: false,
                        backgroundColor: "brown",
                        tension: 0.4,
                    }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.20)",

                        },
                    },
                }
            }
        });
    });



