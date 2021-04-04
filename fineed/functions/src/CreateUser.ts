import * as functions from "firebase-functions";
import { db } from "./index";
import { Response, ERROR } from "./constants";

const initialList: string[] = [];

// expected data: { id:string, email:string }
exports.createNewUser_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (!data.email || !data.id) {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }

    const userCollectionRef = db.collection("user");
    // db query for duplicate uid/email
    const dupIdSnapshot = await userCollectionRef
      .where("id", "==", data.id)
      .get();
    const dupEmailSnapshot = await userCollectionRef
      .where("email", "==", data.email)
      .get();

    // if there is id/email duplicate(s)
    if(!dupIdSnapshot.empty || !dupEmailSnapshot.empty) {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }
    
    // create new user in the db
    const userDocumentRef = userCollectionRef.doc();
    const newUserData = {
      id: data.id,
      email: data.email,
      favorite: initialList,
      first_name: "",
      last_name: "",
      history: initialList,
      username: data.email, // use email as default username
      subscription: initialList,
    };

    userDocumentRef.set(newUserData);
    response.resp = {
      userId: userDocumentRef.id, // should == data.id
    }
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});
