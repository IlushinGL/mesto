export default class Popup {
  constructor(selector) {
    this._container = document.querySelector(selector);
    this._closeBtn = this._container.querySelector('.popup__close');
  }

  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());
    this._container.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _getConteiner() {
    return this._container;
  }
}
