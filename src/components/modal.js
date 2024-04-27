import {
  popupEdit,
  popupAdd,
  editButton,
  addButton,
  popupImage,
} from "../index.js";
import { updateFormValues } from "./form-events.js";

export function openModal(evt) {
  if (evt.target == editButton) {
    popupEdit.classList.add("popup_is-opened");
    popupEdit.addEventListener("click", overlayClickHandler);
    updateFormValues();
  } else if (evt.target === addButton) {
    popupAdd.classList.add("popup_is-opened");
    popupAdd.addEventListener("click", overlayClickHandler);
  } else if (evt.classList.value == "card__image") {
    popupImage.classList.add("popup_is-opened");
    const currentPopup = document.querySelector(".popup_is-opened");
    const currentImage = document.querySelector(".popup__image");
    const popupCaption = currentPopup.querySelector('.popup__caption')
    currentImage.src = evt.src;
    popupCaption.textContent = evt.alt
    popupImage.addEventListener("click", overlayClickHandler);
  }
  document.addEventListener("keydown", escapeKeyHandler);
}

export function closeModal() {
  const currentPopup = document.querySelector(".popup_is-opened");
  currentPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeKeyHandler);
}

function overlayClickHandler(evt) {
  if (
    evt.target.classList.value.includes("popup_is-opened") ||
    evt.target.classList.value.includes("popup__close")
  ) {
    closeModal();
  }
}

function escapeKeyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(evt);
  }
}
