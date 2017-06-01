import * as utils from '../utils';
import * as screenManager from '../screenManager';
import welcome from './welcome';

const html = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

const element = utils.getElementFromTemplate(html);

element.querySelector(`.main-replay`).addEventListener('click', (evt) => {
  screenManager.showScreen(welcome);
});

export default element;
