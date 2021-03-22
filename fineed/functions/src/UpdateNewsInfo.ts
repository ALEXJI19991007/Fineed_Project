// import * as functions from "firebase-functions";
// import { db } from "./index";
// import { Response, ERROR } from "./constants";

// exports.updateNewsClick = functions.https.onCall(async (data, _context) => {
//   let response: Response = {
//     resp: null,
//     error: ERROR.NO_ERROR,
//   };
//   try {
//     const newsRef = db.collection("news_item");
//     const newsTarget = await newsRef.where("link", "==", data.link).get();
//     let newsItem;
//     if (newsTarget.empty) {
//       try {
//         const entry = newsRef.doc();
//         newsItem = {
//           id: entry.id,
//           click_count: data.isNormalClick ? 1 : 0,
//           target: data.target,
//           content: data.content,
//           fav_count: data.isNormalClick ? 0 : 1,
//           image_url: data.imgUrl,
//           link: data.link,
//           pub_date: data.pubDate,
//           title: data.title,
//         };
//         await entry.set(newsItem);
//         return newsItem.id;
//       } catch (error) {
//         return null;
//       }
//     } else {
//       let itemId = newsTarget.docs[0].id;
//       const entry = db.collection("news_item").doc(itemId);
//       const currentData = (await entry.get()).data() || {};
//       const newClickCount = data.isNormalClick
//         ? currentData.click_count + 1
//         : currentData.click_count;
//       const newFavCount = data.isNormalClick
//         ? currentData.fav_count
//         : currentData.fav_count + 1;
//       entry.update({
//         click_count: newClickCount,
//         fav_count: newFavCount,
//       });
//       return itemId;
//     }
//   } catch (error) {
//     return null;
//   }
// });
