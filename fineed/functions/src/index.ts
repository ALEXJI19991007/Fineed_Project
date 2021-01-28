import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();
// const db = admin.firestore();



export const helloWorld = functions.https.onCall(async (data, _context) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    return "hello from firebase";
  });
