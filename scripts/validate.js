const toggleButtonState = (inputList, buttonList, options) => {
  if (hasInvalidInput(inputList)) {
    buttonList.forEach((button) => {
      button.classList.add(`${options.inactiveButtonClass}`);
      button.setAttribute('disabled', 'true');
    })
  } else {
    buttonList.forEach((button) => {
      button.classList.remove(`${options.inactiveButtonClass}`);
      button.removeAttribute('disabled');
    })
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${options.inputErrorClass}`);
  errorElement.classList.remove(`${options.errorClass}`);
  errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${options.inputErrorClass}`);
  errorElement.classList.add(`${options.errorClass}`);
  errorElement.textContent = errorMessage;
}

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

const setEventListener = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(`${options.inputSelector}`));
  const buttonList = Array.from(formElement.querySelectorAll(`${options.submitButtonSelector}`))
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonList, options);
    })
  })
}

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(`${options.formSelector}`));
  formList.forEach((formElement) => {
    setEventListener(formElement, options);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_text-error',
  inactiveButtonClass: 'popup__submit_inactive',
})
