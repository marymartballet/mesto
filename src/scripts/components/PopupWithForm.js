import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._selector.querySelector(".popup__form");
    this._popupInputs = this._selector.querySelectorAll(".popup__input");
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
    this._submitHandler(evt, this._values);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    this._form.reset();
    super.close();
  }
}
