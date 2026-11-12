
/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   HEATING PAGE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const searchInput = document.getElementById("heatingSearch");
    const filterButtons = Array.from(
        document.querySelectorAll(".heating-filter")
    );
    const cards = Array.from(
        document.querySelectorAll(".heating-card")
    );
    const noResults = document.getElementById("heatingNoResults");
    const currentYear = document.getElementById("currentYear");
    const heroImage = document.getElementById("heatingHeroImage");

    let activeFilter = "all";

    /* =====================================================
       FOOTER YEAR
       Shared script.js also supports this element.
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =====================================================
       IMAGE FALLBACK
       If the image path is unavailable, keep the layout tidy.
    ===================================================== */

    function addImageFallback(image, parent) {
        if (!image || !parent) {
            return;
        }

        image.hidden = true;
        parent.classList.add("image-unavailable");
    }

    if (heroImage) {
        heroImage.addEventListener("error", function () {
            addImageFallback(heroImage, heroImage.parentElement);
        });

        if (heroImage.complete && heroImage.naturalWidth === 0) {
            addImageFallback(heroImage, heroImage.parentElement);
        }
    }

    document.querySelectorAll(".heating-card-image img").forEach(
        function (image) {
            image.addEventListener("error", function () {
                image.hidden = true;

                const imageLink = image.closest(".heating-card-image");

                if (imageLink) {
                    imageLink.classList.add("image-unavailable");
                }
            });

            if (image.complete && image.naturalWidth === 0) {
                image.hidden = true;

                const imageLink = image.closest(".heating-card-image");

                if (imageLink) {
                    imageLink.classList.add("image-unavailable");
                }
            }
        }
    );

    /* =====================================================
       SEARCH AND FILTER
    ===================================================== */

    function filterHeatingCards() {
        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        cards.forEach(function (card) {
            const category = (
                card.dataset.category || ""
            ).toLowerCase();

            const searchText = (
                card.dataset.search || ""
            ).toLowerCase();

            const heading = card.querySelector("h3");
            const headingText = heading
                ? heading.textContent.toLowerCase()
                : "";

            const matchesFilter =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                searchTerm === "" ||
                searchText.includes(searchTerm) ||
                headingText.includes(searchTerm);

            const isVisible = matchesFilter && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount += 1;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter || "all";

            filterButtons.forEach(function (otherButton) {
                const isActive = otherButton === button;

                otherButton.classList.toggle("active", isActive);
                otherButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            filterHeatingCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterHeatingCards);
    }

    /* =====================================================
       INITIAL STATE
    ===================================================== */

    filterHeatingCards();
});
