export default class Section {
  constructor(selector, renderer) {

    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element, isFirst) {
    if (isFirst) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  setItems(array) {
    this._initialArray = array;
    this._container.innerHTML = '';
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
}
