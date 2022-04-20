/*
HAMBURGER MENU TOGGLE
*/
var menu_nav = document.querySelector(".menu");
var menu_hamburger = document.getElementById("nav-options-wrapper");

menu_nav.addEventListener("click", () => {
  menu_nav.classList.toggle("open");
  menu_hamburger.classList.toggle("open");
});
