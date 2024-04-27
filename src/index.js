import "../pages/index.css";
import { createCard, renderInitialCards } from "./components/card.js";
import { openModal } from "./components/modal.js";
import { handleFormSubmit } from "./components/form-events.js";
import { addCards } from "./components/card-actions.js";

export const cardTemplate = document.getElementById("card-template");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const cardsContainer = document.querySelector(".places__list");
export const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", openModal);

export const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", openModal);

export const profileInfo = document.forms["edit-profile"];
profileInfo.addEventListener("submit", handleFormSubmit);

export const newCardInfo = document.forms["new-place"];
newCardInfo.addEventListener("submit", addCards);

createCard();
renderInitialCards();

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// Чтобы было чуточку понятнее: вызов функции создания карточки должен находиться в файле index.js, но само объявление функции — в card.js. Используйте директивы export/import.
