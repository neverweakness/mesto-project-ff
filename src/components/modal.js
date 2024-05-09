export function openModal(currentPopup) {
  currentPopup.classList.add("popup_is-opened");
  currentPopup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", escapeKeyHandler);
}

export function closeModal() {
  const currentPopup = document.querySelector(".popup_is-opened");
  console.log(currentPopup)
  currentPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeKeyHandler);
  currentPopup.removeEventListener("click", handleOverlayClick);
}

function handleOverlayClick(evt) {
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
