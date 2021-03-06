import * as functions from "firebase-functions";
import { db } from "./index";

const initialList:string[] = [];

exports.createNewUser = functions.https.onCall(async (data, _context) => {
  try {
    const userRef = db.collection("user");
    // const newUserEntry = userRef.doc(data.id);
    const newUserData = {
        id: data.id,
        email: data.email,
        favorite: initialList,
        first_name: "New",
        last_name: "User",
        history: initialList,
        password: "",
        username: data.id,
    };
    await userRef.doc(data.id).set(newUserData);
    return newUserData.id;
  } catch (error) {
    return null;
  }
});
