export default class Section {
  constructor(selector) {
    this._container = document.querySelector(selector);
    this._container.innerHTML = '';
  }

  addItem(element, isFirst) {
    // Если isFirst пропущен или false, то карточка добавляется в конец, иначе - в начало
    if (isFirst) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
