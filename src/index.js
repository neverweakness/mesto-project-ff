import "../pages/index.css";
import { createCard, deleteCard } from "./components/card.js";
import { openModal } from "./components/modal.js";
import { handleFormSubmit } from "./components/form-events.js";
import { addCards } from "./components/card-actions.js";
import { initialCards } from "./cards.js";

export const typeImage = document.querySelector(".popup_type_image");
export const cardsContainer = document.querySelector(".places__list");
export const popupImageCaption = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function() {
  openModal(popupEdit);
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function() {
  openModal(popupAdd);
});

export const profileInfo = document.forms["edit-profile"];
profileInfo.addEventListener("submit", handleFormSubmit);

export const newCardInfo = document.forms["new-place"];
newCardInfo.addEventListener("submit", addCards);

function renderInitialCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, deleteCard, openImagePopup, typeImage, popupImage, popupImageCaption);
    cardsContainer.appendChild(cardElement);
  });
}

renderInitialCards();

export function openImagePopup(
  cardImg,
  popupImage,
  typeImage,
  popupImageCaption
) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = popupImage.alt;
  openModal(typeImage);
}

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// Чтобы было чуточку понятнее: вызов функции создания карточки должен находиться в файле index.js, но само объявление функции — в card.js. Используйте директивы export/import.
