import {gameInitState} from '../models/gameState';
import levelArtist from './levelArtist';
import WelcomeView from '../views/welcome/welcomeView';

const view = new WelcomeView();

view.onStart = () => {
  levelArtist(Object.assign({}, gameInitState)).view();
};

export default () => view;
