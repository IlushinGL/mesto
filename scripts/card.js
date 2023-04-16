export default class Card {
  constructor(text, imageLink, templateSelector, imgClickFunction) {
    this._text = text;
    this._link = imageLink;
    this._templateSelector = templateSelector;
    this._imgClickFunction = imgClickFunction;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._like.classList.toggle('elements__element-favour_yes');
  }

  _handleTrashClick() {
    this._trash.closest('.elements__element').remove();
  }

  _handleImageClick() {
    this._imgClickFunction(this._text, this._link);
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => this._handleLikeClick());
    this._trash.addEventListener('click', () => this._handleTrashClick());
    this._image.addEventListener('click', () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.elements__element-favour');
    this._trash = this._element.querySelector('.elements__element-trash');
    this._image = this._element.querySelector('.elements__element-img');
    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._text;
    this._element.querySelector('.elements__element-text').textContent = this._text;

    return this._element;
  }
}
