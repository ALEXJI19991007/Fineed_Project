import * as functions from "firebase-functions";
import { db } from "../index";

exports.updateUserProfile = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const currentUserData = (await userEntry.get()).data() || {};
    userEntry.update({
      first_name: data.firstName === "" ? currentUserData.first_name : data.firstName,
      last_name: data.lastName === "" ? currentUserData.last_name : data.lastName,
      username: data.username === "" ? currentUserData.username : data.username,
    });
    return data.username;
  } catch (error) {
    return null;
  }
});

exports.updateUserPassword = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const currentUserData = (await userEntry.get()).data() || {};
    const oldPassword = currentUserData.password;
    if (oldPassword !== data.oldPassword) {
        return "Update Failed";
    }
    userEntry.update({
      password: data.newPassword,
    });
    return "Update Success";
  } catch (error) {
    return null;
  }
});
