import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, inputSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._container.querySelector(formSelector);
    this._input = this._form.querySelectorAll(inputSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.data = null;
  }

  _getInputValues() {
    if (this.data) {
      return this.data;
    } else {
      const inputValues = {};
      this._input.forEach(input => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    }

  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
  }

  close() {
    this.data = null;
    this._form.reset();
    super.close();
  }
}
