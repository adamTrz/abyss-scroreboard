/* @flow */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import CONFIG from '../../credentials/firebaseConfig';

firebase.initializeApp(CONFIG);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
