import { initialCards } from "./cards.js";

const cardTemplate = document.getElementById("card-template");

function createCard(cardName, cardLink) {
  const clonedElement = cardTemplate.content.cloneNode(true);
  const titleCard = clonedElement.querySelector(".card__title");
  titleCard.textContent = cardName;
  const imageCard = clonedElement.querySelector(".card__image");
  imageCard.src = cardLink;
  imageCard.alt = cardName;
  const deleteButton = clonedElement.querySelector(".card__delete-button")
  deleteButton.addEventListener("click", deleteCard)
  return clonedElement;
}

function renderInitialCards() {
  const cardsContainer = document.querySelector(".places__list");
  initialCards.forEach(card => {
    const cardElement = createCard(card.name, card.link);
    cardsContainer.appendChild(cardElement);
  });
}
renderInitialCards();

function deleteCard(event) {
  const card = event.target.closest(".card");
  if (card) {
    card.remove();
  }
}