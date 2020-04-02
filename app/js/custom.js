let menuToggle = document.querySelector(".main-header__btn");
let mainHeader = document.querySelector(".main-header");
let body = document.querySelector("body");
let mql = window.matchMedia("(max-width: 991px)");
let callbackModal = document.querySelector("#modal-callback");
let overlay = document.querySelector(".overlay");
let contactUsButtons = document.querySelectorAll("a[href='contactUs.html']");

/* 
 Initialization
*/
mql.addListener(toggleOwl);
if (mql.matches) {
    startCarousel();
}
toggleMobileMenu();
enablePopup(contactUsButtons, callbackModal, overlay);

/*
Function Declaration
*/
function toggleMobileMenu() {
    menuToggle.addEventListener("click", function(evt) {
        evt.preventDefault();
        menuToggle.classList.toggle("hamburger--close");
        mainHeader.classList.toggle("main-header--opened");
        body.classList.toggle("noscroll");
    });
}
function enablePopup(buttons, popup, overlay) {
    let closeModalButton = popup.querySelector(".modal__close");
    for (btn of buttons) {
        btn.addEventListener('click', function(evt) {
            evt.preventDefault();
            openPopup(popup, overlay);
        });
    }
    function openPopup(popup, overlay) {
        //close mobile menu before show popup
        if (mainHeader.classList.contains("main-header--opened")) {
            menuToggle.classList.toggle("hamburger--close");
            mainHeader.classList.toggle("main-header--opened");
            body.classList.toggle("noscroll");
        }

            popup.classList.add("modal--shown");
            overlay.classList.add("overlay--shown");
        }
    function closePopup(popup, overlay) {
            popup.classList.remove("modal--shown");
            overlay.classList.remove("overlay--shown");
        }
    closeModalButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        closePopup(popup, overlay);
    });
}

function startCarousel() {
$(".owl-carousel").owlCarousel({
    autoHeight: true,
    responsive: {
        0: {
            items: 1,
            center: true,
            autoWidth: false
        },
        576: {
            items: 2,
            autoWidth: false
        },
        800: {
            items: 3,
            autoWidth: false
        }
    }
});
}
function stopCarousel() {
    let owl =  $(".owl-carousel");
    owl.trigger("destroy.owl.carousel");
    owl.addClass("off");
}
function toggleOwl(e){
    if (e.matches) {
        startCarousel();
    }
    else {
        stopCarousel();
    }
}


