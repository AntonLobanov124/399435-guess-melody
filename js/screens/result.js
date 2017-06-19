import {getElementFromTemplate} from '../utils';
import {showScreen} from '../screenManager';
import {header} from '../models/dictionary.js';
import statistics from '../models/statistics.js';
import welcome from './welcome';

const getPercentAnswers = (time, answers) => {
  const statistic = {time, answers};

  statistics.push(statistic);
  statistics.sort((a, b) => {
    if (a.answers === b.answers) {
      if (a.time < b.time) {
        return -1;
      } else {
        return a.time > b.time ? 1 : 0;
      }
    } else {
      return a.answers > b.answers ? -1 : 1;
    }
  });

  return (statistics.length - statistics.indexOf(statistic) - 1) / statistics.length * 100;
};

export default (state) => {
  const percent = state.answers ? getPercentAnswers(state.time, state.answers) : 0;
  const content = state.answers ? `<h2 class="title">Вы настоящий меломан!</h2>
                                   <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали ${state.answers}&nbsp;мелодии</div>
                                   <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${percent.toFixed()}%&nbsp;игроков</span>`
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
