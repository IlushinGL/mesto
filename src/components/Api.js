export default class Api {
  constructor({server, cohortId, token, user, avatar, cards, like}) {
    this._baseURL = server + cohortId;
    this._auth = {
      authorization: token,
      'Content-Type': 'application/json'
    };
    this._user = user;
    this._avatar = avatar;
    this._cards = cards;
    this._like = like;
  }

  _handleResponse(response, errTitle) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`ErrApi_${errTitle}: ${response.status}`);
  }

  getInitialCards() {
    return fetch(
      this._baseURL + this._cards,
      {
      method: 'GET',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, 'getInitialCards')})
    .catch((err) => err);
  }

  getUserInfo() {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, 'getUserInfo')})
    .catch((err) => err);
  }

  setUserInfo({name, about}) {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'PATCH',
      headers: this._auth,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {return this._handleResponse(res, 'setUserInfo')})
    .catch((err) => err);
  }

  addNewCard({link, name}) {
    return fetch(
      this._baseURL + this._cards,
      {
      method: 'POST',
      headers: this._auth,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {return this._handleResponse(res, 'addNewCard')})
    .catch((err) => err);
  }

  deleteCard(id) {
    return fetch(
      this._baseURL + this._cards + '/' + id,
      {
      method: 'DELETE',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, 'deleteCard')})
    .catch((err) => err);
  }

  likeCard(id, like) {
    // Если like пропущена или false, то лайк удаляется, иначе - добавляется
    return fetch(
      this._baseURL + this._cards + '/' + id + this._like,
      {
      method: like ? 'PUT' : 'DELETE',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, like ? 'likeCard_yes' : 'likeCard_no')})
    .catch((err) => err);
  }

}
