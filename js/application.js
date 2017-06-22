import welcomeScreen from './presenters/welcome';
import gameScreen from './presenters/game';
import statsScreen from './presenters/stats';

export default class Application {
  static showWelcome() {
    welcomeScreen.init();
  }

  static showGame() {
    gameScreen.init();
  }

  static showStats(stats) {
    statsScreen.init(stats);
  }
}
