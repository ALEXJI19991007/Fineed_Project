import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();
const db = admin.firestore();

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
    console.log("Holy shit, it is wrong");
    return "wrong";
  }
});

export const updateNewsClick = functions.https.onCall(
  async (data, _context) => {
    try {
      const newsRef = db.collection("news_item");
      const newsTarget = await newsRef.where("link", "==", data.link).get();
      console.log("It is: ", newsTarget);
      if (newsTarget.empty) {
        console.log("New News Object. Execute Write In");
        try {
          const entry = newsRef.doc();
          const newsItem = {
            id: entry.id,
            click_count: 1,
            company_tag: data.companyTag,
            content: data.content,
            fav_count: 0,
            image_url: data.imgUrl,
            link: data.link,
            pub_date: data.pubDate,
            source_tag: data.sourceTag,
            title: data.title,
          };
          entry.set(newsItem);
          return newsItem.id;
        } catch (error) {
          console.log("Add New Item Failed: ", error);
          return null;
        }
      } else {
        console.log("News Object Found. Execute Update");
        let itemId = newsTarget.docs[0].id;
        // 这边写复杂了，需要修改
        const entry = db.collection("news_item").doc(itemId);
        const currentData = (await entry.get()).data() || {};
        const entryObject = {
          id: itemId,
          click_count: currentData.click_count + 1,
          company_tag: currentData.company_tag,
          content: currentData.content,
          fav_count: currentData.fav_count,
          image_url: currentData.image_url,
          link: currentData.link,
          pub_date: currentData.pub_date,
          source_tag: currentData.source_tag,
          title: currentData.title,
        };
        try {
          await entry.set(entryObject);
          return entryObject.id;
        } catch (error) {
          console.log("Update Item Failed: ", error);
          return null;
        }
      }
    } catch (error) {
      console.log("Something Went Wrong: ", error);
      return null;
    }
  }
);
