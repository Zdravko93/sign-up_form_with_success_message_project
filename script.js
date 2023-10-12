const card = document.querySelector(".card");
const form = document.querySelector(".email");
const emailInput = document.querySelector(".email input");
const invalidMessage = document.querySelector(".invalid-message");
const successModalMobile = document.querySelector(".sign-up-success-modal-mobile");
const successMobileMessageElement = document.querySelector(".sign-up-text-mobile p");
const dismissModalMobileButton = document.querySelector(".dismiss-message-button-mobile");
const successModalDesktop = document.querySelector(".sign-up-success-modal-desktop");
const successDesktopMessageElement = document.querySelector(".sign-up-text-desktop p");
const dismissModalDesktopButton = document.querySelector(".dismiss-message-button-desktop")

//Regex 
const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const displayErrorMessage = toggle => {
    if (toggle === "show") {
        invalidMessage.style.display = "block";
        emailInput.classList.add("invalid-input");
    } else if (toggle === "hide") {
        invalidMessage.style.display = "none";
        emailInput.classList.remove("invalid-input");
    }
};

const dismissSuccessModal = () => {
    if (window.innerWidth < 768) {
        successModalMobile.classList.remove("modal-active");
        mainCardToggle("flex");
    }
    if (window.innerWidth >= 768) {
        successModalDesktop.classList.remove("modal-active");
        mainCardToggle("flex");
    }
};

const displaySuccessModal = (modal, messageElement, email) => {
    modal.classList.add("modal-active");
    messageElement.innerHTML = `
             A confirmation email has been sent to <mark class="email-accent">${email}</mark>.
             Please open it and click the button inside to confirm 
             your subscription `;
};

const mainCardToggle = mode => {
        card.style.display = mode;
};

const validateEmail = event => {
    event.preventDefault();
    const enteredEmail = emailInput.value;
    if (enteredEmail === "") {
        displayErrorMessage("show");
        return;
    } else if (enteredEmail.match(validEmail)) {
        displayErrorMessage("hide");
        if (window.innerWidth < 768) {
            displaySuccessModal(successModalMobile, successMobileMessageElement, enteredEmail);
            mainCardToggle("none");
        }
        if (window.innerWidth >= 768) {
            displaySuccessModal(successModalDesktop, successDesktopMessageElement, enteredEmail);
            mainCardToggle("none");
        }
    }

    // Reset input field
    emailInput.value = "";
};

const toggleInvalidEmailStyles = event => {
    if (event.target.value.match(validEmail)) {
        displayErrorMessage("hide");
    }
}

// Event listeners
form.addEventListener("submit", validateEmail);
emailInput.addEventListener("input", toggleInvalidEmailStyles);
dismissModalMobileButton.addEventListener("click", dismissSuccessModal);
dismissModalDesktopButton.addEventListener("click", dismissSuccessModal);


