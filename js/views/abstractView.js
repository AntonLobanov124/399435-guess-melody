import {getElementFromTemplate} from '../utils';
import {changeView} from '../viewManager';

export default class AbstractView {
  get template() {
    throw new Error(`Abstract method called.`);
  }

  get element() {
    if (!this._element) {
      this._element = this._getMarkup();
      this.bind();
    }
    return this._element;
  }

  _render() {
    return getElementFromTemplate(this.template);
  }

  _getMarkup() {
    return this._render();
  }

  bind() {

  }

  show() {
    changeView(this);
  }
}
