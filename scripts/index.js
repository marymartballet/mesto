let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let title = document.querySelector(".profile__name");
let subtitle = document.querySelector(".profile__description");
let form = document.querySelector(".popup__form");
let nameField = document.querySelector(".popup__input_type_name");
let infoField = document.querySelector(".popup__input_type_info");
function showPopup() {
  popup.classList.add("popup_opened");
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
editButton.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
form.addEventListener("submit", submitForm);
