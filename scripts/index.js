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
const imagePopup = document.querySelector(".popup__image");
const imgClose = document.querySelector(".popup__close_img");
const cardSection = document.querySelector(".elements");

const createElements = (name, link) => {
  const cardTemplate = document.querySelector("#card");
  const cardElement = cardTemplate.content.cloneNode(true);
  const image = cardElement.querySelector(".element__image");
  const title = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__vector-like");
  const deleteButton = cardElement.querySelector(".element__delete");
  image.setAttribute("src", `${link}`);
  title.textContent = name;

  likeButton.addEventListener('click', (event) => {
    clickLike(event);
  });
  deleteButton.addEventListener('click', (event) => {
    deleteCard(event);
  });
  image.addEventListener('click', () => {
    openImage(name, link);
  });

  return cardElement;
};

initialCards.forEach(function (card) {
  const result = createElements(card.name, card.link);
  cardSection.appendChild(result);
});

function showPopup(tag) {
  tag.classList.add("popup_opened");
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
  const resultCard = createElements(pictureTitle, pictureLink);
  cardSection.prepend(resultCard);
  formAdd.reset();
  closePopup(popupAdd);
}

function clickLike(event) {
  event.target.classList.toggle("element_vector-like_active");
}

function deleteCard(event) {
  const container = event.target.closest(".element");
  cardSection.removeChild(container);
}

function openImage(name, link) {
  const descriptionImg = document.querySelector(".image-popup__description");
  const imgWindow = document.querySelector(".image-popup__image");
  showPopup(imagePopup);
  imgWindow.src = link;
  imgWindow.setAttribute("alt", "фото");
  descriptionImg.textContent = name;
}

addButton.addEventListener("click", function () {
  showPopup(popupAdd);
});
popupAddClose.addEventListener("click", function () {
  closePopup(popupAdd);
});
editButton.addEventListener("click", function () {
  nameField.value = title.textContent;
  infoField.value = subtitle.textContent;
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
