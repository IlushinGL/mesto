export default class Api {
  constructor({server, cohortId, token, user, avatar, cards, like}) {
    this._baseURL = server + cohortId;
    // this._cohortId = cohortId;
    this._token = token;
    this._user = user;
    this._avatar = avatar;
    this._cards = cards;
    this._like = like;
  }

  getInitialCards() {
    return fetch(
      this._baseURL + this._cards,
      {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Err_Api_getInitialCards: ${res.status}-${res.statusText}`);
    })
    .then((res) => res);
  }

  getUserInfo() {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Err_Api_getUserInfo: ${res.status}-${res.statusText}`);
    })
    .then((res) => res);
  }

  // другие методы работы с API
}
