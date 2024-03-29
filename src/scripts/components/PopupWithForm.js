import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupElement.querySelector(".popup__submit");
    this._buttonLoadingText = "Сохранение...";
    this._popupInputs = this._popupElement.querySelectorAll(".popup__input");
    this._submitHandler = this._submitHandler.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._values = {};
    this._popupInputs.forEach(
      (input) => (this._values[input.name] = input.value)
    );
    return this._values;
  }

  _handleSubmit(evt) {
    this._getInputValues();
    this._submitHandler(evt, this._getInputValues());
  }

  _setEventListeners() {
    super._setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", this._handleSubmit);
    }
  }

  _removeEventListeners() {
    super._removeEventListeners();
    if (this._form) {
      this._form.removeEventListener("submit", this._handleSubmit);
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
