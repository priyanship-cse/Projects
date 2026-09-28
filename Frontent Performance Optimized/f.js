"use strict";

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isOpen);

});


// Close menu after clicking a navigation link
navLinks.addEventListener("click", (event) => {

    if (event.target.tagName === "A") {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    }

});


// Contact form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    if (name) {
        alert(`Thank you, ${name}! Your message has been received.`);
        contactForm.reset();
    }

});