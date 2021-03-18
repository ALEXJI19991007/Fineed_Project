import * as functions from "firebase-functions";
import { db } from "../index";

exports.getUserFavorite = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      return null;
    }
    const userFavorite = userData.favorite;
    const favoriteNews: FirebaseFirestore.DocumentData[] = [];
    // Get news objects
    for (let i = 0; i < userFavorite.length; ++i) {
      let entry = db.collection("news_item").doc(userFavorite[i]);
      let newsData = (await entry.get()).data() || {};
      favoriteNews.push(newsData);
    }
    return favoriteNews;
  } catch (error) {
    return null;
  }
});
