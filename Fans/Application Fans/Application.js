/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   APPLICATION FANS PRODUCT CATALOGUE
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
        document.getElementById("applicationProductGrid");

    const filterContainer =
        document.getElementById("applicationFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Application Fans catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       Specifications transcribed from supplied image.
    ===================================================== */

    const products = [


        /* ================================================
           ROOF MOUNTING FAN
        ================================================ */

        {
            id: "roof-mounting",

            name: "Roof Mounting Fan",

            model: "Product 1",

            category: "Roof Mounting",

            filter: "roof-mounting",

            sweep: "200mm",

            consumption: "35W",

            delivery: "100m³/hr",

            image: ""

        },


        /* ================================================
           CABIN FAN
        ================================================ */

        {
            id: "cabin-fan",

            name: "Cabin Fan",

            model: "Product 2",

            category: "Cabin Fans",

            filter: "cabin-fans",

            sweep: "300mm",

            consumption: "70W",

            delivery: "58m³/3min",

            image: ""

        },


        /* ================================================
           PERSONAL FAN
        ================================================ */

        {
            id: "personal-fan",

            name: "Personal Fan",

            model: "Product 3",

            category: "Personal Fans",

            filter: "personal-fans",

            sweep: "200mm",

            consumption: "45W",

            delivery: "25m³/3min",

            image: ""

        }

    ];



    /* =====================================================
       CREATE PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const card =
            document.createElement("article");


        card.className =
            "application-product-card";

        card.dataset.category =
            product.filter;



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

                <div class="application-image-placeholder">
                    PRODUCT IMAGE
                </div>

            `;

        }



        /* Product Specifications */

        const specifications = [

            {
                label: "Sweep",
                value: product.sweep
            },

            {
                label: "Power Consumption",
                value: product.consumption
            },

            {
                label: "Air Delivery",
                value: product.delivery
            }

        ];


        const specificationsHTML =
            specifications.map(function (specification) {

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



        /* Product Card HTML */

        card.innerHTML = `

            <div class="application-product-image">

                ${imageContent}

            </div>


            <div class="application-product-details">


                <span class="application-product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="application-specifications">

                    ${specificationsHTML}

                </ul>


                <button
                    type="button"
                    class="application-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".application-enquiry-btn");


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
       CATEGORY FILTER FUNCTIONALITY
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

        return `Hello Arthkiran Electrical Products,

I am interested in your Application Fan product.

Product Category: ${product.category}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

Sweep: ${product.sweep}

Power Consumption: ${product.consumption}

Air Delivery: ${product.delivery}

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
                "Website Application Fan Enquiry - " +
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
                "Application fan enquiry email submitted successfully."
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