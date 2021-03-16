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
export const rssFetchPage = FirebaseFunction("rssFetchPage");
export const storeUserBarrage = FirebaseFunction("storeUserBarrage");
export const createNewUser = FirebaseFunction("createNewUser");
export const updateUserProfile = FirebaseFunction("updateUserProfile");
export const updateUserPassword = FirebaseFunction("updateUserPassword");
export const updateUserFavorite = FirebaseFunction("updateUserFavorite");
export const getUserFavorite = FirebaseFunction("getUserFavorite");
export const getUsername = FirebaseFunction("getUsername");
export const getUserAuth = FirebaseFunction("getUserAuth");