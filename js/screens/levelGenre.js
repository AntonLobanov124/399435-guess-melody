import {arrayShuffle} from '../utils';
import genres from '../models/genres';
import tracks from '../models/tracks';
import result from './result';
import LevelGenreView from '../views/levelGenre/levelGenreView';

const MAX_ANSWERS_SHOW = 4;
const DEFAULT_GENRE = genres.indieRock;

const isCheckGenre = (tracksArray, genre = DEFAULT_GENRE) => {
  return !!tracksArray.find((element) => element[1].genre === genre);
};

const view = new LevelGenreView();

export default (state) => {
  const tracksArray = Array.from(tracks);

  if (tracksArray.length && !isCheckGenre(tracksArray)) {
    return result(state).view();
  }

  let optionsId;

  do {
    optionsId = arrayShuffle(tracksArray).slice(0, MAX_ANSWERS_SHOW);
  } while (!isCheckGenre(optionsId));

  const answers = optionsId.map(([index]) => index);

  view.answers = answers;

  return view;
};
