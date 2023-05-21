// import {placesArray} from '../utils/placesArray.js';
import {
  sectionCardsOfPlacesSelector,
  templateCardOfPlaceSelector,
  popupCardOfPlaceSelector,
  popupNewPlaceFormSelector,
  popupEditUserFormSelector,
  currentUserDataSelectors,
  inputsUserFormFields,
  inputsPlaceFormFields,
  apiData} from '../utils/constants.js';
import {validateFormConfigObj} from '../utils/validateFormConfigObj.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import './index.css';

const placeAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const inputUserName = document.querySelector('#' + inputsUserFormFields.name);
const inputUserAbout = document.querySelector('#' + inputsUserFormFields.about);

const currentUserData = new UserInfo(currentUserDataSelectors);
const sectionCardsOfPlaces = new Section(sectionCardsOfPlacesSelector, createCardOfPlace);

const api = new Api(apiData);
const promisePlaces = api.getInitialCards()
  .then((data) => {
    const placesArray = data.map((item) => {
      return placeData(item);
    });
    sectionCardsOfPlaces.setItems(placesArray);
  })
  .catch((err) => {
    console.log(err);
  });

const promiseUser = api.getUserInfo()
  .then((data) => {
    currentUserData.setId(data._id);
    currentUserData.setUserInfo({
      name: data.name,
      about: data.about});
    currentUserData.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });


const popupCardOfPlace = new PopupWithImage(popupCardOfPlaceSelector);
const popupNewPlaceForm = new PopupWithForm(
  popupNewPlaceFormSelector,
  validateFormConfigObj.formSelector,
  validateFormConfigObj.inputSelector,
  handleNewPlaceFormSubmit);
const validatorPlaceForm = new FormValidator(
  validateFormConfigObj,
  popupNewPlaceForm.getForm());
const popupEditUserForm = new PopupWithForm(
  popupEditUserFormSelector,
  validateFormConfigObj.formSelector,
  validateFormConfigObj.inputSelector,
  handleEditUserFormSubmit);
const validatorUserForm = new FormValidator(
  validateFormConfigObj,
  popupEditUserForm.getForm());


placeAddButton.addEventListener('click', handleClickPlaceAddBtn);
profileEditButton.addEventListener('click', handleClickProfileEditBtn);

popupEditUserForm.setEventListeners();
validatorUserForm.enableValidation();

popupNewPlaceForm.setEventListeners();
validatorPlaceForm.enableValidation();

function placeData(item) {
  return {
    cardId: item._id,
    ownerId: item.owner._id,
    title: item.name,
    src: item.link,
    likes: item.likes.map(like => like._id)
  };
}

function createCardOfPlace(data, position) {
  // Если position пропущена или false, то карточка добавляется в конец, иначе - в начало
  const card = new Card(data, templateCardOfPlaceSelector, handleCardOfPlaceClickImage, handleCardDelete, handleCardLike);
  sectionCardsOfPlaces.addItem(card.generateCard(currentUserData.id), position);
}

function handleCardOfPlaceClickImage(src, title) {
  popupCardOfPlace.open(src, title);
}

function handleCardDelete(card) {
  api.deleteCard(card.cardId)
  .then(() => {
    card.removeCard();
    card = null;
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleCardLike(card, like) {
  api.likeCard(card.cardId, !like)
  .then((data) => {
    card.updateCard(data.likes.map(like => like._id));
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleClickPlaceAddBtn() {
  validatorPlaceForm.clearAllErr();
  validatorPlaceForm.toggleButtonState();
  popupNewPlaceForm.open();
}

function handleClickProfileEditBtn() {
  const {name, about} = currentUserData.getUserInfo();
  inputUserName.value = name;
  inputUserAbout.value = about;
  validatorUserForm.clearAllErr();
  validatorUserForm.toggleButtonState();
  popupEditUserForm.open();
}

function handleEditUserFormSubmit(evt, data) {
  evt.preventDefault();
  const inData = {
    name: data[inputsUserFormFields.name],
    about: data[inputsUserFormFields.about],
  };
  api.setUserInfo(inData)
  .then((outData) => {
    currentUserData.setUserInfo(outData);
    popupEditUserForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleNewPlaceFormSubmit(evt, data) {
  evt.preventDefault();
  const inData = {
    link: data[inputsPlaceFormFields.src],
    name: data[inputsPlaceFormFields.title],
  };
  api.addNewCard(inData)
  .then((outData) => {
    createCardOfPlace(placeData(outData), true);
    popupNewPlaceForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
}
