import PreloaderView from '../views/preloader/preloaderView';

export default class Welcome {
  init() {
    new PreloaderView().show();
  }
}
