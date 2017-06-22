import WelcomeScreen from './presenters/welcome';
import GameScreen from './presenters/game';
import ResultScreen from './presenters/result';

export default class Application {
  static showWelcome() {
    WelcomeScreen.init();
  }

  static showGame() {
    GameScreen.init();
  }

  static showResult(stats) {
    ResultScreen.init(stats);
  }
}
