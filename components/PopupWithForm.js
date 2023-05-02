import Popup from './Popup.js';
import {validateFormConfigObj} from '../utils/validateFormConfigObj.js';
import FormValidator from './FormValidator.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    const conteiner = super._getConteiner();
    this._form = conteiner.querySelector(validateFormConfigObj.formSelector);
    this._validator = new FormValidator(validateFormConfigObj, this._form);
    this._validator.enableValidation();
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._validator._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._validator.toggleButtonState();
    this._validator.clearAllErr();
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
  }

  close() {
    this._form.reset();
    this._validator.toggleButtonState();
    this._validator.clearAllErr();
    super.close();
  }
}
