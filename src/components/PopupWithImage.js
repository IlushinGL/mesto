import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._title = this._container.querySelector('.popup__title');
    this._image = this._container.querySelector('.popup__image');
    super.setEventListeners();
  }

  open(src, title) {
    this._title.textContent = title;
    this._image.src = src;
    this._image.alt = title;
    super.open();
  }
}
