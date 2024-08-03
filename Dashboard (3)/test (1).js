const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
console.log(loggedInUserEmail);
const myFunc = () => {
    axios.post("https://research.iitmandi.ac.in:8000/user/download", {
        email: loggedInUserEmail,
    })
        .then((response) => {
            console.log(response);
            console.log("YAYYYYYY :)");
        })
        .catch((error) => {
            console.log(loggedInUserEmail);
            console.error("An error occurred:", error);
            console.log("ERRROOOOEER :(");
        });
}
// const firstName = localStorage.getItem("firstName");
// const lastName = localStorage.getItem("lastName");

// // Set the full name in the user name section
// document.getElementById("fullName").textContent = firstName + " " + lastName;

//////////////////////////////////////////
// INTERNAL TEMPERATURE 
// Assuming you have an array of data points received every minute
// const data = [
//     { timestamp: "2023-07-06T18:32:00.000Z", value: 23.45 },
//     { timestamp: "2023-07-06T18:42:00.000Z", value: 23.45 },
//     { timestamp: "2023-07-06T18:31:00.000Z", value: 22.30 },
//     { timestamp: "2023-07-06T17:59:00.000Z", value: 24.10 },
//     { timestamp: "2023-07-06T16:59:00.000Z", value: 24.10 },
//     // ... more data points
// ];

// // Get the current time
// const currentTime = new Date();
// console.log(currentTime);
// // Calculate the start time of the sliding window (1 hour ago)
// const startTime = new Date(currentTime.getTime() - 60 * 60 * 1000);
// console.log(startTime);
// // Filter the data within the sliding window
// const filteredData = data.filter((entry) => {
//     const entryTime = new Date(entry.timestamp);
//     console.log(entryTime);
//     return entryTime >= startTime && entryTime <= currentTime;
// });

// // Display the filtered data
// console.log(filteredData);

const getInternalTemperature = (num) => {
    return num.data.temperature.internal;
}
// EXTERNAL TEMPERATURE
const getExternalTemperature = (num) => {
    // let i = 1;
    const a = num.data.temperature.external.Sensor1;
    // console.log(a);
    return a;
}
// TIMESTAMPS
const getTimeStamps = (num) => {
    const a = new Date(num.timestamp).toLocaleString("en-IN");
    // const a = new Date(num.timestamp).toLocaleString("en-IN").slice(9, 14);
    return a;
}
axios.get('https://research.iitmandi.ac.in:8000/sensor/polyhouse1/data')
    .then(response => {
        const data = response.data;
        // console.log(data.result.slice(-1)[0].timestamp)
        // console.log(data.result[0].timestamp);
        const internalTemp = data.result.map(getInternalTemperature);
        const externalTemp = data.result.map(getExternalTemperature);
        const timeStamps = data.result.map(getTimeStamps);
        // console.log(externalTemp);
        // const data = [
        //     { timestamp: "2023-07-06T18:32:00.000Z", value: 23.45 },
        //     { timestamp: "2023-07-06T18:42:00.000Z", value: 23.45 },
        //     { timestamp: "2023-07-06T18:31:00.000Z", value: 22.30 },
        //     { timestamp: "2023-07-06T17:59:00.000Z", value: 24.10 },
        //     { timestamp: "2023-07-06T16:59:00.000Z", value: 24.10 },
        //     // ... more data points
        // ];

        // // Get the current time
        // const currentTime = new Date();
        const currentTime = data.result.slice(-1)[0].timestamp;
        const options = { timeZone: "Asia/Kolkata" };

        // Convert UTC timestamp to IST Date object
        const istDate = new Date(new Date(currentTime).toLocaleString("en-IN", options));

        console.log(istDate);

        // Calculate the start time of the sliding window (1 hour ago)
        const startTime = new Date(istDate.getTime() - 60 * 60 * 1000);
        console.log(startTime);
        // Filter the data within the sliding window
        const filteredData = timeStamps.filter((entry) => {
            const entryTime = new Date(entry);
            console.log(entryTime);
            return (entryTime >= startTime && entryTime <= istDate);
        });
        console.log(filteredData);
        // console.log(filteredData.slice(9, 12));
        const chart1 = document.getElementById('chart1');
        new Chart(chart1, {
            type: 'line',
            data: {
                labels: filteredData,
                datasets: [
                    // {
                    //     label: 'Inside',
                    //     data: internalTemp,
                    //     borderWidth: 1,
                    //     borderColor: '#36A2EB',
                    //     fill: false,
                    //     backgroundColor: "rgba(12, 117, 193, 1)",
                    //     tension: 0.4,

                    // },
                    {
                        label: `Temperature| External | 60 mins`,
                        data: externalTemp,
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

                        // beginAtZero: true,
                        // ticks: {
                        //     stepSize: 30,
                        // }
                    },
                }
            }
        });
        const chart2 = document.getElementById('chart2');
        new Chart(chart2, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(26, 220, 22, 1)"

                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart3 = document.getElementById('chart3');
        new Chart(chart3, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(26, 220, 22, 1)"

                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart4 = document.getElementById('chart4');
        new Chart(chart4, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart5 = document.getElementById('chart5');
        new Chart(chart5, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart6 = document.getElementById('chart6');
        new Chart(chart6, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart7 = document.getElementById('chart7');
        new Chart(chart7, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart8 = document.getElementById('chart8');
        new Chart(chart8, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart9 = document.getElementById('chart9');
        new Chart(chart9, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });
        const chart10 = document.getElementById('chart10');
        new Chart(chart10, {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [{
                    label: 'Inside',
                    data: internalTemp,
                    borderWidth: 1,
                    borderColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,

                    backgroundColor: "rgba(12, 117, 193, 1)"

                },
                {
                    label: 'Outside',
                    data: externalTemp,
                    borderWidth: 1,
                    borderColor: 'rgba(26, 220, 22, 1)',
                    fill: false,
                    tension: 0.4,
                    backgroundColor: "rgba(26, 220, 22, 1)",


                }],
            },
            options: {
                scales: {
                    x: {
                        grid: {

                            display: false,
                        }
                    },
                    y: {
                        grid: {

                            color: "rgba(0, 0, 0, 0.20)",

                        }
                    },
                }
            }
        });

    })
    .catch(error => {
        console.error('Error retrieving data:', error);
    });

//////////////////////////////////////////


const change = () => {
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const notify = document.getElementById('notify');
    if (sun.style.display == "none") {
        sun.style.display = "block";
        moon.style.display = "none";
        document.getElementById("logo-l").style.display = "block";
        document.getElementById("logo-d").style.display = "none";
        document.documentElement.setAttribute("data-theme", "light");
        notify.style.filter = "none"

    }
    else {
        moon.style.display = "block";
        sun.style.display = "none";

        document.getElementById("logo-l").style.display = "none";
        document.getElementById("logo-d").style.display = "block";
        document.documentElement.setAttribute("data-theme", "dark");
        notify.style.filter = "invert(100%)"
    }

}
//declearing html elements

const imgDiv = document.querySelector(".profile-pic-div");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");

//if user hover on img div

imgDiv.addEventListener("mouseenter", function () {
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener("mouseleave", function () {
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a foto to upload

// function checkLocalStorage() {
//     const image = localStorage.getItem("profileImage");
//     if (image) {
//         img.setAttribute("src", image);
//         imgDiv.style.display = "block";
//         uploadBtn.style.display = "none";
//     }
// }

// // If an image is already stored in local storage, display it
// checkLocalStorage();

// // if user hovers on img div
// imgDiv.addEventListener("mouseenter", function () {
//     uploadBtn.style.display = "block";
// });

// // if we hover out from img div
// imgDiv.addEventListener("mouseleave", function () {
//     uploadBtn.style.display = "none";
// });

// // lets work for image showing functionality when we choose an image to upload
// file.addEventListener("change", function () {
//     const choosedFile = this.files[0];

//     if (choosedFile) {
//         const reader = new FileReader();

//         reader.addEventListener("load", function () {
//             img.setAttribute("src", reader.result);
//             imgDiv.style.display = "block";
//             uploadBtn.style.display = "none";

//             // Store the image in local storage
//             localStorage.setItem("profileImage", reader.result);
//         });

//         reader.readAsDataURL(choosedFile);
//     }
// });

