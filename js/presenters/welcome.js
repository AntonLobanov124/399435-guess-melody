import Application from '../application';
import WelcomeView from '../views/welcome/welcomeView';

export default class Welcome {
  init() {
    const view = new WelcomeView();

    view.onStart = () => {
      Application.showGame();
    };

    view.show();
  }
}
