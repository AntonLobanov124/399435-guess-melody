import genres from './genres';

export default () => {
  return {
    score: 0,
    levelArtist: {
      level: 0,
      time: 0,
      levelHistory: new Map()
    },
    levelGenre: {
      genre: genres.indieRock,
      optionsId: [],
      answersId: []
    }
  };
};
