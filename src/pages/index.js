import "./index.css";

import Api from "../scripts/components/Api.js";
import PopupConfirm from "../scripts/components/PopupConfirm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { createCard, renderLoading } from "../scripts/utils/utils.js";

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
      const cardTemplate = createCard(
        data,
        cardConfig,
        popupImage.open,
        confirmDeletePopup.open,
        {
          handlerLike: (id, isLiked) => {
            api
              .toggleLike(id, isLiked)
              .then((res) => {
                isLiked = !isLiked;
                const likes = res.likes.length;
                cardTemplate.setLike(isLiked, likes);
              })
              .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
              });
          },
        }
      );
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
  renderLoading(false, profilePopup);
  event.preventDefault();
  api
    .patchUserInfo(values)
    .then(() => {
      userInfo.setUserInfo(values);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
      popupEditProfile.showResponseError(err);
    })
    .finally(() => {
      renderLoading(true, profilePopup);
    });
});
const popupAvatar = new PopupWithForm(popupAvatarSelector, (event, values) => {
  renderLoading(false, popupAvatarSelector);
  event.preventDefault();
  api
    .updateAvatar(values.avatar)
    .then(() => {
      userInfo.setUserInfo(values);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
      popupAvatar.showResponseError(err);
    })
    .finally(() => {
      renderLoading(true, popupAvatarSelector);
    });
});
const popupAddForm = new PopupWithForm(popupAdd, (event, values) => {
  renderLoading(false, popupAdd);
  event.preventDefault();
  const data = {};
  data.name = values.name;
  data.link = values.link;
  data.isOwn = true;

  api
    .postCard(data)
    .then((res) => {
      const newCard = createCard(
        data,
        cardConfig,
        popupImage.open,
        confirmDeletePopup.open,
        {
          handlerLike: (id, isLiked) => {
            api
              .toggleLike(id, isLiked)
              .then((res) => {
                isLiked = !isLiked;
                const likes = res.likes.length;
                newCard.setLike(isLiked, likes);
              })
              .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
              });
          },
        }
      );
      newCard.id = res._id;
      newCard._author = res.owner.name;
      const cardElement = newCard.setTemplate();
      defaultCardSection.addItem(cardElement);
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
      popupAddForm.showResponseError(err);
    })
    .finally(() => {
      renderLoading(true, popupAdd);
    });
});
const confirmDeletePopup = new PopupConfirm(
  popupConfirmDeleteSelector,
  (cardId) => {
    renderLoading(false, popupConfirmDeleteSelector);
    api
      .deleteCard(cardId)
      .then(() => {
        confirmDeletePopup.card.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        confirmDeletePopup.showResponseError(err);
      })
      .finally(() => {
        renderLoading(true, popupConfirmDeleteSelector);
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
      const card = createCard(
        data,
        cardConfig,
        popupImage.open,
        confirmDeletePopup.open,
        {
          handlerLike: (id, isLiked) => {
            api
              .toggleLike(id, isLiked)
              .then((res) => {
                isLiked = !isLiked;
                const likes = res.likes.length;
                card.setLike(isLiked, likes);
              })
              .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
              });
          },
        }
      );
      cardSection.append(card.setTemplate());
    });
  })
  .catch((err) => {
    console.log(`Что-то пошло не так: ${err}`);
  });
