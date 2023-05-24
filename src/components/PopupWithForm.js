import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._container.querySelector('form');
    this._handleFormSubmit = handleFormSubmit;
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  close() {
    this._form.reset();
    super.close();
  }
}
