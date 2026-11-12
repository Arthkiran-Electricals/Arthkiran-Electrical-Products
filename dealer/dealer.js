/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   DEALER ENQUIRY PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const WHATSAPP_NUMBER = "919277199649";

    const CONTACT_EMAIL = "service@arthkiran.com";

    const EMAIL_ENDPOINT =
        "https://formsubmit.co/ajax/" + CONTACT_EMAIL;



    /* =====================================================
       HTML ELEMENTS
    ===================================================== */

    const dealerForm =
        document.getElementById("dealerForm");

    const submitButton =
        document.getElementById("dealerSubmitBtn");

    const formStatus =
        document.getElementById("dealerFormStatus");

    const currentYear =
        document.getElementById("currentYear");



    /* =====================================================
       COPYRIGHT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       GET FORM DATA
    ===================================================== */

    function getFormData() {

        return {

            name:
                document.getElementById("dealerName").value.trim(),

            business:
                document.getElementById("businessName").value.trim(),

            phone:
                document.getElementById("dealerPhone").value.trim(),

            email:
                document.getElementById("dealerEmail").value.trim(),

            businessType:
                document.getElementById("businessType").value,

            city:
                document.getElementById("dealerCity").value.trim(),

            state:
                document.getElementById("dealerState").value.trim(),

            pincode:
                document.getElementById("dealerPincode").value.trim(),

            productInterest:
                document.getElementById("productInterest").value,

            address:
                document.getElementById("dealerAddress").value.trim(),

            message:
                document.getElementById("dealerMessage").value.trim()

        };

    }



    /* =====================================================
       FORM STATUS MESSAGE
    ===================================================== */

    function showFormStatus(message, type) {

        if (!formStatus) {
            return;
        }

        formStatus.textContent = message;

        formStatus.className =
            "dealer-form-status " + type;

    }



    /* =====================================================
       CREATE DEALER ENQUIRY MESSAGE
    ===================================================== */

    function createDealerMessage(data) {

        return `Hello Arthkiran Electrical Products,

I am interested in becoming a dealer / distributor.

BUSINESS CONTACT DETAILS

Contact Person: ${data.name}

Business / Firm Name: ${data.business}

Mobile Number: ${data.phone}

Email Address: ${data.email || "Not provided"}


BUSINESS INFORMATION

Business Type: ${data.businessType}

City: ${data.city}

State: ${data.state}

PIN Code: ${data.pincode}

Product Categories of Interest: ${data.productInterest || "Not specified"}


BUSINESS ADDRESS

${data.address || "Not provided"}


ADDITIONAL INFORMATION

${data.message || "No additional information provided."}


Kindly contact me to discuss the dealer association process.

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
       SEND EMAIL TO COMPANY
    ===================================================== */

    async function sendEmailEnquiry(data) {

        const emailData = {

            name: data.name,

            business_name: data.business,

            phone: data.phone,

            email: data.email || "Not provided",

            business_type: data.businessType,

            city: data.city,

            state: data.state,

            pincode: data.pincode,

            product_interest:
                data.productInterest || "Not specified",

            business_address:
                data.address || "Not provided",

            additional_message:
                data.message || "No additional information provided.",

            _subject:
                "New Dealer Enquiry - " + data.business,

            _template: "table",

            _captcha: "false"

        };


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
                "Unable to submit the dealer enquiry email."
            );

        }


        const result = await response.json();


        if (
            result.success === false ||
            result.success === "false"
        ) {

            throw new Error(
                "The email service could not accept the enquiry."
            );

        }


        return result;

    }



    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    if (dealerForm) {

        dealerForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            /* Browser validation */

            if (!dealerForm.checkValidity()) {

                dealerForm.reportValidity();

                return;

            }


            const data = getFormData();


            /* Validate Indian mobile number */

            const cleanPhone =
                data.phone.replace(/[\s-]/g, "");

            const phonePattern =
                /^(?:\+?91)?[6-9]\d{9}$/;


            if (!phonePattern.test(cleanPhone)) {

                showFormStatus(
                    "Please enter a valid 10-digit Indian mobile number.",
                    "error"
                );

                document.getElementById("dealerPhone").focus();

                return;

            }


            /* Validate PIN code */

            const pincodePattern =
                /^[1-9][0-9]{5}$/;


            if (!pincodePattern.test(data.pincode)) {

                showFormStatus(
                    "Please enter a valid 6-digit Indian PIN code.",
                    "error"
                );

                document.getElementById("dealerPincode").focus();

                return;

            }


            /*
               Prepare WhatsApp message and open it directly
               during the customer's submit action.
            */

            const whatsappMessage =
                createDealerMessage(data);

            openWhatsApp(whatsappMessage);


            /*
               Disable button during email submission.
            */

            submitButton.disabled = true;

            submitButton.querySelector("span:first-child").textContent =
                "Submitting Enquiry...";


            showFormStatus(
                "Your WhatsApp enquiry is ready. Sending your dealer details to our team...",
                "info"
            );


            try {

                /*
                   Send dealer information to company email.
                */

                await sendEmailEnquiry(data);


                showFormStatus(
                    "Your dealer enquiry has been submitted successfully. Our team has received your details.",
                    "success"
                );


                dealerForm.reset();


            } catch (error) {

                console.error(
                    "Dealer enquiry email error:",
                    error
                );


                showFormStatus(
                    "WhatsApp has been opened, but email delivery could not be confirmed. Please contact service@arthkiran.com directly.",
                    "error"
                );

            } finally {

                submitButton.disabled = false;

                submitButton.querySelector("span:first-child").textContent =
                    "Submit Dealer Enquiry";

            }

        });

    }

});