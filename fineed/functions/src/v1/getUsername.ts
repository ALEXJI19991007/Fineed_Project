import * as functions from "firebase-functions";
import { db } from "../index";

exports.getUsername = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      return null;
    }
    return userData.username;
  } catch (error) {
    return null;
  }
});
