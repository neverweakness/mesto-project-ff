import "../pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { handleFormSubmit, updateFormValues } from "./components/form-events.js";
import { addCards } from "./components/card-actions.js";
import { initialCards } from "./cards.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import { fetchUserInfo, getInitialCards, deleteCard, updateUserInfo } from "./api.js";

export const typeImage = document.querySelector(".popup_type_image");
export const cardsContainer = document.querySelector(".places__list");
export const popupImageCaption = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");
export const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;
const cardTemplate = document.querySelector('#card-template').content;
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const authorName = document.querySelector('.profile__title')
const authorDescription = document.querySelector('.profile__description')
const authorImage = document.querySelector('.profile__image')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
editButton.addEventListener("click", function() {
  clearValidation(profileForm, validationConfig);
  updateFormValues()
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
    // const cardElement = createCard(card.name, card.link, deleteCard, openImagePopup, typeImage, popupImage, popupImageCaption);
    // cardsContainer.appendChild(cardElement);
  });
}

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

renderInitialCards();

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIUnLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove('card__like-button_is-active');

        if (likes.length) {
          counterElement.classList.add('card__like-counter_is-active');
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove('card__like-counter_is-active');
          counterElement.textContent = '';
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add('card__like-button_is-active');

        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
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
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      });
    });
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

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

const forms = document.querySelectorAll('.popup__form');
forms.forEach((form) => {
  enableValidation(validationConfig);
});

const setProfile = ({ name, description, avatar }) => {
  authorName.textContent = name;
  authorDescription.textContent = description;
  authorImage.style.backgroundImage = `url(${avatar})`;
};

Promise.all([fetchUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
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
          onDelete: deleteCard,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.log(error)
  });