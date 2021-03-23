export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "true");
    } else {
      buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      buttonElement.removeAttribute("disabled");
    }
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = "";
  }
  _setEventListeners(formElement) {
    const buttonElement = formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
    const inputList = Array.from(
      formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(formElement, input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }
}
