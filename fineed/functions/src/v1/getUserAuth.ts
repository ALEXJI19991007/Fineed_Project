import * as functions from "firebase-functions";
import { db } from "../index";

exports.getUserAuth = functions.https.onCall(async (data, _context) => {
  try {
    const userRef = db.collection("user");
    const userSnapshot = await userRef.where("email", "==", data.email).get();
    if (userSnapshot.empty) {
        return null;
    }
    let userPwd;
    let username;
    let userId;
    userSnapshot.forEach(doc => {
        const entryData = doc.data();
        userPwd = entryData.password;
        username = entryData.username;
        userId = entryData.id;
    });
    if (data.password !== userPwd) {
        return null;
    }
    return {username: username, userId: userId};
  } catch (error) {
    return null;
  }
});