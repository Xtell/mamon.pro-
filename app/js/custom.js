let menuToggle = document.querySelector(".main-nav__toggle");
let mainNavWrapper = document.querySelector(".main-nav__wrapper");

menuToggle.addEventListener("click", function(evt) {
    evt.preventDefault();
    menuToggle.classList.toggle("hamburger--close");
    mainNavWrapper.classList.toggle("main-nav__wrapper--shown");
});
