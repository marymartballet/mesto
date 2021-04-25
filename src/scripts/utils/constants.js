//Данные карточек
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

//Конфиг константы
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_text-error",
  inactiveButtonClass: "popup__submit_inactive",
};
const userInfoConfig = {
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
};

//Селекторы
const imagePopup = document.querySelector(".popup_image");
const profilePopup = document.querySelector("#edit");
const popupAdd = document.querySelector(".popup_add");
const popupConfirmDeleteSelector = document.querySelector(".popup_delete");
const cardConfig = "#card";
const cardSelector = ".elements";

//Формы
const formAdd = document.querySelector(".popup__form_add");
const form = document.querySelector(".popup__form");
const popupAvatarForm = document.querySelector(".popup__form_avatar");
const popupAvatarSelector = document.querySelector(".popup_avatar");
const popupDelete = document.querySelector(".popup_delete");

//Сабмиты для вывода ошибок
const addSubmit = formAdd.querySelector(".popup__submit");
const editSubmit = form.querySelector(".popup__submit");
const avatarSubmit = popupAvatarForm.querySelector(".popup__submit");
const deleteSubmit = popupDelete.querySelector(".popup__submit");

//Константы для слушателей
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imgClose = document.querySelector(".popup__close_img");
const submitButton = document.querySelector("#create-button");
const updateAvatarButton = document.querySelector(".profile__avatar-button");

//Вспомогательные константы
const nameField = document.querySelector(".popup__input_type_name");
const infoField = document.querySelector(".popup__input_type_info");
const popupAddTitle = document.querySelector(".popup__input_add-title");
const popupAddLink = document.querySelector(".popup__input_add-link");
const cardSection = document.querySelector(".elements");
const buttonLoadingText = "Сохранение...";

export {
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
  cardConfig,
  popupAvatarForm,
  popupAvatarSelector,
  popupConfirmDeleteSelector,
  updateAvatarButton,
  buttonLoadingText,
  addSubmit,
  editSubmit,
  avatarSubmit,
  deleteSubmit,
};
