import {getElementFromTemplate, getRandomInt, arrayShuffle, padLeft} from '../utils';
import {showScreen} from '../screenManager';
import tracks from '../models/tracks.js';
import levelGenre from './levelGenre';

const MAX_ANSWERS_SHOW = 3;
const LEVEL_TIME = 10;
const TIMER_TIMEOUT = 1000;

let gameState;

let timerNode;
let timerIntervalId;

const createTimerHtml = (time = 0) => {
  time = LEVEL_TIME - time;
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `<span class="timer-value-mins">${padLeft(minutes)}</span>
          <!----><span class="timer-value-dots">:</span>
          <!----><span class="timer-value-secs">${padLeft(seconds)}</span>`;
};

const startTimer = () => {
  if (!timerIntervalId) {
    clearInterval(timerIntervalId);
  }

  const updateTimer = () => {
    gameState.levelArtist.time++;
    timerNode.innerHTML = createTimerHtml(gameState.levelArtist.time);
    if (gameState.levelArtist.time === LEVEL_TIME) {
      clearInterval(timerIntervalId);
      showScreen(levelGenre(gameState));
    }
  };

  timerIntervalId = setInterval(updateTimer, TIMER_TIMEOUT);
};

const createLevel = () => {
  if (!tracks.size) {
    return levelGenre(gameState);
  }

  gameState.levelArtist.level++;

  const options = arrayShuffle(Array.from(tracks)).slice(0, MAX_ANSWERS_SHOW);
  const levelHistory = {answerId: null, optionId: null, optionsId: options.map(([index]) => index)};
  const answers = [];

  levelHistory.answerId = levelHistory.optionsId[getRandomInt(0, levelHistory.optionsId.length)];
  gameState.levelArtist.levelHistory.set(gameState.levelArtist.level, levelHistory);

  options.map(([index, track]) => {
    answers.push(`<div class="main-answer-wrapper">
                    <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}" />
                    <label class="main-answer" for="answer-${index}">
                      <img class="main-answer-preview" src="${track.imgSrc}">
                      ${track.title}
                    </label>
                  </div>`);
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          ${createTimerHtml(gameState.levelArtist.time)}
        </div>
    </svg>`;

  const title = `<h2 class="title main-title">Кто исполняет эту песню?</h2>`;

  const emptyString = ``;
  const html = `<section class="main main--level main--level-artist">
    ${svg}
    <div class="main-wrap">
      <div class="main-timer"></div>

      ${title}
      <div class="player-wrapper"></div>
      <form class="main-list">
      ${answers.join(emptyString)}
      </form>
    </div>
  </section>`;

  const element = getElementFromTemplate(html);

  timerNode = element.querySelector(`.timer-value`);

  Array.from(element.querySelectorAll(`.main-answer-r`)).forEach((el, index, array) => {
    el.addEventListener(`click`, (evt) => {
      const optionId = +evt.target.value;
      const history = gameState.levelArtist.levelHistory.get(gameState.levelArtist.level);
      history.optionId = optionId;
      if (history.answerId === optionId) {
        gameState.score++;
      }

      showScreen(createLevel());
    });
  });

  return element;
};

export default (state) => {
  gameState = state;
  startTimer();
  return createLevel();
};
