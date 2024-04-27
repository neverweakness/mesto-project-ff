import { initialCards } from "../cards.js";
import { cardTemplate, cardsContainer } from "../index.js";
import { openModal } from "../components/modal.js";

export function createCard(cardName, cardLink, onDelete) {
  const clonedElement = cardTemplate.content.cloneNode(true);
  const card = clonedElement.querySelector(".card");
  const titleCard = clonedElement.querySelector(".card__title");
  titleCard.textContent = cardName;
  const imageCard = clonedElement.querySelector(".card__image");
  imageCard.src = cardLink;
  imageCard.alt = cardName;
  imageCard.addEventListener("click", function () {
    openModal(imageCard);
  });
  const deleteButton = clonedElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(card));
  const likeButton = clonedElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  return clonedElement;
}

export function renderInitialCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, deleteCard);
    cardsContainer.appendChild(cardElement);
  });
}

export function deleteCard(card) {
  card.remove();
}

function likeCard(event) {
  const card = event.target.closest(".card");
  const likeButton = card.querySelector(".card__like-button");
  likeButton.classList.add("card__like-button_is-active");
}

