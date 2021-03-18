import { Functions } from './Firebase';

export const FirebaseFunction = (name: string) => {
  return Functions().httpsCallable(name);
};

export const helloWorld = FirebaseFunction('helloWorld');
export const newsCrawler = FirebaseFunction('newsCrawler');
export const updateNewsClick = FirebaseFunction("updateNewsClick");
export const updateUserHistory = FirebaseFunction("updateUserHistory");
export const rssFetch = FirebaseFunction("rssFetch");
export const rssFetchPage = FirebaseFunction("rssFetchPage");
export const storeUserBarrage = FirebaseFunction("storeUserBarrage");
export const createNewUser = FirebaseFunction("createNewUser");
export const updateUserProfile = FirebaseFunction("updateUserProfile");
export const updateUserPassword = FirebaseFunction("updateUserPassword");
export const updateUserFavorite = FirebaseFunction("updateUserFavorite");
// export const getUserFavorite = FirebaseFunction("getUserFavorite");
// export const getUserHistory = FirebaseFunction("getUserHistory");
// export const getUsername = FirebaseFunction("getUsername");
// export const getUserAuth = FirebaseFunction("getUserAuth");

export const getUsername_v2 = FirebaseFunction("getUsername_v2");
export const getUserHistory_v2 = FirebaseFunction("getUserHistory_v2");
export const getUserFavorite_v2 = FirebaseFunction("getUserFavorite_v2");
export const getUserAuth_v2 = FirebaseFunction("getUserAuth_v2");