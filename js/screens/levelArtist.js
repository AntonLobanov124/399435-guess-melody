import {getRandomInt, arrayShuffle} from '../utils';
import {setLives, setAnswers, setTime} from '../models/gameState';
import tracks from '../models/tracks';
import result from './result';
import LevelArtistView from '../views/levelArtist/levelArtistView';

const MAX_ANSWERS_SHOW = 3;
const MAX_ANSWERS = 10;
const LEVEL_TIME = 120;
const TIMER_TIMEOUT = 1000;

const view = new LevelArtistView();
let timerId;

const stopTimer = () => {
  if (timerId) {
    clearTimeout(timerId);
  }
};

const createLevel = (state, level) => {
  if (!tracks.size || level === MAX_ANSWERS) {
    result(state).view();
    return;
  }

  level++;

  const options = arrayShuffle(Array.from(tracks)).slice(0, MAX_ANSWERS_SHOW);
  const correctAnswerId = options[getRandomInt(0, options.length)][0];

  view.answers = options;
  view.onAnswer = (answerId) => {
    if (correctAnswerId === answerId) {
      state = setAnswers(state, state.answers + 1);
    } else {
      state = setLives(state, state.lives - 1);
    }

    if (state.lives) {
      createLevel(state, level);
      view.view();
    } else {
      stopTimer();
      result(state).view();
    }
  };

  const tick = () => {
    stopTimer();
    timerId = setTimeout(() => {
      state = setTime(state, state.time + 1);
      view.time = LEVEL_TIME - state.time;

      if (state.time === LEVEL_TIME) {
        result(state).view();
      } else {
        tick();
      }
    }, TIMER_TIMEOUT);
  };

  tick();
};

export default (state) => {
  view.time = LEVEL_TIME;
  createLevel(state, 0);
  return view;
};
