export default class Section {
  constructor({items, renderer}, selector) {
    this._initialArray = items;
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

  renderItems() {
    this._container.innerHTML = '';
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
}
