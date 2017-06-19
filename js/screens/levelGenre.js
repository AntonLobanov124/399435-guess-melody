import {getElementFromTemplate, arrayShuffle} from '../utils';
import {showScreen} from '../screenManager';
import genres from '../models/genres';
import tracks from '../models/tracks';
import result from './result';

const MAX_ANSWERS_SHOW = 4;
const DEFAULT_GENRE = genres.indieRock;

const levelStateInit = Object.freeze({
  genre: genres.indieRock,
  optionsId: [],
  answersId: []
});

let levelState;

const isCheckGenre = (tracksArray, genre = DEFAULT_GENRE) => {
  return !!tracksArray.find((element) => element[1].genre === genre);
};

export default (state) => {
  const tracksArray = Array.from(tracks);

  if (tracksArray.length && !isCheckGenre(tracksArray)) {
    return result(state);
  }

  levelState = Object.freeze(levelStateInit);
  let optionsId;

  do {
    optionsId = arrayShuffle(tracksArray).slice(0, MAX_ANSWERS_SHOW);
  } while (!isCheckGenre(optionsId));

  levelState.genre = DEFAULT_GENRE;
  levelState.optionsId = optionsId.map((element) => element[0]);

  const answers = optionsId.map(([index]) => {
    return `<div class="genre-answer">
              <div class="player-wrapper"></div>
              <input type="checkbox" name="answer" value="answer-${index}" id="${index}">
              <label class="genre-answer-check" for="${index}"></label>
            </div>`;
  });

  const emptyString = ``;
  const html = `<section class="main main--level main--level-genre">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        ${answers.join(emptyString)}

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </section>`;

  const element = getElementFromTemplate(html);
  const answersNode = Array.from(element.querySelectorAll(`input[name="answer"]`));
  const sendBtn = element.querySelector(`.genre-answer-send`);

  sendBtn.disabled = true;

  answersNode.forEach((el) => {
    el.addEventListener(`change`, (evt) => {
      sendBtn.disabled = !answersNode.find((answer) => answer.checked);
    });
  });

  sendBtn.addEventListener(`click`, (evt) => {
    levelState.answersId = answersNode.filter((answer) => answer.checked).map((answer) => +answer.id);
    showScreen(result(state));
  });

  return element;
};
