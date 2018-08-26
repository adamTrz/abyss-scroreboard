/* @flow */
import { combineReducers } from 'redux';

import games from './games/reducers';

const reducers = {
  games,
};
const combinedReducer = combineReducers(reducers);

export default function(state: any, action: any) {
  return combinedReducer(state, action);
}
