/* @flow */
import { fetchGames } from '../../firebase';

export const GAMES_LOADING = 'GAMES_LOADING';
export const GAMES_LOADED = 'GAMES_LOADED';
export const GAME_LOADING = 'GAME_LOADING';
export const GAME_LOADED = 'GAME_LOADED';

type Dispatch = ({ type: string, payload?: * }) => Promise<*>;

export const fetchGameResults = () => (dispatch: Dispatch) => {
  dispatch({ type: GAMES_LOADING });
  fetchGames()
    .then(games => {
      dispatch({
        type: GAMES_LOADED,
        payload: games,
      });
    })
    .catch(err =>
      dispatch({
        type: 'GAMES_LOADED_ERROR',
        payload: err.message,
      })
    );
};
