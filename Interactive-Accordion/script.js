document.addEventListener("DOMContentLoaded", function () {

    // Get all accordion buttons
    const accordionButtons =
        document.querySelectorAll(".accordion-header");


    // Error handling
    if (!accordionButtons.length) {

        console.error(
            "Accordion error: No accordion buttons were found."
        );

        return;
    }


    // Function to close all accordion items
    function closeAllItems() {

        accordionButtons.forEach(function (button) {

            const item =
                button.parentElement;

            const content =
                document.getElementById(
                    button.getAttribute("aria-controls")
                );


            // Remove active class
            item.classList.remove("active");


            // Update accessibility state
            button.setAttribute(
                "aria-expanded",
                "false"
            );


            // Close content
            if (content) {
                content.style.maxHeight = null;
            }

        });

    }


    // Function to open an accordion item
    function openItem(button) {

        const item =
            button.parentElement;

        const content =
            document.getElementById(
                button.getAttribute("aria-controls")
            );


        // Error handling
        if (!content) {

            console.error(
                "Accordion error: Content section not found."
            );

            return;
        }


        // Add active class
        item.classList.add("active");


        // Update ARIA attribute
        button.setAttribute(
            "aria-expanded",
            "true"
        );


        // Set dynamic height for animation
        content.style.maxHeight =
            content.scrollHeight + "px";

    }


    // Add click event to every button
    accordionButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const isOpen =
                    button.getAttribute(
                        "aria-expanded"
                    ) === "true";


                // Close all items
                closeAllItems();


                // Open selected item
                if (!isOpen) {
                    openItem(button);
                }

            }
        );

    });


    // Keyboard Navigation
    accordionButtons.forEach(function (button, index) {

        button.addEventListener(
            "keydown",
            function (event) {

                let targetIndex = null;


                // Arrow Down
                if (event.key === "ArrowDown") {

                    event.preventDefault();

                    targetIndex =
                        (index + 1) %
                        accordionButtons.length;

                }


                // Arrow Up
                else if (event.key === "ArrowUp") {

                    event.preventDefault();

                    targetIndex =
                        (index - 1 +
                            accordionButtons.length) %
                        accordionButtons.length;

                }


                // Home Key
                else if (event.key === "Home") {

                    event.preventDefault();

                    targetIndex = 0;

                }


                // End Key
                else if (event.key === "End") {

                    event.preventDefault();

                    targetIndex =
                        accordionButtons.length - 1;

                }


                // Move focus
                if (targetIndex !== null) {

                    accordionButtons[
                        targetIndex
                    ].focus();

                }

            }
        );

    });


    // Handle browser resize
    window.addEventListener(
        "resize",
        function () {

            accordionButtons.forEach(
                function (button) {

                    if (
                        button.getAttribute(
                            "aria-expanded"
                        ) === "true"
                    ) {

                        const content =
                            document.getElementById(
                                button.getAttribute(
                                    "aria-controls"
                                )
                            );


                        if (content) {

                            content.style.maxHeight =
                                content.scrollHeight +
                                "px";

                        }

                    }

                }
            );

        }
    );

});