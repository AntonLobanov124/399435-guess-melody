import assert from 'assert';
import {gameInitState, setLives, setScore, setAnswers, setTime} from './gameState.js';

suite(`Set lives`, () => {
  test(`Copy on write principle`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setLives(gameState, 0));
  });

  test(`The value is greater than or equal to zero`, () => {
    let gameState = Object.assign({lives: 1}, gameInitState);

    gameState = setLives(gameState, 2);
    assert(gameState.lives === 2);

    gameState = setLives(gameState, 0);
    assert(gameState.lives === 0);
  });

  test(`Only positive values`, () => {
    let gameState = Object.assign({}, gameInitState);

    gameState = setLives(gameState, -1);
    assert(gameState.lives >= 0);
  });
});

suite(`Set score`, () => {
  test(`Copy on write principle`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setScore(gameState, 0));
  });

  test(`The value is greater than or equal to zero`, () => {
    let gameState = Object.assign({answers: 10}, gameInitState);

    gameState = setScore(gameState, 2);
    assert(gameState.score === 2);

    gameState = setScore(gameState, 0);
    assert(gameState.score === 0);
  });

  test(`Only positive values`, () => {
    let gameState = Object.assign({}, gameInitState);

    gameState = setScore(gameState, -1);
    assert(gameState.score >= 0);
  });
});

suite(`Set answers`, () => {
  test(`Copy on write principle`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setAnswers(gameState, 0));
  });

  test(`The value is greater than or equal to zero`, () => {
    let gameState = Object.assign({answers: 10}, gameInitState);

    gameState = setAnswers(gameState, 2);
    assert(gameState.answers === 2);

    gameState = setAnswers(gameState, 0);
    assert(gameState.answers === 0);
  });

  test(`Only positive values`, () => {
    let gameState = Object.assign({}, gameInitState);

    gameState = setAnswers(gameState, -1);
    assert(gameState.answers >= 0);
  });
});

suite(`Set time`, () => {
  test(`Copy on write principle`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setTime(gameState, 0));
  });

  test(`The value is greater than or equal to zero`, () => {
    let gameState = Object.assign({time: 10}, gameInitState);

    gameState = setTime(gameState, 2);
    assert(gameState.time === 2);

    gameState = setTime(gameState, 0);
    assert(gameState.time === 0);
  });

  test(`Only positive values`, () => {
    let gameState = Object.assign({}, gameInitState);

    gameState = setTime(gameState, -1);
    assert(gameState.time >= 0);
  });
});
