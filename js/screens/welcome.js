import {getElementFromTemplate} from '../utils';
import {showScreen} from '../screenManager';
import {header} from '../models/dictionary';
import {gameInitState} from '../models/gameState';
import levelArtist from './levelArtist';

export default () => {
  const html = `<section class="main main--welcome">
      <section class="logo" title="${header.logo}"><h1>${header.logo}</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">${header.title}</h2>
      <p class="text main-text">Правила просты&nbsp;— за&nbsp;2 минуты дать максимальное количество правильных ответов.<br>Удачи!</p>
    </section>`;

  const element = getElementFromTemplate(html);

  element.querySelector(`.main-play`).addEventListener(`click`, (evt) => {
    showScreen(levelArtist(Object.assign({}, gameInitState)));
  });
  return element;
};
