import { newCardInfo, cardsContainer, popupImage } from "../index.js";
import { deleteCard, createCard } from "./card.js";
import { closeModal, openModal } from "./modal.js";

export function addCards(evt) {
  evt.preventDefault();
  const titleCard = newCardInfo.elements["place-name"].value;
  const imageCard = newCardInfo.elements.link.value;
  const cardElement = createCard(
    titleCard,
    imageCard,
    deleteCard,
    openModal,
    popupImage
  );
  cardsContainer.prepend(cardElement);
  closeModal();
  evt.target.reset();
}
