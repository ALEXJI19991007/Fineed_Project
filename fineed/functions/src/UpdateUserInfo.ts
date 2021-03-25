import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Response, ERROR } from "./constants";
import { db } from "./index";

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
      userEntry.update({
        first_name:
          data.firstName === "" ? currentUserData.first_name : data.firstName,
        last_name:
          data.lastName === "" ? currentUserData.last_name : data.lastName,
        username:
          data.username === "" ? currentUserData.username : data.username,
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
      if (oldPassword !== data.oldPassword) {
        response.error = ERROR.UNAUTHORIZED_ACCESS;
        return response;
      }
      userEntry.update({
        password: data.newPassword,
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
exports.addUserSubscription = functions.https.onCall(
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
      userEntry.update({
        subscription: admin.firestore.FieldValue.arrayUnion(targetCompany),
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
      userEntry.update({
        subscription: admin.firestore.FieldValue.arrayRemove(targetCompany),
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