export const gameInitState = Object.freeze({
  lives: 3,
  time: 0,
  answers: 0,
  score: 0
});

export const setLives = (state, value) => {
  const stateCopy = Object.assign({}, state);

  if (value >= 0) {
    stateCopy.lives = value;
  }

  return stateCopy;
};

export const setAnswers = (state, value) => {
  const stateCopy = Object.assign({}, state);

  if (value >= 0) {
    stateCopy.answers = value;
  }

  return stateCopy;
};

export const setScore = (state, value) => {
  const stateCopy = Object.assign({}, state);

  if (value >= 0) {
    stateCopy.score = value;
  }

  return stateCopy;
};

export const setTime = (state, value) => {
  const stateCopy = Object.assign({}, state);

  if (value >= 0) {
    stateCopy.time = value;
  }

  return stateCopy;
};
