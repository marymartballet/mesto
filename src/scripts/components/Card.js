import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._imageOpen = handleCardClick;
    this._cardSelector = cardSelector;
    this._element = null;
  }
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }
  _setListeners(likeButton, deleteButton, image) {
    likeButton.addEventListener("click", (event) => {
      this._clickLike(event);
    });
    deleteButton.addEventListener("click", (event) => {
      this._deleteCard(event);
    });
    image.addEventListener("click", (event) => {
      this._imageOpen(this._data);
    });
  }
  _clickLike(event) {
    event.target.classList.toggle("element_vector-like_active");
  }
  _deleteCard(event) {
    const container = event.target.closest(".element");

    container.remove();
  }

  setTemplate() {
    this._element = this._getTemplate();
    const likeButton = this._element.querySelector(".element__vector-like");
    const deleteButton = this._element.querySelector(".element__delete");
    const title = this._element.querySelector(".element__title");
    const image = this._element.querySelector(".element__image");
    title.textContent = this._data.name;
    image.src = this._data.link;

    this._setListeners(likeButton, deleteButton, image);

    return this._element;
  }
}
