import {getElementFromTemplate} from '../utils';
import {showScreen} from '../screenManager';
import {header} from '../models/dictionary.js';
import welcome from './welcome';

export default (state) => {
  const content = state.score ? `<h2 class="title">Вы настоящий меломан!</h2>
                                 <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${state.score}&nbsp;мелодии</div>
                                 <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>`
                              : `<h2 class="title">Вы проиграли</h2>
                                 <div class="main-stat">Ничего, вам повезет в следующий раз</div>`;

  const html = `<section class="main main--result">
      <section class="logo" title="${header.logo}"><h1>${header.logo}</h1></section>

      ${content}
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;

  const element = getElementFromTemplate(html);

  element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
    showScreen(welcome());
  });

  return element;
};
