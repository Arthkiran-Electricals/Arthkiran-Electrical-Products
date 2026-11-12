/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   EXHAUST FANS PRODUCT CATALOGUE
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
        document.getElementById("exhaustProductGrid");

    const filterContainer =
        document.getElementById("exhaustFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Exhaust catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       Specifications taken from your reference image.
    ===================================================== */

    const categories = [


        /* ================================================
           HIGH SPEED EXHAUST FANS
        ================================================ */

        {
            id: "high-speed",
            title: "High Speed Exhaust Fans",

            products: [

                {
                    name: "High Speed Exhaust Fan - 150mm",
                    model: "Product 1",
                    sweep: "150mm",
                    consumption: "40W",
                    speed: "High Speed",
                    delivery: "500 m³/hr",
                    image: ""
                },

                {
                    name: "High Speed Exhaust Fan - 230mm",
                    model: "Product 2",
                    sweep: "230mm",
                    consumption: "60W",
                    speed: "High Speed",
                    delivery: "950 m³/hr",
                    image: ""
                }

            ]
        },


        /* ================================================
           LD EXHAUST FANS (POLES)
        ================================================ */

        {
            id: "ld-pole",
            title: "LD Exhaust Fans (Poles)",

            products: [

                {
                    name: "LD Exhaust Fan - 230mm",
                    model: "Product 1",
                    sweep: "230mm",
                    consumption: "40W",
                    speed: "Normal",
                    delivery: "550 m³/hr",
                    image: ""
                },

                {
                    name: "LD Exhaust Fan - 300mm",
                    model: "Product 2",
                    sweep: "300mm",
                    consumption: "40W",
                    speed: "Normal",
                    delivery: "550 m³/hr",
                    image: ""
                },

                {
                    name: "LD Exhaust Fan - 230mm",
                    model: "Product 3",
                    sweep: "230mm",
                    consumption: "50W",
                    speed: "Normal",
                    delivery: "1250 m³/hr",
                    image: ""
                },

                {
                    name: "LD Exhaust Fan - 300mm",
                    model: "Product 4",
                    sweep: "300mm",
                    consumption: "50W",
                    speed: "Normal",
                    delivery: "1250 m³/hr",
                    image: ""
                }

            ]
        },


        /* ================================================
           HD EXHAUST FANS
        ================================================ */

        {
            id: "hd",
            title: "HD Exhaust Fans",

            products: [

                {
                    name: "HD Exhaust Fan - 225mm",
                    model: "Product 1",
                    sweep: "225mm",
                    consumption: "40W",
                    speed: "High Speed",
                    delivery: "750 m³/hr",
                    image: ""
                },

                {
                    name: "HD Exhaust Fan - 300mm",
                    model: "Product 2",
                    sweep: "300mm",
                    consumption: "65W",
                    speed: "High Speed",
                    delivery: "1750 m³/hr",
                    image: ""
                }

            ]
        },


        /* ================================================
           LD EXHAUST FANS (CAPACITOR)
        ================================================ */

        {
            id: "ld-capacitor",
            title: "LD Exhaust Fans (Capacitor)",

            products: [

                {
                    name: "LD Capacitor Exhaust Fan - 230mm",
                    model: "Product 1",
                    sweep: "230mm",
                    consumption: "35W",
                    speed: "Normal",
                    delivery: "550 m³/hr",
                    image: ""
                },

                {
                    name: "LD Capacitor Exhaust Fan - 300mm",
                    model: "Product 2",
                    sweep: "300mm",
                    consumption: "35W",
                    speed: "Normal",
                    delivery: "550 m³/hr",
                    image: ""
                },

                {
                    name: "LD Capacitor Exhaust Fan - 230mm",
                    model: "Product 3",
                    sweep: "230mm",
                    consumption: "45W",
                    speed: "Normal",
                    delivery: "1250 m³/hr",
                    image: ""
                },

                {
                    name: "LD Capacitor Exhaust Fan - 300mm",
                    model: "Product 4",
                    sweep: "300mm",
                    consumption: "45W",
                    speed: "Normal",
                    delivery: "1250 m³/hr",
                    image: ""
                }

            ]
        }

    ];



    /* =====================================================
       FLATTEN PRODUCT DATABASE
       All 12 products go into one grid.
    ===================================================== */

    const allProducts = [];


    categories.forEach(function (category) {

        category.products.forEach(function (product) {

            allProducts.push({

                ...product,

                categoryId: category.id,

                categoryTitle: category.title

            });

        });

    });



    /* =====================================================
       CREATE PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const card =
            document.createElement("article");

        card.className = "exhaust-product-card";

        card.dataset.category = product.categoryId;


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

                <div class="exhaust-image-placeholder">
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
                label: "Consumption",
                value: product.consumption
            },

            {
                label: "Speed",
                value: product.speed
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

            <div class="exhaust-product-image">

                ${imageContent}

            </div>


            <div class="exhaust-product-details">


                <span class="exhaust-product-category">

                    ${product.categoryTitle}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="exhaust-specifications">

                    ${specificationsHTML}

                </ul>


                <button
                    type="button"
                    class="exhaust-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".exhaust-enquiry-btn");


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
            allProducts.filter(function (product) {

                return (
                    filter === "all" ||
                    product.categoryId === filter
                );

            });



        visibleProducts.forEach(function (product) {

            const card = createProductCard(product);

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



        /* Render Selected Category */

        renderProducts(button.dataset.filter);

    });



    /* =====================================================
       CREATE PRODUCT ENQUIRY MESSAGE
    ===================================================== */

    function createEnquiryMessage(product) {

        return `Hello Arthkiran Electrical Products,

I am interested in your Exhaust Fan product.

Product Category: ${product.categoryTitle}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

Sweep Size: ${product.sweep}

Power Consumption: ${product.consumption}

Speed: ${product.speed}

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
                "Website Exhaust Fan Enquiry - " +
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
                "Exhaust fan enquiry email submitted successfully."
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