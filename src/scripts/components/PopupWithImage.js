import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);

    this.open = this.open.bind(this);
  }

  open(data) {
    const image = this._popupElement.querySelector(".popup__picture");

    image.setAttribute("src", data.link);
    image.setAttribute("alt", data.name);

    const description = this._popupElement.querySelector(".popup__description");
    description.textContent = image.alt;

    super.open();
  }
}
