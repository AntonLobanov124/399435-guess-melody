import {header} from '../../models/dictionary.js';
import AbstractView from '../abstractView.js';

export default class WelcomeView extends AbstractView {
  get template() {
    return `<section class="main main--welcome">
      <section class="logo" title="${header.logo}"><h1>${header.logo}</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">${header.title}</h2>
      <p class="text main-text">Правила просты&nbsp;— за&nbsp;2 минуты дать максимальное количество правильных ответов.<br>Удачи!</p>
    </section>`;
  }

  bind() {
    this.element.querySelector(`.main-play`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onStart();
    });
  }

  onStart() {

  }
}
