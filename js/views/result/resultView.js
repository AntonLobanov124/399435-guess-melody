import {header} from '../../models/dictionary.js';
import AbstractView from '../abstractView';

export default class ResultView extends AbstractView {
  constructor(score = 0, percent = 0) {
    super();

    this._content = score ? `<h2 class="title">Вы настоящий меломан!</h2>
                             <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${score}&nbsp;мелодии</div>
                             <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${percent.toFixed()}%&nbsp;игроков</span>`
                          : `<h2 class="title">Вы проиграли</h2>
                             <div class="main-stat">Ничего, вам повезет в следующий раз</div>`;
  }

  get template() {
    return `<section class="main main--result">
      <section class="logo" title="${header.logo}"><h1>${header.logo}</h1></section>
      ${this._content}
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplay();
    });
  }

  onReplay() {}
}
