import {header} from '../../models/dictionary.js';
import AbstractView from '../abstractView';

export default class ResultView extends AbstractView {
  get template() {
    return `<section class="main main--result">
      <section class="logo" title="${header.logo}"><h1>${header.logo}</h1></section>
      <h2 class="title"></h2>
      <div class="main-stat"></div>
      <span class="main-comparison"></span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
      this.onReplay();
    });
  }

  onReplay() {}

  setContent(answers = 0, percent = 0) {
    const titleNode = this.element.querySelector(`.title`);
    const statNode = this.element.querySelector(`.main-stat`);
    const comparisonNode = this.element.querySelector(`.main-comparison`);

    if (answers) {
      titleNode.innerHTML = `Вы настоящий меломан!`;
      statNode.innerHTML = `За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${answers}&nbsp;мелодии`;
      comparisonNode.innerHTML = `Это&nbsp;лучше чем у&nbsp;${percent.toFixed()}%&nbsp;игроков`;
    } else {
      titleNode.innerHTML = `Вы проиграли`;
      statNode.innerHTML = `Ничего, вам повезет в следующий раз`;
      comparisonNode.textContent = ``;
    }

  }
}
