document.getElementById('sun').addEventListener('click', () => {
    document.body.classList.remove('dark-theme');
  });
  
  document.getElementById('moon').addEventListener('click', () => {
    document.body.classList.add('dark-theme');
  });
  

  function showPannel() {
    const poly1 = document.getElementById('Polyhouse1');
    const poly2 = document.getElementById('Polyhouse2');
    const sidebar1 = document.getElementById('attributes');
    const sidebar2 = document.getElementById('attributes_2');
    const pannel = document.getElementById("controlPanne l");
    const pannel_2 = document.getElementById("controlPannel 2");
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const dashboard = document.getElementById("dashboard");
    const dataRequest = document.getElementById("download");
    
    dataRequest.style.display = "none";
    dashboard.textContent = "Polyhouse 1";
    poly1.style.display = "none";
    poly2.style.display = "none";
    sidebar1.style.display = "flex";
    sidebar2.style.display = "none";
    pannel.style.display = "flex";
    pannel_2.style.display = "none";
    document.getElementById("logo-l").style.display = "none";
    document.getElementById("logo-d").style.display = "block";
    document.documentElement.setAttribute("data-theme", "black");
    moon.style.display = "block";
    sun.style.display = "none";
}

function showPannel_2() {
    const poly1 = document.getElementById('Polyhouse1');
    const poly2 = document.getElementById('Polyhouse2');
    const sidebar1 = document.getElementById('attributes');
    const sidebar2 = document.getElementById('attributes_2');
    const pannel = document.getElementById("controlPannel");
    const pannel_2 = document.getElementById("controlPannel_2");
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const dashboard = document.getElementById("dashboard");
    const dataRequest = document.getElementById("download");
    
    dataRequest.style.display = "none";
    dashboard.textContent = "Polyhouse 2";
    poly1.style.display = "none";
    poly2.style.display = "none";
    sidebar1.style.display = "none";
    sidebar2.style.display = "flex";
    pannel.style.display = "none";
    pannel_2.style.display = "flex";
    document.getElementById("logo-l").style.display = "none";
    document.getElementById("logo-d").style.display = "block";
    document.documentElement.setAttribute("data-theme", "black");
    moon.style.display = "block";
    sun.style.display = "none";
}
