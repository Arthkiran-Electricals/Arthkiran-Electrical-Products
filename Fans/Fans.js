/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS — FANS PAGE
   Provides fan category search, clear search, empty results,
   and automatic footer year.
   Shared navigation behaviour is handled by ../script.js.
   ========================================================= */

(function () {
    "use strict";

    function initFansPage() {
        const searchInput = document.getElementById("fanSearch");
        const clearButton = document.getElementById("clearFanSearch");
        const resetButton = document.getElementById("resetFanSearch");
        const cards = Array.from(document.querySelectorAll(".fans-card"));
        const resultCount = document.getElementById("fanResultCount");
        const noResults = document.getElementById("fansNoResults");
        const grid = document.getElementById("fansGrid");
        const yearElement = document.getElementById("currentYear");

        /* Automatically display the current year in the footer. */
        if (yearElement && !yearElement.textContent.trim()) {
            yearElement.textContent = String(new Date().getFullYear());
        }

        /* Stop safely if the required search elements are missing. */
        if (
            !searchInput ||
            !cards.length ||
            !resultCount ||
            !noResults ||
            !grid
        ) {
            return;
        }

        /* Filter fan cards based on the user's search. */
        function updateSearch() {
            const query = searchInput.value
                .trim()
                .toLocaleLowerCase();

            let visibleCount = 0;

            cards.forEach(function (card) {
                const searchableText = (
                    (card.dataset.search || "") + " " +
                    (card.querySelector("h3")?.textContent || "") + " " +
                    (card.querySelector("p")?.textContent || "")
                ).toLocaleLowerCase();

                const matches =
                    query === "" || searchableText.includes(query);

                card.hidden = !matches;

                if (matches) {
                    visibleCount += 1;
                }
            });

            /* Update the number of visible categories. */
            resultCount.textContent =
                visibleCount +
                (visibleCount === 1 ? " category" : " categories");

            /* Show an empty state if nothing matches. */
            noResults.hidden = visibleCount !== 0;

            /* Hide the card grid when there are no matches. */
            grid.hidden = visibleCount === 0;

            /* Only show the clear button when search text exists. */
            if (clearButton) {
                clearButton.hidden = searchInput.value.length === 0;
            }
        }

        /* Clear the search and restore all fan categories. */
        function clearSearch() {
            searchInput.value = "";
            updateSearch();
            searchInput.focus();
        }

        /* Update results whenever the user types. */
        searchInput.addEventListener("input", updateSearch);

        /* Clear search using the × button. */
        if (clearButton) {
            clearButton.addEventListener("click", clearSearch);
        }

        /* Restore all categories from the empty-results message. */
        if (resetButton) {
            resetButton.addEventListener("click", clearSearch);
        }

        /* Initialise the category count and visibility. */
        updateSearch();
    }

    /* Run after the document has loaded. */
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initFansPage,
            { once: true }
        );
    } else {
        initFansPage();
    }
})();