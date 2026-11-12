/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   AXIAL FLOW FANS PRODUCT CATALOGUE
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
        document.getElementById("axialProductGrid");

    const filterContainer =
        document.getElementById("axialFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Axial catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       Specifications transcribed from supplied image.
    ===================================================== */

    const categories = [


        /* ================================================
           AXIAL FLOW FANS
        ================================================ */

        {
            id: "axial-flow",

            title: "Axial Flow Fans",

            products: [

                {
                    name: "Axial Flow Fan - 100mm",
                    model: "Product 1",

                    sweep: "100mm",
                    consumption: "18W",
                    speed: "H-Speed",
                    delivery: "90 m³/3hr",

                    image: ""
                },


                {
                    name: "Axial Flow Fan - 150mm",
                    model: "Product 2",

                    sweep: "150mm",
                    consumption: "24W",
                    speed: "H-Speed",
                    delivery: "250 m³/3hr",

                    image: ""
                },


                {
                    name: "Axial Flow Fan - 200mm",
                    model: "Product 3",

                    sweep: "200mm",
                    consumption: "25W",
                    speed: "H-Speed",
                    delivery: "250 m³/3hr",

                    image: ""
                }

            ]

        },


        /* ================================================
           AXIAL FLOW FANS TYPE
        ================================================ */

        {
            id: "axial-flow-type",

            title: "Axial Flow Fans Type",

            products: [

                {
                    name: "Axial Flow Fan Type - 100mm",
                    model: "Product 1",

                    sweep: "100mm",
                    consumption: "18W",
                    speed: "H-Speed",
                    delivery: "85 m³/3hr",

                    image: ""
                },


                {
                    name: "Axial Flow Fan Type - 150mm",
                    model: "Product 2",

                    sweep: "150mm",
                    consumption: "24W",
                    speed: "H-Speed",
                    delivery: "220 m³/3hr",

                    image: ""
                }

            ]

        }

    ];



    /* =====================================================
       FLATTEN PRODUCT DATABASE
       All five products appear in one grid.
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


        card.className =
            "axial-product-card";

        card.dataset.category =
            product.categoryId;



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

                <div class="axial-image-placeholder">
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
                label: "Delivery",
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

            <div class="axial-product-image">

                ${imageContent}

            </div>


            <div class="axial-product-details">


                <span class="axial-product-category">

                    ${product.categoryTitle}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="axial-specifications">

                    ${specificationsHTML}

                </ul>


                <button
                    type="button"
                    class="axial-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".axial-enquiry-btn");


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

I am interested in your Axial Flow Fan product.

Product Category: ${product.categoryTitle}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

Sweep: ${product.sweep}

Consumption: ${product.consumption}

Speed: ${product.speed}

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
                "Website Axial Flow Fan Enquiry - " +
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
                "Axial fan enquiry email submitted successfully."
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