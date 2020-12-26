const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close");
const title = document.querySelector(".profile__name");
const subtitle = document.querySelector(".profile__description");
const form = document.querySelector(".popup__form");
const nameField = document.querySelector(".popup__input_type_name");
const infoField = document.querySelector(".popup__input_type_info");
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddClose = document.querySelector(".popup__close_add");
const popupAddTitle = document.querySelector(".popup__input_add-title");
const popupAddLink = document.querySelector(".popup__input_add-link");
const formAdd = document.querySelector(".popup__form_add");
const imagePopup = document.querySelector(".image-popup");
const imgClose = document.querySelector(".popup__close_img");
const cardSection = document.querySelector(".elements");

const createElements = (cardData, clickLike, deleteCard, openImage) => {
  const cardTemplate = document.querySelector("#card");
  const cardElement = cardTemplate.content.cloneNode(true);
  const image = cardElement.querySelector(".element__image");
  const title = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__vector-like");
  const deleteButton = cardElement.querySelector(".element__delete");
  image.setAttribute("src", `${cardData.link}`);
  title.textContent = cardData.name;
  likeButton.onclick = function (likeButton) {
    clickLike(likeButton);
  };

  deleteButton.onclick = function (deleteButton) {
    deleteCard(deleteButton);
  };

  image.onclick = function (image) {
    openImage(image);
  };

  return cardElement;
};

initialCards.forEach(function (card) {
  const result = createElements(card, clickLike, deleteCard, openImage);
  cardSection.appendChild(result);
});

function showPopup(tag) {
  tag.classList.add("popup_opened");
  const checkEdit = tag.getAttribute("id");
  if (checkEdit) {
    nameField.value = title.textContent;
    infoField.value = subtitle.textContent;
  }
}

function closePopup(tag) {
  tag.classList.remove("popup_opened");
}

function submitForm(event) {
  event.preventDefault();
  title.textContent = nameField.value;
  subtitle.textContent = infoField.value;
  closePopup(popup);
}

function submitAdd(event) {
  event.preventDefault();
  const pictureTitle = popupAddTitle.value;
  const pictureLink = popupAddLink.value;
  const resultCard = createElements(
    { name: pictureTitle, link: pictureLink },
    clickLike,
    deleteCard,
    openImage
  );
  cardSection.prepend(resultCard);
  formAdd.reset();
  closePopup(popupAdd);
}

function clickLike(tag) {
  tag.target.classList.toggle("element_vector-like_active");
}

function deleteCard(tag) {
  const container = tag.target.closest(".element");
  cardSection.removeChild(container);
}

function openImage(tag) {
  const container = tag.target.closest(".element");
  const res = container.querySelector(".element__title").textContent;
  showPopup(imagePopup);
  const imgSrc = tag.target.src;
  const imgWindow = document.querySelector(".image-popup__image");
  imgWindow.src = imgSrc;
  imgWindow.setAttribute("alt", "фото");
  const descriptionImg = document.querySelector(".image-popup__description");
  descriptionImg.textContent = res;
}

addButton.addEventListener("click", function () {
  showPopup(popupAdd);
});
popupAddClose.addEventListener("click", function () {
  closePopup(popupAdd);
});
editButton.addEventListener("click", function () {
  showPopup(popup);
});
popupClose.addEventListener("click", function () {
  closePopup(popup);
});
imgClose.addEventListener("click", function () {
  closePopup(imagePopup);
});
form.addEventListener("submit", submitForm);
formAdd.addEventListener("submit", submitAdd);
