import { Functions } from './Firebase';

export const FirebaseFunction = (name: string) => {
  return Functions().httpsCallable(name);
};

export const helloWorld = FirebaseFunction('helloWorld');
export const newsCrawler = FirebaseFunction('newsCrawler');
export const rssFetch = FirebaseFunction("rssFetch");
export const rssFetchPage = FirebaseFunction("rssFetchPage");
export const storeUserBarrage = FirebaseFunction("storeUserBarrage");

export const createNewUser_v2 = FirebaseFunction("createNewUser_v2");

export const getUserInfo = FirebaseFunction("getUserInfo");
export const getUserHistory_v2 = FirebaseFunction("getUserHistory_v2");
export const getUserFavorite_v2 = FirebaseFunction("getUserFavorite_v2");
export const getUserAuth_v2 = FirebaseFunction("getUserAuth_v2");
export const getUserSubscription = FirebaseFunction("getUserSubscription");

export const updateNewsClick_v2 = FirebaseFunction("updateNewsClick_v2");

export const updateUserFavorite_v2 = FirebaseFunction("updateUserFavorite_v2");
export const updateUserProfile_v2 = FirebaseFunction("updateUserProfile_v2");
export const removeUserFavorite = FirebaseFunction("removeUserFavorite");
export const updateUserHistory_v2 = FirebaseFunction("updateUserHistory_v2");
export const updateUserPassword_v2 = FirebaseFunction("updateUserPassword_v2");
export const addUserSubscription = FirebaseFunction("addUserSubscription");
export const removeUserSubscription = FirebaseFunction("removeUserSubscription");
export const verifyUser = FirebaseFunction("verifyUser");

export const fetchCompanyNews = FirebaseFunction("fetchCompanyNews");
