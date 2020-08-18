const confirmBannerDOM = document.querySelector('.confirm-banner');
const confirmMessageDOM = document.querySelector('#confirm-message');
const closeBannerDOM = document.querySelector('.close-banner');
const inputsDOM = document.querySelectorAll('.inputs');
const radioButtonsDOM = document.querySelector('.radio-buttons');
const radioMaleDOM = document.querySelector('#male');
const radioFemaleDOM = document.querySelector('#female');
const messageDOM = document.querySelector('#message');
const submitButtonDOM = document.querySelector('#submit');
const firstColumnDOM = document.querySelector('.first-column');

submitButtonDOM.addEventListener('click', checkValidation);
closeBannerDOM.addEventListener('click', () => {
    confirmBannerDOM.classList.add('invisible');
});

let checkFlag = true;

function checkValidation() {
    inputsDOM.forEach(input => {
        fieldValidation(input);
    });
    radioValidation(radioMaleDOM, radioFemaleDOM);

    if (checkFlag === true) {
        confirmBannerDOM.classList.remove('invisible');
        confirmMessageDOM.innerText = `Thank you for contacting us, ${inputsDOM[0].value} ${inputsDOM[1].value}!`;
    }
    checkFlag = true;
}

function fieldValidation(field) {
    if (field.value !== '') {
        resetErrors(field);
        console.log(field.value);
        return;
    }
    let errorMessage = '';
    if (field.name === 'message') {
        errorMessage = 'Please choose one of the options a above!';
    } else {
        errorMessage = `Please insert your ${field.placeholder} here!`;
    }
    createErrorMessage(field, errorMessage);
}


function radioValidation(radio1, radio2) {
    if (radio1.checked === false && radio2.checked === false) {
        createErrorMessage(radioButtonsDOM, `Please choose one of the options a above!`);
    } else {
        resetErrors(radioButtonsDOM);
        if(radio1.checked === true) {
            console.log(`Male`);
        } else {
            console.log(`Female`);
        }
    }
}

function createErrorMessage(beforeElem, message) {
    if(checkIfErrorIsActive(beforeElem.nextElementSibling) === false) {
        beforeElem.classList.add('red-border');
        let errorMessage = createDiv(message);
        beforeElem.after(errorMessage);
    }
    checkFlag = false;
}

function createDiv(message) {
    let div = document.createElement('div');
    div.classList.add('error-message', 'text-danger', 'mt-n3', 'mb-2', 'h6', 'small');
    div.innerText = message;
    return div;
}

function checkIfErrorIsActive(nextSibling) {
    if (nextSibling.classList.contains('error-message')) {
        return true;
    }
    return false;
}

function resetErrors(element) {
    if(element.nextElementSibling.classList.contains('error-message')) {
        element.nextElementSibling.outerHTML = '';
    }
    element.classList.remove('red-border');
}
