import {placesArray} from '../utils/placesArray.js';
import {
  sectionCardsOfPlacesSelector,
  templateCardOfPlaceSelector,
  popupCardOfPlaceSelector,
  popupNewPlaceFormSelector,
  popupEditUserFormSelector,
  currentUserDataSelectors,
  inputsUserFormFields,
  inputsPlaceFormFields,
} from '../utils/constants.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';

const placeAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const sectionCardsOfPlaces = new Section({items: placesArray, renderer: createCardOfPlace}, sectionCardsOfPlacesSelector);
const popupCardOfPlace = new PopupWithImage(popupCardOfPlaceSelector);
const popupNewPlaceForm = new PopupWithForm(popupNewPlaceFormSelector, handleNewPlaceFormSubmit);
const popupEditUserForm = new PopupWithForm(popupEditUserFormSelector, handleEditUserFormSubmit);
const currentUserData = new UserInfo(currentUserDataSelectors);

placeAddButton.addEventListener('click', handleClickPlaceAddBtn);
profileEditButton.addEventListener('click', handleClickProfileEditBtn);
sectionCardsOfPlaces.renderItems();
popupEditUserForm.setEventListeners();
popupNewPlaceForm.setEventListeners();

function createCardOfPlace(data, position) {
  // Если position пропущена или false, то карточка добавляется в конец, иначе - в начало
  const card = new Card(data, templateCardOfPlaceSelector, handleCardOfPlaceClickImage);
  sectionCardsOfPlaces.addItem(card.generateCard(), position);
}

function handleCardOfPlaceClickImage(src, title) {
  popupCardOfPlace.open(src, title);
}

function handleClickPlaceAddBtn() {
  popupNewPlaceForm.open();
}

function handleClickProfileEditBtn() {
  const {name, about} = currentUserData.getUserInfo();
  document.querySelector('#' + inputsUserFormFields.name).value = name;
  document.querySelector('#' + inputsUserFormFields.about).value = about;
  popupEditUserForm.open();
}

function handleEditUserFormSubmit(evt, data) {
  evt.preventDefault();
  currentUserData.setUserInfo({
    name: data[inputsUserFormFields.name],
    about: data[inputsUserFormFields.about],
  });
  popupEditUserForm.close();
}

function handleNewPlaceFormSubmit(evt, data) {
  evt.preventDefault();
  createCardOfPlace({
    src: data[inputsPlaceFormFields.src],
    title: data[inputsPlaceFormFields.title],
  }, true);
  popupNewPlaceForm.close();
}
