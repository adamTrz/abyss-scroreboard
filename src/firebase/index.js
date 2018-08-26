/* @flow */
import firebase from './initFirebase';

import { dbRefs } from './dbRefs';
import type { Score } from '../types';

const dbModule = firebase.firestore();

const authModule = firebase.auth();

/**
 * DB
 */
export const createGame = async (
  scores: {
    [key: string]: Score,
  },
  total: Array<{ [player: string]: number }>
) => {
  const { currentUser } = authModule;
  const userId = currentUser.uid;
  if (!userId) return new Error('User unathorized');
  return dbModule
    .collection(dbRefs.gamesList)
    .add({
      userId,
      scores,
      total,
    })
    .then(ref => ref.id)
    .catch(err => {
      throw new Error(err.message);
    });
};

export const fetchGames = async () => {
  const { currentUser } = authModule;
  const userId = currentUser.uid;
  return dbModule
    .collection(dbRefs.gamesList)
    .where('userId', '==', userId)
    .get()
    .then(snap => {
      const games = [];
      snap.forEach(s => games.push(s.data()));
      return games;
    })
    .catch(_ => []);
};

/**
 * AUTH
 */

export const signIn = (email: string, password: string) =>
  authModule.signInWithEmailAndPassword(email, password);

export const signUp = (email: string, password: string) =>
  authModule.createUserWithEmailAndPassword(email, password);
