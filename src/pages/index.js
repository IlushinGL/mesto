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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import './index.css';

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');

const inputUserName = document.querySelector('#' + inputsUserFormFields.name);
const inputUserAbout = document.querySelector('#' + inputsUserFormFields.about);

const currentUserData = new UserInfo(currentUserDataSelectors);
const sectionCardsOfPlaces = new Section(sectionCardsOfPlacesSelector);

const popupCardOfPlace = new PopupWithImage(popupCardOfPlaceSelector);

const popupDeleteForm = new PopupWithConfirmation(
  popupDeleteFormSelector,
  handleDeleteFormSubmit);
const validatorDeleteForm = new FormValidator(
  validateFormConfigObj,
  popupDeleteForm);

const popupNewPlaceForm = new PopupWithForm(
  popupNewPlaceFormSelector,
  handleNewPlaceFormSubmit);
const validatorPlaceForm = new FormValidator(
  validateFormConfigObj,
  popupNewPlaceForm);

const popupEditUserForm = new PopupWithForm(
  popupEditUserFormSelector,
  handleEditUserFormSubmit);
const validatorUserForm = new FormValidator(
  validateFormConfigObj,
  popupEditUserForm);

const popupUserAvatarForm = new PopupWithForm(
  popupUserAvatarFormSelector,
  handleUserAvatarFormSubmit);
const validatorUserAvatarForm = new FormValidator(
  validateFormConfigObj,
  popupUserAvatarForm);

const butnProfileSubmit = validatorUserForm.getSubmitButn();
const butnNewPlaceSubmit = validatorPlaceForm.getSubmitButn();
const butnAvatarSubmit = validatorUserAvatarForm.getSubmitButn();
const butnDeleteSubmit = validatorDeleteForm.getSubmitButn();

profileAvatar.addEventListener('click', handleAvatarClick);
profileEditButton.addEventListener('click', handleClickProfileEditBtn);
placeAddButton.addEventListener('click', handleClickPlaceAddBtn);

popupEditUserForm.setEventListeners();
validatorUserForm.enableValidation();

popupNewPlaceForm.setEventListeners();
validatorPlaceForm.enableValidation();

popupUserAvatarForm.setEventListeners();
validatorUserAvatarForm.enableValidation();

popupCardOfPlace.setEventListeners();

popupDeleteForm.setEventListeners();

const api = new Api(apiData);
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([info, initialCards])=>{
  currentUserData.setId(info._id);
  currentUserData.setUserInfo({
    name: info.name,
    about: info.about});
  currentUserData.setAvatar(info.avatar);

  const placesArray = initialCards.map((item) => placeData(item));
  placesArray.forEach(element => {
    sectionCardsOfPlaces.addItem(createCard(element));
  });
})
.catch((err)=>{
  console.log(err);
})


// парсинг данных карточки
function placeData(item) {
  return {
    cardId: item._id,
    ownerId: item.owner._id,
    title: item.name,
    src: item.link,
    likes: item.likes.map(like => like._id),
    userId: currentUserData.getId()
  };
}

// создание карточки
function createCard(data) {
  const card = new Card(data, templateCardOfPlaceSelector, handleCardOfPlaceClickImage, handleCardDelete, handleCardLike);
  return card.generateCard();
}

// обработка удаления карточки
function handleCardDelete(card) {
  popupDeleteForm.setData(card);
  popupDeleteForm.open();
}
function handleDeleteFormSubmit(evt) {
  evt.preventDefault();
  butnDeleteSubmit.textContent = 'Удаление...'; // кнопка из валидатора
  const card = popupDeleteForm.getData(); // инстанс из публичного метода
  api.deleteCard(card.getId())
  .then(() => {
    card.removeCard(); // удаляем изображение
    popupDeleteForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    butnDeleteSubmit.textContent = 'Да';
  })
}

// обработка лайка карточки
function handleCardLike(card, like) {
  api.likeCard(card.getId(), !like)
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
  popupUserAvatarForm.open();
}
function handleUserAvatarFormSubmit(evt) {
  evt.preventDefault();
  butnAvatarSubmit.textContent = 'Сохранение...';
  const data = validatorUserForm.getInputValues();
  const inData = data[inputsUserAvatarFormFields.src]
  api.setUserAvatar(inData)
  .then((outData) => {
    currentUserData.setAvatar(outData.avatar);
    popupUserAvatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    butnAvatarSubmit.textContent = 'Сохранить';
  })
}

// обработка формы изменения данных профиля
function handleClickProfileEditBtn() {
  const {name, about} = currentUserData.getUserInfo();
  inputUserName.value = name;
  inputUserAbout.value = about;
  validatorUserForm.clearAllErr();
  validatorUserForm.toggleButtonState();
  popupEditUserForm.open();
}
function handleEditUserFormSubmit(evt) {
  evt.preventDefault();
  butnProfileSubmit.textContent = 'Сохранение...';
  const data = validatorUserForm.getInputValues();
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
  .finally(() => {
    butnProfileSubmit.textContent = 'Сохранить';
  })
}

// обработка формы добавления нового места
function handleClickPlaceAddBtn() {
  validatorPlaceForm.clearAllErr();
  validatorPlaceForm.toggleButtonState();
  popupNewPlaceForm.open();
}
function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  butnNewPlaceSubmit.textContent = 'Добавление...';
  const data = validatorPlaceForm.getInputValues();
  const inData = {
    link: data[inputsPlaceFormFields.src],
    name: data[inputsPlaceFormFields.title],
  };
  api.addNewCard(inData)
  .then((outData) => {
    sectionCardsOfPlaces.addItem(createCard(placeData(outData)), true);
    popupNewPlaceForm.close();
    ;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    butnNewPlaceSubmit.textContent = 'Создать'
  })
}
