import { profileInfo } from "../index.js";
import { closeModal } from "./modal.js";

export function updateFormValues() {
  profileInfo.elements.name.value =
    document.querySelector(".profile__title").textContent;
  profileInfo.elements.description.value = document.querySelector(
    ".profile__description"
  ).textContent;
}

export function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent =
    profileInfo.elements.name.value;
  document.querySelector(".profile__description").textContent =
    profileInfo.elements.description.value;
  closeModal();
}
