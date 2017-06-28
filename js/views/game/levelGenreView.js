import AbstractView from '../abstractView.js';

export default class LevelGenreView extends AbstractView {
  constructor(question) {
    super();

    this._question = question;
  }

  get template() {
    const emptyString = ``;
    const answers = this._question.answers.map((answer, index) => {
      return `<div class="genre-answer">
                <div class="player-wrapper"></div>
                <input type="checkbox" name="answer" value="answer-${index}" id="${index}">
                <label class="genre-answer-check" for="${index}"></label>
              </div>`;
    });

    return `<section class="main main--level main--level-genre">
              <h2 class="title">${this._question.question}</h2>
              <form class="genre">
                ${answers.join(emptyString)}
                <button class="genre-answer-send" type="submit">Ответить</button>
              </form>
            </section>`;
  }

  set time(value) { }

  bind() {
    const answersNode = Array.from(this.element.querySelectorAll(`input[name="answer"]`));
    const sendBtn = this.element.querySelector(`.genre-answer-send`);

    sendBtn.disabled = true;

    sendBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAnswer(answersNode.filter((answer) => answer.checked).map((answer) => +answer.id));
    });

    answersNode.forEach((el, index) => {
      el.addEventListener(`change`, (evt) => {
        sendBtn.disabled = !answersNode.find((answer) => answer.checked);
      });
    });

    Array.from(this.element.querySelectorAll(`.player-wrapper`)).forEach((el, index) => {
      window.initializePlayer(el, this._question.answers[index].src);
    });

    const players = Array.from(this.element.querySelectorAll(`audio`));
    const stopAllPlayersExceptOne = (playerIndex) => {
      players.forEach((player, index) => {
        if (index !== playerIndex) {
          player.pause();
          player.currentTime = 0;
        }
      });
    };

    Array.from(this.element.querySelectorAll(`.player-control`)).forEach((el, index) => {
      el.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        stopAllPlayersExceptOne(index);
      });
    });

  }

  onAnswer(answersId) {}
}
