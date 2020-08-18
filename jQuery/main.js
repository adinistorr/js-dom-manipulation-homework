const $confirmBannerDOM = $('.confirm-banner');
const $confirmMessageDOM = $('#confirm-message');
const $closeBannerDOM = $('.close-banner');
const $inputsDOM = $('.inputs');
const $radioButtonsDOM = $('.radio-buttons');
const $radioMaleDOM = $('#male');
const $radioFemaleDOM = $('#female');
const $messageDOM = $('#message');
const $submitButtonDOM = $('#submit');
const $firstColumnDOM = $('.first-column');

$submitButtonDOM.click(checkValidation);
$closeBannerDOM.click(() => {
    $confirmBannerDOM.addClass('invisible');
});

let $checkFlag = true;

function checkValidation() {
    $.each($inputsDOM, index => {
        fieldValidation($inputsDOM[index]);
    });

    radioValidation($radioMaleDOM, $radioFemaleDOM);

    if ($checkFlag === true) {
        $confirmBannerDOM.removeClass('invisible');
        $confirmMessageDOM.text(`Thank you for contacting us, ${$inputsDOM[0].value} ${$inputsDOM[1].value}!`);
    }
    $checkFlag = true;
}

function fieldValidation(field) {
    if (field.value !== '') {
        resetErrors(field);
        console.log(field.value);
        return;
    }
    let $errorMessage = '';
    if (field.name === 'message') {
        $errorMessage = `Please choose one of the options a above`;
    } else {
        $errorMessage = `Please insert your ${field.placeholder} here!`;
    }
    
    createErrorMessage(field, $errorMessage);
}


function radioValidation(radio1, radio2) {
    if (radio1.prop("checked") === false && radio2.prop("checked") === false) {
        createErrorMessage($radioButtonsDOM, `Please choose one of the options a above!`);
    } else {
        resetErrors($radioButtonsDOM);
        if(radio1.prop("checked") === true) {
            console.log(`Male`);
        } else {
            console.log(`Female`);
        }
    }
}

function createErrorMessage(beforeElem, message) {
    if(checkIfErrorIsActive($(beforeElem).next()) === false) {
        $(beforeElem).addClass('red-border');
        let $errorMessage = createDiv(message);
        $errorMessage.insertAfter(beforeElem);
    }
    $checkFlag = false;
}

function createDiv(message) {
    return $( '<div/>', {
        'class': 'error-message text-danger mt-n3 mb-2 h6 small',
        text: message,
      })
}

function checkIfErrorIsActive(nextSibling) {
    if ($(nextSibling).hasClass('error-message')) {
        return true;
    }
    return false;
}

function resetErrors(element) {
    if($(element).next().hasClass('error-message')) {
        $(element).next().remove();
    }
    $(element).removeClass('red-border');
}
