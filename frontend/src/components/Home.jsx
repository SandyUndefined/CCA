// import React from 'react';

// function Home() {
//   const handleClick = () => {
//     window.open("https://www.iitmandi.ac.in/", "_blank");
//   };

//   const handleMobileMenu = () => {
//     const hamburger = document.querySelector(".hamburger");
//     const navMenu = document.querySelector(".left");
//     const navMenu2 = document.querySelector(".right");
    
//     hamburger.classList.toggle("active");
//     navMenu.classList.toggle("active");
//     navMenu2.classList.toggle("active");
//   };

//   const handleCloseMenu = () => {
//     const hamburger = document.querySelector(".hamburger");
//     const navMenu = document.querySelector(".left");
    
//     hamburger.classList.remove("active");
//     navMenu.classList.remove("active");
//   };

//   return (
//     <div>
//       <div className="main">
//         <div className="center">
//           <div className="location" onClick={handleClick}>
//             <img
//               src="./images/location.png"
//               className="location-icon"
//               style={{ filter: "invert(100%)" }}
//               alt=""
//             />
//             <p>IIT MANDI</p>
//           </div>
//           <div className="center-content">
//             <div className="heading">
//               <h1>Climate Controlled Agriculture</h1>
//             </div>
//             <div className="content-home">
//               <p>
//                 This innovative system offers numerous advantages for sustainable
//                 and efficient farming. With precision monitoring and real-time
//                 data analysis, smart climate control agriculture optimizes
//                 environmental conditions such as temperature, humidity, and
//                 lighting, ensuring optimal plant growth and resource utilization.
//               </p>
//             </div>
//             <div className="btn">
//               <button><a href="./login/index.html">FIND OUT MORE</a></button>
//             </div>
//           </div>
//           <div className="socials">
//             <a href=""><img src="./images/facebook.png" alt="" /></a>
//             <a href=""><img src="./images/youtube.png" alt="" /></a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;





// // src/Home.js
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation


// function Home() {
//   const handleClick = () => {
//     window.open("https://www.iitmandi.ac.in/", "_blank");
//   };

//   useEffect(() => {
//     const handleMobileMenu = () => {
//       const hamburger = document.querySelector(".hamburger");
//       const navMenu = document.querySelector(".left");
//       const navMenu2 = document.querySelector(".right");
      
//       hamburger.classList.toggle("active");
//       navMenu.classList.toggle("active");
//       navMenu2.classList.toggle("active");
//     };

//     const handleCloseMenu = () => {
//       const hamburger = document.querySelector(".hamburger");
//       const navMenu = document.querySelector(".left");
      
//       hamburger.classList.remove("active");
//       navMenu.classList.remove("active");
//     };

//     document.querySelector(".hamburger").addEventListener("click", handleMobileMenu);
//     document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", handleCloseMenu));

//     return () => {
//       document.querySelector(".hamburger").removeEventListener("click", handleMobileMenu);
//       document.querySelectorAll(".nav-link").forEach(n => n.removeEventListener("click", handleCloseMenu));
//     };
//   }, []);

//   return (
//     <div>
//       <div className="main">
//         <div className="center">
//           <div className="location" onClick={handleClick}>
//             <img
//               src="/images/location.png"
//               className="location-icon"
//               style={{ filter: "invert(100%)" }}
//               alt="Location Icon"
//             />
//             <p>IIT MANDI</p>
//           </div>
//           <div className="center-content">
//             <div className="heading">
//               <h1>Climate Controlled Agriculture</h1>
//             </div>
//             <div className="content-home">
//               <p>
//                 This innovative system offers numerous advantages for sustainable
//                 and efficient farming. With precision monitoring and real-time
//                 data analysis, smart climate control agriculture optimizes
//                 environmental conditions such as temperature, humidity, and
//                 lighting, ensuring optimal plant growth and resource utilization.
//               </p>
//             </div>
//             <div className="btn">
//               <button>
//                 <Link to="/login">FIND OUT MORE</Link>
//               </button>
//             </div>
//           </div>
//           <div className="socials">
//             <a href="https://www.facebook.com"><img src="/images/facebook.png" alt="Facebook" /></a>
//             <a href="https://www.youtube.com"><img src="/images/youtube.png" alt="YouTube" /></a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;






import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './globalcss.css';

function Home() {
  useEffect(() => {
    const handleMobileMenu = () => {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.left');
      const navMenu2 = document.querySelector('.right');

      if (hamburger && navMenu && navMenu2) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navMenu2.classList.toggle('active');
      }
    };

    const handleCloseMenu = () => {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.left');

      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    };

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
      hamburger.addEventListener('click', handleMobileMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', handleCloseMenu);
    });

    return () => {
      if (hamburger) {
        hamburger.removeEventListener('click', handleMobileMenu);
      }
      navLinks.forEach(link => {
        link.removeEventListener('click', handleCloseMenu);
      });
    };
  }, []);

  const handleClick = () => {
    window.open('https://www.iitmandi.ac.in/', '_blank');
  };

  return (
    <div className="main">
      <div className="center">
        <div className="location" onClick={handleClick}>
          {/* <img
            src="/images/location.pnghttps://www.facultyplus.com/wp-content/uploads/2020/08/Indian_Institute_of_Technology_Mandi_Logo-300x241.png"
            className="location-icon"
            style={{ filter: 'invert(100%)' }}
            alt="Location Icon"
          /> */}
          <p>IIT MANDI</p>
        </div>
        <div className="center-content">
          <div className="heading">
            <h1>Climate Controlled Agriculture</h1>
          </div>
          <div className="content-home">
            <p>
              This innovative system offers numerous advantages for sustainable and efficient farming. With precision
              monitoring and real-time data analysis, smart climate control agriculture optimizes environmental
              conditions such as temperature, humidity, and lighting, ensuring optimal plant growth and resource
              utilization.
            </p>
          </div>
          <div className="btn">
            <button>
              <Link to="/login">FIND OUT MORE</Link>
            </button>
          </div>
        </div>
        <div className="socials">
          <a href="https://www.facebook.com">
            <img src="https://th.bing.com/th/id/R.6c3ea8b640f61035021c20dd5dcd37fa?rik=31mzN9qX%2bAR9pA&riu=http%3a%2f%2fclipart-library.com%2fnew_gallery%2f377-3776210_facebook-logo-vector-logovectornet-logo-facebook-2019-png.png&ehk=feGZ0i4yauVvpdtQu%2bTAeLkp%2bpCt2QN1zx7GrMwtQuA%3d&risl=&pid=ImgRaw&r=0" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com">
            <img src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png" alt="YouTube" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

