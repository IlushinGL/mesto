import {elementsInBox, validationConfig} from './constant.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const elementsSection = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');
const profileTextAuthor = document.querySelector('#profile-text-author');
const profileTextJob = document.querySelector('#profile-text-job');

const cardUser = document.querySelector('#card-user');
const formUser = cardUser.querySelector(validationConfig.formSelector);
const inputUserName = formUser.querySelector('#input-user-name');
const inputUserJob = formUser.querySelector('#input-user-job');

const cardPlace = document.querySelector('#card-place');
const formPlace = cardPlace.querySelector(validationConfig.formSelector);
const inputPlaceName = formPlace.querySelector('#input-place-name');
const inputPlaceLink = formPlace.querySelector('#input-img-link');

const cardImage = document.querySelector('#card-image');
const imgCurrent = cardImage.querySelector('.popup__image');

const buttonCloseList = document.querySelectorAll('.popup__close');

const placeTemplateId = '#template-element';

function putElementsFromBox() {
  elementsInBox.forEach((item) => {
    const card = new Card(placeTemplateId, clickPicture);
    elementsSection.append(card.createCard(item.name, item.link));
  });
}

function openPopup(popupCard) {
  popupCard.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popupCard) {
  popupCard.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeClosestPopup(evt) {
  closePopup(evt.target.closest('.popup'));
}

function clickPlaceAddBtn() {
  formPlace.reset();
  placeValidator.toggleButtonState();
  placeValidator.clearAllErr();
  openPopup(cardPlace);
}

function clickPicture(name, link) {
  cardImage.querySelector('.popup__title').textContent = name;
  imgCurrent.src = link;
  imgCurrent.alt = name;
  openPopup(cardImage);
}

function clickProfileEditBtn() {
  userValidator.toggleButtonState();
  userValidator.clearAllErr();
  inputUserName.value = profileTextAuthor.textContent;
  inputUserJob.value = profileTextJob.textContent;
  openPopup(cardUser);
}

function clickPopupOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closeClosestPopup(evt);
  }
}

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  profileTextAuthor.textContent = inputUserName.value;
  profileTextJob.textContent = inputUserJob.value;
  closePopup(cardUser);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(placeTemplateId, clickPicture);
  elementsSection.prepend(card.createCard(inputPlaceName.value, inputPlaceLink.value));
  closePopup(cardPlace);
}

profileEditButton.addEventListener('click', clickProfileEditBtn);
placeAddButton.addEventListener('click', clickPlaceAddBtn);

formUser.addEventListener('submit', handleUserFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', clickPopupOverlay);
  btn.addEventListener('click', () => closePopup(popup));
})

putElementsFromBox();
const userValidator = new FormValidator(validationConfig, formUser);
const placeValidator = new FormValidator(validationConfig, formPlace);
userValidator.enableValidation();
placeValidator.enableValidation();
