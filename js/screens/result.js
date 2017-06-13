import {getElementFromTemplate} from '../utils';
import {showScreen} from '../screenManager';
import dictionary from '../models/dictionary.js';
import welcome from './welcome';

const SCOPE = `score`;

export default (state) => {
  const content = state.score ? `<h2 class="title">${dictionary.result.winTitle}</h2>
                           <div class="main-stat">${dictionary.result.winStat.replace(SCOPE, state.score)}</div>
                           <span class="main-comparison">${dictionary.result.winComparison}</span>`
                        : `<h2 class="title">${dictionary.result.loseTitle}</h2>
                           <div class="main-stat">${dictionary.result.loseStat}</div>`;


  const html = `<section class="main main--result">
      <section class="logo" title="${dictionary.header.logo}"><h1>${dictionary.header.logo}</h1></section>

      ${content}
      <span role="button" tabindex="0" class="main-replay">${dictionary.buttons.replay}</span>
    </section>`;

  const element = getElementFromTemplate(html);

  element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
    showScreen(welcome());
  });

  return element;
};
