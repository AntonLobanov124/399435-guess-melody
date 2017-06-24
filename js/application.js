import {padLeft} from './utils.js';
import PreloaderPresenter from './presenters/preloader';
import WelcomePresenter from './presenters/welcome';
import GamePresenter from './presenters/game';
import ResultPresenter from './presenters/result';
import BaseModel from './models/baseModel.js';

const Presenter = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

class Application {
  init() {
    this._showPreloader();

    this._model = new class extends BaseModel {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
      }
    }();

    this._model.load()
      .then((data) => this._setup(data))
      .then(() => this._changePresenter(location.hash));
  }

  _setup(data) {
    this._routes = {
      [Presenter.WELCOME]: new WelcomePresenter(),
      [Presenter.GAME]: new GamePresenter(data),
      [Presenter.RESULT]: new ResultPresenter(),
    };

    window.onhashchange = () => {
      this._changePresenter(location.hash);
    };

    return data;
  }

  _changePresenter(route = ``) {
    const url = route.replace(`#`, ``).split(`=`);
    route = url[0];
    switch (route) {
      case Presenter.RESULT:
        const params = url[1];
        this._routes[route].init({
          score: +params.substring(0, 2),
          answers: +params.substring(2, 4),
          lives: +params.substring(4, 6),
          time: +params.substring(6, 9)
        });
        break;
      default:
        this._routes[route].init();
        break;
    }
  }

  _showPreloader() {
    new PreloaderPresenter().init();
  }

  showWelcome() {
    location.hash = Presenter.WELCOME;
  }

  showGame() {
    location.hash = Presenter.GAME;
  }

  showResult(stats) {
    location.hash = `${Presenter.RESULT}=${padLeft(stats.score)}${padLeft(stats.answers)}${padLeft(stats.lives)}${padLeft(stats.time)}`;
  }
}

export default new Application();
