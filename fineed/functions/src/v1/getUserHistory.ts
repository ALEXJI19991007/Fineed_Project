import * as functions from "firebase-functions";
import { db } from "./index";

exports.getUserHistory = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      return null;
    }
    const userHistory = userData.history;
    const newsHistory: FirebaseFirestore.DocumentData[] = [];
    // Get news objects
    for (let i = 0; i < userHistory.length; ++i) {
      let entry = db.collection("news_item").doc(userHistory[i]);
      let newsData = (await entry.get()).data() || {};
      newsHistory.push(newsData);
    }
    return newsHistory;
  } catch (error) {
    return null;
  }
});
