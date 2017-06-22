import {padLeft} from '../../utils.js';
import AbstractView from '../abstractView.js';

export default class LevelArtistView extends AbstractView {
  constructor(answers) {
    super();
    this._answers = answers.map(([index, track]) => {
      return `<div class="main-answer-wrapper">
                <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}" />
                <label class="main-answer" for="answer-${index}">
                  <img class="main-answer-preview" src="${track.imgSrc}">
                  ${track.title}
                </label>
              </div>`;
    });

    this._timerNode = this.element.querySelector(`.timer-value`);
  }

  get template() {
    const emptyString = ``;
    return `<section class="main main--level main--level-artist">
              <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
                <circle
                  cx="390" cy="390" r="370"
                  class="timer-line"
                  style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

                  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml"></div>
              </svg>
              <div class="main-wrap">
                <div class="main-timer"></div>

                <h2 class="title main-title">Кто исполняет эту песню?</h2>
                <div class="player-wrapper"></div>
                <form class="main-list">
                  ${this._answers.join(emptyString)}
                </form>
              </div>
            </section>`;
  }

  set time(value) {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    this._timerNode.innerHTML = `<span class="timer-value-mins">${padLeft(minutes)}</span><!---->
                                 <span class="timer-value-dots">:</span><!---->
                                 <span class="timer-value-secs">${padLeft(seconds)}</span>`;
  }

  bind() {
    Array.from(this.element.querySelectorAll(`.main-answer-r`)).forEach((el) => {
      el.addEventListener(`click`, (evt) => {
        this.onAnswer(+evt.target.value);
      });
    });
  }

  onAnswer(answerId) {}
}
