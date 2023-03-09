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

const popUpData = [
  {
    title: 'Редактировать профиль',
    placeholderFieldA: 'Автор',
    placeholderFieldB: 'Основная деятельность'
  },
  {
    title: 'Новое место',
    placeholderFieldA: 'Название',
    placeholderFieldB: 'Ссылка на картинку'
  }
];

const elementTemplate = document.querySelector('#tmplElement').content;
const elementsSection = document.querySelector('.elements');

const pageProfileEditButton = document.querySelector('.profile__edit-button');
const pagePlaceAddtButton = document.querySelector('.profile__add-button');
const pgAuth = document.querySelector('#pgAuth');
const pgInfo = document.querySelector('#pgInfo');

const popupWindow = document.querySelector('.popup');
const popupWindowCloseButton = popupWindow.querySelector('.popup__close');

const popTitle = popupWindow.querySelector('.popup__title');
const popupForm = popupWindow.querySelector('form');
const popFieldA = popupForm.querySelector('#fieldA');
const popFieldB = popupForm.querySelector('#fieldB');

function putElementsFromBox() {
  elementsInBox.forEach((item) => {
    addPlace(item.name, item.link);
  });
}

function adjustPopUpForm(id) {
  if (id === 0) {
    popupForm.id = 'popUpForm0';
    popTitle.textContent = popUpData[0].title;
    popFieldA.placeholder = popUpData[0].placeholderFieldA;
    popFieldB.placeholder = popUpData[0].placeholderFieldB;
  }
  else {
    popupForm.id = 'popUpForm1';
    popTitle.textContent = popUpData[1].title;
    popFieldA.placeholder = popUpData[1].placeholderFieldA;
    popFieldB.placeholder = popUpData[1].placeholderFieldB;
  }
}

function saveProfile(name, info) {
  pgAuth.textContent = name;
  pgInfo.textContent = info;
}

function addPlace(name, link, isStartPosition = false) {
  const currentElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  currentElement.querySelector('.elements__element-img').src = link;
  currentElement.querySelector('.elements__element-img').alt = name;
  currentElement.querySelector('.elements__element-text').textContent = name;

  currentElement.querySelector('.elements__element-favour').addEventListener('click', clickLikeBtm);
  currentElement.querySelector('.elements__element-trash').addEventListener('click', clickTrashBtm);

  if (isStartPosition) {
    elementsSection.prepend(currentElement);
  } else {
    elementsSection.append(currentElement);
  }
}

function clickLikeBtm(evt) {
  evt.target.classList.toggle('elements__element-favour_yes');
}

function clickTrashBtm(evt) {
  evt.target.closest('.elements__element').remove();
}

function сlickPlaceAddBtm() {
  popupWindow.classList.add('popup_opened');
  adjustPopUpForm(1);
  popFieldA.value = '';
  popFieldB.value = '';
}

function сlickProfileEditBtm() {
  popupWindow.classList.add('popup_opened');
  adjustPopUpForm(0);
  popFieldA.value = pgAuth.textContent;
  popFieldB.value = pgInfo.textContent;
}

function clickPopUpCloseBtm() {
  popupWindow.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (popupForm.id.endsWith('0')) {
    saveProfile(popFieldA.value, popFieldB.value);
  }
  else {
    addPlace(popFieldA.value, popFieldB.value, true);
  }
  clickPopUpCloseBtm();
}

document.addEventListener('DOMContentLoaded', putElementsFromBox);
popupForm.addEventListener('submit', handleFormSubmit);
pageProfileEditButton.addEventListener('click', сlickProfileEditBtm);
pagePlaceAddtButton.addEventListener('click', сlickPlaceAddBtm);
popupWindowCloseButton.addEventListener('click', clickPopUpCloseBtm);
