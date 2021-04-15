import * as functions from "firebase-functions";
import { Response, ERROR } from "./constants";
import { db } from "./index";
import { Md5 } from "md5-typescript";

exports.getUserInfo = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    response.resp = {
      username: userData.username,
      lastName: userData.last_name,
      firstName: userData.first_name,
      email: userData.email,
      favorite: userData.favorite,
      history: userData.history,
      verified: userData.verified,
    };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.getUserHistory_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    const userHistory = userData.history;
    const newsHistory: FirebaseFirestore.DocumentData[] = [];
    // Get news objects
    for (let i = userHistory.length - 1; i >= 0; --i) {
      let entry = db.collection("news_item").doc(userHistory[i]);
      let newsData = (await entry.get()).data() || {};
      if (newsData !== {}) {
        newsHistory.push(newsData);
      }
    }
    response.resp = {
      newsList: newsHistory,
    };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.getUserFavorite_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    const userFavorite = userData.favorite;
    const favoriteNews: FirebaseFirestore.DocumentData[] = [];
    // Get news objects
    for (let i = userFavorite.length - 1; i >= 0; --i) {
      let entry = db.collection("news_item").doc(userFavorite[i]);
      let newsData = (await entry.get()).data() || {};
      if (newsData !== {}) {
        favoriteNews.push(newsData);
      }
    }
    response.resp = {
      newsList: favoriteNews,
    };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.getUserAuth_v2 = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.email === null || data.email === "") {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }
    const userRef = db.collection("user");
    const userSnapshot = await userRef.where("email", "==", data.email).get();
    if (userSnapshot.empty) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    let userPwd;
    let username;
    let userId;
    userSnapshot.forEach((doc) => {
      const entryData = doc.data();
      userPwd = entryData.password;
      username = entryData.username;
      userId = entryData.id;
    });
    // compare the md5 hash instead of the plain text password
    if (Md5.init(data.password) !== userPwd) {
      response.error = ERROR.UNAUTHORIZED_ACCESS;
      return response;
    }
    response.resp = { username: username, userId: userId };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.getUserSubscription = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    response.resp = {
      subscriptionList: userData.subscription,
    };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.getSubscriptionUpdateNumbers = functions.https.onCall(
  async (data, _context) => {
    let response: Response = {
      resp: null,
      error: ERROR.NO_ERROR,
    };
    try {
      if (data.userId === null || data.userId === "") {
        response.error = ERROR.UNAUTHENTICATED;
        return response;
      }
      if (data.subscriptionList.length === 0) {
        return response;
      }
      const userEntry = db.collection("user").doc(data.userId);
      const userData = (await userEntry.get()).data() || null;
      if (userData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      let resp = {};
      const userSubscriptionTimeStamps = userData.subscription;
      const subsCompanies = Object.keys(userSubscriptionTimeStamps);
      const timeStampCollection = db.collection("time_stamp");
      for (let i = 0; i < subsCompanies.length; ++i) {
        const timeStampDoc = await timeStampCollection
          .doc(subsCompanies[i])
          .get();
        const timeStampData = timeStampDoc.data();
        if (!timeStampData) {
          response.error = ERROR.NOT_FOUND;
          return response;
        }
        const newTimeStamp: number = timeStampData["count"];
        const lastTimeStamp: number = userSubscriptionTimeStamps[subsCompanies[i]];
        if (newTimeStamp > lastTimeStamp) {
          resp = {
            ...resp,
            [subsCompanies[i]]: newTimeStamp - lastTimeStamp,
          }
        }
      }
      response.resp = resp;
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);
