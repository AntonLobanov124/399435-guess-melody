import Application from '../application';
import statistics from '../models/statistics.js';
import StatsView from '../views/Stats/statsView.js';

class Stats {
  _getPercentAnswers(time, answers) {
    const statistic = {time, answers};

    statistics.push(statistic);
    statistics.sort((a, b) => {
      return b.answers - a.answers || a.time - b.time;
    });

    return (statistics.length - statistics.indexOf(statistic) - 1) / statistics.length * 100;
  }

  init(state) {
    const view = new StatsView(state.answers, state.answers ? this._getPercentAnswers(state.time, state.answers) : 0);

    view.onReplay = () => {
      Application.showGame();
    };

    view.show();
  }
}

export default new Stats();
