"use strict"

document.querySelector('.location').onclick = function () {
    // location.href = "https://www.iitmandi.ac.in/";
    window.open("https://www.iitmandi.ac.in/", "_blank");
}
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".left");
const navMenu2 = document.querySelector(".right");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navMenu2.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}