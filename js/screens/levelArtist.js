import {getElementFromTemplate, getRandomInt, arrayShuffle, padLeft} from '../utils';
import {showScreen} from '../screenManager';
import {setLives, setAnswers, setTime} from '../models/gameState.js';
import tracks from '../models/tracks.js';
import result from './result';

const MAX_ANSWERS_SHOW = 3;
const MAX_ANSWERS = 10;
const LEVEL_TIME = 120;
const TIMER_TIMEOUT = 1000;

const levelStateInit = () => {
  return {
    level: 0,
    levelHistory: new Map()
  };
};


let gameState;
let levelState;

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
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }

  const updateTimer = () => {
    gameState = setTime(gameState, gameState.time + 1);
    timerNode.innerHTML = createTimerHtml(gameState.time);
    if (gameState.time === LEVEL_TIME) {
      showResult();
    }
  };

  timerIntervalId = setInterval(updateTimer, TIMER_TIMEOUT);
};

const showResult = () => {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }

  return result(gameState);
};

const createLevel = () => {
  if (!tracks.size) {
    return result(gameState);
  }

  levelState.level++;

  const options = arrayShuffle(Array.from(tracks)).slice(0, MAX_ANSWERS_SHOW);
  const levelHistory = {answerId: null, optionId: null, optionsId: options.map(([index]) => index)};
  const answers = options.map(([index, track]) => {
    return `<div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}" />
              <label class="main-answer" for="answer-${index}">
                <img class="main-answer-preview" src="${track.imgSrc}">
                ${track.title}
              </label>
            </div>`;
  });

  levelHistory.answerId = levelHistory.optionsId[getRandomInt(0, levelHistory.optionsId.length)];
  levelState.levelHistory.set(levelState.level, levelHistory);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          ${createTimerHtml(gameState.time)}
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

  Array.from(element.querySelectorAll(`.main-answer-r`)).forEach((el) => {
    el.addEventListener(`click`, (evt) => {
      const optionId = +evt.target.value;
      const history = levelState.levelHistory.get(levelState.level);
      history.optionId = optionId;
      if (history.answerId === optionId) {
        gameState = setAnswers(gameState, gameState.answers + 1);
      } else {
        gameState = setLives(gameState, gameState.lives - 1);
      }

      showScreen(gameState.lives && levelState.level !== MAX_ANSWERS ? createLevel() : showResult());
    });
  });

  return element;
};

export default (state) => {
  gameState = state;
  levelState = levelStateInit();

  const element = createLevel();

  startTimer();

  return element;
};
