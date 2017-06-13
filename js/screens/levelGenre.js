import {getElementFromTemplate, arrayShuffle} from '../utils';
import {showScreen} from '../screenManager';
import dictionary from '../models/dictionary';
import genres from '../models/genres';
import tracks from '../models/tracks';
import result from './result';

const MAX_ANSWERS_SHOW = 4;
const EMPTY_STRING = ``;

const isCheckGenre = (tracksArray, genre) => {
  return !!tracksArray.find((element) => element[1].genre === genre);
};

export default (state) => {
  const tracksArray = Array.from(tracks);

  if (!isCheckGenre(tracksArray, genres.indieRock)) {
    showScreen(result(state));
  }

  const anwersShow = tracksArray.length >= MAX_ANSWERS_SHOW ? MAX_ANSWERS_SHOW : tracksArray.length;
  let optionsId;

  do {
    optionsId = arrayShuffle(tracksArray).slice(0, anwersShow);
  } while (!isCheckGenre(optionsId, genres.indieRock));

  state.levelGenre.genre = genres.indieRock;
  state.levelGenre.optionsId = optionsId.map((element) => element[0]);

  const answers = [];
  for (const optionId of optionsId) {
    answers.push(`<div class="genre-answer">
                    <div class="player-wrapper"></div>
                    <input type="checkbox" name="answer" value="answer-${optionId[0]}" id="${optionId[0]}">
                    <label class="genre-answer-check" for="${optionId[0]}"></label>
                  </div>`);
  }

  const html = `<section class="main main--level main--level-genre">
      <h2 class="title">${dictionary.levelGenre.title}</h2>
      <form class="genre">
        ${answers.join(EMPTY_STRING)}

        <button class="genre-answer-send" type="submit">${dictionary.buttons.answerSend}</button>
      </form>
    </section>`;

  const element = getElementFromTemplate(html);
  const answersNode = Array.from(element.querySelectorAll(`input[name="answer"]`));
  const sendBtn = element.querySelector(`.genre-answer-send`);

  sendBtn.disabled = true;

  answersNode.forEach((el, index, array) => {
    el.addEventListener(`change`, (evt) => {
      sendBtn.disabled = !answersNode.find((answer) => answer.checked === true);
    });
  });

  sendBtn.addEventListener(`click`, (evt) => {
    state.levelGenre.answersId = answersNode.filter((answer) => answer.checked === true).map((answer) => +answer.id);
    showScreen(result(state));
  });

  return element;
};
