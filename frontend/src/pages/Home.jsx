import React from 'react';

function Home() {
  const handleClick = () => {
    window.open("https://www.iitmandi.ac.in/", "_blank");
  };

  const handleMobileMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".left");
    const navMenu2 = document.querySelector(".right");
    
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navMenu2.classList.toggle("active");
  };

  const handleCloseMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".left");
    
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  };

  return (
    <div>
      <div className="main">
        <div className="center">
          <div className="location" onClick={handleClick}>
            <img
              src="./images/location.png"
              className="location-icon"
              style={{ filter: "invert(100%)" }}
              alt=""
            />
            <p>IIT MANDI</p>
          </div>
          <div className="center-content">
            <div className="heading">
              <h1>Climate Controlled Agriculture</h1>
            </div>
            <div className="content">
              <p>
                This innovative system offers numerous advantages for sustainable
                and efficient farming. With precision monitoring and real-time
                data analysis, smart climate control agriculture optimizes
                environmental conditions such as temperature, humidity, and
                lighting, ensuring optimal plant growth and resource utilization.
              </p>
            </div>
            <div className="btn">
              <button><a href="./login/index.html">FIND OUT MORE</a></button>
            </div>
          </div>
          <div className="socials">
            <a href=""><img src="./images/facebook.png" alt="" /></a>
            <a href=""><img src="./images/youtube.png" alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
