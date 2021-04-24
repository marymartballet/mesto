export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeButton = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDownClose = this._handleMouseDownClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleMouseDownClose(event) {
    if (event.target === this._popupElement) {
      this.close();
    }
  }

  _setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    window.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener(
      "mousedown",
      this._handleMouseDownClose
    );
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener("click", this.close);
    window.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleMouseDownClose
    );
  }

  showResponseError(err) {
    this._submitButton.textContent = err;
    this._submitButton.classList.add("popup__button_error");
  }

  hideResponseError(err) {
    this.submitButton.textContent = this._buttonText;
    this._submitButton.classList.remove("popup__button_error");
  }

  open() {
    this._setEventListeners();
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._removeEventListeners();
    if (this._form) {
      this._form.reset();
    }
  }
}
