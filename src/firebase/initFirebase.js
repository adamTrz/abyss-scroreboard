/* @flow */
import * as firebase from 'firebase';
import 'firebase/firestore';

import CONFIG from '../../credentials/firebaseConfig';

firebase.initializeApp(CONFIG);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
