import * as functions from "firebase-functions";
import { db } from "./index";
import { Response, ERROR } from "./constants";
import {Md5} from "md5-typescript";

const initialList: string[] = [];

// For now I am ignoring data.id -- I am assuming that
// this function is soley used for creating a new user and
// nothing else.
// expected data: { email:string, password:string }
exports.createNewUser_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (!data.email) {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }

    // TODO: somebody checks if this is right
    const userCollectionRef = db.collection("user");
    const dupEmailSnapshot = await userCollectionRef
      .where("email", "==", data.email)
      .get();
    //const dupIdSnapshot = await userRef.where("id", "==", data.id).get();
    //if(!dupEmailSnapshot.empty || !dupIdSnapshot.empty) {

    // if there is email duplicate(s)
    if(!dupEmailSnapshot.empty) {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }

    // For later register with email
    // const userEntry = (data.id === null || data.id === "") ? userRef.doc() : userRef.doc(data.id);
    
    const userDocumentRef = userCollectionRef.doc();
    const newUserData = {
      id: userDocumentRef.id,
      email: data.email,
      favorite: initialList,
      first_name: "",
      last_name: "",
      history: initialList,
      // md5 hash the password before storing to the database
      password: Md5.init(data.password),
      username: userDocumentRef.id,
      subscription: initialList,
    };

    userDocumentRef.set(newUserData);
    response.resp = {
        id: userDocumentRef.id,
    }
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});
