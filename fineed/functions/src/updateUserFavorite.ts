import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { db } from "./index";

exports.updateUserFavorite = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const newFavorite = userEntry.update({
      favorite: admin.firestore.FieldValue.arrayUnion(data.newsId),
    });
    return newFavorite;
  } catch (error) {
    return null;
  }
});
