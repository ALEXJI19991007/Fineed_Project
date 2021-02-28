import * as functions from "firebase-functions";
import { db } from "./index";

exports.rssFetch = functions.https.onCall(async (data, _context) => {
  let newsList: Object[] = [];
  const newsCache = db.collection("news_cache");
  newsCache.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      newsList.push({
        target: data.target,
        link: docData.link,
        title: docData.title,
        content: docData.content,
        imgUrl: docData.imgUrl,
        pubDate: docData.pubDate,
      });
    });
  });

  return {
    list: newsList,
  };
});