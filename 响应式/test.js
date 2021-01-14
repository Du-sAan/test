const burger = document.querySelector(".nav-burger");
let menu = document.querySelector(".nav-menu");
burger.addEventListener("click", ()=> {
  burger.classList.toggle("active")
  menu.classList.toggle("open")
},false);
console.log()