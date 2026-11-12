/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   PANEL LIGHTS PRODUCT CATALOGUE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const WHATSAPP_NUMBER = "919277199649";

    const EMAIL_ENDPOINT =
        "https://formsubmit.co/ajax/service@arthkiran.com";


    /* =====================================================
       HTML ELEMENTS
    ===================================================== */

    const productGrid =
        document.getElementById("panelProductGrid");

    const filterContainer =
        document.getElementById("panelFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Panel Lights catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       All wattages are transcribed from the reference image.
    ===================================================== */

    const products = [


        /* ================================================
           PANEL LIGHTS
        ================================================ */

        {
            id: "panel-light-3w",
            category: "Panel Lights",
            filter: "panel-light",
            name: "Panel Light 3W",
            model: "Product 1",
            wattage: "3W",
            image: ""
        },

        {
            id: "panel-light-6w",
            category: "Panel Lights",
            filter: "panel-light",
            name: "Panel Light 6W",
            model: "Product 2",
            wattage: "6W",
            image: ""
        },

        {
            id: "panel-light-12w",
            category: "Panel Lights",
            filter: "panel-light",
            name: "Panel Light 12W",
            model: "Product 3",
            wattage: "12W",
            image: ""
        },

        {
            id: "panel-light-18w",
            category: "Panel Lights",
            filter: "panel-light",
            name: "Panel Light 18W",
            model: "Product 4",
            wattage: "18W",
            image: ""
        },

        {
            id: "panel-light-40w",
            category: "Panel Lights",
            filter: "panel-light",
            name: "Panel Light 40W",
            model: "Product 5",
            wattage: "40W",
            image: ""
        },


        /* ================================================
           SURFACE PANEL LIGHTS
        ================================================ */

        {
            id: "surface-panel-6w",
            category: "Surface Panel Lights",
            filter: "surface-panel",
            name: "Surface Panel Light 6W",
            model: "Product 1",
            wattage: "6W",
            image: ""
        },

        {
            id: "surface-panel-12w",
            category: "Surface Panel Lights",
            filter: "surface-panel",
            name: "Surface Panel Light 12W",
            model: "Product 2",
            wattage: "12W",
            image: ""
        },

        {
            id: "surface-panel-18w",
            category: "Surface Panel Lights",
            filter: "surface-panel",
            name: "Surface Panel Light 18W",
            model: "Product 3",
            wattage: "18W",
            image: ""
        },

        {
            id: "surface-panel-40w",
            category: "Surface Panel Lights",
            filter: "surface-panel",
            name: "Surface Panel Light 40W",
            model: "Product 4",
            wattage: "40W",
            image: ""
        },


        /* ================================================
           COB LIGHTS
        ================================================ */

        {
            id: "cob-light-7w",
            category: "COB Lights",
            filter: "cob-light",
            name: "COB Light 7W",
            model: "Product 1",
            wattage: "7W",
            image: ""
        },

        {
            id: "cob-light-12w",
            category: "COB Lights",
            filter: "cob-light",
            name: "COB Light 12W",
            model: "Product 2",
            wattage: "12W",
            image: ""
        },

        {
            id: "cob-light-18w",
            category: "COB Lights",
            filter: "cob-light",
            name: "COB Light 18W",
            model: "Product 3",
            wattage: "18W",
            image: ""
        },

        {
            id: "cob-light-30w",
            category: "COB Lights",
            filter: "cob-light",
            name: "COB Light 30W",
            model: "Product 4",
            wattage: "30W",
            image: ""
        },


        /* ================================================
           DOWN LIGHTS
        ================================================ */

        {
            id: "down-light-3w",
            category: "Down Lights",
            filter: "down-light",
            name: "Down Light 3W",
            model: "Product 1",
            wattage: "3W",
            image: ""
        },

        {
            id: "down-light-6w",
            category: "Down Lights",
            filter: "down-light",
            name: "Down Light 6W",
            model: "Product 2",
            wattage: "6W",
            image: ""
        },

        {
            id: "down-light-9w",
            category: "Down Lights",
            filter: "down-light",
            name: "Down Light 9W",
            model: "Product 3",
            wattage: "9W",
            image: ""
        },

        {
            id: "down-light-12w",
            category: "Down Lights",
            filter: "down-light",
            name: "Down Light 12W",
            model: "Product 4",
            wattage: "12W",
            image: ""
        }

    ];



    /* =====================================================
       CREATE PRODUCT IMAGE AREA
    ===================================================== */

    function createImageContent(product) {

        if (product.image) {

            return `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            `;

        }


        return `

            <div class="panel-image-placeholder">

                <span class="panel-placeholder-icon">💡</span>

                <span>PRODUCT IMAGE</span>

            </div>

        `;

    }



    /* =====================================================
       CREATE PRODUCT SPECIFICATIONS
    ===================================================== */

    function createSpecifications(product) {

        const specifications = [

            {
                label: "Wattage",
                value: product.wattage
            }

        ];


        return specifications.map(function (specification) {

            return `

                <li>

                    <span>
                        ${specification.label}
                    </span>

                    <strong>
                        ${specification.value}
                    </strong>

                </li>

            `;

        }).join("");

    }



    /* =====================================================
       CREATE PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const card =
            document.createElement("article");


        card.className =
            "panel-product-card";

        card.dataset.category =
            product.filter;



        card.innerHTML = `

            <div class="panel-product-image">

                ${createImageContent(product)}

            </div>


            <div class="panel-product-details">


                <span class="panel-product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="panel-specifications">

                    ${createSpecifications(product)}

                </ul>


                <button
                    type="button"
                    class="panel-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".panel-enquiry-btn");


        enquiryButton.addEventListener("click", function () {

            sendProductEnquiry(product);

        });


        return card;

    }



    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts(filter = "all") {

        productGrid.innerHTML = "";


        const visibleProducts =
            products.filter(function (product) {

                return (
                    filter === "all" ||
                    product.filter === filter
                );

            });



        visibleProducts.forEach(function (product) {

            const card =
                createProductCard(product);

            productGrid.appendChild(card);

        });



        /* Update Product Count */

        if (productCount) {

            productCount.textContent =
                visibleProducts.length +
                (visibleProducts.length === 1
                    ? " Product"
                    : " Products");

        }

    }



    /* =====================================================
       CATEGORY FILTER FUNCTIONALITY
    ===================================================== */

    filterContainer.addEventListener("click", function (event) {

        const button =
            event.target.closest(".panel-filter-btn");


        if (!button) {
            return;
        }



        /* Remove Previous Active State */

        filterContainer
            .querySelectorAll(".panel-filter-btn")
            .forEach(function (item) {

                item.classList.remove("active");

            });



        /* Activate Selected Filter */

        button.classList.add("active");



        /* Render Selected Products */

        renderProducts(button.dataset.filter);

    });



    /* =====================================================
       CREATE PRODUCT ENQUIRY MESSAGE
    ===================================================== */

    function createEnquiryMessage(product) {

        return `Hello Arthkiran Electrical Products,

I am interested in your panel lighting product.

Product Category: ${product.category}

Product: ${product.name}

Product Reference: ${product.model}

Wattage: ${product.wattage}

Kindly share the price, availability and further product details.

Thank you.`;

    }



    /* =====================================================
       OPEN WHATSAPP
    ===================================================== */

    function openWhatsApp(message) {

        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }



    /* =====================================================
       AUTOMATIC EMAIL NOTIFICATION

       NOTE:
       Browser-side FormSubmit integration requires
       one-time activation of service@arthkiran.com.
       A server-side endpoint is recommended for production.
    ===================================================== */

    async function sendEmailEnquiry(product, message) {

        const emailData = {

            subject:
                "Website Panel Light Enquiry - " +
                product.name,

            message: message,

            _captcha: "false",

            _template: "table"

        };


        try {

            const response = await fetch(
                EMAIL_ENDPOINT,
                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        "Accept": "application/json"

                    },

                    body: JSON.stringify(emailData)

                }
            );


            if (!response.ok) {

                throw new Error(
                    "Email submission failed."
                );

            }


            const result = await response.json();


            if (
                result.success === false ||
                result.success === "false"
            ) {

                throw new Error(
                    "Email service rejected the enquiry."
                );

            }


            console.log(
                "Panel light enquiry email submitted successfully."
            );


        } catch (error) {

            console.error(
                "Email notification error:",
                error
            );

        }

    }



    /* =====================================================
       PRODUCT ENQUIRY ACTION
    ===================================================== */

    function sendProductEnquiry(product) {

        const message =
            createEnquiryMessage(product);


        /*
           Open WhatsApp after the customer's click.
        */

        openWhatsApp(message);


        /*
           Send the same enquiry information to
           service@arthkiran.com automatically.
        */

        sendEmailEnquiry(
            product,
            message
        );

    }



    /* =====================================================
       INITIALIZE PRODUCT GRID
    ===================================================== */

    renderProducts("all");



    /* =====================================================
       FOOTER COPYRIGHT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});