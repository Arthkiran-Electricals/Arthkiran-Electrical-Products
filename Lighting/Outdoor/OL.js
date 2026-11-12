/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   OUTDOOR LIGHTS PRODUCT CATALOGUE
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
        document.getElementById("outdoorProductGrid");

    const filterContainer =
        document.getElementById("outdoorFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Outdoor Lights catalogue elements not found.");

        return;

    }


    /* =====================================================
       GENERAL INDIAN ELECTRICAL SUPPLY REFERENCE

       Confirm actual voltage and frequency ratings
       from individual product labels.
    ===================================================== */

    const STANDARD_VOLTAGE = "220–240V AC";

    const STANDARD_FREQUENCY = "50Hz";


    /* =====================================================
       PRODUCT DATABASE

       Source-derived:
       - High Bay Lights: 100W, 150W
       - PAR configurations: 6D, 12D, 18D, 36D, 54D, 60D
       - Stadium Light: 400W

       Street and Flood Lights:
       Simplified wattage selections for the catalogue,
       as requested, instead of reproducing every source type.
    ===================================================== */

    const products = [


        /* ================================================
           HIGH BAY LIGHTS
        ================================================ */

        {
            id: "high-bay-100w",
            category: "High Bay Lights",
            filter: "high-bay",
            name: "High Bay Light 100W",
            model: "Product 1",
            wattage: "100W",
            image: ""
        },

        {
            id: "high-bay-150w",
            category: "High Bay Lights",
            filter: "high-bay",
            name: "High Bay Light 150W",
            model: "Product 2",
            wattage: "150W",
            image: ""
        },


        /* ================================================
           PAR LIGHTS
        ================================================ */

        {
            id: "par-6d",
            category: "PAR Lights",
            filter: "par",
            name: "PAR Light 6D",
            model: "Product 1",
            configuration: "6D",
            image: ""
        },

        {
            id: "par-12d",
            category: "PAR Lights",
            filter: "par",
            name: "PAR Light 12D",
            model: "Product 2",
            configuration: "12D",
            image: ""
        },

        {
            id: "par-18d",
            category: "PAR Lights",
            filter: "par",
            name: "PAR Light 18D",
            model: "Product 3",
            configuration: "18D",
            image: ""
        },

        {
            id: "par-36d",
            category: "PAR Lights",
            filter: "par",
            name: "PAR Light 36D",
            model: "Product 4",
            configuration: "36D",
            image: ""
        },

        {
            id: "par-54d",
            category: "PAR Lights",
            filter: "par",
            name: "PAR Light 54D",
            model: "Product 5",
            configuration: "54D",
            image: ""
        },

        {
            id: "par-60d",
            category: "PAR Lights",
            filter: "par",
            name: "PAR Light 60D",
            model: "Product 6",
            configuration: "60D",
            image: ""
        },


        /* ================================================
           STADIUM LIGHTS
        ================================================ */

        {
            id: "stadium-400w",
            category: "Stadium Lights",
            filter: "stadium",
            name: "Stadium Light 400W",
            model: "Product 1",
            wattage: "400W",
            image: ""
        },


        /* ================================================
           LED STREET LIGHTS
           Simplified selection as requested.
        ================================================ */

        {
            id: "street-30w",
            category: "LED Street Lights",
            filter: "street",
            name: "LED Street Light 30W",
            model: "Street Light 30W",
            wattage: "30W",
            image: ""
        },

        {
            id: "street-50w",
            category: "LED Street Lights",
            filter: "street",
            name: "LED Street Light 50W",
            model: "Street Light 50W",
            wattage: "50W",
            image: ""
        },

        {
            id: "street-100w",
            category: "LED Street Lights",
            filter: "street",
            name: "LED Street Light 100W",
            model: "Street Light 100W",
            wattage: "100W",
            image: ""
        },

        {
            id: "street-150w",
            category: "LED Street Lights",
            filter: "street",
            name: "LED Street Light 150W",
            model: "Street Light 150W",
            wattage: "150W",
            image: ""
        },

        {
            id: "street-200w",
            category: "LED Street Lights",
            filter: "street",
            name: "LED Street Light 200W",
            model: "Street Light 200W",
            wattage: "200W",
            image: ""
        },


        /* ================================================
           LED FLOOD LIGHTS
           Simplified selection as requested.
        ================================================ */

        {
            id: "flood-10w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 10W",
            model: "Flood Light 10W",
            wattage: "10W",
            image: ""
        },

        {
            id: "flood-20w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 20W",
            model: "Flood Light 20W",
            wattage: "20W",
            image: ""
        },

        {
            id: "flood-30w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 30W",
            model: "Flood Light 30W",
            wattage: "30W",
            image: ""
        },

        {
            id: "flood-50w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 50W",
            model: "Flood Light 50W",
            wattage: "50W",
            image: ""
        },

        {
            id: "flood-100w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 100W",
            model: "Flood Light 100W",
            wattage: "100W",
            image: ""
        },

        {
            id: "flood-150w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 150W",
            model: "Flood Light 150W",
            wattage: "150W",
            image: ""
        },

        {
            id: "flood-200w",
            category: "LED Flood Lights",
            filter: "flood",
            name: "LED Flood Light 200W",
            model: "Flood Light 200W",
            wattage: "200W",
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

            <div class="outdoor-image-placeholder">

                <span class="outdoor-placeholder-icon">💡</span>

                <span>PRODUCT IMAGE</span>

            </div>

        `;

    }



    /* =====================================================
       CREATE PRODUCT SPECIFICATIONS
    ===================================================== */

    function createSpecifications(product) {

        const specifications = [];


        if (product.wattage) {

            specifications.push({

                label: "Wattage",
                value: product.wattage

            });

        }


        if (product.configuration) {

            specifications.push({

                label: "Configuration",
                value: product.configuration

            });

        }


        specifications.push({

            label: "Voltage",
            value: STANDARD_VOLTAGE

        });


        specifications.push({

            label: "Frequency",
            value: STANDARD_FREQUENCY

        });



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
            "outdoor-product-card";

        card.dataset.category =
            product.filter;



        card.innerHTML = `

            <div class="outdoor-product-image">

                ${createImageContent(product)}

            </div>


            <div class="outdoor-product-details">


                <span class="outdoor-product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="outdoor-specifications">

                    ${createSpecifications(product)}

                </ul>


                <p class="outdoor-product-note">

                    Voltage and frequency shown are standard
                    Indian supply references. Confirm the
                    actual product rating on its label.

                </p>


                <button
                    type="button"
                    class="outdoor-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".outdoor-enquiry-btn");


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
            event.target.closest(".outdoor-filter-btn");


        if (!button) {
            return;
        }



        /* Remove Previous Active State */

        filterContainer
            .querySelectorAll(".outdoor-filter-btn")
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

        const specifications = [];


        if (product.wattage) {

            specifications.push(
                `Wattage: ${product.wattage}`
            );

        }


        if (product.configuration) {

            specifications.push(
                `Configuration: ${product.configuration}`
            );

        }


        specifications.push(
            `Voltage reference: ${STANDARD_VOLTAGE}`
        );

        specifications.push(
            `Frequency reference: ${STANDARD_FREQUENCY}`
        );


        return `Hello Arthkiran Electrical Products,

I am interested in your outdoor lighting product.

Product Category: ${product.category}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

${specifications.join("\n")}

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
                "Website Outdoor Light Enquiry - " +
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
                "Outdoor light enquiry email submitted successfully."
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