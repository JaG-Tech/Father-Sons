/* ==========================================
   FATHER & SONS
   Main JavaScript
========================================== */


/* ---------- MOBILE MENU ---------- */


const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


if(menuButton){

menuButton.addEventListener("click",()=>{

navLinks.classList.toggle("active");

menuButton.classList.toggle("open");

});

}




/* ---------- CLOSE MENU AFTER CLICK ---------- */


document.querySelectorAll(".nav-links a")
.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

menuButton.classList.remove("open");

});

});





/* ---------- HEADER EFFECT ---------- */


const header = document.querySelector(".header");


window.addEventListener("scroll",()=>{


if(window.scrollY > 50){

header.classList.add("scrolled");

}

else{

header.classList.remove("scrolled");

}


});





/* ---------- SMOOTH SCROLL ---------- */


document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{


anchor.addEventListener("click",function(e){


const target =
document.querySelector(this.getAttribute("href"));


if(target){

e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}


});


});





/* ---------- FUTURE ANIMATION OBSERVER ---------- */


const observer =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("visible");

}


});


},
{

threshold:.15

});



document.querySelectorAll(".animate")
.forEach(element=>{

observer.observe(element);

});
/* ==========================================
   BEFORE AFTER SLIDER
========================================== */


const slider =
document.querySelector(".slider-control");


const afterImage =
document.querySelector(".after-container");


const sliderLine =
document.querySelector(".slider-line");


const sliderButton =
document.querySelector(".slider-button");



if(slider){


slider.addEventListener("input",()=>{


let value = slider.value;


afterImage.style.width =
value + "%";


sliderLine.style.left =
value + "%";


sliderButton.style.left =
value + "%";


});


}


