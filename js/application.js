import {padLeft} from './utils.js';
import WelcomePresenter from './presenters/welcome';
import GamePresenter from './presenters/game';
import ResultPresenter from './presenters/result';

const Presenter = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

class Application {
  constructor() {
    this._routes = {
      [Presenter.WELCOME]: WelcomePresenter,
      [Presenter.GAME]: GamePresenter,
      [Presenter.RESULT]: ResultPresenter,
    };

    window.onhashchange = () => {
      this._changePresenter(location.hash);
    };

    this._changePresenter(location.hash);
  }

  _changePresenter(route = ``) {
    const url = route.replace(`#`, ``).split(`=`);
    route = url[0];

    switch (route) {
      case Presenter.RESULT:
        const params = url[1];
        this._routes[route].init({
          time: +params.substring(0, 2),
          answers: +params.substring(2, 4),
          lives: +params.substring(4, 6)
        });
        break;
      default:
        this._routes[route].init();
        break;
    }
  }

  showWelcome() {
    location.hash = Presenter.WELCOME;
  }

  showGame() {
    location.hash = Presenter.GAME;
  }

  showResult(stats) {
    location.hash = `${Presenter.RESULT}=${padLeft(stats.time)}${padLeft(stats.answers)}${padLeft(stats.lives)}`;
  }
}

export default new Application();
