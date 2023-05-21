import {
  sectionCardsOfPlacesSelector,
  templateCardOfPlaceSelector,
  popupCardOfPlaceSelector,
  popupNewPlaceFormSelector,
  popupEditUserFormSelector,
  currentUserDataSelectors,
  inputsUserFormFields,
  inputsPlaceFormFields,
  popupUserAvatarFormSelector,
  inputsUserAvatarFormFields,
  popupDeleteFormSelector,
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

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');

const inputUserName = document.querySelector('#' + inputsUserFormFields.name);
const inputUserAbout = document.querySelector('#' + inputsUserFormFields.about);

const currentUserData = new UserInfo(currentUserDataSelectors);
const sectionCardsOfPlaces = new Section(sectionCardsOfPlacesSelector, createCardOfPlace);

const popupCardOfPlace = new PopupWithImage(popupCardOfPlaceSelector);

const popupDeleteForm = new PopupWithForm(
  popupDeleteFormSelector,
  validateFormConfigObj.formSelector,
  validateFormConfigObj.inputSelector,
  handleDeleteFormSubmit);

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

const popupUserAvatarForm = new PopupWithForm(
  popupUserAvatarFormSelector,
  validateFormConfigObj.formSelector,
  validateFormConfigObj.inputSelector,
  handleUserAvatarFormSubmit);
const validatorUserAvatarForm = new FormValidator(
  validateFormConfigObj,
  popupUserAvatarForm.getForm());

const butnProfileSubmit = popupEditUserForm.getForm().querySelector(validateFormConfigObj.submitButtonSelector);
const butnNewPlaceSubmit = popupNewPlaceForm.getForm().querySelector(validateFormConfigObj.submitButtonSelector);
const butnAvatarSubmit = popupUserAvatarForm.getForm().querySelector(validateFormConfigObj.submitButtonSelector);
const butnDeleteSubmit = popupDeleteForm.getForm().querySelector(validateFormConfigObj.submitButtonSelector);

profileAvatar.addEventListener('click', handleAvatarClick);
profileEditButton.addEventListener('click', handleClickProfileEditBtn);
placeAddButton.addEventListener('click', handleClickPlaceAddBtn);

popupEditUserForm.setEventListeners();
validatorUserForm.enableValidation();

popupNewPlaceForm.setEventListeners();
validatorPlaceForm.enableValidation();

popupUserAvatarForm.setEventListeners();
validatorUserAvatarForm.enableValidation();

popupDeleteForm.setEventListeners();

const api = new Api(apiData);
api.getInitialCards()
  .then((data) => {
    const placesArray = data.map((item) => placeData(item));
    sectionCardsOfPlaces.setItems(placesArray);
  })
  .catch((err) => {
    console.log(err);
  });

api.getUserInfo()
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

// парсинг данных карточки
function placeData(item) {
  return {
    cardId: item._id,
    ownerId: item.owner._id,
    title: item.name,
    src: item.link,
    likes: item.likes.map(like => like._id)
  };
}

// вывод карточки на экран
function createCardOfPlace(data, position) {
  // Если position пропущена или false, то карточка добавляется в конец, иначе - в начало
  const card = new Card(data, templateCardOfPlaceSelector, handleCardOfPlaceClickImage, handleCardDelete, handleCardLike);
  sectionCardsOfPlaces.addItem(card.generateCard(currentUserData.id), position);
}

// обработка удаления карточки
function handleCardDelete(card) {
  popupDeleteForm.data = card;
  butnDeleteSubmit.textContent = 'Да';
  popupDeleteForm.open();
}
function handleDeleteFormSubmit(evt, card) {
  evt.preventDefault();
  butnDeleteSubmit.textContent = 'Удаление...';
  api.deleteCard(card.cardId)
  .then(() => {
    card.removeCard();
    card = null;
    popupDeleteForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

// обработка лайка карточки
function handleCardLike(card, like) {
  api.likeCard(card.cardId, !like)
  .then((data) => {
    card.updateCard(data.likes.map(like => like._id));
  })
  .catch((err) => {
    console.log(err);
  })
}

// просмотр картинки
function handleCardOfPlaceClickImage(src, title) {
  popupCardOfPlace.open(src, title);
}

// обработка формы изменения аватара профиля
function handleAvatarClick() {
  validatorUserAvatarForm.clearAllErr();
  validatorUserAvatarForm.toggleButtonState();
  butnAvatarSubmit.textContent = 'Сохранить';
  popupUserAvatarForm.open();
}
function handleUserAvatarFormSubmit(evt, data) {
  evt.preventDefault();
  butnAvatarSubmit.textContent = 'Сохранение...';
  const inData = data[inputsUserAvatarFormFields.src]
  api.setUserAvatar(inData)
  .then((outData) => {
    currentUserData.setAvatar(outData.avatar);
    popupUserAvatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

// обработка формы изменения данных профиля
function handleClickProfileEditBtn() {
  const {name, about} = currentUserData.getUserInfo();
  inputUserName.value = name;
  inputUserAbout.value = about;
  validatorUserForm.clearAllErr();
  validatorUserForm.toggleButtonState();
  butnProfileSubmit.textContent = 'Сохранить';
  popupEditUserForm.open();
}
function handleEditUserFormSubmit(evt, data) {
  evt.preventDefault();
  butnProfileSubmit.textContent = 'Сохранение...';
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

// обработка формы добавления нового места
function handleClickPlaceAddBtn() {
  validatorPlaceForm.clearAllErr();
  validatorPlaceForm.toggleButtonState();
  butnNewPlaceSubmit.textContent = 'Создать'
  popupNewPlaceForm.open();
}
function handleNewPlaceFormSubmit(evt, data) {
  evt.preventDefault();
  butnNewPlaceSubmit.textContent = 'Добавление...';
  const inData = {
    link: data[inputsPlaceFormFields.src],
    name: data[inputsPlaceFormFields.title],
  };
  api.addNewCard(inData)
  .then((outData) => {
    createCardOfPlace(placeData(outData), true);
    popupNewPlaceForm.close();
    ;
  })
  .catch((err) => {
    console.log(err);
  })
}
