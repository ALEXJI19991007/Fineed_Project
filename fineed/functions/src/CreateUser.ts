import * as functions from "firebase-functions";
import { db } from "./index";
import { Response, ERROR } from "./constants";
import {Md5} from "md5-typescript";

const initialList: string[] = [];

exports.createNewUser_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.email === null || data.email === "") {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }
    // TODO: Need to check whether the email and the username is duplicating (which is not allowed)
    const userRef = db.collection("user");
    const dupEmailSnapshot = await userRef.where("email", "==", data.email).get();
    const dupIdSnapshot = await userRef.where("id", "==", data.id).get();
    // if there is email/id duplicate(s)
    if(!dupEmailSnapshot.empty || !dupIdSnapshot.empty) {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }

    // For later register with email
    // const userEntry = (data.id === null || data.id === "") ? userRef.doc() : userRef.doc(data.id);
    const newUserData = {
      id: data.id,
      email: data.email,
      favorite: initialList,
      first_name: "",
      last_name: "",
      history: initialList,
      // md5 hash the password before storing to the database
      password: Md5.init(data.password),
      username: data.id,
      subscription: initialList,
    };
    await userRef.doc(data.id).set(newUserData);
    response.resp = {
        id: newUserData.id,
    }
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});
