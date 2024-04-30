import { updateFormValues } from "./form-events.js";

export function openModal(currentPopup) {
  currentPopup.classList.add("popup_is-opened");
  currentPopup.addEventListener("click", handleOverlayClick);
  updateFormValues();
  document.addEventListener("keydown", escapeKeyHandler);
}

export function closeModal() {
  const currentPopup = document.querySelector(".popup_is-opened");
  currentPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeKeyHandler);
}

function handleOverlayClick(evt) {
  evt.target.removeEventListener("click", handleOverlayClick);
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
