import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithFrom from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import {
  initialCards,
  validationConfig,
  cardSelector,
  profilePopup,
  editButton,
  nameField,
  infoField,
  addButton,
  popupAdd,
  popupAddTitle,
  popupAddLink,
  formAdd,
  form,
  imagePopup,
  imgClose,
  submitButton,
  cardSection,
} from "../scripts/utils/constants.js";

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
});
const defaultCardSection = new Section(
  {
    data: initialCards,
    renderer: (card) => {
      const cardTemplate = new Card(card, "#card", popupImage.open);
      const result = cardTemplate.setTemplate();
      defaultCardSection.addItem(result);
    },
  },
  cardSelector
);
const formValid = new FormValidator(validationConfig, form);
const formAddValid = new FormValidator(validationConfig, formAdd);
const popupImage = new PopupWithImage(imagePopup);
const popupForm = new PopupWithFrom(profilePopup, (event) => {
  event.preventDefault();
  userInfo.setUserInfo(nameField.value, infoField.value);
  popupForm.close();
});
const popupAddForm = new PopupWithFrom(popupAdd, (event) => {
  event.preventDefault();
  const name = popupAddTitle.value;
  const link = popupAddLink.value;
  const resultCard = new Card({ name, link }, "#card", popupImage.open);
  const inactiveClass = validationConfig.inactiveButtonClass;

  cardSection.prepend(resultCard.setTemplate());
  submitButton.setAttribute("disabled", "true");
  submitButton.classList.add(inactiveClass);
  popupAddForm.close();
});

addButton.addEventListener("click", function () {
  popupAddForm.open();
});
editButton.addEventListener("click", function () {
  const currentUserInfo = userInfo.getUserInfo();
  nameField.value = currentUserInfo.name;
  infoField.value = currentUserInfo.description;
  popupForm.open();
});
imgClose.addEventListener("click", function () {
  popupImage.close();
});

formValid.enableValidation();
formAddValid.enableValidation();
defaultCardSection.renderItems();
