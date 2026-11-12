/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   FARRATA FANS PRODUCT CATALOGUE
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
        document.getElementById("farrataProductGrid");

    const filterContainer =
        document.getElementById("farrataFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Farrata catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const categories = [

        {
            id: "table-wall",
            title: "Table & Wall Fans",

            products: [

                {
                    name: "Table & Wall Fan - 400mm",
                    model: "Product 1",
                    sweep: "400mm",
                    consumption: "60W",
                    speed: "Normal",
                    delivery: "75 m³/3min",
                    image: ""
                },

                {
                    name: "Table & Wall Fan - 400mm",
                    model: "Product 2",
                    sweep: "400mm",
                    consumption: "120W",
                    speed: "H-Speed",
                    delivery: "100 m³/3min",
                    image: ""
                }

            ]
        },


        {
            id: "oscillating",
            title: "Oscillating Farrata Fan",

            products: [

                {
                    name: "Oscillating Farrata Fan - 500mm",
                    model: "Product 1",
                    sweep: "500mm",
                    consumption: "130W",
                    speed: "Normal",
                    delivery: "120 m³/3min",
                    image: ""
                }

            ]
        },


        {
            id: "farrata",
            title: "Farrata Fans",

            products: [

                {
                    name: "Farrata Fan - 500mm",
                    model: "Product 1",
                    sweep: "500mm",
                    consumption: "130W",
                    speed: "Normal",
                    delivery: "120 m³/3min",
                    image: ""
                }

            ]
        },


        {
            id: "table-cum-wall",
            title: "Table CUM Wall Fans",

            products: [

                {
                    name: "Table CUM Wall Fan",
                    model: "Product 1",
                    sweep: "230mm",
                    consumption: "50W",
                    airDelivery: "30 m³/3min",
                    image: ""
                },

                {
                    name: "Table CUM Wall Fan",
                    model: "Product 2",
                    sweep: "300W",
                    consumption: "70W",
                    airDelivery: "50 m³/3min",
                    image: ""
                }

            ]
        }

    ];


    /* =====================================================
       FLATTEN PRODUCT DATABASE
       All products are placed in one array.
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

        card.className = "farrata-product-card";

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

                <div class="farrata-image-placeholder">
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
                label: product.airDelivery
                    ? "Power Consumption"
                    : "Consumption",
                value: product.consumption
            }

        ];


        if (product.speed) {

            specifications.push({

                label: "Speed",
                value: product.speed

            });

        }


        if (product.delivery) {

            specifications.push({

                label: "Delivery",
                value: product.delivery

            });

        }


        if (product.airDelivery) {

            specifications.push({

                label: "Air Delivery",
                value: product.airDelivery

            });

        }


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


        /* Card HTML */

        card.innerHTML = `

            <div class="farrata-product-image">

                ${imageContent}

            </div>


            <div class="farrata-product-details">

                <span class="farrata-product-category">
                    ${product.categoryTitle}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <ul class="farrata-specifications">

                    ${specificationsHTML}

                </ul>


                <button
                    type="button"
                    class="farrata-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>

            </div>

        `;


        /* Enquiry Button */

        const enquiryButton =
            card.querySelector(".farrata-enquiry-btn");


        enquiryButton.addEventListener("click", function () {

            sendProductEnquiry(product);

        });


        return card;

    }



    /* =====================================================
       RENDER ALL PRODUCTS
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


        /* Display Selected Products */

        renderProducts(button.dataset.filter);

    });



    /* =====================================================
       CREATE PRODUCT ENQUIRY MESSAGE
    ===================================================== */

    function createEnquiryMessage(product) {

        let specificationsText =

            `Sweep: ${product.sweep}
Consumption: ${product.consumption}`;


        if (product.speed) {

            specificationsText +=
                `\nSpeed: ${product.speed}`;

        }


        if (product.delivery) {

            specificationsText +=
                `\nDelivery: ${product.delivery}`;

        }


        if (product.airDelivery) {

            specificationsText +=
                `\nAir Delivery: ${product.airDelivery}`;

        }


        return `Hello Arthkiran Electrical Products,

I am interested in your Farrata Fan product.

Product Category: ${product.categoryTitle}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

${specificationsText}

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
                "Website Farrata Fan Enquiry - " +
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
                "Farrata enquiry email submitted successfully."
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
           Open WhatsApp directly after customer click.
        */

        openWhatsApp(message);


        /*
           Send the same enquiry to service@arthkiran.com.
           The customer does not need to send an email.
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