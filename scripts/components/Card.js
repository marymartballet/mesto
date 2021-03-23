export default class Card {
  constructor(data, cardSelector) {
    this._data = data;
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
    image.addEventListener("click", () => {
      this._openImage(this._data.name, this._data.link);
    });
  }
  _clickLike(event) {
    event.target.classList.toggle("element_vector-like_active");
  }
  _deleteCard(event) {
    const container = event.target.closest(".element");
    const cardSection = document.querySelector(".elements");

    cardSection.removeChild(container);
  }
  _showPopup(tag) {
    tag.classList.add("popup_opened");
  }

  _openImage(name, link) {
    const imagePopup = document.querySelector(".popup_image");
    const imgWindow = document.querySelector(".popup__picture");
    const descriptionImg = document.querySelector(".popup__description");

    this._showPopup(imagePopup);
    imgWindow.src = link;
    imgWindow.alt = name;
    descriptionImg.textContent = name;
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
