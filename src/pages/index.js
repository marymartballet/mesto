import "./index.css";

import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithFrom from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { createCard } from "../scripts/utils/utils";

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
  userInfoConfig,
} from "../scripts/utils/constants.js";

const userInfo = new UserInfo(userInfoConfig);
const defaultCardSection = new Section(
  {
    data: initialCards,
    renderer: (card) => {
      const cardTemplate = createCard(card, "#card", popupImage.open);
      const result = cardTemplate.setTemplate();
      defaultCardSection.addItem(result);
    },
  },
  cardSelector
);
const editProfileFormValidator = new FormValidator(validationConfig, form);
const addCardFormValidator = new FormValidator(validationConfig, formAdd);
const popupImage = new PopupWithImage(imagePopup);
const popupEditProfile = new PopupWithFrom(profilePopup, (event) => {
  event.preventDefault();
  userInfo.setUserInfo(nameField.value, infoField.value);
  popupEditProfile.close();
});
const popupAddForm = new PopupWithFrom(popupAdd, (event) => {
  event.preventDefault();
  const name = popupAddTitle.value;
  const link = popupAddLink.value;
  const resultCard = createCard({ name, link }, "#card", popupImage.open);
  const inactiveClass = validationConfig.inactiveButtonClass;

  cardSection.prepend(resultCard.setTemplate());
  submitButton.setAttribute("disabled", "true");
  submitButton.classList.add(inactiveClass);
  popupAddForm.close();
});

addButton.addEventListener("click", function () {
  addCardFormValidator.checkForm();
  popupAddForm.open();
});
editButton.addEventListener("click", function () {
  const currentUserInfo = userInfo.getUserInfo();
  nameField.value = currentUserInfo.name;
  infoField.value = currentUserInfo.description;
  editProfileFormValidator.checkForm();
  popupEditProfile.open();
});
imgClose.addEventListener("click", function () {
  popupImage.close();
});

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
defaultCardSection.renderItems();
