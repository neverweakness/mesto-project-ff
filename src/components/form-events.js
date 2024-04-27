import { profileInfo } from "../index.js";
import { closeModal } from "./modal.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

export function updateFormValues() {
  profileInfo.elements.name.value = profileTitle.textContent;
  profileInfo.elements.description.value = profileDescription.textContent;
}

export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileInfo.elements.name.value;
  profileDescription.textContent = profileInfo.elements.description.value;
  closeModal();
}
