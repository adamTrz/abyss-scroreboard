// @flow
import {
  GAMES_LOADING,
  GAMES_LOADED,
  GAME_LOADING,
  GAME_LOADED,
} from './actions';

const defaultState = {
  gamesLoading: false,
  games: [],
  gameLoading: false,
  game: {},
};

type Action = {
  payload: *,
  type: string,
};

const games = (
  state: typeof defaultState = defaultState,
  { payload, type }: Action
) => {
  switch (type) {
    case GAMES_LOADING:
      return { ...state, loading: true, games: [] };
    case GAMES_LOADED:
      return { ...state, loading: false, games: payload };
    case GAME_LOADING:
      return { ...state, gameLoading: true, game: {} };
    case GAME_LOADED:
      return { ...state, gameLoading: false, game: payload };
    default:
      return state;
  }
};

export default games;
