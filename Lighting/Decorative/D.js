/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   DECORATIVE LIGHTS PRODUCT CATALOGUE
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
        document.getElementById("decorativeProductGrid");

    const filterContainer =
        document.getElementById("decorativeFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Decorative Lights catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       All product details are based on the supplied image.
    ===================================================== */

    const products = [


        /* ================================================
           K LIGHTS
        ================================================ */

        {
            id: "k-light-5w",
            category: "K Lights",
            filter: "k-light",
            name: "K Light 5W",
            model: "Product 1",
            wattage: "5W",
            type: "Half & Full",
            image: ""
        },

        {
            id: "k-light-10w",
            category: "K Lights",
            filter: "k-light",
            name: "K Light 10W",
            model: "Product 2",
            wattage: "10W",
            type: "Half & Full",
            image: ""
        },


        /* ================================================
           WALL LIGHTS
        ================================================ */

        {
            id: "wall-light-1-1",
            category: "Wall Lights",
            filter: "wall-light",
            name: "Wall Light 1+1",
            model: "Product 1",
            configuration: "1+1",
            image: ""
        },

        {
            id: "wall-light-2-2",
            category: "Wall Lights",
            filter: "wall-light",
            name: "Wall Light 2+2",
            model: "Product 2",
            configuration: "2+2",
            image: ""
        },

        {
            id: "wall-light-3-3",
            category: "Wall Lights",
            filter: "wall-light",
            name: "Wall Light 3+3",
            model: "Product 3",
            configuration: "3+3",
            image: ""
        },


        /* ================================================
           BALL LIGHTS
        ================================================ */

        {
            id: "ball-light-2way",
            category: "Ball Lights",
            filter: "ball-light",
            name: "Ball Light 2WAY",
            model: "Product 1",
            configuration: "2WAY",
            image: ""
        },

        {
            id: "ball-light-4way",
            category: "Ball Lights",
            filter: "ball-light",
            name: "Ball Light 4WAY",
            model: "Product 2",
            configuration: "4WAY",
            image: ""
        },


        /* ================================================
           FOOT LIGHTS
        ================================================ */

        {
            id: "foot-light-5w",
            category: "Foot Lights",
            filter: "foot-light",
            name: "Foot Light 5W",
            model: "Product 1",
            wattage: "5W",
            image: ""
        },


        /* ================================================
           DOB BULK-HEAD LIGHTS
        ================================================ */

        {
            id: "dob-bulkhead-10w",
            category: "DOB Bulk-Head",
            filter: "dob-bulkhead",
            name: "DOB Bulk-Head 10W",
            model: "Product 1",
            wattage: "10W",
            image: ""
        },

        {
            id: "dob-bulkhead-20w",
            category: "DOB Bulk-Head",
            filter: "dob-bulkhead",
            name: "DOB Bulk-Head 20W",
            model: "Product 2",
            wattage: "20W",
            image: ""
        },


        /* ================================================
           ROPE LIGHTS
        ================================================ */

        {
            id: "rope-light-cool-white",
            category: "Rope Lights",
            filter: "rope-light",
            name: "Rope Light - Cool White",
            model: "Product 1",
            colour: "Cool White",
            colourClass: "decorative-colour-cool",
            image: ""
        },

        {
            id: "rope-light-warm-white",
            category: "Rope Lights",
            filter: "rope-light",
            name: "Rope Light - Warm White",
            model: "Product 2",
            colour: "Warm White",
            colourClass: "decorative-colour-warm",
            image: ""
        },

        {
            id: "rope-light-rgb-cw",
            category: "Rope Lights",
            filter: "rope-light",
            name: "Rope Light - RGB+CW",
            model: "Product 3",
            colour: "RGB+CW",
            colourClass: "decorative-colour-rgb",
            image: ""
        },


        /* ================================================
           SPIKE LIGHTS
        ================================================ */

        {
            id: "spike-light-5w",
            category: "Spike Lights",
            filter: "spike-light",
            name: "Spike Light 5W",
            model: "Product 1",
            wattage: "5W",
            image: ""
        },

        {
            id: "spike-light-7w",
            category: "Spike Lights",
            filter: "spike-light",
            name: "Spike Light 7W",
            model: "Product 2",
            wattage: "7W",
            image: ""
        },

        {
            id: "spike-light-9w",
            category: "Spike Lights",
            filter: "spike-light",
            name: "Spike Light 9W",
            model: "Product 3",
            wattage: "9W",
            image: ""
        },

        {
            id: "spike-light-12w",
            category: "Spike Lights",
            filter: "spike-light",
            name: "Spike Light 12W",
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

            <div class="decorative-image-placeholder">

                <span class="decorative-placeholder-icon">💡</span>

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


        if (product.type) {

            specifications.push({

                label: "Type",
                value: product.type

            });

        }


        if (product.configuration) {

            specifications.push({

                label: "Configuration",
                value: product.configuration

            });

        }


        if (product.colour) {

            specifications.push({

                label: "Colour",
                value: product.colour,
                colourClass: product.colourClass

            });

        }



        return specifications.map(function (specification) {

            let valueHTML;


            if (specification.colourClass) {

                valueHTML = `

                    <strong>

                        <span class="decorative-colour-indicator ${specification.colourClass}"></span>

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
            "decorative-product-card";

        card.dataset.category =
            product.filter;



        card.innerHTML = `

            <div class="decorative-product-image">

                ${createImageContent(product)}

            </div>


            <div class="decorative-product-details">


                <span class="decorative-product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="decorative-specifications">

                    ${createSpecifications(product)}

                </ul>


                <button
                    type="button"
                    class="decorative-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".decorative-enquiry-btn");


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
            event.target.closest(".decorative-filter-btn");


        if (!button) {
            return;
        }



        /* Remove Previous Active State */

        filterContainer
            .querySelectorAll(".decorative-filter-btn")
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


        if (product.type) {

            specifications.push(
                `Type: ${product.type}`
            );

        }


        if (product.configuration) {

            specifications.push(
                `Configuration: ${product.configuration}`
            );

        }


        if (product.colour) {

            specifications.push(
                `Colour: ${product.colour}`
            );

        }


        const specificationText =
            specifications.length > 0
                ? specifications.join("\n")
                : "Please share the product specifications.";


        return `Hello Arthkiran Electrical Products,

I am interested in your decorative lighting product.

Product Category: ${product.category}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

${specificationText}

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
                "Website Decorative Light Enquiry - " +
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
                "Decorative light enquiry email submitted successfully."
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