const elementsInBox = [
  {
    name: 'Москва 1964. Смоленская площадь',
    link: './images/el_1_ussr.jpg'
  },
  {
    name: 'Нью-Йорк. Вид изнутри',
    link: './images/el_2_usa.jpg'
  },
  {
    name: 'Париж. Башня Эйфеля',
    link: './images/el_3_france.jpg'
  },
  {
    name: 'Где-то в горах',
    link: './images/el_4_mountains.jpg'
  },
  {
    name: 'Сидней',
    link: './images/el_5_australia.jpg'
  },
  {
    name: 'Флоренция',
    link: './images/el_6_italy.jpg'
  }
];

const elementTemplate = document.querySelector('#template-element').content;
const elementsSection = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');
const profileTextAuthor = document.querySelector('#profile-text-author');
const profileTextJob = document.querySelector('#profile-text-job');

const cardUser = document.querySelector('#card-user');
const cardUserCloseButton = cardUser.querySelector('.popup__close');
const formUser = cardUser.querySelector('form');
const inputUserName = formUser.querySelector('#input-user-name');
const inputUserJob = formUser.querySelector('#input-user-job');

const cardPlace = document.querySelector('#card-place');
const cardPlaceCloseButton = cardPlace.querySelector('.popup__close');
const formPlace = cardPlace.querySelector('form');
const inputPlaceName = formPlace.querySelector('#input-place-name');
const inputPlaceLink = formPlace.querySelector('#input-img-link');

const cardImage = document.querySelector('#card-image');
const cardImageCloseButton = cardImage.querySelector('.popup__close');

function putElementsFromBox() {
  elementsInBox.forEach((item) => {
    elementsSection.append(createPlace(item.name, item.link));
  });
}

function createPlace(name, link) {
  const currentElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const currentElementImg = currentElement.querySelector('.elements__element-img');

  currentElementImg.src = link;
  currentElementImg.alt = name;
  currentElement.querySelector('.elements__element-text').textContent = name;

  currentElement.querySelector('.elements__element-favour').addEventListener('click', clickLikeBtm);
  currentElement.querySelector('.elements__element-trash').addEventListener('click', clickTrashBtm);
  currentElementImg.addEventListener('click', сlickPicture);

  return currentElement;
}

function toggleVisible(card) {
  card.classList.toggle('popup_opened');
}

function clickLikeBtm(evt) {
  evt.target.classList.toggle('elements__element-favour_yes');
}

function clickTrashBtm(evt) {
  evt.target.closest('.elements__element').remove();
}

function сlickPlaceAddBtm() {
  toggleVisible(cardPlace);
  formPlace.reset();
}

function сlickPicture(evt) {
  const originElement = evt.target;
  const imgCurrent = cardImage.querySelector('.popup__image');

  toggleVisible(cardImage);
  cardImage.querySelector('.popup__title').textContent =
    originElement.parentElement.querySelector('.elements__element-text').textContent;
  imgCurrent.src = originElement.src;
  imgCurrent.alt = originElement.alt;
}

function сlickProfileEditBtm() {
  toggleVisible(cardUser);
  inputUserName.value = profileTextAuthor.textContent;
  inputUserJob.value = profileTextJob.textContent;
}

function clickCardCloseBtm(evt) {
  toggleVisible(evt.target.closest('.popup'));
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const currentCard = evt.target.closest('.popup');
  if (currentCard.id === 'card-user') {
    profileTextAuthor.textContent = inputUserName.value;
    profileTextJob.textContent = inputUserJob.value;
  }
  else if (currentCard.id === 'card-place') {
    elementsSection.prepend(createPlace(inputPlaceName.value, inputPlaceLink.value));
  }

  clickCardCloseBtm(evt);
}

document.addEventListener('DOMContentLoaded', putElementsFromBox);
profileEditButton.addEventListener('click', сlickProfileEditBtm);
placeAddButton.addEventListener('click', сlickPlaceAddBtm);

formUser.addEventListener('submit', handleFormSubmit);
cardUserCloseButton.addEventListener('click', clickCardCloseBtm);

formPlace.addEventListener('submit', handleFormSubmit);
cardPlaceCloseButton.addEventListener('click', clickCardCloseBtm);

cardImageCloseButton.addEventListener('click', clickCardCloseBtm);
