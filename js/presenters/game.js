import {getRandomInt, arrayShuffle} from '../utils';
import {gameInitState, setLives, setAnswers, setTime} from '../models/gameState';
import genres from '../models/genres';
import tracks from '../models/tracks';
import Application from '../application';
import LevelArtistView from '../views/game/levelArtistView';
import LevelGenreView from '../views/game/levelGenreView';

const MAX_ANSWERS_SHOW_ON_LEVEL_ARTIST = 3;
const MAX_ANSWERS_SHOW_ON_LEVEL_GENRE = 4;
const DEFAULT_GENRE = genres.indieRock;
const MAX_QUESTIONS = 10;
const GAME_TIME = 120;
const TIMER_TIMEOUT = 1000;

const Level = {
  NONE: 0,
  ARTIST: 1,
  GENRE: 2
};

class Game {
  init() {
    this._state = Object.assign({}, gameInitState);
    this._questionNumber = 0;
    this._currentLevel = Level.NONE;
    this._timerId = null;
    this._view = null;

    this._showQuestion();
    this._startTimer();
  }

  get _timeLeft() {
    return GAME_TIME - this._state.time;
  }

  _stopTimer() {
    if (this._timerId) {
      clearInterval(this._timerId);
    }

    this._timerId = null;
  }

  _exit() {
    this._stopTimer();
    Application.showResult(Object.assign({}, this._state));
  }

  _startTimer() {
    this._stopTimer();

    const tick = () => {
      this._state = setTime(this._state, this._state.time + 1);

      if (this._view) {
        this._view.time = this._timeLeft;
      }

      if (this._state.time > GAME_TIME) {
        this._exit();
      }
    };

    this._timerId = setInterval(tick, TIMER_TIMEOUT);
  }

  _getQuestionForLevelArtist() {
    const options = arrayShuffle(Array.from(tracks)).slice(0, MAX_ANSWERS_SHOW_ON_LEVEL_ARTIST);
    const answerId = options[getRandomInt(0, options.length)][0];

    return {answerId, options};
  }

  _getQuestionForLevelGenre() {
    const isCheckGenre = (tracksArray, genre = DEFAULT_GENRE) => {
      return !!tracksArray.find((element) => element[1].genre === genre);
    };

    const tracksArray = arrayShuffle(Array.from(tracks));
    let optionsId;

    do {
      optionsId = arrayShuffle(tracksArray).slice(0, MAX_ANSWERS_SHOW_ON_LEVEL_GENRE);
    } while (!isCheckGenre(optionsId));

    return optionsId.map(([index]) => index);
  }

  _checkAnswer(isAnswer) {
    if (isAnswer) {
      this._state = setAnswers(this._state, this._state.answers + 1);
    } else {
      this._state = setLives(this._state, this._state.lives - 1);
    }

    if (this._state.lives) {
      this._showQuestion();
    } else {
      this._exit();
    }
  }

  _getLevelArtistView() {
    const question = this._getQuestionForLevelArtist();
    const view = new LevelArtistView(question.options);

    view.onAnswer = (answerId) => {
      this._checkAnswer(question.answerId === answerId);
    };

    return view;
  }

  _getLevelGenreView() {
    const view = new LevelGenreView(this._getQuestionForLevelGenre());

    view.onAnswer = (answersId) => {
      this._checkAnswer(!answersId.find((el) => tracks.get(el).genre !== DEFAULT_GENRE));
    };

    return view;
  }

  _showQuestion() {
    this._questionNumber++;

    if (this._questionNumber === MAX_QUESTIONS) {
      this._exit();
      return;
    }

    this._currentLevel = Math.random() < 0.5 ? Level.ARTIST : Level.GENRE;

    switch (this._currentLevel) {
      case Level.ARTIST:
        this._view = this._getLevelArtistView();
        break;
      case Level.GENRE:
        this._view = this._getLevelGenreView();
        break;
    }

    this._view.time = this._timeLeft;
    this._view.show();
  }
}

export default new Game();
