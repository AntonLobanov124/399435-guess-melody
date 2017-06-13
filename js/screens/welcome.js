import {getElementFromTemplate} from '../utils';
import {showScreen} from '../screenManager';
import dictionary from '../models/dictionary';
import gameInitState from '../models/gameInitState';
import levelArtist from './levelArtist';

export default () => {
  const html = `<section class="main main--welcome">
      <section class="logo" title="${dictionary.header.logo}"><h1>${dictionary.header.logo}</h1></section>
      <button class="main-play">${dictionary.buttons.play}</button>
      <h2 class="title main-title">${dictionary.header.title}</h2>
      <p class="text main-text">${dictionary.welcome.rules}</p>
    </section>`;

  const element = getElementFromTemplate(html);

  element.querySelector(`.main-play`).addEventListener(`click`, (evt) => {
    const gameState = Object.assign({}, gameInitState);
    gameState.levelArtist = Object.assign({}, gameInitState.levelArtist, {levelHistory: new Map()});
    gameState.levelGenre = Object.assign({}, gameInitState.levelGenre);

    showScreen(levelArtist(gameState));
  });
  return element;
};
