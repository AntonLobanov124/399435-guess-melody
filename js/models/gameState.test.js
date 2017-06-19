import assert from 'assert';
import {gameInitState, setLives, setAnswers, setTime} from './gameState.js';

mocha.setup(`tdd`);

suite(`Set lives`, () => {
  test(`Copy on write`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setLives(gameState, 0));
  });
});

suite(`Set answers`, () => {
  test(`Copy on write principle`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setAnswers(gameState, 0));
  });
});

suite(`Set time`, () => {
  test(`Copy on write principle`, () => {
    const gameState = Object.assign({}, gameInitState);
    assert(gameState !== setTime(gameState, 0));
  });
});
