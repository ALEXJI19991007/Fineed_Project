import * as admin from "firebase-admin";

import * as functions from "firebase-functions";
// import { Barrage } from "./constants";

admin.initializeApp();
export const db = admin.firestore();

export const helloWorld = functions.https.onCall(async (data, _context) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  return "hello from firebase";
});

export const helloJiyu = functions.https.onCall(async (data, _context) => {
  return "hello Jiyu";
});

export const helloYuChang = functions.https.onCall(async (data, _context) => {
  return "hello YuChang";
});

// This is just a demo
export const addEntry = functions.https.onCall(async (data, _context) => {
  try {
    const entry = db.collection("test_entries").doc();
    const entryObject = {
      id: entry.id,
      title: data.title,
      text: data.text,
    };
    entry.set(entryObject);
    return entryObject.id;
  } catch (error) {
    return "wrong";
  }
});

// functions used in production
// const updateNewsClick = require("./v1/updateNewsClick");
// exports.updateNewsClick = updateNewsClick.updateNewsClick;

const GetUserInfo = require("./GetUserInfo");
exports.getUserInfo = GetUserInfo.getUserInfo;
exports.getUserHistory_v2 = GetUserInfo.getUserHistory_v2;
exports.getUserFavorite_v2 = GetUserInfo.getUserFavorite_v2;
exports.getUserAuth_v2 = GetUserInfo.getUserAuth_v2;
exports.getUserSubscription = GetUserInfo.getUserSubscription;
exports.getSubscriptionUpdateNumbers = GetUserInfo.getSubscriptionUpdateNumbers;

const UpdateUserInfo = require("./UpdateUserInfo");
exports.updateUserFavorite_v2 = UpdateUserInfo.updateUserFavorite_v2;
exports.removeUserFavorite = UpdateUserInfo.removeUserFavorite;
exports.updateUserHistory_v2 = UpdateUserInfo.updateUserHistory_v2;
exports.updateUserProfile_v2 = UpdateUserInfo.updateUserProfile_v2;
exports.updateUserPassword_v2 = UpdateUserInfo.updateUserPassword_v2;
exports.addUserSubscription = UpdateUserInfo.addUserSubscription;
exports.addUserSubscription_v2 = UpdateUserInfo.addUserSubscription_v2;
exports.removeUserSubscription = UpdateUserInfo.removeUserSubscription;
exports.updateSubscriptionReadingNumber = UpdateUserInfo.updateSubscriptionReadingNumber;
exports.batchUpdateSubscriptionReadingNumber = UpdateUserInfo.batchUpdateSubscriptionReadingNumber;
exports.verifyUser = UpdateUserInfo.verifyUser;

const UpdateNewsInfo = require("./UpdateNewsInfo");
exports.updateNewsClick_v2 = UpdateNewsInfo.updateNewsClick_v2;

const CreateNewUser = require("./CreateUser");
exports.createNewUser_v2 = CreateNewUser.createNewUser_v2;
exports.createNewUser_v3 = CreateNewUser.createNewUser_v3;

// const CreateNewUser = require("./CreateNewUser")
// exports.createNewUser_v2 = CreateNewUser.createNewUser_v2;

// const getUsername = require("./getUsername");
// exports.getUsername = getUsername.getUsername;

// const getUserAuth = require("./getUserAuth");
// exports.getUserAuth = getUserAuth.getUserAuth;

// const getUserHistory = require("./getUserHistory");
// exports.getUserHistory = getUserHistory.getUserHistory;

// const getUserFavorite = require("./getUserFavorite");
// exports.getUserFavorite = getUserFavorite.getUserFavorite;

// const updateUserHistory = require("./updateUserHistory");
// exports.updateUserHistory = updateUserHistory.updateUserHistory;

// const updateUserFavorite = require("./updateUserFavorite");
// exports.updateUserFavorite = updateUserFavorite.updateUserFavorite;

// const updateUserProfile = require("./updateUserProfile");
// exports.updateUserProfile = updateUserProfile.updateUserProfile;
// exports.updateUserPassword= updateUserProfile.updateUserPassword;

const CompanyNewsCache = require("./CompanyNewsCache");
exports.companyNewsAccumulate = CompanyNewsCache.companyNewsAccumulate;
exports.companyNewsClear = CompanyNewsCache.companyNewsClear;
exports.userSubscriptionNumberClear = CompanyNewsCache.userSubscriptionNumberClear;

const GetCompanyNews = require("./GetCompanyNews");
exports.fetchCompanyNews = GetCompanyNews.fetchCompanyNews;

const rssFetch = require("./rssFetch");
exports.rssFetch = rssFetch.rssFetch;
exports.rssFetchPage = rssFetch.rssFetchPage;

const rssCache = require("./rssCache");
exports.rssAccumulate = rssCache.rssAccumulate;
exports.rssClearCache = rssCache.rssClearCache;

// const createNewUser = require("./createNewUser");
// exports.createNewUser = createNewUser.createNewUser;

const barrage = require("./barrage");
exports.storeUserBarrage = barrage.storeUserBarrage;
exports.clearBarrage = barrage.clearBarrage;
exports.clearStockChartData = barrage.clearStockChartData;
exports.fetchFinnhubStockApiTMP = barrage.fetchFinnhubStockApiTMP;
exports.tweetBot = barrage.tweetBot;