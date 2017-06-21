import statistics from '../models/statistics.js';
import welcome from './welcome';
import ResultView from '../views/result/resultView.js';

const view = new ResultView();
const getPercentAnswers = (time, answers) => {
  const statistic = {time, answers};

  statistics.push(statistic);
  statistics.sort((a, b) => {
    return b.answers - a.answers || a.time - b.time;
  });

  return (statistics.length - statistics.indexOf(statistic) - 1) / statistics.length * 100;
};

export default (state) => {
  view.setContent(state.answers, state.answers ? getPercentAnswers(state.time, state.answers) : 0);
  view.onReplay = () => {
    welcome().view();
  };

  return view;
};
