import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
// import { Barrage } from "./constants";

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

export const storeUserBarrage = functions.https.onCall(async (data, _context) => {
  //TODO besides the length check for content we should also add the bad word check
  if(data.content.length === 0){
    return;
  }
  const barrageDocRef = db.collection("barrage").doc();
  barrageDocRef.set({
      uid:data.uid,
      tag:data.tag,
      time:data.time,
      content:data.content,
    }).then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
    
    return  

});

exports.clearBarrage = functions.pubsub.schedule('every 100 minutes').onRun(async(context) => {
  
  const barrageDB = await db.collection('barrage').where('time','<=',Date.now());
  barrageDB.get().then((querySnapshot)=>{
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  })
  return null;
});



// functions used in production
const updateNewsClick = require("./updateNewsClick");
exports.updateNewsClick = updateNewsClick.updateNewsClick;

const updateUserHistory = require("./updateUserHistory");
exports.updateUserHistory = updateUserHistory.updateUserHistory;

const updateUserFavorite = require("./updateUserFavorite");
exports.updateUserFavorite = updateUserFavorite.updateUserFavorite;

const getUsername = require("./getUsername");
exports.getUsername = getUsername.getUsername;

const getUserAuth = require("./getUserAuth");
exports.getUserAuth = getUserAuth.getUserAuth;

const getUserHistory = require("./getUserHistory");
exports.getUserHistory = getUserHistory.getUserHistory;

const getUserFavorite = require("./getUserFavorite");
exports.getUserFavorite = getUserFavorite.getUserFavorite;

const rssFetch = require("./rssFetch");
exports.rssFetch = rssFetch.rssFetch;
exports.rssFetchPage = rssFetch.rssFetchPage;

const rssCache = require("./rssCache");
exports.rssAccumulate = rssCache.rssAccumulate;
exports.rssClearCache = rssCache.rssClearCache;

const createNewUser = require("./createNewUser");
exports.createNewUser = createNewUser.createNewUser;

const updateUserProfile = require("./updateUserProfile");
exports.updateUserProfile = updateUserProfile.updateUserProfile;
exports.updateUserPassword= updateUserProfile.updateUserPassword;