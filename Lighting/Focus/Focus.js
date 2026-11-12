/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   TRACK & FOCUS LIGHTS PRODUCT CATALOGUE
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
        document.getElementById("focusProductGrid");

    const filterContainer =
        document.getElementById("focusFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Focus Lights catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       Specifications transcribed from supplied image.
    ===================================================== */

    const products = [


        /* ================================================
           TRACK LIGHTS
        ================================================ */

        {
            id: "track-light-10w",
            category: "Track Lights",
            filter: "track-light",
            name: "Track Light 10W",
            model: "Product 1",
            wattage: "10W",
            image: ""
        },


        {
            id: "track-light-20w",
            category: "Track Lights",
            filter: "track-light",
            name: "Track Light 20W",
            model: "Product 2",
            wattage: "20W",
            image: ""
        },


        {
            id: "track-light-30w",
            category: "Track Lights",
            filter: "track-light",
            name: "Track Light 30W",
            model: "Product 3",
            wattage: "30W",
            image: ""
        },


        /* ================================================
           FOCUS LIGHTS
        ================================================ */

        {
            id: "focus-light-7w",
            category: "Focus Lights",
            filter: "focus-light",
            name: "Focus Light 7W",
            model: "Product 1",
            wattage: "7W",
            image: ""
        },


        {
            id: "focus-light-10w",
            category: "Focus Lights",
            filter: "focus-light",
            name: "Focus Light 10W",
            model: "Product 2",
            wattage: "10W",
            image: ""
        },


        {
            id: "focus-light-20w",
            category: "Focus Lights",
            filter: "focus-light",
            name: "Focus Light 20W",
            model: "Product 3",
            wattage: "20W",
            image: ""
        }

    ];



    /* =====================================================
       GENERAL INDIAN ELECTRICAL SUPPLY REFERENCE

       Confirm actual voltage and frequency ratings
       from the individual product labels.
    ===================================================== */

    const STANDARD_VOLTAGE = "220–240V AC";

    const STANDARD_FREQUENCY = "50Hz";



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

            <div class="focus-image-placeholder">

                <span class="focus-placeholder-icon">💡</span>

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
            },

            {
                label: "Voltage",
                value: STANDARD_VOLTAGE
            },

            {
                label: "Frequency",
                value: STANDARD_FREQUENCY
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
            "focus-product-card";

        card.dataset.category =
            product.filter;



        card.innerHTML = `

            <div class="focus-product-image">

                ${createImageContent(product)}

            </div>


            <div class="focus-product-details">


                <span class="focus-product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="focus-specifications">

                    ${createSpecifications(product)}

                </ul>


                <button
                    type="button"
                    class="focus-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".focus-enquiry-btn");


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
            event.target.closest(".focus-filter-btn");


        if (!button) {
            return;
        }



        /* Remove Previous Active State */

        filterContainer
            .querySelectorAll(".focus-filter-btn")
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

I am interested in your lighting product.

Product Category: ${product.category}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

Wattage: ${product.wattage}

Voltage Reference: ${STANDARD_VOLTAGE}

Frequency Reference: ${STANDARD_FREQUENCY}

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
                "Website Focus Light Enquiry - " +
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
                "Focus light enquiry email submitted successfully."
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