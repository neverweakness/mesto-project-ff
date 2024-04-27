import { updateFormValues } from "./form-events.js";

export function openModal(currentPopup, imageCard, imageCaption) {
  currentPopup.classList.add("popup_is-opened");
  currentPopup.addEventListener("click", overlayClickHandler);
  updateFormValues();
  if (imageCard) {
    const currentImage = currentPopup.querySelector(".popup__image");
    const currentCaption = currentPopup.querySelector(".popup__caption");
    currentCaption.textContent = imageCaption;
    currentImage.src = imageCard.src;
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
    evt.target.removeEventListener("click", overlayClickHandler);
    closeModal();
  }
}

function escapeKeyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(evt);
  }
}
