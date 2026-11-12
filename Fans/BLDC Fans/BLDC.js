/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   BLDC FANS PRODUCT CATALOGUE
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
        document.getElementById("bldcProductGrid");

    const filterContainer =
        document.getElementById("bldcFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("BLDC catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       Source: Supplied BLDC fan specification image.
    ===================================================== */

    const products = [

        /* ================================================
           WHITE BLDC FAN
        ================================================ */

        {
            id: "bldc-white",

            name: "BLDC Fan - White",

            model: "Product 1",

            colour: "White",

            filter: "white",

            sweep: "1200mm",

            consumption: "28W",

            delivery: "220 CMM",

            image: "",

            isBlank: false

        },


        /* ================================================
           BROWN BLDC FAN
        ================================================ */

        {
            id: "bldc-brown",

            name: "BLDC Fan - Brown",

            model: "Product 1",

            colour: "Brown",

            filter: "brown",

            sweep: "1200mm",

            consumption: "28W",

            delivery: "220 CMM",

            image: "",

            isBlank: false

        },


        /* ================================================
           IVORY BLDC FAN
        ================================================ */

        {
            id: "bldc-ivory",

            name: "BLDC Fan - Ivory",

            model: "Product 1",

            colour: "Ivory",

            filter: "ivory",

            sweep: "1200mm",

            consumption: "28W",

            delivery: "220 CMM",

            image: "",

            isBlank: false

        },


        /* ================================================
           ADDITIONAL PRODUCT 2
           Fill specifications and image later.
        ================================================ */

        {
            id: "bldc-product-2",

            name: "BLDC Fan - Product 2",

            model: "Product 2",

            colour: "",

            filter: "additional",

            sweep: "",

            consumption: "",

            delivery: "",

            image: "",

            isBlank: true

        },


        /* ================================================
           ADDITIONAL PRODUCT 3
           Fill specifications and image later.
        ================================================ */

        {
            id: "bldc-product-3",

            name: "BLDC Fan - Product 3",

            model: "Product 3",

            colour: "",

            filter: "additional",

            sweep: "",

            consumption: "",

            delivery: "",

            image: "",

            isBlank: true

        },


        /* ================================================
           ADDITIONAL PRODUCT 4
           Fill specifications and image later.
        ================================================ */

        {
            id: "bldc-product-4",

            name: "BLDC Fan - Product 4",

            model: "Product 4",

            colour: "",

            filter: "additional",

            sweep: "",

            consumption: "",

            delivery: "",

            image: "",

            isBlank: true

        }

    ];



    /* =====================================================
       CREATE COLOUR INDICATOR
    ===================================================== */

    function createColourIndicator(colour) {

        const colourClass =
            colour.toLowerCase();


        return `

            <span class="bldc-colour-indicator">

                <span class="bldc-colour-dot ${colourClass}"></span>

                ${colour}

            </span>

        `;

    }



    /* =====================================================
       CREATE PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const card =
            document.createElement("article");


        card.className =
            "bldc-product-card" +
            (product.isBlank ? " blank-product" : "");


        card.dataset.filter = product.filter;



        /* Product Image */

        let imageContent;


        if (product.image) {

            imageContent = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            `;

        } else {

            imageContent = `

                <div class="bldc-image-placeholder">

                    <span>✦</span>

                    ${product.isBlank
                        ? "PRODUCT IMAGE"
                        : "PRODUCT IMAGE"}

                </div>

            `;

        }



        /* Product Specifications */

        let specificationsHTML;


        if (product.isBlank) {

            specificationsHTML = `

                <li>
                    <span>Sweep</span>
                    <strong class="bldc-blank-specification">Add details</strong>
                </li>

                <li>
                    <span>Consumption</span>
                    <strong class="bldc-blank-specification">Add details</strong>
                </li>

                <li>
                    <span>Colour</span>
                    <strong class="bldc-blank-specification">Add details</strong>
                </li>

                <li>
                    <span>Delivery</span>
                    <strong class="bldc-blank-specification">Add details</strong>
                </li>

            `;

        } else {

            specificationsHTML = `

                <li>
                    <span>Sweep</span>
                    <strong>${product.sweep}</strong>
                </li>

                <li>
                    <span>Consumption</span>
                    <strong>${product.consumption}</strong>
                </li>

                <li>
                    <span>Colour</span>
                    <strong>${createColourIndicator(product.colour)}</strong>
                </li>

                <li>
                    <span>Delivery</span>
                    <strong>${product.delivery}</strong>
                </li>

            `;

        }



        /* Product Card HTML */

        card.innerHTML = `

            <div class="bldc-product-image">

                ${imageContent}

            </div>


            <div class="bldc-product-details">


                <span class="bldc-product-category">

                    ${product.isBlank
                        ? "Additional Product"
                        : "BLDC Fan Collection"}

                </span>


                <h3>

                    ${product.name}

                </h3>


                ${product.isBlank
                    ? '<span class="bldc-blank-label">Details to be added</span>'
                    : ""}


                <ul class="bldc-specifications">

                    ${specificationsHTML}

                </ul>


                <button
                    type="button"
                    class="bldc-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* Enquiry Button */

        const enquiryButton =
            card.querySelector(".bldc-enquiry-btn");


        enquiryButton.addEventListener("click", function () {

            sendProductEnquiry(product);

        });


        return card;

    }



    /* =====================================================
       RENDER PRODUCTS IN ONE GRID
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
       FILTER FUNCTIONALITY
    ===================================================== */

    filterContainer.addEventListener("click", function (event) {

        const button =
            event.target.closest(".filter-btn");


        if (!button) {
            return;
        }



        /* Remove Previous Active State */

        filterContainer
            .querySelectorAll(".filter-btn")
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

        if (product.isBlank) {

            return `Hello Arthkiran Electrical Products,

I am interested in your BLDC Fan range.

Product Reference: ${product.model}

Please share the available specifications, colours, price and product details.

Thank you.`;

        }


        return `Hello Arthkiran Electrical Products,

I am interested in your BLDC Fan.

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

Sweep: ${product.sweep}

Consumption: ${product.consumption}

Colour: ${product.colour}

Delivery: ${product.delivery}

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
    ===================================================== */

    async function sendEmailEnquiry(product, message) {

        const emailData = {

            subject:
                "Website BLDC Fan Enquiry - " +
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
                "BLDC fan enquiry email submitted successfully."
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
           Open WhatsApp after customer click.
        */

        openWhatsApp(message);


        /*
           Send the same enquiry to service@arthkiran.com.
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