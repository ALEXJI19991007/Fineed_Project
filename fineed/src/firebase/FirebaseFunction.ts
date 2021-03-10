import { Functions } from './Firebase';

export const FirebaseFunction = (name: string) => {
  return Functions().httpsCallable(name);
};

export const helloWorld = FirebaseFunction('helloWorld');
export const newsCrawler = FirebaseFunction('newsCrawler');
export const updateNewsClick = FirebaseFunction("updateNewsClick");
export const updateUserHistory = FirebaseFunction("updateUserHistory");
export const getUserHistory = FirebaseFunction("getUserHistory");
export const rssFetch = FirebaseFunction("rssFetch");
export const storeUserBarrage = FirebaseFunction("storeUserBarrage");
export const createNewUser = FirebaseFunction("createNewUser");
export const updateUserProfile = FirebaseFunction("updateUserProfile");
export const updateUserPassword = FirebaseFunction("updateUserPassword");