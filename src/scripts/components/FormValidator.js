export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );

    this._validateInput = this._validateInput.bind(this);
    this._validateForm = this._validateForm.bind(this);
  }

  _validateInput(input) {
    if (input.validity.valid) {
      this._hideValidationError(input);
    } else {
      this._showValidationError(input);
    }
  }

  _validateForm() {
    const inputsArray = Array.from(this._inputs);

    if (inputsArray.every((input) => input.validity.valid)) {
      this._enableSaveButton();
    } else {
      this._disableSaveButton();
    }
  }

  _showValidationError(input) {
    input.classList.add(this._config.inputErrorClass);
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._config.errorClass);
  }

  _hideValidationError(input) {
    input.classList.remove(this._config.inputErrorClass);
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._config.errorClass);
  }

  _disableSaveButton() {
    this._submitButton.setAttribute("disabled", "disabled");
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }

  _enableSaveButton() {
    this._submitButton.removeAttribute("disabled");
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
  }

  _setEventListeners() {
    this._inputs.forEach((input) =>
      input.addEventListener("input", () => {
        this._validateInput(input);
        this._validateForm();
      })
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  checkForm() {
    const formIsValid = this._form.checkValidity();

    this._inputs.forEach((input) => this._hideValidationError(input));

    if (formIsValid) {
      this._enableSaveButton();
    } else {
      this._disableSaveButton();
    }
  }
}
