/* =========================================================
   ARTHKIRAN ELECTRICAL PRODUCTS
   CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const WHATSAPP_NUMBER = "919277199649";

    const CONTACT_EMAIL = "service@arthkiran.com";

    /*
       IMPORTANT:
       Replace this placeholder with the actual Instagram
       profile URL before publishing the website.
    */

  const INSTAGRAM_PROFILE_URL =
    "https://www.instagram.com/arth.kiran/";


    /*
       FormSubmit email endpoint.

       This sends the enquiry directly to the company email.
       The email address may need one-time activation.
    */

    const EMAIL_ENDPOINT =
        "https://formsubmit.co/ajax/" + CONTACT_EMAIL;



    /* =====================================================
       HTML ELEMENTS
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const submitButton =
        document.getElementById("contactSubmitBtn");

    const formStatus =
        document.getElementById("contactFormStatus");

    const whatsappQR =
        document.getElementById("whatsappQR");

    const instagramQR =
        document.getElementById("instagramQR");

    const instagramProfileLink =
        document.getElementById("instagramProfileLink");

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
       INSTAGRAM PROFILE LINK
    ===================================================== */

    if (instagramProfileLink) {

        instagramProfileLink.href =
            INSTAGRAM_PROFILE_URL;

    }



    /* =====================================================
       WHATSAPP QR CODE
    ===================================================== */

    function generateWhatsAppQR() {

        if (!whatsappQR) {
            return;
        }

        if (typeof QRCode === "undefined") {

            whatsappQR.textContent =
                "QR code could not be loaded.";

            return;

        }


        const whatsappMessage =
            "Hello Arthkiran Electrical Products, I would like to know more about your products.";


        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(whatsappMessage);


        new QRCode(whatsappQR, {

            text: whatsappURL,

            width: 168,

            height: 168,

            colorDark: "#1b1b1b",

            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H

        });

    }



    /* =====================================================
       INSTAGRAM QR CODE
    ===================================================== */

    function generateInstagramQR() {

        if (!instagramQR) {
            return;
        }

        if (typeof QRCode === "undefined") {

            instagramQR.textContent =
                "QR code could not be loaded.";

            return;

        }


        new QRCode(instagramQR, {

            text: INSTAGRAM_PROFILE_URL,

            width: 168,

            height: 168,

            colorDark: "#1b1b1b",

            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H

        });

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
            "contact-form-status " + type;

    }



    /* =====================================================
       GET FORM DATA
    ===================================================== */

    function getFormData() {

        return {

            name:
                document.getElementById("customerName").value.trim(),

            phone:
                document.getElementById("customerPhone").value.trim(),

            email:
                document.getElementById("customerEmail").value.trim(),

            subject:
                document.getElementById("enquirySubject").value,

            message:
                document.getElementById("customerMessage").value.trim()

        };

    }



    /* =====================================================
       CREATE CUSTOMER ENQUIRY MESSAGE
    ===================================================== */

    function createEnquiryMessage(data) {

        return `Hello Arthkiran Electrical Products,

I would like to make an enquiry.

Customer Details:

Name: ${data.name}

Phone Number: ${data.phone}

Email: ${data.email || "Not provided"}

Enquiry Type: ${data.subject}

Message:

${data.message}

Please contact me regarding this enquiry.

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
       SEND AUTOMATIC EMAIL TO COMPANY
    ===================================================== */

    async function sendEmailEnquiry(data) {

        const emailData = {

            name: data.name,

            phone: data.phone,

            email: data.email || "Not provided",

            enquiry_type: data.subject,

            message: data.message,

            _subject:
                "New Website Enquiry - " + data.subject,

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
                "Unable to submit the enquiry email."
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
       CONTACT FORM SUBMISSION
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            /*
               Browser validation
            */

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            const data = getFormData();


            /*
               Basic phone number validation.
               Accepts Indian mobile numbers with optional
               country code and spaces/hyphens.
            */

            const cleanPhone =
                data.phone.replace(/[\s-]/g, "");


            const phonePattern =
                /^(?:\+?91)?[6-9]\d{9}$/;


            if (!phonePattern.test(cleanPhone)) {

                showFormStatus(
                    "Please enter a valid 10-digit Indian mobile number.",
                    "error"
                );

                document.getElementById("customerPhone").focus();

                return;

            }


            /*
               Prepare enquiry message.
            */

            const whatsappMessage =
                createEnquiryMessage(data);


            /*
               Open WhatsApp immediately after the customer's
               submit action. This avoids popup blocking.
            */

            openWhatsApp(whatsappMessage);


            /*
               Disable the button while email submission runs.
            */

            submitButton.disabled = true;

            submitButton.querySelector("span:first-child").textContent =
                "Submitting Enquiry...";


            showFormStatus(
                "Your WhatsApp enquiry is ready. Sending a copy to our team...",
                "info"
            );


            try {

                /*
                   Send enquiry directly to company email.
                   Customer does not need to send an email.
                */

                await sendEmailEnquiry(data);


                showFormStatus(
                    "Your enquiry has been submitted successfully. A copy has been sent to our team.",
                    "success"
                );


                /*
                   Clear the form after successful email submission.
                */

                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact form email error:",
                    error
                );


                showFormStatus(
                    "WhatsApp has been opened, but the email could not be confirmed. Please contact us directly at service@arthkiran.com.",
                    "error"
                );

            } finally {

                submitButton.disabled = false;

                submitButton.querySelector("span:first-child").textContent =
                    "Send Enquiry";

            }

        });

    }



    /* =====================================================
       INITIALIZE QR CODES
    ===================================================== */

    generateWhatsAppQR();

    generateInstagramQR();



});