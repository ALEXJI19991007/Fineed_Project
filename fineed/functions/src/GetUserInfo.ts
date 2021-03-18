import * as functions from "firebase-functions";
import { Response, ERROR } from "./constants";
import { db } from "./index";

exports.getUsername_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    response.resp = {
      username: userData.username,
    };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.getUserHistory_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    const userHistory = userData.history;
    const newsHistory: FirebaseFirestore.DocumentData[] = [];
    // Get news objects
    for (let i = 0; i < userHistory.length; ++i) {
      let entry = db.collection("news_item").doc(userHistory[i]);
      let newsData = (await entry.get()).data() || {};
      if (newsData !== {}) {
        newsHistory.push(newsData);
      }
    }
    response.resp = {
      history: newsHistory,
    }
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});
