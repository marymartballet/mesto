import "./index.css";

import Api from "../scripts/components/Api.js";
import PopupConfirm from "../scripts/components/PopupConfirm.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { createCard } from "../scripts/utils/utils.js";

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
  formAdd,
  form,
  imagePopup,
  imgClose,
  cardSection,
  userInfoConfig,
  cardConfig,
  popupAvatarForm,
  popupAvatarSelector,
  popupConfirmDeleteSelector,
  updateAvatarButton,
} from "../scripts/utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
  authorization: "6287cbbf-a12f-47ed-a5b5-3bacc34a49f8",
});
const userInfo = new UserInfo(userInfoConfig);
const defaultCardSection = new Section(
  {
    data: initialCards,
    renderer: (card) => {
      const cardTemplate = createCard(card, cardConfig, popupImage.open);
      const result = cardTemplate.setTemplate();
      defaultCardSection.addItem(result);
    },
  },
  cardSelector
);
const editProfileFormValidator = new FormValidator(validationConfig, form);
const addCardFormValidator = new FormValidator(validationConfig, formAdd);
const popupImage = new PopupWithImage(imagePopup);
const popupEditProfile = new PopupWithForm(profilePopup, (event, values) => {
  event.preventDefault();
  popupEditProfile.renderLoading(true);
  api
    .patchUserInfo(values)
    .then(() => {
      userInfo.setUserInfo(values);
      popupEditProfile.renderLoading(false);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
      popupEditProfile.showResponseError(err);
    });
});
const popupAvatar = new PopupWithForm(popupAvatarSelector, (event, values) => {
  event.preventDefault();
  popupAvatar.renderLoading(true);
  api
    .updateAvatar(values.avatar)
    .then(() => {
      userInfo.setAvatar(values.avatar);
      popupAvatar.renderLoading(false);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
      popupAvatar.showResponseError(err);
    });
});
const popupAddForm = new PopupWithForm(popupAdd, (event, values) => {
  event.preventDefault();
  popupAddForm.renderLoading(true);
  const data = {};
  data.name = values.name;
  data.link = values.link;
  data.isOwn = true;

  api
    .postCard(data)
    .then((res) => {
      const newCard = new Card(
        data,
        cardConfig,
        popupImage.open,
        confirmDeletePopup.open,
        api.toggleLike
      );
      newCard.id = res._id;
      newCard._author = res.owner.name;
      const cardElement = newCard.setTemplate();
      defaultCardSection.addItem(cardElement);
      popupAddForm.renderLoading(false);
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
      popupAddForm.showResponseError(err);
    });
});
const confirmDeletePopup = new PopupConfirm(
  popupConfirmDeleteSelector,
  (cardId) => {
    confirmDeletePopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        confirmDeletePopup.card.removeCard();
        confirmDeletePopup.renderLoading(false);
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        confirmDeletePopup.showResponseError(err);
      });
  }
);
const avatarValidator = new FormValidator(validationConfig, popupAvatarForm);

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
updateAvatarButton.addEventListener("click", function () {
  avatarValidator.checkForm();
  popupAvatar.open();
});

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    const externalUserInfo = {};
    externalUserInfo.name = userData.name;
    externalUserInfo.info = userData.about;
    externalUserInfo.avatar = userData.avatar;
    const userId = userData._id;
    userInfo.setUserInfo(externalUserInfo);
    initialCards.forEach((cardObject) => {
      const data = {
        cardId: cardObject._id,
        isOwn: cardObject.owner._id === userId ? true : false,
        likes: cardObject.likes.length,
        isLiked: false,
        author: cardObject.owner.name,
        name: cardObject.name,
        link: cardObject.link,
      };
      if (cardObject.likes.some((like) => like._id === userId)) {
        data.isLiked = true;
      }
      const card = new Card(
        data,
        cardConfig,
        popupImage.open,
        confirmDeletePopup.open,
        api.toggleLike
      );
      cardSection.prepend(card.setTemplate());
    });
  })
  .catch((err) => {
    console.log(`Что-то пошло не так: ${err}`);
  });
