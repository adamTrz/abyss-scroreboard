/* @flow */
import * as firebase from 'firebase';

import CONFIG from './config';

firebase.initializeApp(CONFIG);

export default firebase;
