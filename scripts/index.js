import { initialCards } from "./cards.js";

const cardTemplate = document.getElementById("card-template");

function createCard(cardName, cardLink, onDelete) {
  const clonedElement = cardTemplate.content.cloneNode(true);
  const card = clonedElement.querySelector(".card");
  const titleCard = clonedElement.querySelector(".card__title");
  titleCard.textContent = cardName;
  const imageCard = clonedElement.querySelector(".card__image");
  imageCard.src = cardLink;
  imageCard.alt = cardName;
  const deleteButton = clonedElement.querySelector(".card__delete-button")
  deleteButton.addEventListener("click", () => onDelete(card))
  return clonedElement;
}

function renderInitialCards() {
  const cardsContainer = document.querySelector(".places__list");
  initialCards.forEach(card => {
    const cardElement = createCard(card.name, card.link, deleteCard);
    cardsContainer.appendChild(cardElement);
  });
}
renderInitialCards();

function deleteCard(card) {
    card.remove();
  }
