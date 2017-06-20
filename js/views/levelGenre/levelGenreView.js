import {getElementFromTemplate} from '../../utils.js';
import AbstractView from '../abstractView.js';

export default class LevelGenreView extends AbstractView {
  constructor() {
    super();

    this._genreForm = this.element.querySelector(`.genre`);
    this._sendBtn = this.element.querySelector(`.genre-answer-send`);
    this._sendBtn.disabled = true;
  }

  get _answersNode() {
    return Array.from(this._genreForm.querySelectorAll(`input[name="answer"]`));
  }

  get template() {
    return `<section class="main main--level main--level-genre">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </section>`;
  }

  set answers(answers) {
    [...this._genreForm.querySelectorAll(`.genre-answer`)].forEach((el) => {
      this._genreForm.removeChild(el);
    });

    answers.map((answerId) => {

      const template = `<div class="genre-answer">
                <div class="player-wrapper"></div>
                <input type="checkbox" name="answer" value="answer-${answerId}" id="${answerId}">
                <label class="genre-answer-check" for="${answerId}"></label>
              </div>`;

      const el = getElementFromTemplate(template);

      this._genreForm.insertBefore(el, this._sendBtn);
      return el;
    });

    this._answersNode.forEach((el) => {
      el.addEventListener(`change`, (evt) => {
        this._sendBtn.disabled = !this._answersNode.find((answer) => answer.checked);
      });
    });
  }

  bind() {
    this._sendBtn.addEventListener(`click`, (evt) => {
      this.onAnswer(this._answersNode.filter((answer) => answer.checked).map((answer) => +answer.id));
    });
  }

  onAnswer(answersId) {}
}
