/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   VENTILATOR FANS PRODUCT CATALOGUE
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
        document.getElementById("ventilatorProductGrid");

    const filterContainer =
        document.getElementById("ventilatorFilters");

    const productCount =
        document.getElementById("productCount");


    if (!productGrid || !filterContainer) {

        console.error("Ventilator catalogue elements not found.");

        return;

    }


    /* =====================================================
       PRODUCT DATABASE
       Specifications transcribed from supplied image.
    ===================================================== */

    const categories = [


        /* ================================================
           VENTILATOR GRILL
        ================================================ */

        {
            id: "ventilator-grill",

            title: "Ventilator Grill",

            products: [

                {
                    name: "Ventilator Grill - 150mm",
                    model: "Product 1",

                    sweep: "150mm",
                    consumption: "32W/40W",

                    delivery: "280 m³/3hr / 400",

                    image: ""
                },


                {
                    name: "Ventilator Grill - 200mm",
                    model: "Product 2",

                    sweep: "200mm",
                    consumption: "35W/65W",

                    delivery: "650/750",

                    image: ""
                },


                {
                    name: "Ventilator Grill - 250mm",
                    model: "Product 3",

                    sweep: "250mm",
                    consumption: "37W",

                    delivery: "750",

                    image: ""
                },


                {
                    name: "Ventilator Grill - 300mm",
                    model: "Product 4",

                    sweep: "300mm",
                    consumption: "45W",

                    delivery: "1200",

                    image: ""
                }

            ]

        },


        /* ================================================
           VF BLDC
        ================================================ */

        {
            id: "vf-bldc",

            title: "VF BLDC",

            products: [

                {
                    name: "VF BLDC - 150mm",
                    model: "Product 1",

                    sweep: "150mm",
                    consumption: "Normal",

                    delivery: "Normal",

                    image: ""
                },


                {
                    name: "VF BLDC - 150mm",
                    model: "Product 2",

                    sweep: "150mm",
                    consumption: "6W",

                    delivery: "250",

                    image: ""
                },


                {
                    name: "VF BLDC - 200mm",
                    model: "Product 3",

                    sweep: "200mm",
                    consumption: "14W",

                    delivery: "550",

                    image: ""
                },


                {
                    name: "VF BLDC - 250mm",
                    model: "Product 4",

                    sweep: "250mm",
                    consumption: "14W",

                    delivery: "750",

                    image: ""
                }

            ]

        }

    ];



    /* =====================================================
       FLATTEN PRODUCT DATABASE
       All 8 products appear in one grid.
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
            "ventilator-product-card";

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

                <div class="ventilator-image-placeholder">
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

            <div class="ventilator-product-image">

                ${imageContent}

            </div>


            <div class="ventilator-product-details">


                <span class="ventilator-product-category">

                    ${product.categoryTitle}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <ul class="ventilator-specifications">

                    ${specificationsHTML}

                </ul>


                <button
                    type="button"
                    class="ventilator-enquiry-btn"
                >

                    Enquire on WhatsApp

                    <span>↗</span>

                </button>


            </div>

        `;



        /* WhatsApp Enquiry Button */

        const enquiryButton =
            card.querySelector(".ventilator-enquiry-btn");


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

I am interested in your Ventilator Fan product.

Product Category: ${product.categoryTitle}

Product: ${product.name}

Product Reference: ${product.model}

Product Specifications:

Sweep: ${product.sweep}

Consumption: ${product.consumption}

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
                "Website Ventilator Fan Enquiry - " +
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
                "Ventilator fan enquiry email submitted successfully."
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