/* @flow */
import firebase from './initFirebase';

import { dbRefs } from './dbRefs';

const dbModule = firebase.database();
const authModule = firebase.auth();

type Score = {
  keys: string,
  lords: string,
  allies: string,
  monsters: string,
  nebulis?: string,
  leviathan?: string,
  wounds?: string,
  total: number,
};
export type Game = Array<{
  [player: string]: Score,
}>;

/**
 * DB
 */
export const createGame = async (game: Game) => {
  const { currentUser } = authModule;
  const userId = currentUser.uid;
  if (!userId) return new Error('User unathorized');
  try {
    const gameRef = await dbModule
      .ref(`${dbRefs.gamesList}`)
      .push(game, error => {
        if (error) throw error;
      });
    await dbModule
      .ref(`${dbRefs.userList}/${userId}`)
      .child(dbRefs.userGamesSuffix)
      .child(gameRef.key)
      .set(gameRef.key, error => {
        if (error) throw error;
      });
    return gameRef.key;
  } catch (error) {
    return new Error(error.message);
  }
};

export const fetchGames = async () => {
  const { currentUser } = authModule;
  const userId = currentUser.uid;
  if (!userId) return [];
  const idsSnapshots = await dbModule
    .ref(`${dbRefs.userList}/${userId}`)
    .child(dbRefs.userGamesSuffix)
    .once('value');
  const ids = idsSnapshots.val();
  const gamesIds = Object.keys(ids);
  if (!gamesIds || !gamesIds.length) return [];
  const gamePromises = gamesIds.map(gameId =>
    dbModule.ref(`${dbRefs.gamesList}/${gameId}`).once('value')
  );
  const gamesSnapshots = await Promise.all(gamePromises);
  // $FlowFixMe
  const games = gamesSnapshots.map((snap, id) => {
    const gameId = gamesIds[id];
    const game = snap.val();
    return {
      [gameId]: game,
    };
  });
  console.log('games', games);
  return games;
};

/**
 * AUTH
 */

export const signIn = (email: string, password: string) =>
  authModule.signInWithEmailAndPassword(email, password);

export const signUp = (email: string, password: string) =>
  authModule.createUserWithEmailAndPassword(email, password);
