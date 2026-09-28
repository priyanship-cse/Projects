

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");


menuButton.addEventListener("click", () => {

    const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";


    // Update ARIA state
    menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );


    // Open / close menu
    navigation.classList.toggle(
        "is-open",
        !isOpen
    );


    // Move keyboard focus into menu
    if (!isOpen) {
        navigation.querySelector("a").focus();
    }

});


/* ---------- Escape Key ---------- */

navigation.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        navigation.classList.contains("is-open")
    ) {

        navigation.classList.remove("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        // Return focus to menu button
        menuButton.focus();
    }

});


/* ---------- Article Category Filter ---------- */

const filter =
    document.querySelector("#category-filter");

const cards =
    [...document.querySelectorAll(".card")];

const status =
    document.querySelector("#article-status");


filter.addEventListener("change", () => {

    const selectedCategory =
        filter.value;

    let visibleCount = 0;


    cards.forEach((card) => {

        const matches =
            selectedCategory === "all" ||
            card.dataset.category === selectedCategory;


        // Hide cards that don't match
        card.hidden = !matches;


        if (matches) {
            visibleCount++;
        }

    });


    let categoryName;

    if (selectedCategory === "all") {

        categoryName = "all categories";

    } else {

        categoryName =
            filter.options[
                filter.selectedIndex
            ].text.toLowerCase();

    }


    // Announce change to screen readers
    status.textContent =
        `Showing ${visibleCount} article${
            visibleCount === 1 ? "" : "s"
        } from ${categoryName}.`;

});


/* ---------- Read More Buttons ---------- */

document
    .querySelectorAll(".read-more")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const panel =
                document.getElementById(
                    button.getAttribute("aria-controls")
                );


            const isExpanded =
                button.getAttribute(
                    "aria-expanded"
                ) === "true";


            // Update ARIA state
            button.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );


            // Change button text
            button.textContent =
                isExpanded
                    ? "Read More"
                    : "Read Less";


            // Show / hide content
            panel.hidden = isExpanded;

        });

    });


/* ---------- Contact Form ---------- */

const form =
    document.querySelector("#contact-form");

const formStatus =
    document.querySelector("#form-status");


/* ---------- Show Error ---------- */

function showError(inputId, message) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(
            `${inputId}-error`
        );


    error.textContent = message;


    // Tell assistive technology
    // that the field contains an error
    input.setAttribute(
        "aria-invalid",
        "true"
    );


    // Connect input to error message
    input.setAttribute(
        "aria-describedby",
        `${inputId}-error`
    );
}


/* ---------- Clear Error ---------- */

function clearError(inputId) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(
            `${inputId}-error`
        );


    error.textContent = "";


    input.removeAttribute(
        "aria-invalid"
    );


    input.removeAttribute(
        "aria-describedby"
    );
}


/* ---------- Form Submit ---------- */

form.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.querySelector("#name");

    const email =
        document.querySelector("#email");

    const message =
        document.querySelector("#message");


    /* Clear previous errors */

    [
        "name",
        "email",
        "message"
    ].forEach(clearError);


    formStatus.textContent = "";


    let isValid = true;

    let firstInvalid = null;


    /* ---------- Name Validation ---------- */

    if (!name.value.trim()) {

        showError(
            "name",
            "Please enter your name."
        );

        isValid = false;

        firstInvalid =
            firstInvalid || name;
    }


    /* ---------- Email Validation ---------- */

    if (!email.value.trim()) {

        showError(
            "email",
            "Please enter your email address."
        );

        isValid = false;

        firstInvalid =
            firstInvalid || email;

    } else if (!email.validity.valid) {

        showError(
            "email",
            "Please enter a valid email address."
        );

        isValid = false;

        firstInvalid =
            firstInvalid || email;
    }


    /* ---------- Message Validation ---------- */

    if (!message.value.trim()) {

        showError(
            "message",
            "Please enter a message."
        );

        isValid = false;

        firstInvalid =
            firstInvalid || message;
    }


    /* ---------- Invalid Form ---------- */

    if (!isValid) {

        formStatus.textContent =
            "Please correct the errors and try again.";


        // Move keyboard focus to first error
        firstInvalid.focus();

        return;
    }


    /* ---------- Successful Form ---------- */

    formStatus.textContent =
        "Your message has been submitted successfully.";


    form.reset();

});

