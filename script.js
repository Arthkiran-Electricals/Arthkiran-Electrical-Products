(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const header = document.getElementById("siteHeader");
        const hamburger = document.getElementById("hamburger");
        const mobileNav = document.getElementById("mobileNav");

        const mobileDropdowns = Array.from(
            document.querySelectorAll(".mobile-dropdown")
        );

        const desktopDropdowns = Array.from(
            document.querySelectorAll(".dropdown")
        );

        /* =========================================================
           MOBILE NAVIGATION
        ========================================================= */

        function closeAllMobileDropdowns() {
            mobileDropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("open");

                const button = dropdown.querySelector(".mobile-label");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }
            });
        }

        function openMobileNav() {
            if (!mobileNav || !hamburger) {
                return;
            }

            mobileNav.classList.add("open");
            mobileNav.setAttribute("aria-hidden", "false");

            hamburger.classList.add("open");
            hamburger.setAttribute("aria-expanded", "true");
            hamburger.setAttribute("aria-label", "Close menu");

            document.body.classList.add("mobile-menu-active");
        }

        function closeMobileNav() {
            if (!mobileNav || !hamburger) {
                return;
            }

            mobileNav.classList.remove("open");
            mobileNav.setAttribute("aria-hidden", "true");

            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.setAttribute("aria-label", "Open menu");

            document.body.classList.remove("mobile-menu-active");

            closeAllMobileDropdowns();
        }

        if (hamburger && mobileNav) {
            hamburger.addEventListener("click", function () {
                if (mobileNav.classList.contains("open")) {
                    closeMobileNav();
                } else {
                    openMobileNav();
                }
            });
        }

        /* =========================================================
           MOBILE DROPDOWNS
        ========================================================= */

        mobileDropdowns.forEach(function (dropdown) {
            const button = dropdown.querySelector(".mobile-label");

            if (!button) {
                return;
            }

            button.addEventListener("click", function () {
                const willOpen = !dropdown.classList.contains("open");

                closeAllMobileDropdowns();

                if (willOpen) {
                    dropdown.classList.add("open");
                    button.setAttribute("aria-expanded", "true");
                }
            });
        });

        /* =========================================================
           DESKTOP DROPDOWNS
        ========================================================= */

        desktopDropdowns.forEach(function (dropdown) {
            const button = dropdown.querySelector(".nav-label");

            if (!button) {
                return;
            }

            button.addEventListener("click", function (event) {
                event.stopPropagation();

                const willOpen = !dropdown.classList.contains("open");

                desktopDropdowns.forEach(function (otherDropdown) {
                    otherDropdown.classList.remove("open");

                    const otherButton =
                        otherDropdown.querySelector(".nav-label");

                    if (otherButton) {
                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                });

                if (willOpen) {
                    dropdown.classList.add("open");

                    button.setAttribute("aria-expanded", "true");
                }
            });
        });

        /* =========================================================
           CLOSE MENUS WHEN CLICKING OUTSIDE
        ========================================================= */

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".dropdown")) {
                desktopDropdowns.forEach(function (dropdown) {
                    dropdown.classList.remove("open");

                    const button = dropdown.querySelector(".nav-label");

                    if (button) {
                        button.setAttribute("aria-expanded", "false");
                    }
                });
            }

            if (
                mobileNav &&
                hamburger &&
                mobileNav.classList.contains("open") &&
                !event.target.closest(".mobile-nav") &&
                !event.target.closest("#hamburger")
            ) {
                closeMobileNav();
            }
        });

        /* =========================================================
           KEYBOARD ACCESSIBILITY
        ========================================================= */

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMobileNav();

                desktopDropdowns.forEach(function (dropdown) {
                    dropdown.classList.remove("open");

                    const button = dropdown.querySelector(".nav-label");

                    if (button) {
                        button.setAttribute("aria-expanded", "false");
                    }
                });
            }
        });

        /* =========================================================
           CLOSE MOBILE MENU AFTER NAVIGATION
        ========================================================= */

        if (mobileNav) {
            mobileNav.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    closeMobileNav();
                });
            });
        }

        /* =========================================================
           RESPONSIVE MENU BEHAVIOUR
        ========================================================= */

        let resizeTimer;

        window.addEventListener("resize", function () {
            window.clearTimeout(resizeTimer);

            resizeTimer = window.setTimeout(function () {
                if (window.innerWidth > 900) {
                    closeMobileNav();
                }
            }, 120);
        });

        /* =========================================================
           HEADER VISIBILITY ON SCROLL
        ========================================================= */

        let lastScrollY = window.scrollY;

        window.addEventListener(
            "scroll",
            function () {
                if (
                    !header ||
                    (mobileNav &&
                        mobileNav.classList.contains("open"))
                ) {
                    return;
                }

                const currentScrollY = window.scrollY;

                if (currentScrollY < 80) {
                    header.classList.remove("header-hidden");
                } else if (currentScrollY > lastScrollY) {
                    header.classList.add("header-hidden");
                } else {
                    header.classList.remove("header-hidden");
                }

                lastScrollY = currentScrollY;
            },
            { passive: true }
        );

        /* =========================================================
           SCROLL REVEAL ANIMATIONS
        ========================================================= */

        const revealElements = document.querySelectorAll(
            ".highlight-box, " +
            ".product-card, " +
            ".visual-showcase-content, " +
            ".brand-story-content, " +
            ".about-text, " +
            ".about-photo, " +
            ".media-frame, " +
            ".cta-content"
        );

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");

                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }
            );

            revealElements.forEach(function (element) {
                element.classList.add("reveal-on-scroll");

                revealObserver.observe(element);
            });
        } else {
            revealElements.forEach(function (element) {
                element.classList.add("is-visible");
            });
        }

        /* =========================================================
           SMOOTH SCROLL FOR INTERNAL LINKS
        ========================================================= */

        document.querySelectorAll('a[href^="#"]').forEach(
            function (link) {
                link.addEventListener("click", function (event) {
                    const targetId = link.getAttribute("href");

                    if (!targetId || targetId === "#") {
                        return;
                    }

                    const target = document.querySelector(targetId);

                    if (target) {
                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                });
            }
        );

        /* =========================================================
           AUTOMATIC FOOTER YEAR
        ========================================================= */

        const currentYear = document.getElementById("currentYear");

        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    });
})();