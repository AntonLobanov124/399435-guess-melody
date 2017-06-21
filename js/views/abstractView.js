import {getElementFromTemplate} from '../utils';
import {changeView} from '../viewManager';

export default class AbstractView {
  get template() {
    throw new Error(`Abstract method called`);
  }

  get element() {
    if (!this._element) {
      this._element = this._render();
      this.bind();
    }
    return this._element;
  }

  _render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }

  view() {
    changeView(this);
  }
}
