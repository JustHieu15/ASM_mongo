(function ($) {
    "use strict";
    jQuery(".dropdown-icon").on("click", function () {
        jQuery(this).toggleClass("active").next("ul").slideToggle();
        jQuery(this).parent().siblings().children("ul").slideUp();
        jQuery(this)
            .parent()
            .siblings()
            .children(".active")
            .removeClass("active");
    });
    $(document).on("click", ".drop-down-btn", function (e) {
        e.stopPropagation();
        $(this)
            .next(".other-app-wrapper, .other-app-wrappers")
            .toggleClass("active");
    });
    $(document).on("click", function (e) {
        if (
            !$(e.target).closest(".other-app-wrapper, .other-app-wrappers")
                .length
        ) {
            $(".other-app-wrapper, .other-app-wrappers").removeClass("active");
        }
    });
    $(".counter").counterUp({ delay: 10, time: 1000 });
    var swiper = new Swiper(".home1-banner-slider", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: { delay: 2500, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 1, spaceBetween: 15 },
            992: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 1, spaceBetween: 15 },
            1400: { slidesPerView: 1 },
        },
    });
    var swiper = new Swiper(".banner-slider2", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: false,
        autoplay: { delay: 2500, disableOnInteraction: false },
        navigation: { nextEl: ".next-2", prevEl: ".prev-2" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 15 },
            1400: { slidesPerView: 3 },
        },
    });
    var swiper = new Swiper(".discover-slider", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2300, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 15 },
            1400: { slidesPerView: 3 },
        },
    });
    var swiper = new Swiper(".gallery-slider", {
        speed: 1500,
        spaceBetween: 0,
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: {
            280: { slidesPerView: 2 },
            386: { slidesPerView: 3 },
            576: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            992: { slidesPerView: 6 },
            1200: { slidesPerView: 7 },
            1400: { slidesPerView: 8 },
        },
    });
    var swiper = new Swiper(".gallery-slider2", {
        speed: 1500,
        spaceBetween: 0,
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: {
            280: { slidesPerView: 2 },
            386: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1400: { slidesPerView: 6 },
        },
    });
    var swiper = new Swiper(".tour-category-slider", {
        speed: 1500,
        spaceBetween: 24,
        autoplay: { delay: 2500, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1400: { slidesPerView: 6 },
        },
    });
    var swiper = new Swiper(".blog-slider", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 1, spaceBetween: 15 },
            992: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 1, spaceBetween: 15 },
            1400: { slidesPerView: 1 },
        },
    });
    var swiper = new Swiper(".banner-slider3", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 25,
        centerSlides: true,
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 1, spaceBetween: 15 },
            992: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 1, spaceBetween: 15 },
            1400: { slidesPerView: 1 },
        },
    });
    var swiper = new Swiper(".banner-swipe-swipe2", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 25,
        centerSlides: true,
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
    });
    var swiper = new Swiper(".exclusive-episode-swiper", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 15 },
            1400: { slidesPerView: 3 },
        },
    });
    var swiper = new Swiper(".home8-banner-slider", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 25,
        slidesPerView: 1,
        centerSlides: true,
        loop: true,
        effect: "fade",
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: { nextEl: ".next-4", prevEl: ".prev-4" },
        pagination: { el: ".paginations111", clickable: true },
    });
    var swiper = new Swiper(".gaming-swiper", {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 25,
        centerSlides: true,
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
        breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 1, spaceBetween: 15 },
            992: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 1, spaceBetween: 15 },
            1400: { slidesPerView: 1 },
        },
    });
    new WOW().init();
    document.addEventListener("DOMContentLoaded", function (event) {
        let offset = 50;
        let circleContainer = document.querySelector(".circle-container");
        let circlePath = document.querySelector(".circle-container path");
        let pathLength = circlePath.getTotalLength();
        circlePath.style.transition = circlePath.style.WebkitTransition =
            "none";
        circlePath.style.strokeDasharray = pathLength;
        circlePath.style.strokeDashoffset = pathLength;
        circlePath.getBoundingClientRect();
        circlePath.style.transition = circlePath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        let updateLoader = () => {
            let scrollTop = window.scrollY;
            let docHeight = document.body.offsetHeight;
            let winHeight = window.innerHeight;
            let height = docHeight - winHeight;
            let progress = pathLength - (scrollTop * pathLength) / height;
            circlePath.style.strokeDashoffset = progress;
            if (scrollTop > offset) {
                circleContainer.classList.add("active");
            } else {
                circleContainer.classList.remove("active");
            }
        };
        circleContainer.onclick = function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        window.onscroll = () => {
            updateLoader();
        };
        updateLoader();
    });
    const dayNight = document.querySelector(".tt-style-switch");
    dayNight.addEventListener("click", () => {
        dayNight.querySelector("i").classList.toggle("bi-brightness-low-fill");
        dayNight.querySelector("i").classList.toggle("bi-moon");
        document.body.classList.toggle("dark");
        var value = document.getElementById("body").className;
        var str = value;
        var last = str.split(" ").slice(-1)[0];
        if (last === "dark") {
            localStorage.setItem("poitic_theme", last);
        } else {
            localStorage.setItem("poitic_theme", "");
        }
        window.addEventListener("load", () => {
            if (document.body.classList.contains("dark")) {
                jQuery(".tt-style-switch i").addClass(
                    "bi bi-brightness-low-fill"
                );
            } else {
                jQuery(".tt-style-switch i").addClass("bi bi-moon");
            }
        });
    });
    var poitic_theme = localStorage.getItem("poitic_theme");
    if (poitic_theme === "dark") {
        $("body").addClass("dark");
    }
    document
        .querySelector(".sidebar-button, .menu-icon")
        .addEventListener("click", () =>
            document
                .querySelector(
                    ".main-menu, .header-area.style-3, .sidebar-menu"
                )
                .classList.toggle("show-menu")
        );
    $(".sidebar-button").on("click", function () {
        $(this).toggleClass("active");
    });
    $(".search-btn").on("click", function (e) {
        let parent = $(this).parent();
        parent.find(".search-input").toggleClass("active");
        e.stopPropagation();
    });
    $(document).on("click", function (e) {
        if (
            !$(e.target).closest(
                ".search-input, .search-btn, .sidebar-menu, .menu-icon"
            ).length
        ) {
            $(".search-input").removeClass("active");
            $(".sidebar-menu").removeClass("show-menu");
        }
    });
    $(".serch-close").on("click", function (e) {
        $(".search-input").removeClass("active");
    });
    $(".menu-close-btn").on("click", function () {
        $(".sidebar-menu").removeClass("show-menu");
    });
    $(".video-player").fancybox2({
        buttons: ["close"],
        loop: false,
        protect: true,
    });
    $("select").niceSelect();
    document.addEventListener("DOMContentLoaded", function () {
        const copyLinkIcon = document.getElementById("copy-link-icon");
        const linkInput = document.getElementById("link-input");
        const copyText = document.getElementById("copy-text");
        if (copyLinkIcon && linkInput && copyText) {
            copyLinkIcon.addEventListener("click", function () {
                linkInput.select();
                linkInput.setSelectionRange(0, 99999);
                document.execCommand("copy");
                copyText.classList.add("show");
                setTimeout(function () {
                    copyText.classList.remove("show");
                }, 2000);
            });
        }
    });
})(jQuery);
