import AbstractView from '../abstractView.js';

export default class LevelGenreView extends AbstractView {
  constructor(answers) {
    super();

    this._answers = answers.map((answerId) => {
      return `<div class="genre-answer">
                <div class="player-wrapper"></div>
                <input type="checkbox" name="answer" value="answer-${answerId}" id="${answerId}">
                <label class="genre-answer-check" for="${answerId}"></label>
              </div>`;
    });
  }

  get template() {
    const emptyString = ``;
    return `<section class="main main--level main--level-genre">
              <h2 class="title">Выберите инди-рок треки</h2>
              <form class="genre">
                ${this._answers.join(emptyString)}
                <button class="genre-answer-send" type="submit">Ответить</button>
              </form>
            </section>`;
  }

  // Заглушка
  set time(value) {}

  bind() {
    const answersNode = Array.from(this.element.querySelectorAll(`input[name="answer"]`));
    const sendBtn = this.element.querySelector(`.genre-answer-send`);

    sendBtn.disabled = true;

    sendBtn.addEventListener(`click`, (evt) => {
      this.onAnswer(answersNode.filter((answer) => answer.checked).map((answer) => +answer.id));
    });

    answersNode.forEach((el) => {
      el.addEventListener(`change`, (evt) => {
        sendBtn.disabled = !answersNode.find((answer) => answer.checked);
      });
    });
  }

  onAnswer(answersId) {}
}
