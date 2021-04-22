import PopupWithForm from "./PopupWithForm.js";

export default class PopupConfirm extends PopupWithForm {
  constructor(popupSelector, submitHandler) {
    super(popupSelector, submitHandler);

    this._buttonLoadingText = "Удаление...";

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  _setEventListeners() {
    this._submitButton.addEventListener("click", this.confirmDelete);
    this._closeButton.addEventListener("click", this.close);
    window.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener(
      "mousedown",
      this._handleMouseDownClose
    );
  }

  open(card, cardId) {
    super.open();
    this.card = card;
    this.cardId = cardId;
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  confirmDelete() {
    this._submitHandler(this.cardId);
  }
}
