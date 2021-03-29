import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationConfig } from "../utils/formConfig.js";
import { initialCards } from "../utils/initial-сards.js";

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
const submitButton = document.querySelector("#create-button");
const cardSection = document.querySelector(".elements");
initialCards.forEach(function (card) {
  const cardTemplate = new Card(card, "#card", showPopup);
  const result = cardTemplate.setTemplate();
  cardSection.appendChild(result);
});

const formValid = new FormValidator(validationConfig, form);
const formAddValid = new FormValidator(validationConfig, formAdd);
formValid.enableValidation();
formAddValid.enableValidation();

function closePopupMousedown(event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
}

function closePopupEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

function showPopup(tag) {
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
  const name = popupAddTitle.value;
  const link = popupAddLink.value;
  const resultCard = new Card({ name, link }, "#card", showPopup);
  const inactiveClass = validationConfig.inactiveButtonClass;

  cardSection.prepend(resultCard.setTemplate());
  formAdd.reset();
  submitButton.setAttribute("disabled", "true");
  submitButton.classList.add(inactiveClass);
  closePopup(popupAdd);
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
