export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._closeButton = this._selector.querySelector(".popup__close");
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
    if (event.target === this._selector) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    window.addEventListener("keydown", this._handleEscClose);
    this._selector.addEventListener("mousedown", this._handleMouseDownClose);
  }

  removeEventListeners() {
    this._closeButton.removeEventListener("click", this.close);
    window.removeEventListener("keydown", this._handleEscClose);
    this._selector.removeEventListener("mousedown", this._handleMouseDownClose);
  }

  open() {
    this.setEventListeners();
    this._selector.classList.add("popup_opened");
  }

  close() {
    this._selector.classList.remove("popup_opened");
    this.removeEventListeners();
  }
}
