import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._container.querySelector('form');
    this._inputs = this._form.querySelectorAll('input');
    this._butn = this._form.querySelector('button');
    this._handleFormSubmit = handleFormSubmit;
  }

  getForm() {
    return this._form;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setButtonCaption(title) {
    this._butn.textContent = title;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
  }

  close() {
    this._form.reset();
    super.close();
  }
}
