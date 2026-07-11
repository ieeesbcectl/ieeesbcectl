"use strict";

/* Event Listener */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/* Navbar Mobile Show and PC Hide */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  /* document.body.classList.toggle("nav-active"); */
};
addEventOnElements(navTogglers, "click", toggleNavbar);

/* Activities Section Modal/Dialog Window */
const openBtns = document.querySelectorAll(".openModal");
const closeBtns = document.querySelectorAll(".closeModal");
const modals = document.querySelectorAll(".modal");

openBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modals[index].classList.add("open");
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal");
    if (modal) {
      modal.classList.remove("open");
    }
  });
});

// Close modal when clicking outside the modal-inner class
modals.forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (!e.target.closest(".modal-inner")) {
      modal.classList.remove("open");
    }
  });
});

/* Header and Back to Top */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  if (!header) return;
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    if (header) header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
    hideHeader();
  } else {
    if (header) header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

/* Hero Slider */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};

if (heroSliderNextBtn) {
  heroSliderNextBtn.addEventListener("click", slideNext);
}

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};

if (heroSliderPrevBtn) {
  heroSliderPrevBtn.addEventListener("click", slidePrev);
}

/* Auto Slide */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

if (heroSliderNextBtn && heroSliderPrevBtn) {
  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseover",
    function () {
      clearInterval(autoSlideInterval);
    }
  );

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseout",
    autoSlide
  );
}

if (heroSliderItems.length > 0) {
  window.addEventListener("load", autoSlide);
}