import "../pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  handleFormSubmit,
  updateFormValues,
} from "./components/form-events.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  fetchUserInfo,
  getInitialCards,
  deleteCard,
  updateUserInfo,
  APICreateCard,
  likeCard,
  disLikeCard,
  updateUserAvatar,
} from "./api.js";

const typeImage = document.querySelector(".popup_type_image");
const cardsContainer = document.querySelector(".places__list");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const profileForm = document.forms["edit-profile"];
const newCardInfo = document.forms["new-place"];
const formSubmitButton = profileForm.querySelector(".popup__button");
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = newCardInfo.elements["place-name"];
const profileLinkInput = newCardInfo.elements.link;
const cardTemplate = document.querySelector("#card-template").content;
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const authorName = document.querySelector(".profile__title");
const authorDescription = document.querySelector(".profile__description");
const authorImage = document.querySelector(".profile__image");
const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button_confirm");
const profileImageForm = document.forms["edit-avatar"];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
  profileImageForm.querySelector(".popup__button");
const profileImage = document.querySelector(".profile__image");
const popupProfileImage = document.querySelector(".popup_type_edit-avatar");
profileImageForm.addEventListener("submit", handleProfileImageFormSubmit);
profileImage.addEventListener("click", handleProfileImageClick);
profileForm.addEventListener("submit", handleProfileFormSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
editButton.addEventListener("click", function () {
  clearValidation(profileForm, validationConfig);
  updateFormValues();
  openModal(popupEdit);
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function () {
  openModal(popupAdd);
});

export const profileInfo = document.forms["edit-profile"];
profileInfo.addEventListener("submit", handleFormSubmit);

newCardInfo.addEventListener("submit", handleCardFormSubmit);

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains("card__like-button_is-active")) {
    disLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove("card__like-button_is-active");

        if (likes.length) {
          counterElement.classList.add("card__like-counter_is-active");
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove("card__like-counter_is-active");
          counterElement.textContent = "";
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    likeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add("card__like-button_is-active");

        counterElement.classList.add("card__like-counter_is-active");
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

function handleProfileImageFormSubmit(event) {
  event.preventDefault();
  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  updateUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
}

function handleProfileImageClick() {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupProfileImage);
}

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openImagePopup(popupImage, popupImage, typeImage, popupImageCaption);
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    deleteCard(cardId)
      .then(() => {
        buttonElement.closest(".card").remove();

        closeModal(popupConfirm);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

function handleCardFormSubmit(event) {
  event.preventDefault();
  renderLoading({
    buttonElement: formSubmitButton,
    isLoading: true,
  });

  APICreateCard({
    name: profileDescriptionInput.value,
    link: profileLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        createCard({
          currentUserId: cardData.owner["_id"],
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );

      newCardInfo.reset();
      closeModal();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: formSubmitButton,
        isLoading: false,
      });
    });
}

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: formSubmitButton,
    isLoading: true,
  });

  updateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });
      closeModal();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: formSubmitButton,
        isLoading: false,
      });
    });
};

function openImagePopup(cardImg, popupImage, typeImage, popupImageCaption) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = popupImage.alt;
  openModal(typeImage);
}

const forms = document.querySelectorAll(".popup__form");
forms.forEach((form) => {
  enableValidation(validationConfig);
});

const setProfile = ({ name, description, avatar }) => {
  authorName.textContent = name;
  authorDescription.textContent = description;
  authorImage.style.backgroundImage = `url(${avatar})`;
};

Promise.all([fetchUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ["_id"]: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
