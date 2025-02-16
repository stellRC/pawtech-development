// TYPEWRITER VARIABLES
const solutionsMore = document.querySelector("#solutionsMore");

let fullFirst;
const TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 600;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

// FORM VARIABLES
const emailRegex = /\S+@\S+\.\S+/; // has @ and .
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // starts with 9

const elForm = document.getElementsByClassName("form")[0];
const elEmail = document.getElementsByClassName("email")[0];
const elPhone = document.getElementsByClassName("phone")[0];
const elName = document.getElementsByClassName("name")[0];
const elMessage = document.getElementsByClassName("message")[0];
const elSubmit = document.getElementsByClassName("input-submit")[0];
console.log(elSubmit)

const formErrors = {
    email: false,
    phone: false,
    message: false,
    name: false
};

let hasSubmitted = false;


// TYPEWRITER ANIMATION


TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];


    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    if (fullTxt == this.toRotate[0]) {
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    } else {
        this.el.innerHTML = '<span class="wrap">' + fullFirst + this.txt + '</span>';
    }

    let that = this;
    let delta = (200 - Math.random() * 100) / 3;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        if (fullTxt == this.toRotate[this.toRotate.length - 1]) return
        else if (fullTxt == this.toRotate[0]) {
            fullFirst = this.txt;
            this.loopNum++;
        } else {
            delta = this.period;
            this.isDeleting = true;
        }
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

function showSolutions() {
    solutionsMore.classList.add("solutions-visible");
    solutionsMore.classList.remove("solutions-hidden");
    this.parentElement.classList.add("solutions-hidden")
}

document.getElementById("solutionsShow").addEventListener("click", showSolutions);


window.onload = function () {

    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate.toString()) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let carrot = document.createElement("style");
    HTMLStyleElement.type = "text/css";
    document.body.appendChild(carrot);
    // const hiddenSpan = document.querySelector('.span-hidden')
    // hiddenSpan.style.display = 'none'

};




// FORM


validateField({
    elField: elEmail,
    validateFn: validateFieldEmail
});

validateField({
    elField: elPhone,
    validateFn: validateFieldPhone
});

validateField({
    elField: elName,
    validateFn: validateFieldName
});

validateField({
    elField: elMessage,
    validateFn: validateFieldMessage
});

function validateField({ elField, validateFn }) {
    let touched = false;

    elField.addEventListener("change", (e) => {
        touched = true; // mark it as touched so that on blur it shows the error.
    });

    elField.addEventListener("keyup", (e) => {
        // remove any error on keyup if existent
        validateFn(e.target, { removeOnly: true });

        if (hasSubmitted) {
            updateSubmitSummary();
        }
    });

    elField.addEventListener("blur", (e) => {
        if (!touched) return;
        // show error if touched
        validateFn(e.target, { live: true });
    });
}


function validateFieldEmail(el, opts) {
    const isEmpty = el.value === "";

    if (isEmpty) {
        formErrors.email = true;
        updateFieldDOM(el, !isEmpty, "Email required.", opts);
    } else {
        const isEmailValid = el.value.match(emailRegex);
        updateFieldDOM(el, isEmailValid, "Invalid email.", opts);
        formErrors.email = !isEmailValid;
    }
}

function validateFieldPhone(el, opts) {
    const isEmpty = el.value === "";
    updateFieldDOM(el, !isEmpty, "Phone required.", opts);

    if (isEmpty) {
        formErrors.phone = true;
    } else {
        const isPhoneValid = el.value.match(phoneRegex);
        updateFieldDOM(el, isPhoneValid, "Invalid phone.", opts);
        formErrors.phone = !isPhoneValid;
    }
}

function validateFieldName(el, opts) {
    const isEmpty = el.value === "";


    if (isEmpty) {
        formErrors.name = true;
        updateFieldDOM(el, !isEmpty, "Name required.", opts);
    } else {
        const isNameValid = true;
        updateFieldDOM(el, isNameValid, "Invalid", opts);
        formErrors.name = !isNameValid;
    }
}

function validateFieldMessage(el, opts) {
    const isEmpty = el.value === "";


    if (isEmpty) {
        formErrors.message = true;
        updateFieldDOM(el, !isEmpty, "Message required.", opts);
    } else {
        const isMessageValid = true;
        updateFieldDOM(el, isMessageValid, "Invalid", opts);
        formErrors.message = !isMessageValid;
    }
}

function updateFieldDOM(el, isValid, errorMessage, opts) {
    const removeOnly = opts?.removeOnly;
    const isLive = opts?.live;
    const elField = el.closest(".field");
    const elError = elField.querySelector(".field-error");
    let label = el.previousElementSibling.previousElementSibling;

    if (isValid) {
        // elField.classList.remove("isInvalid");
        elError.innerText = ""; // It's valid
        el.removeAttribute("aria-invalid");
        elError.classList.remove("warning");
        // el.classList.remove("field-outline");
        label.classList.remove("error");
        elSubmit.classList.remove("field-outline");
    } else if (!removeOnly) {
        // elField.classList.add("isInvalid");
        el.setAttribute("aria-invalid", "true");
        elError.setAttribute("aria-live", isLive ? "assertive" : "off");
        elError.classList.add("warning");
        // el.classList.add("field-outline");
        label.classList.add("error");
    }
}

function updateSubmitSummary({ isSubmit } = {}) {
    const elSummary = elForm.querySelector(".form-feedback");
    const elSummaryMsg = elSummary.querySelector(".form-feedback-msg");

    // Clear form feedback
    elSummaryMsg.classList.remove("isInvalid");
    elSummaryMsg.classList.remove("isSuccess");
    elSummaryMsg.innerText = "";
    const errorsState = Object.values(formErrors);

    if (errorsState.includes(true)) {
        elSubmit.classList.add("field-outline");
        // Show error msg
        const errorCount = Object.values(formErrors).reduce((total, hasError) => {
            return hasError ? total + 1 : total;
        }, 0);
        const errorMsg =
            errorCount === 1
                ? `Failed to submit because ${errorCount} field is invalid.`
                : `Failed to submit because ${errorCount} fields are invalid.`;
        elSummaryMsg.classList.add("isInvalid");
        elSummaryMsg.innerText = errorMsg;

        elSummary.querySelector(".form-feedback-sr").innerText = isSubmit
            ? // Set SR error message only on submit to avoid being re-announced
            // every time the error summary visually changes.
            errorMsg
            : "";
    } else if (isSubmit) {
        const successMsg = "Submission successful";
        elSummary.querySelector(".form-feedback-sr").innerText = successMsg;
        elSummaryMsg.innerText = successMsg;
        elSummaryMsg.classList.add("isSuccess");

    }
}

elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hasSubmitted = true;

    // Validate again
    validateFieldEmail(elEmail);
    validateFieldPhone(elPhone);
    validateFieldName(elName);
    validateFieldMessage(elMessage);

    updateSubmitSummary({ isSubmit: true });
});
