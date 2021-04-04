import { Auth } from './Firebase';
import { FirebaseAnalytics } from './FirebaseAnalytics';
import { createNewUser_v2 } from './FirebaseFunction';
import firebase from "firebase";
import { ERROR } from "../atoms/constants";

export const FirebaseAuth = {

  async loginWithGoogle() {
    try {
      const result = await Auth().signInWithPopup(
        new Auth.GoogleAuthProvider(),
      );
      if (result?.additionalUserInfo?.isNewUser) {
        FirebaseAnalytics.logEvent('sign_up', { method: 'Google' });
        createUser(result.user?.uid, result.user?.email, true);
      }
      FirebaseAnalytics.logEvent('login', { method: 'Google' });
      return result.user?.uid;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  },

  async loginWithGitHub() {
    try {
      const result = await Auth().signInWithPopup(
        new Auth.GithubAuthProvider(),
      );
      if (result?.additionalUserInfo?.isNewUser) {
        FirebaseAnalytics.logEvent('sign_up', { method: 'GitHub' });
        createUser(result.user?.uid, result.user?.email, true);
      }
      FirebaseAnalytics.logEvent('login', { method: 'GitHub' });
      return result.user?.uid;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  },

  async registerWithEmail(email: string, password: string) {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        console.log("test");
        let resp = await createUser(userCredential.user?.uid, email, false);
        // only log analytics if both firebase and our auth succeed
        if(resp.error === ERROR.NO_ERROR) {
          FirebaseAnalytics.logEvent('sign_up', { method: 'Email' });
          FirebaseAnalytics.logEvent('login', { method: 'Email' });  
        }
        return resp;
      })
      .catch((error) => {
        // mock the error and let the frontend handle it
        return {error: ERROR.FIRESTORE_ERROR, msg: error.message};
      });
  },

  async loginWithEmail(email:string, password: string) {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // mock the success response
        return {
          error: ERROR.NO_ERROR, 
          resp:{ userId: userCredential.user?.uid }
        };
      })
      .catch((error) => {
        // mock the error and let the frontend handle it
        return {error: ERROR.FIRESTORE_ERROR, msg: error.message};
      })
  },

  async logout() {
    return Auth().signOut();
  },
};

const createUser = async(id: string | undefined, email: string | null | undefined, verified: boolean) => {
  if (id === undefined || email === null || email === undefined) {
    throw new Error("undefined id or email");
  }
  const userData = {
    id: id,
    email: email,
    verified: verified,
  }
  const resp = (await createNewUser_v2(userData)).data;
  return resp;
}