import Application from '../application';
import StatisticModel from '../models/statisticModel.js';
import {gameInitState} from '../models/gameState';
import ResultView from '../views/result/resultView.js';

export default class Result {
  init(state = Object.assign({}, gameInitState)) {
    if (state.score > 0) {
      Application.showPreloader();
      StatisticModel.send({time: state.time, answers: state.answers})
        .then(() => {
          StatisticModel.load()
            .then((data) => {
              this._getResultView(state.score, this._getPercentAnswers(data)).show();
            });
        });
    } else {
      this._getResultView().show();
    }
  }

  _getResultView(score = 0, percent = 0) {
    const view = new ResultView(score, percent);

    view.onReplay = () => {
      Application.showGame();
    };

    return view;
  }

  _getPercentAnswers(statistics = []) {
    if (!Array.isArray(statistics)) {
      throw new Error(`Invalid parameter.`);
    }

    if (!statistics.length) {
      return 100;
    }

    const statisticsClone = statistics.slice(0);
    const statistic = statisticsClone[statisticsClone.length - 1];

    statisticsClone.sort((a, b) => {
      return b.answers - a.answers || a.time - b.time;
    });

    return (statisticsClone.length - statisticsClone.indexOf(statistic)) / statisticsClone.length * 100;
  }
}
