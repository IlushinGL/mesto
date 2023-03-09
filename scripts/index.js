const initialCards = [
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

document.addEventListener('DOMContentLoaded', function () {
  console.log(initialCards);
})

let pgAuth = document.querySelector('#pgAuth');
let pgInfo = document.querySelector('#pgInfo');
let pageProfileEditButton = document.querySelector('.profile__edit-button');

let popupProfile = document.querySelector('.popup');
let popupProfileCloseButton = popupProfile.querySelector('.popup__close');

let popupForm = popupProfile.querySelector('form');
let popAuth = popupForm.querySelector('#popAuth');
let popInfo = popupForm.querySelector('#popInfo');

function pageProfileEditClick() {
  popupProfile.classList.add('popup_opened');
  popAuth.value = pgAuth.textContent;
  popInfo.value = pgInfo.textContent;
}

function popupProfileCloseClick() {
  popupProfile.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  pgAuth.textContent = popAuth.value;
  pgInfo.textContent = popInfo.value;
  popupProfileCloseClick();
}

popupForm.addEventListener('submit', handleFormSubmit);
pageProfileEditButton.addEventListener('click', pageProfileEditClick);
popupProfileCloseButton.addEventListener('click', popupProfileCloseClick);
