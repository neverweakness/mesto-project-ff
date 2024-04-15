import { initialCards } from "./cards.js";

const cardTemplate = document.getElementById("card-template");

function createCard(cardName, cardLink) {
  const clonedElement = cardTemplate.content.cloneNode(true);
  const titleCard = clonedElement.querySelector(".card__title");
  titleCard.textContent = cardName;
  const imageCard = clonedElement.querySelector(".card__image");
  imageCard.src = cardLink;
  return clonedElement;
}

function renderCards() {
  const placesList = document.querySelector(".places__list");
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i].name, initialCards[i].link);
    placesList.appendChild(cardElement);
  }
}
renderCards();

function deleteButton(event) {
  const card = event.target.closest(".card");
  if (card) {
    card.remove();
  }
}

const deleteButtons = document.querySelectorAll(".card__delete-button");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteButton);
});
