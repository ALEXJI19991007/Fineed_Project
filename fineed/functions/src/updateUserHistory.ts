import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {db} from "./index"

exports.updateUserHistory = functions.https.onCall(
    async (data, _context) => {
      try {
        const userEntry = db.collection("user").doc(data.userId);
        const newHistory = userEntry.update({
          history: admin.firestore.FieldValue.arrayUnion(data.newsId),
        });
        return newHistory;
      } catch (error) {
        return null;
      }
    }
  );