document.addEventListener("DOMContentLoaded", function(event) { 

    let menuToggle = document.querySelector(".main-header__btn");
    let mainHeader = document.querySelector(".main-header");
    let body = document.querySelector("body");
    let mql = window.matchMedia("(max-width: 991px)");
    menuToggle.addEventListener("click", function(evt) {
        evt.preventDefault();
        menuToggle.classList.toggle("hamburger--close");
        mainHeader.classList.toggle("main-header--opened");
        body.classList.toggle("noscroll");
    });

    //jQuery 
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
    mql.addListener(toggleOwl);
    if (mql.matches) {
        startCarousel();
    }
  });


