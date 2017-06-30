import {gameInitState, setLives, setAnswers, setScore, setTime} from '../models/gameState';
import QuestionType from '../enums/questionType.js';
import Application from '../application';
import LevelArtistView from '../views/game/levelArtistView';
import LevelGenreView from '../views/game/levelGenreView';

const MAX_QUESTIONS = 10;
const QUICK_QUESTION_TIMEOUT = 10;
const GAME_TIME = 120;
const TIMER_TIMEOUT = 1000;

export default class Game {
  constructor(data) {
    this._questions = data;
  }

  get _timeLeft() {
    return GAME_TIME - this._state.time;
  }

  init() {
    this._state = Object.assign({}, gameInitState);
    this._questionNumber = 0;
    this._questionStartTime = 0;
    this._timerId = null;
    this._view = null;

    this._showQuestion();
    this._startTimer();
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

      if (this._state.time >= GAME_TIME) {
        this._state = setScore(this._state, 0);
        this._exit();
      }
    };

    this._timerId = setInterval(tick, TIMER_TIMEOUT);
  }

  _getQuestion() {
    return this._questions[this._questionNumber - 1];
  }

  _getLevelArtistView(question) {
    const view = new LevelArtistView(question);

    view.onAnswer = (answerId) => {
      this._checkAnswer(question.answers[answerId].isCorrect);
    };

    return view;
  }

  _getLevelGenreView(question) {
    const view = new LevelGenreView(question);

    view.onAnswer = (answersId) => {
      this._checkAnswer(!answersId.find((el) => question.answers[el].genre !== question.genre));
    };

    return view;
  }

  _getLevelView(question) {
    switch (question.type) {
      case QuestionType.ARTIST:
        return this._getLevelArtistView(question);
      case QuestionType.GENRE:
        return this._getLevelGenreView(question);
      default:
        throw new Error(`Unknown question type.`);
    }
  }

  _showQuestion() {
    this._questionNumber++;

    if (this._questionNumber === MAX_QUESTIONS) {
      this._exit();
      return;
    }

    const question = this._getQuestion();
    this._questionStartTime = this._state.time;

    this._view = this._getLevelView(question);
    this._view.time = this._timeLeft;
    this._view.show();
  }

  _checkAnswer(isAnswer) {
    if (isAnswer) {
      const winScore = this._state.time - this._questionStartTime > QUICK_QUESTION_TIMEOUT ? 1 : 2;
      this._state = setScore(this._state, this._state.score + winScore);
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
}
