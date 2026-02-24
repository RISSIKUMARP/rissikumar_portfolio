'use strict';



/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}



/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * Universal scroll-reveal with IntersectionObserver
 * Handles all [data-reveal] elements with staggered animations
 */

const revealElements = document.querySelectorAll("[data-reveal]");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(function (el) {
    var parent = el.parentElement;
    if (parent) {
      var siblings = parent.querySelectorAll(':scope > [data-reveal]');
      if (siblings.length > 1) {
        var sibIndex = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = (sibIndex * 0.08) + 's';
      }
    }
    revealObserver.observe(el);
  });
}



/**
 * Active nav link highlighting on scroll
 */

var sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  var scrollY = window.scrollY + 120;

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId = section.getAttribute('id');
    var navLink = document.querySelector('.navbar-link[href="#' + sectionId + '"]');

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
