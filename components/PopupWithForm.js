import Popup from './Popup.js';
import {validateFormConfigObj} from '../utils/validateFormConfigObj.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._form = super._container.querySelector(validateFormConfigObj.formSelector);
    this._inputList = this._form.querySelectorAll(validateFormConfigObj.inputSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => this._handleFormSubmit(this._getInputValues()));
  }

  close() {
    this._form.reset();
    super.close();
  }
}
