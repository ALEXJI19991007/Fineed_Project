import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/analytics';

const firebaseConfig = require('./firebaseConfig.json');
Firebase.initializeApp(firebaseConfig);
Firebase.analytics();

export const Analytics = Firebase.analytics;
export const Auth = Firebase.auth;
export const Functions = Firebase.functions;
