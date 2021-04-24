import Card from "../components/Card.js";
import { buttonLoadingText, buttonDeleteText } from "./constants.js";

const createCard = (
  data,
  cardConfig,
  popupImageOpen,
  confirmDeletePopup,
  toggleLike
) => {
  return new Card(
    data,
    cardConfig,
    popupImageOpen,
    confirmDeletePopup,
    toggleLike
  );
};

const renderLoading = (isLoading, classSelector) => {
  const submitButton = classSelector.querySelector(".popup__submit");
  if (isLoading) {
    submitButton.textContent = "Сохранить";
  } else {
    submitButton.textContent = buttonLoadingText;
  }
};

export { createCard, renderLoading };
