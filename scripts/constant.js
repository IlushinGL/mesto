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

const validationConfig = {
  formSelector: '.popup_form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btm_inactive',
  // inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup_input-error_active',
};
