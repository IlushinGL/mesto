import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._container.querySelector('form');
    this._butn = this._form.querySelector('button');
    this._handleFormSubmit = handleFormSubmit;
    this._data = null;
  }

  setData(data) {
    this._data = data;
  }

  getData() {
    return this._data;
  }

  getForm() {
    return this._form;
  }

  setButtonСaption(title) {
    this._butn.textContent = title;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  close() {
    this._data = null;
    super.close();
  }
}
