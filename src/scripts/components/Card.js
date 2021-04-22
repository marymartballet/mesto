export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handlerDeleteButton,
    handlerLike
  ) {
    this._data = data;

    this._cardSelector = cardSelector;
    this._imageOpen = handleCardClick;
    this._handlerDeleteButton = handlerDeleteButton;
    this._handlerLike = handlerLike;
    this._likeButton = this.id = data.cardId;
    this._isOwn = data.isOwn;
    this.likes = data.likes;
    this.isLiked = data.isLiked;
    this._author = data.author;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;

    this.removeCard - this.removeCard.bind(this);
    this._setLike = this._setLike.bind(this);
    this._handlerLike = this._handlerLike.bind(this);

    this._element = null;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _setLike() {
    this._handlerLike(this.id, this.isLiked)
      .then((res) => {
        this.like.classList.toggle("element_vector-like_active");
        this.isLiked = !this.isLiked;
        this.likes = res.likes.length;
        this.cardLikesCounter.textContent = this.likes;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }

  _setListeners(likeButton, image) {
    likeButton.addEventListener("click", (event) => {
      this._setLike();
    });
    image.addEventListener("click", (event) => {
      this._imageOpen(this._data);
    });
  }

  insertRemoveButton() {
    this._element.insertAdjacentHTML(
      "afterbegin",
      '<button class="element__delete"></button>'
    );
    const removeCardButton = this._element.querySelector(".element__delete");
    removeCardButton.addEventListener("click", () => {
      this._handlerDeleteButton(this, this.id);
    });
  }

  setTemplate() {
    this._element = this._getTemplate();
    this.like = this._element.querySelector(".element__vector-like");
    this.cardLikesCounter = this._element.querySelector(".element__counter");
    this._element.querySelector(".element__title").textContent = this._name;
    this.cardLikesCounter.textContent = this.likes ? this.likes : 0;
    const likeButton = this.like;
    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;

    if (this._alt) {
      cardImage.alt = this._alt;
    } else {
      cardImage.alt = this._name;
    }

    if (this._author) {
      cardImage.setAttribute("data-author", this._author);
    }

    if (this._isOwn) {
      this.insertRemoveButton();
    }

    if (this.isLiked) {
      this.like.classList.add("element_vector-like_active");
    }

    this._setListeners(likeButton, cardImage);

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
