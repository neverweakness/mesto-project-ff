import { newCardInfo, cardsContainer, typeImage, openImagePopup, popupImage, popupImageCaption } from "../index.js";
import { deleteCard, createCard } from "./card.js";
import { closeModal } from "./modal.js";

export function addCards(evt) {
  evt.preventDefault();
  const titleCard = newCardInfo.elements["place-name"].value;
  const imageCard = newCardInfo.elements.link.value;
  const cardElement = createCard(
    titleCard,
    imageCard,
    deleteCard,
    openImagePopup,
    typeImage,
    popupImage,
    popupImageCaption
  );
  cardsContainer.prepend(cardElement);
  closeModal();
  evt.target.reset();
}
