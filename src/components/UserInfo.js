export default class UserInfo {
  constructor({selectorAvatar, selectorName, selectorAbout}) {
    this._avatar = document.querySelector(selectorAvatar);
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._name.textContent;
    userInfo['about'] = this._about.textContent;
    return userInfo;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setId(id) {
    this.id = id;
  }
}
