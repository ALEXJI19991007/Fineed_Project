import { Auth } from './Firebase';
import { FirebaseAnalytics } from './FirebaseAnalytics';

export const FirebaseAuth = {

  async loginWithGoogle() {
    try {
      const result = await Auth().signInWithPopup(
        new Auth.GoogleAuthProvider(),
      );
      if (result?.additionalUserInfo?.isNewUser) {
        FirebaseAnalytics.logEvent('sign_up', { method: 'Google' });
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
