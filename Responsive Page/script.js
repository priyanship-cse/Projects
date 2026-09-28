// Select the mobile menu button
const menuBtn = document.getElementById("menuBtn");

// Select navigation links
const navLinks = document.getElementById("navLinks");

// Toggle navigation menu when the button is clicked
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close the mobile menu when a navigation link is clicked
const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

