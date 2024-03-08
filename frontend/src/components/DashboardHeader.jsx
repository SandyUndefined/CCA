import React from 'react';

function DashboardHeader() {
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
    const map1 = document.getElementById("map1")
    const map2 = document.getElementById("map2")
    map1.style.display = "none"
    map2.style.display = "none"
  };

  const themeChange = () => {
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const mapbg1 = document.getElementById("map1");
    const mapbg2 = document.getElementById("map2");
    if (sun.style.display == "none") {
        sun.style.display = "block";
        moon.style.display = "none";
        document.getElementById("logo-l").style.display = "block";
        document.getElementById("logo-d").style.display = "none";
        document.documentElement.setAttribute("data-theme", "light");
        mapbg1.style.backgroundImage = "url('../images/map\ light\ bg.png')"
        mapbg2.style.backgroundImage = "url('../images/map\ light\ bg.png')"

    }
    else {
        moon.style.display = "block";
        sun.style.display = "none";

        document.getElementById("logo-l").style.display = "none";
        document.getElementById("logo-d").style.display = "block";
        document.documentElement.setAttribute("data-theme", "dark");
        mapbg1.style.backgroundImage = "url('../images/map\ bg\ dark.png')"
        mapbg2.style.backgroundImage = "url('../images/map\ bg\ dark.png')"
    }
  };

  return (
    <nav>
      <div className="left">
        <img id="logo-l" src="../images/logo.png" alt="" />
        <img id="logo-d" src="../images/white logo.png" alt="" />
        <a href="#" id="dashboard">Dashboards</a>
        <p>/</p>
        <a
          target="_blank"
          href="https://www.canva.com/design/DAFl-x-HX70/AciH_KN62I30I3ZYvdQ2tw/view?utm_content=DAFl-x-HX70&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
        >About</a>
        <a href="http://faculty.iitmandi.ac.in/~tushar" target="_blank">Contact</a>
        <a href="#download" onClick={dataRequest}>Data Request</a>
      </div>
      <div className="right">
        <a href="../index.html">Log Out</a>
        <div id="sun" onClick={themeChange}>
          <img src="../images/sun.png" alt="" />
        </div>
        <div id="moon" onClick={themeChange}>
          <img src="../images/moon.png" alt="" />
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;
