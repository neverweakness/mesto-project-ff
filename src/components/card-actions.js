import { newCardInfo, cardsContainer } from "../index.js";
import { deleteCard, createCard } from "./card.js";
import { closeModal } from "./modal.js"

export function addCards(evt) {
  evt.preventDefault();
  const titleCard = newCardInfo.elements["place-name"].value;
  const imageCard = newCardInfo.elements.link.value;
  const cardElement = createCard(titleCard, imageCard, deleteCard);
  cardsContainer.prepend(cardElement);
  closeModal()
  newCardInfo.elements["place-name"].value = ''
  newCardInfo.elements.link.value = ''
}