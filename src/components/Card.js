import imageHeartYes from '../images/heart_yes.svg';
import imageHeartNo from '../images/heart_no.svg';

export default class Card {
  constructor(
    {src, title, cardId, ownerId, likes, userId},
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike) {
    this._text = title;
    this._link = src;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._likes = likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._handleCardLike(this, this._isLiked());
  }

  _handleTrashClick() {
    this._handleCardDelete(this);
  }

  _handleImageClick() {
    this._handleCardClick(this._link, this._text);
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => this._handleLikeClick());
    this._trash.addEventListener('click', () => this._handleTrashClick());
    this._image.addEventListener('click', () => this._handleImageClick());
  }

  _isLiked() {
    return this._likes.includes(this._userId);
  }

  _setInfo() {
    this._like.querySelector('.likes').textContent = this._likes.length;
    const icon = this._like.querySelector('.icon');
    if (this._isLiked()) {
      icon.src = imageHeartYes;
      icon.alt = 'yes';
    } else {
      icon.src = imageHeartNo;
      icon.alt = 'no';
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  updateCard(likes) {
    this._likes = likes;
    this._setInfo();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._trash = this._element.querySelector('.elements__element-trash');
    if (!(this._userId === this._ownerId)) {
      this._trash.classList.add('elements__element-trash_hidden');
    }

    this._image = this._element.querySelector('.elements__element-img');
    this._image.src = this._link;
    this._image.alt = this._text;
    this._element.querySelector('.elements__element-text').textContent = this._text;

    this._like = this._element.querySelector('.elements__element-favour');
    this._setInfo();
    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._cardId;
  }
}
