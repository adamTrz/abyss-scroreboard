/* @flow */
import * as firebase from 'firebase';

import CONFIG from '../../credentials/firebaseConfig';

firebase.initializeApp(CONFIG);

export default firebase;
