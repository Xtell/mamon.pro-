let menuToggle = document.querySelector(".main-header__btn");
let mainHeader = document.querySelector(".main-header");
let body = document.querySelector("body");
menuToggle.addEventListener("click", function(evt) {
    evt.preventDefault();
    menuToggle.classList.toggle("hamburger--close");
    mainHeader.classList.toggle("main-header--opened");
    body.classList.toggle("noscroll");
});
