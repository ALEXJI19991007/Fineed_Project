import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Response, ERROR } from "./constants";
import { db } from "./index";
import { Md5 } from "md5-typescript";

exports.updateUserFavorite_v2 = functions.https.onCall(
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
      if (data.newsId === null || data.newsId === "") {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      const userEntry = db.collection("user").doc(data.userId);
      userEntry.update({
        favorite: admin.firestore.FieldValue.arrayUnion(data.newsId),
      });
      response.resp = {
        news: data.newsId,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

exports.removeUserFavorite = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (data.userId === null || data.userId === "") {
      response.error = ERROR.UNAUTHENTICATED;
      return response;
    }
    if (data.newsId === null || data.newsId === "") {
      response.error = ERROR.PARAM_ERROR;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    userEntry.update({
      favorite: admin.firestore.FieldValue.arrayRemove(data.newsId),
    });
    response.resp = {
      news: data.newsId,
    };
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});

exports.updateUserHistory_v2 = functions.https.onCall(
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
      if (data.newsId === null || data.newsId === "") {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      const userEntry = db.collection("user").doc(data.userId);
      userEntry.update({
        history: admin.firestore.FieldValue.arrayUnion(data.newsId),
      });
      response.resp = {
        news: data.newsId,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

// helper functions to strip html tags from string
// to prevent injected script attack
function sanitize(str: string) {
  return str.replace(/<(?:.|\n)*?>/gm, "");
}

exports.updateUserProfile_v2 = functions.https.onCall(
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
      // TODO: Change this check later to:
      //    1. Check if firstname and lastname consists of valid English characters.
      //    2. Check if the username is within the correct length range and is not already used.
      if (
        data.firstName === null ||
        data.lastName === null ||
        data.username === null
      ) {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      const userEntry = db.collection("user").doc(data.userId);
      const currentUserData = (await userEntry.get()).data() || null;
      if (currentUserData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      // sanitize strings before saving to the database
      userEntry.update({
        first_name: (data.firstName = sanitize(
          "" ? currentUserData.first_name : data.firstName
        )),
        last_name: (data.lastName = sanitize(
          "" ? currentUserData.last_name : data.lastName
        )),
        username: (data.username = sanitize(
          "" ? currentUserData.username : data.username
        )),
      });
      response.resp = {
        username: data.username,
        lastName: data.lastName,
        firstName: data.firstName,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

exports.updateUserPassword_v2 = functions.https.onCall(
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
      const userEntry = db.collection("user").doc(data.userId);
      const currentUserData = (await userEntry.get()).data() || null;
      if (currentUserData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      const oldPassword = currentUserData.password;
      if (oldPassword !== Md5.init(data.oldPassword)) {
        response.error = ERROR.UNAUTHORIZED_ACCESS;
        return response;
      }
      userEntry.update({
        password: Md5.init(data.newPassword),
      });
      response.resp = {
        userId: data.userId,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

// @param data.userId -- string   The id of the user to update
// @param data.target -- string   The company to subscribe
exports.addUserSubscription_v2 = functions.https.onCall(
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
      const userEntry = db.collection("user").doc(data.userId);
      const currentUserData = (await userEntry.get()).data() || null;
      if (currentUserData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      const targetCompany = `news_${data.target}`;
      const companySubscriptionEntry = db
        .collection("subscription")
        .doc(targetCompany);
      const companyTimeStampEntry = db
        .collection("time_stamp")
        .doc(data.target);
      const companyTimeStampData =
        (await companyTimeStampEntry.get()).data() || null;
      const companySubscriptionData =
        (await companySubscriptionEntry.get()).data() || null;
      if (companySubscriptionData === null || companyTimeStampData === null) {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      userEntry.set(
        {
          subscription: {
            [data.target]: companyTimeStampData.count,
          },
        },
        { merge: true }
      );
      companySubscriptionEntry.update({
        users: admin.firestore.FieldValue.arrayUnion(data.userId),
      });
      response.resp = {
        [data.target]: companyTimeStampData.count,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

// @param data.userId -- string   The id of the user to update
// @param data.target -- string   The company to subscribe
exports.removeUserSubscription = functions.https.onCall(
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
      const userEntry = db.collection("user").doc(data.userId);
      const currentUserData = (await userEntry.get()).data() || null;
      if (currentUserData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      const targetCompany = `news_${data.target}`;
      const companySubscriptionEntry = db
        .collection("subscription")
        .doc(targetCompany);
      const companySubscriptionData =
        (await companySubscriptionEntry.get()).data() || null;
      if (companySubscriptionData === null) {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      userEntry.set(
        {
          subscription: {
            [data.target]: admin.firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      );
      companySubscriptionEntry.update({
        users: admin.firestore.FieldValue.arrayRemove(data.userId),
      });
      response.resp = {
        [data.target]: -1,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

exports.updateSubscriptionReadingNumber = functions.https.onCall(
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
      if (data.target === null || data.target === "") {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      const userEntry = db.collection("user").doc(data.userId);
      const currentUserData = (await userEntry.get()).data() || null;
      if (currentUserData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      const companyTimeStampEntry = db
        .collection("time_stamp")
        .doc(data.target);
      const companyTimeStampData =
        (await companyTimeStampEntry.get()).data() || null;
      if (companyTimeStampData === null) {
        response.error = ERROR.PARAM_ERROR;
        return response;
      }
      userEntry.set(
        {
          subscription: {
            [data.target]: companyTimeStampData.count,
          },
        },
        { merge: true }
      );
      response.resp = {
        [data.target]: companyTimeStampData.count,
      };
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

exports.batchUpdateSubscriptionReadingNumber = functions.https.onCall(
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
      const userEntry = db.collection("user").doc(data.userId);
      const currentUserData = (await userEntry.get()).data() || null;
      if (currentUserData === null) {
        response.error = ERROR.NOT_FOUND;
        return response;
      }
      let subscription = {...currentUserData.subscription};
      let subsList = Object.keys(subscription);
      for (let i = 0; i < subsList.length; ++i) {
        const subs: string = subsList[i];
        const timeStampEntry = db.collection("time_stamp").doc(subs);
        const timeStamp = (await timeStampEntry.get()).data() || null;
        if (timeStamp === null) {
          response.error = ERROR.NOT_FOUND;
          return response;
        }
        subscription = {
          ...subscription,
          [subs]: timeStamp.count,
        }
      }
      userEntry.update({
        subscription: subscription
      });
      response.resp = subscription;
      return response;
    } catch (error) {
      response.error = ERROR.FIRESTORE_ERROR;
      return response;
    }
  }
);

// set a user's verified field to true
// @param data.userId -- string   The id of the user to update
exports.verifyUser = functions.https.onCall(async (data, _context) => {
  let response: Response = {
    resp: null,
    error: ERROR.NO_ERROR,
  };
  try {
    if (!data.userId) {
      // mssing param
      response.error = ERROR.PARAM_ERROR;
      return response;
    }
    const userEntry = db.collection("user").doc(data.userId);
    const userDoc = await userEntry.get();
    if (!userDoc.exists) {
      //user not found
      response.error = ERROR.NOT_FOUND;
      return response;
    }
    // set verified to true
    userEntry.update({ verified: true });
    return response;
  } catch (error) {
    response.error = ERROR.FIRESTORE_ERROR;
    return response;
  }
});
