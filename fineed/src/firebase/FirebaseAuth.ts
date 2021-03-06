import { Auth } from './Firebase';
import { FirebaseAnalytics } from './FirebaseAnalytics';
import { createNewUser } from './FirebaseFunction';

export const FirebaseAuth = {

  async loginWithGoogle() {
    try {
      const result = await Auth().signInWithPopup(
        new Auth.GoogleAuthProvider(),
      );
      if (result?.additionalUserInfo?.isNewUser) {
        FirebaseAnalytics.logEvent('sign_up', { method: 'Google' });
        createUser(result.user?.uid, result.user?.email);
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
        createUser(result.user?.uid, result.user?.email);
      }
      FirebaseAnalytics.logEvent('login', { method: 'GitHub' });
      return result.user?.uid;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  },

  async logout() {
    return Auth().signOut();
  },
};

const createUser = async(id: string | undefined, email: string | null | undefined) => {
  if (id === undefined || email === null || email === undefined) {
    throw new Error("undefined id or email");
  }
  const userData = {
    id: id,
    email: email,
  }
  await createNewUser(userData);
}