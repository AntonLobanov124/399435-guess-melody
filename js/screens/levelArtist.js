import {getElementFromTemplate, getRandomInt} from '../utils';
import {showScreen} from '../screenManager';
import dictionary from '../models/dictionary.js';
import tracks from '../models/tracks.js';
import levelGenre from './levelGenre';

const ANSWERS_SHOW = 3;
const EMPTY_STRING = ``;
const LEVEL_TIME = 10;
const TIMER_TIMEOUT = 1000;

let gameState;

let timerNode;
let timerInterval;

const createTimerHtml = (time = 0) => {
  time = LEVEL_TIME - time;
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const padLeft = (num = 0) => num > 9 ? num.toString() : `0${num}`;

  return `<span class="timer-value-mins">${padLeft(minutes)}</span><!----><span class="timer-value-dots">:</span><!----><span class="timer-value-secs">${padLeft(seconds)}</span>`;
};

const startTimer = () => {
  if (!timerInterval) {
    clearInterval(timerInterval);
  }

  const updateTimer = () => {
    gameState.levelArtist.time++;
    timerNode.innerHTML = createTimerHtml(gameState.levelArtist.time);
    if (gameState.levelArtist.time === LEVEL_TIME) {
      clearInterval(timerInterval);
      showScreen(levelGenre(gameState));
    }
  };

  timerInterval = setInterval(updateTimer, TIMER_TIMEOUT);
};

const createLevel = () => {
  gameState.levelArtist.level++;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          ${createTimerHtml(gameState.levelArtist.time)}
        </div>
    </svg>`;

  const title = `<h2 class="title main-title">${dictionary.levelArtist.title}</h2>`;

  const levelHistory = {answerId: null, optionId: null, optionsId: []};
  const answers = [];

  for (let i = 0, answersSize = tracks.size + 1, optionId = null; i < ANSWERS_SHOW; i++) {
    do {
      optionId = getRandomInt(1, answersSize);
    } while (levelHistory.optionsId.indexOf(optionId) !== -1);

    levelHistory.optionsId.push(optionId);

    const option = tracks.get(optionId);

    answers.push(`<div class="main-answer-wrapper">
                    <input class="main-answer-r" type="radio" id="answer-${optionId}" name="answer" value="${optionId}" />
                    <label class="main-answer" for="answer-${optionId}">
                      <img class="main-answer-preview" src="${option.imgSrc}">
                      ${option.title}
                    </label>
                  </div>`);
  }

  levelHistory.answerId = levelHistory.optionsId[getRandomInt(0, ANSWERS_SHOW)];
  gameState.levelArtist.levelHistory.set(gameState.levelArtist.level, levelHistory);

  const html = `<section class="main main--level main--level-artist">
    ${svg}
    <div class="main-wrap">
      <div class="main-timer"></div>;

      ${title}
      <div class="player-wrapper"></div>
      <form class="main-list">
      ${answers.join(EMPTY_STRING)}
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
