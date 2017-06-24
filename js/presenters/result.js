import Application from '../application';
import statistics from '../models/statistics.js';
import {gameInitState} from '../models/gameState';
import ResultView from '../views/result/resultView.js';

export default class Result {
  _getPercentAnswers(time, answers) {
    const statistic = {time, answers};

    statistics.push(statistic);
    statistics.sort((a, b) => {
      return b.answers - a.answers || a.time - b.time;
    });

    return (statistics.length - statistics.indexOf(statistic) - 1) / statistics.length * 100;
  }

  init(state = Object.assign({}, gameInitState)) {
    const view = new ResultView(state.score, state.score ? this._getPercentAnswers(state.time, state.answers) : 0);

    view.onReplay = () => {
      Application.showGame();
    };

    view.show();
  }
}
