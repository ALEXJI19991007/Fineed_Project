import * as functions from "firebase-functions";
import { Response, ERROR } from "./constants";
import { db } from "./index";

exports.getUsername_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null) {
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
