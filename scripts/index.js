const profilePopup = document.querySelector("#edit");
const editButton = document.querySelector(".profile__edit-button");
const popupClose = profilePopup.querySelector(".popup__close");
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
const imagePopup = document.querySelector(".popup_image");
const imgClose = document.querySelector(".popup__close_img");
const cardSection = document.querySelector(".elements");
const descriptionImg = document.querySelector(".popup__description");
const imgWindow = document.querySelector(".popup__picture");
const titleInput = document.querySelector('#title-input');
const urlInput = document.querySelector('#url-input');
const submitButton = document.querySelector('#create-button');

const createElements = (name, link) => {
  const cardTemplate = document.querySelector("#card");
  const cardElement = cardTemplate.content.cloneNode(true);
  const image = cardElement.querySelector(".element__image");
  const title = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__vector-like");
  const deleteButton = cardElement.querySelector(".element__delete");
  image.src = link;
  image.alt = name;
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

function closePopupMousedown(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

function closePopupEsc(event, tag) {
  const openPopup = document.querySelector('.popup_opened');
  if (event.key === "Escape") {
    closePopup(openPopup);
  }
}

function showPopup(tag) {
  const titleValid = titleInput.validity.valid;
  const urlValid = urlInput.validity.valid;

  if (!titleValid || !urlValid) {
    submitButton.setAttribute('disabled', 'true');
    submitButton.classList.add('popup__submit_inactive');
  }

  tag.classList.add("popup_opened");

  document.addEventListener("keyup", closePopupEsc);
  document.addEventListener("mousedown", closePopupMousedown);
}

function closePopup(tag) {
  tag.classList.remove("popup_opened");

  document.removeEventListener("keyup", closePopupEsc);
  document.removeEventListener("mousedown", closePopupMousedown);
}

function submitForm(event) {
  event.preventDefault();
  title.textContent = nameField.value;
  subtitle.textContent = infoField.value;
  closePopup(profilePopup);
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
  showPopup(imagePopup);
  imgWindow.src = link;
  imgWindow.setAttribute("alt", `${name}`);
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
  showPopup(profilePopup);
});
popupClose.addEventListener("click", function () {
  closePopup(profilePopup);
});
imgClose.addEventListener("click", function () {
  closePopup(imagePopup);
});
form.addEventListener("submit", submitForm);
formAdd.addEventListener("submit", submitAdd);
