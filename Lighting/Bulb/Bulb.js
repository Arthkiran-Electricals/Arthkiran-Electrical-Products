/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   BULBS & TUBE LIGHTS PRODUCT CATALOGUE
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
        document.getElementById("bulbProductGrid");

    const filterContainer =
        document.getElementById("bulbFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Bulb catalogue elements not found.");

        return;

    }


    /* =====================================================
       STANDARD INDIAN ELECTRICAL SUPPLY REFERENCE

       These are general mains-supply reference values.
       Confirm the actual rating on each product label.
    ===================================================== */

    const STANDARD_VOLTAGE = "220–240V AC";

    const STANDARD_FREQUENCY = "50Hz";


    /* =====================================================
       PRODUCT DATABASE
       All product details are transcribed from the
       supplied reference image.
    ===================================================== */

    const products = [


        /* ================================================
           LED BULBS
        ================================================ */

        {
            id: "led-bulb-3w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 3W",
            model: "Product 1",
            wattage: "3W",
            image: ""
        },

        {
            id: "led-bulb-5w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 5W",
            model: "Product 2",
            wattage: "5W",
            image: ""
        },

        {
            id: "led-bulb-7w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 7W",
            model: "Product 3",
            wattage: "7W",
            image: ""
        },

        {
            id: "led-bulb-9w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 9W",
            model: "Product 4",
            wattage: "9W",
            image: ""
        },

        {
            id: "led-bulb-12w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 12W",
            model: "Product 5",
            wattage: "12W",
            image: ""
        },

        {
            id: "led-bulb-15w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 15W",
            model: "Product 6",
            wattage: "15W",
            image: ""
        },

        {
            id: "led-bulb-20w",
            category: "LED Bulb",
            filter: "led-bulb",
            name: "LED Bulb 20W",
            model: "Product 7",
            wattage: "20W",
            image: ""
        },


        /* ================================================
           DOME BULBS
        ================================================ */

        {
            id: "dome-bulb-25w",
            category: "Dome Bulb",
            filter: "dome-bulb",
            name: "Dome Bulb 25W",
            model: "Product 1",
            wattage: "25W",
            image: ""
        },

        {
            id: "dome-bulb-30w",
            category: "Dome Bulb",
            filter: "dome-bulb",
            name: "Dome Bulb 30W",
            model: "Product 2",
            wattage: "30W",
            image: ""
        },

        {
            id: "dome-bulb-35w",
            category: "Dome Bulb",
            filter: "dome-bulb",
            name: "Dome Bulb 35W",
            model: "Product 3",
            wattage: "35W",
            image: ""
        },

        {
            id: "dome-bulb-40w",
            category: "Dome Bulb",
            filter: "dome-bulb",
            name: "Dome Bulb 40W",
            model: "Product 4",
            wattage: "40W",
            image: ""
        },

        {
            id: "dome-bulb-50w",
            category: "Dome Bulb",
            filter: "dome-bulb",
            name: "Dome Bulb 50W",
            model: "Product 5",
            wattage: "50W",
            image: ""
        },

        {
            id: "dome-bulb-60w",
            category: "Dome Bulb",
            filter: "dome-bulb",
            name: "Dome Bulb 60W",
            model: "Product 6",
            wattage: "60W",
            image: ""
        },


        /* ================================================
           NIGHT BULBS
        ================================================ */

        {
            id: "night-bulb-red",
            category: "Night Bulb",
            filter: "night-bulb",
            name: "Red Night Bulb",
            model: "Product 1",
            wattage: "0.5W",
            colour: "Red",
            colourClass: "bulb-colour-red",
            image: ""
        },

        {
            id: "night-bulb-blue",
            category: "Night Bulb",
            filter: "night-bulb",
            name: "Blue Night Bulb",
            model: "Product 2",
            wattage: "0.5W",
            colour: "Blue",
            colourClass: "bulb-colour-blue",
            image: ""
        },

        {
            id: "night-bulb-yellow",
            category: "Night Bulb",
            filter: "night-bulb",
            name: "Yellow Night Bulb",
            model: "Product 3",
            wattage: "0.5W",
            colour: "Yellow",
            colourClass: "bulb-colour-yellow",
            image: ""
        },


        /* ================================================
           FANCY BULBS
        ================================================ */

        {
            id: "fancy-temple-bulb",
            category: "Fancy Bulb",
            filter: "fancy-bulb",
            name: "Temple Bulb",
            model: "Product 1",
            type: "Temple Bulb",
            image: ""
        },

        {
            id: "fancy-lotus-bulb",
            category: "Fancy Bulb",
            filter: "fancy-bulb",
            name: "Lotus Bulb",
            model: "Product 2",
            type: "Lotus Bulb",
            image: ""
        },

        {
            id: "fancy-mini-fan-bulb",
            category: "Fancy Bulb",
            filter: "fancy-bulb",
            name: "Mini Fan Bulb",
            model: "Product 3",
            type: "Mini Fan Bulb",
            image: ""
        },

        {
            id: "fancy-t-bulb",
            category: "Fancy Bulb",
            filter: "fancy-bulb",
            name: "T-Bulb",
            model: "Product 4",
            type: "T-Bulb",
            image: ""
        },


        /* ================================================
           LED TUBE LIGHTS
        ================================================ */

        {
            id: "led-tube-10w",
            category: "LED Tube Light",
            filter: "tube-light",
            name: "LED Tube Light 10W",
            model: "Product 1",
            wattage: "10W",
            image: ""
        },

        {
            id: "led-tube-20w",
            category: "LED Tube Light",
            filter: "tube-light",
            name: "LED Tube Light 20W",
            model: "Product 2",
            wattage: "20W",
            image: ""
        },

        {
            id: "led-tube-24w",
            category: "LED Tube Light",
            filter: "tube-light",
            name: "LED Tube Light 24W",
            model: "Product 3",
            wattage: "24W",
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

            <div class="bulb-image-placeholder">

                <span class="bulb-placeholder-icon">💡</span>

                <span>PRODUCT IMAGE</span>

            </div>

        `;

    }



    /* =====================================================
       CREATE PRODUCT SPECIFICATIONS
    ===================================================== */

    function createSpecifications(product) {

        let specifications = [];


        if (product.wattage) {

            specifications.push({

                label: "Wattage",
                value: product.wattage

            });

        }


        if (product.colour) {

            specifications.push({

                label: "Colour",
                value: product.colour,
                colourClass: product.colourClass

            });

        }


        if (product.type) {

            specifications.push({

                label: "Type",
                value: product.type

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

            let valueHTML = specification.value;


            if (specification.colourClass) {

                valueHTML = `

                    <strong>

                        <span class="bulb-colour-indicator ${specification.colourClass}"></span>

                        ${specification.value}

                    </strong>

                `;

            } else {

                valueHTML = `<strong>${specification.value}</strong>`;

            }


            return `

                <li>

                    <span>${specification.label}</span>

                    ${valueHTML}

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
            "bulb-product-card";

        card.dataset.category =
            product.filter;



        card.innerHTML = `

            <div class="bulb-product-image">

                ${createImageContent(product)}

            </div>


            <div class="bulb-product-details">


                <span class="bulb-product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="bulb-specifications">

                    ${createSpecifications(product)}

                </ul>


                <p class="bulb-supply-note">

                    Voltage and frequency shown are standard
                    Indian supply references. Confirm the
                    actual product rating on its label.

                </p>


                <button
                    type="button"
                    class="bulb-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".bulb-enquiry-btn");


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
            event.target.closest(".bulb-filter-btn");


        if (!button) {
            return;
        }



        /* Remove Previous Active State */

        filterContainer
            .querySelectorAll(".bulb-filter-btn")
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

        let specifications = [];


        if (product.wattage) {
            specifications.push(
                `Wattage: ${product.wattage}`
            );
        }


        if (product.colour) {
            specifications.push(
                `Colour: ${product.colour}`
            );
        }


        if (product.type) {
            specifications.push(
                `Type: ${product.type}`
            );
        }


        specifications.push(
            `Voltage reference: ${STANDARD_VOLTAGE}`
        );

        specifications.push(
            `Frequency reference: ${STANDARD_FREQUENCY}`
        );


        return `Hello Arthkiran Electrical Products,

I am interested in your lighting product.

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
                "Website Bulb Enquiry - " +
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
                "Bulb enquiry email submitted successfully."
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
           Submit the same enquiry information to
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