
/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   PRODUCTS PAGE — COMPLETE JAVASCRIPT
========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const tabs = Array.from(
            document.querySelectorAll(".catalog-tab")
        );

        const cards = Array.from(
            document.querySelectorAll(".catalog-card")
        );

        const search = document.getElementById("productSearch");

        const emptyState = document.getElementById("catalogEmpty");

        let activeFilter = "all";


        /* -------------------------------------------------
           UPDATE PRODUCTS BASED ON CATEGORY AND SEARCH
        ------------------------------------------------- */

        function updateCatalog() {

            const query = search
                ? search.value.trim().toLowerCase()
                : "";

            let visibleCount = 0;

            cards.forEach(function (card) {

                const category = card.dataset.category || "";

                const categoryMatch =
                    activeFilter === "all" ||
                    category === activeFilter;

                const searchableText = (
                    (card.dataset.search || "") +
                    " " +
                    card.textContent
                ).toLowerCase();

                const searchMatch =
                    query === "" ||
                    searchableText.includes(query);

                const isVisible =
                    categoryMatch && searchMatch;

                card.hidden = !isVisible;

                if (isVisible) {
                    visibleCount++;
                }

            });


            /* Show a helpful message when nothing matches */

            if (emptyState) {
                emptyState.hidden = visibleCount !== 0;
            }

        }


        /* -------------------------------------------------
           CATEGORY FILTER BUTTONS
        ------------------------------------------------- */

        tabs.forEach(function (tab) {

            tab.addEventListener("click", function () {

                activeFilter = tab.dataset.filter || "all";


                /* Update active tab appearance and accessibility */

                tabs.forEach(function (item) {

                    const isSelected = item === tab;

                    item.classList.toggle(
                        "is-active",
                        isSelected
                    );

                    item.setAttribute(
                        "aria-pressed",
                        isSelected ? "true" : "false"
                    );

                });


                updateCatalog();

            });

        });


        /* -------------------------------------------------
           LIVE SEARCH
        ------------------------------------------------- */

        if (search) {

            search.addEventListener("input", function () {
                updateCatalog();
            });


            /* Escape clears the search field */

            search.addEventListener("keydown", function (event) {

                if (event.key === "Escape") {

                    search.value = "";

                    updateCatalog();

                    search.blur();

                }

            });

        }


        /* -------------------------------------------------
           INITIAL CATALOGUE STATE
        ------------------------------------------------- */

        updateCatalog();

    });

})();
