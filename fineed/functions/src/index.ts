import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();
export const db = admin.firestore();

export const helloWorld = functions.https.onCall(async (data, _context) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  return "hello from firebase";
});

export const helloJiyu = functions.https.onCall(async (data, _context) => {
  return "hello Jiyu";
});

export const helloYuChang = functions.https.onCall(async (data, _context) => {
  return "hello YuChang";
});

// This is just a demo
export const addEntry = functions.https.onCall(async (data, _context) => {
  try {
    const entry = db.collection("test_entries").doc();
    const entryObject = {
      id: entry.id,
      title: data.title,
      text: data.text,
    };
    entry.set(entryObject);
    return entryObject.id;
  } catch (error) {
    return "wrong";
  }
});

// functions used in production
const updateNewsClick = require("./updateNewsClick");
exports.updateNewsClick = updateNewsClick.updateNewsClick;

const updateUserHistory = require("./updateUserHistory");
exports.updateUserHistory = updateUserHistory.updateUserHistory;

const getUserHistory = require("./getUserHistory");
exports.getUserHistory = getUserHistory.getUserHistory;

const rssFetch = require("./rssFetch");
exports.rssFetch = rssFetch.rssFetch;
