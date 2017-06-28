import {padLeft, preloadAudio} from './utils.js';
import PreloaderPresenter from './presenters/preloader';
import WelcomePresenter from './presenters/welcome';
import GamePresenter from './presenters/game';
import ResultPresenter from './presenters/result';
import QuestionType from './enums/questionType';
import QuestionModel from './models/questionModel.js';

const Presenter = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

class Application {
  init() {
    this.showPreloader();

    QuestionModel.load()
      .then((data) => {
        const urls = data.reduce((result, current) => {
          switch (current.type) {
            case QuestionType.ARTIST:
              result.push(current.src);
              break;
            case QuestionType.GENRE:
              result = result.concat(current.answers.map((answer) => answer.src));
              break;
          }

          return result;
        }, []);

        preloadAudio(urls)
          .then(() => this._setup(data))
          .then(() => this._changePresenter(location.hash));
      });
  }

  showPreloader() {
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
}

export default new Application();
