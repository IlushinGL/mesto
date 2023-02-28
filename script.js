let pageProfileEditButton = document.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('.popup');
let popupProfileCloseButton = popupProfile.querySelector('.popup__close');

function pageProfileEditClick() {
  popupProfile.classList.add('popup_opened');
}

function popupProfileCloseClick() {
  popupProfile.classList.remove('popup_opened');
}

pageProfileEditButton.addEventListener('click', pageProfileEditClick);
popupProfileCloseButton.addEventListener('click', popupProfileCloseClick);
