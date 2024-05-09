import { newCardInfo, cardsContainer, typeImage, openImagePopup, popupImage, popupImageCaption, profileForm, validationConfig } from "../index.js";
import { createCard } from "./card.js";
import { closeModal } from "./modal.js";
import { clearValidation } from "./validation.js";

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
  clearValidation(profileForm, validationConfig);
  evt.target.reset();
}
