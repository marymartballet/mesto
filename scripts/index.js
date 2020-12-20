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
let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let title = document.querySelector(".profile__name");
let subtitle = document.querySelector(".profile__description");
let form = document.querySelector(".popup__form");
let nameField = document.querySelector(".popup__input_type_name");
let infoField = document.querySelector(".popup__input_type_info");
let addButton = document.querySelector(".profile__add-button");
let popupAdd = document.querySelector(".popup__add");
let popupAddClose = document.querySelector(".popup__close_add");
let popupAddTitle = document.querySelector(".popup__input_add-title");
let popupAddLink = document.querySelector(".popup__input_add-link");
let formAdd = document.querySelector(".popup__form_add");
let imagePopup = document.querySelector(".image-popup");
let imgClose = document.querySelector(".popup__close_img");

let cardSection = document.querySelector(".elements");
const createElements = (cardData) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("element");
  cardContainer.innerHTML = `<img class="element__image" alt="фото" />
          <button class="element__delete"></button>
          <div class="element__description">
            <p class="element__title"></p>
            <button type="button" class="element__vector-like"></button>
          </div>`;
  const image = cardContainer.querySelector(".element__image");
  image.setAttribute("src", `${cardData.link}`);
  let title = cardContainer.querySelector(".element__title");
  title.textContent = cardData.name;
  return cardContainer;
};
initialCards.forEach(function (card) {
  const result = createElements(card);
  cardSection.appendChild(result);
});

function showPopup() {
  popup.classList.add("popup_opened");
  nameField.value = title.textContent;
  infoField.value = subtitle.textContent;
}
function closePopup() {
  popup.classList.remove("popup_opened");
}
function submitForm(event) {
  event.preventDefault();
  title.textContent = nameField.value;
  subtitle.textContent = infoField.value;
  closePopup();
}
function showPopupAdd() {
  popupAdd.classList.add("popup_opened");
}
function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}
function submitAdd(event) {
  event.preventDefault();
  const pictureTitle = popupAddTitle.value;
  const pictureLink = popupAddLink.value;
  const resultCard = createElements({ name: pictureTitle, link: pictureLink });
  console.log(resultCard);
  cardSection.prepend(resultCard);
  closePopupAdd();
}
function clickLike(event) {
  if (event.target.classList.contains("element__vector-like")) {
    event.target.classList.toggle("element_vector-like_active");
  }
}
function deleteCard(event) {
  if (event.target.classList.contains("element__delete")) {
    const container = event.target.closest(".element");
    cardSection.removeChild(container);
  }
}
function openImage(event) {
  if (event.target.classList.contains("element__image")) {
    const container = event.target.closest(".element");
    const res = container.querySelector(".element__title").textContent;
    imagePopup.classList.add("popup_opened");
    let imgSrc = event.target.src;
    let imgWindow = document.querySelector(".image-popup__image");
    imgWindow.src = imgSrc;
    const descriptionImg = document.querySelector(".image-popup__description");
    descriptionImg.textContent = res;
  }
}
function closeImg() {
  imagePopup.classList.remove("popup_opened");
}
addButton.addEventListener("click", showPopupAdd);
popupAddClose.addEventListener("click", closePopupAdd);
editButton.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
form.addEventListener("submit", submitForm);
formAdd.addEventListener("submit", submitAdd);
cardSection.addEventListener("click", clickLike);
cardSection.addEventListener("click", deleteCard);
cardSection.addEventListener("click", openImage);
imgClose.addEventListener("click", closeImg);
