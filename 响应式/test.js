const burger = document.querySelector(".nav-burger");
let menu = document.querySelector(".nav-menu");
let menuItems = document.querySelectorAll(".nav-menu li");
burger.addEventListener("click", ()=> {
  burger.classList.toggle("active");
  menu.classList.toggle("open");
  menuItems.forEach( (value, index) => {
    if(value.style.animation){
      value.style.animation = ""
    }else {
      value.style.animation = `0.3s ease-in menuItems forwards ${index * 0.1 + 1}s`
    }
  });
},false);
