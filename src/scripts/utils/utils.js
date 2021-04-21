import Card from "../components/Card.js";

const createCard = (card, cardSelector, popupImageOpen) => {
  return new Card(card, cardSelector, popupImageOpen);
};

export { createCard };
