const elementsInBox = [
  {
    name: 'Москва 1964. Смоленская площадь',
    link: '../images/el_1_ussr.jpg'
  },
  {
    name: 'Нью-Йорк. Вид изнутри',
    link: '../images/el_2_usa.jpg'
  },
  {
    name: 'Париж. Башня Эйфеля',
    link: '../images/el_3_france.jpg'
  },
  {
    name: 'Где-то в горах',
    link: '../images/el_4_mountains.jpg'
  },
  {
    name: 'Сидней',
    link: '../images/el_5_australia.jpg'
  },
  {
    name: 'Флоренция',
    link: '../images/el_6_italy.jpg'
  }
];

const elementTemplate = document.querySelector('#tmplElement').content;
const elementsSection = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');
const pgAuthor = document.querySelector('#pgAuthor');
const pgInfo = document.querySelector('#pgInfo');

let popFieldA;
let popFieldB;
let popCloseButton;
let popWindow;
let popForm;


function putElementsFromBox() {
  elementsInBox.forEach((item) => {
    addPlace(item.name, item.link);
  });
}

function addPlace(name, link, isStartPosition = false) {
  const currentElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  currentElement.querySelector('.elements__element-img').src = link;
  currentElement.querySelector('.elements__element-img').alt = name;
  currentElement.querySelector('.elements__element-text').textContent = name;

  currentElement.querySelector('.elements__element-favour').addEventListener('click', clickLikeBtm);
  currentElement.querySelector('.elements__element-trash').addEventListener('click', clickTrashBtm);
  currentElement.querySelector('.elements__element-img').addEventListener('click', сlickPicture);

  if (isStartPosition) {
    elementsSection.prepend(currentElement);
  } else {
    elementsSection.append(currentElement);
  }
}

function adjustPopUpForm(id) {
  if (id === 0) {
    popWindow = document.querySelector('#popUpUser');
    popForm = popWindow.querySelector('form');
    popFieldA = popForm.querySelector('#fieldA');
    popFieldB = popForm.querySelector('#fieldB');
    popCloseButton = popWindow.querySelector('.popup__close');
    popForm.addEventListener('submit', handleFormSubmit);
    popCloseButton.addEventListener('click', clickPopUpCloseBtm);
  }
  else if (id === 1) {
    popWindow = document.querySelector('#popUpPlace');
    popForm = popWindow.querySelector('form');
    popFieldA = popForm.querySelector('#fieldA');
    popFieldB = popForm.querySelector('#fieldB');
    popCloseButton = popWindow.querySelector('.popup__close');
    popForm.addEventListener('submit', handleFormSubmit);
    popCloseButton.addEventListener('click', clickPopUpCloseBtm);
  }
  else {
    popWindow = document.querySelector('#popUpImg');
    popCloseButton = popWindow.querySelector('.popup__close');
    popCloseButton.addEventListener('click', clickPopUpCloseBtm);
  }
}

function saveProfile(name, info) {
  pgAuthor.textContent = name;
  pgInfo.textContent = info;
}



function clickLikeBtm(evt) {
  evt.target.classList.toggle('elements__element-favour_yes');
}

function clickTrashBtm(evt) {
  evt.target.closest('.elements__element').remove();
}

function сlickPlaceAddBtm() {
  adjustPopUpForm(1);
  popWindow.classList.add('popup_opened');
  popFieldA.value = '';
  popFieldB.value = '';
}

function сlickPicture(evt) {
  adjustPopUpForm(2);
  popWindow.classList.add('popup_opened');
  const originElement = evt.target.parentElement;
  popWindow.querySelector('.popup__title').textContent =
    originElement.querySelector('.elements__element-text').textContent;
    popWindow.querySelector('img').src = evt.target.src;
}

function сlickProfileEditBtm() {
  adjustPopUpForm(0);
  popWindow.classList.add('popup_opened');
  popFieldA.value = pgAuthor.textContent;
  popFieldB.value = pgInfo.textContent;
}

function clickPopUpCloseBtm(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (popWindow.id === 'popUpUser') {
    saveProfile(popFieldA.value, popFieldB.value);
  }
  else if (popWindow.id === 'popUpPlace') {
    addPlace(popFieldA.value, popFieldB.value, true);
  }
  clickPopUpCloseBtm(evt);
}

document.addEventListener('DOMContentLoaded', putElementsFromBox);
profileEditButton.addEventListener('click', сlickProfileEditBtm);
placeAddButton.addEventListener('click', сlickPlaceAddBtm);
