export default class Api {
  constructor({server, cohortId, token, user, avatar, cards, like}) {
    this._server = server;
    this._cohortId = cohortId;
    this._token = token;
    this._user = user;
    this._avatar = avatar;
    this._cards = cards;
    this._like = like;
  }

  getInitialCards() {
    const host = this._server + this._cohortId + this._cards;
    return fetch(host, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
  }

  // другие методы работы с API
}
