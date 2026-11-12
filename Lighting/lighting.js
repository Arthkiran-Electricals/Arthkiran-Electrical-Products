/* =========================================================
   ARTHKIRAN LIGHTING PAGE
   Category filtering + live search + hero carousel
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       CATEGORY FILTER AND LIVE SEARCH
       ----------------------------------------- */

    const filterButtons = Array.from(
        document.querySelectorAll(".lighting-filter")
    );

    const cards = Array.from(
        document.querySelectorAll(".lighting-card")
    );

    const searchInput = document.getElementById("lightingSearch");
    const noResults = document.getElementById("lightingNoResults");

    let activeFilter = "all";
    let searchTerm = "";

    function updateLightingCards() {
        let visibleCount = 0;

        cards.forEach(function (card) {
            const category = card.dataset.category || "";

            const searchableText = (
                (card.dataset.search || "") + " " +
                (card.textContent || "")
            ).toLowerCase();

            const matchesCategory =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                searchTerm === "" ||
                searchableText.includes(searchTerm);

            const shouldShow = matchesCategory && matchesSearch;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter || "all";

            filterButtons.forEach(function (item) {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            updateLightingCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            searchTerm = searchInput.value.trim().toLowerCase();
            updateLightingCards();
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                searchInput.value = "";
                searchTerm = "";
                updateLightingCards();
            }
        });
    }

    if (cards.length) {
        updateLightingCards();
    }

    /* -----------------------------------------
       THREE-SLIDE HERO CAROUSEL
       ----------------------------------------- */

    const hero = document.getElementById("lightingHero");

    if (!hero) {
        return;
    }

    const slides = Array.from(
        hero.querySelectorAll(".lighting-hero-slide")
    );

    const dots = Array.from(
        hero.querySelectorAll(".lighting-slide-dot")
    );

    const prevButton = document.getElementById("lightingPrev");
    const nextButton = document.getElementById("lightingNext");

    if (!slides.length) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let currentSlide = Math.max(
        0,
        slides.findIndex(function (slide) {
            return slide.classList.contains("is-active");
        })
    );

    let rotationTimer = null;

    const rotationDelay = 6000;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach(function (slide, slideIndex) {
            const isActive = slideIndex === currentSlide;

            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach(function (dot, dotIndex) {
            const isActive = dotIndex === currentSlide;

            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-pressed", String(isActive));
        });
    }

    function stopRotation() {
        if (rotationTimer !== null) {
            window.clearInterval(rotationTimer);
            rotationTimer = null;
        }
    }

    function startRotation() {
        stopRotation();

        if (reducedMotion.matches || slides.length < 2) {
            return;
        }

        rotationTimer = window.setInterval(function () {
            showSlide(currentSlide + 1);
        }, rotationDelay);
    }

    function goToSlide(index) {
        showSlide(index);
        startRotation();
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            goToSlide(currentSlide - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            goToSlide(currentSlide + 1);
        });
    }

    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            const targetIndex = Number(dot.dataset.goTo);

            if (Number.isInteger(targetIndex)) {
                goToSlide(targetIndex);
            }
        });
    });

    /* Pause automatic rotation while hovered. */

    hero.addEventListener("mouseenter", stopRotation);
    hero.addEventListener("mouseleave", startRotation);

    /* Pause automatic rotation while using keyboard controls. */

    hero.addEventListener("focusin", stopRotation);

    hero.addEventListener("focusout", function (event) {
        if (!hero.contains(event.relatedTarget)) {
            startRotation();
        }
    });

    /* Respect reduced-motion preferences. */

    if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", startRotation);
    }

    showSlide(currentSlide);
    startRotation();

    /* -----------------------------------------
       AUTOMATIC FOOTER YEAR
       ----------------------------------------- */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});