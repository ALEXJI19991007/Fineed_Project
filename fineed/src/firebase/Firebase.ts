import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = require('./firebaseConfig.json');
let app = Firebase.initializeApp(firebaseConfig);

Firebase.analytics();

export const Analytics = Firebase.analytics;
export const Auth = Firebase.auth;
export const Functions = Firebase.functions;
export const FireStore = Firebase.firestore;
export const db = Firebase.firestore(app);
