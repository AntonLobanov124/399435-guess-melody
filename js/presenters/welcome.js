import Application from '../application';
import WelcomeView from '../views/welcome/welcomeView';


class Welcome {
  init() {
    const view = new WelcomeView();

    view.onStart = () => {
      Application.showGame();
    };

    view.show();
  }
}

export default new Welcome();
