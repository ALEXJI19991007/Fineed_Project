import * as functions from "firebase-functions";
import { db } from "./index";

type TimeStampedNewsItem = {
  target: string;
  link: string;
  title: string;
  content: string;
  imgUrl: string;
  pubDate: string;
  timeStamp: number;
};

exports.rssFetch = functions.https.onCall(async (data, _context) => {
  let timeStampedNewsList: TimeStampedNewsItem[] = [];
  const newsCache = db.collection("news_cache");
  newsCache.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      timeStampedNewsList.push({
        target: data.target,
        link: docData.id,
        title: docData.title,
        content: docData.content,
        imgUrl: docData.imgUrl,
        pubDate: docData.pubDate,
        timeStamp: docData.timeStamp,
      });
    });
  });

  // sort newsList by timestamp in descending order
  timeStampedNewsList.sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1);
  // remove timeStamp from the object before sending
  let newsList: Object[] = [];
  timeStampedNewsList.forEach((obj) => {
    newsList.push({
      target: data.target,
      link: obj.link,
      title: obj.title,
      content: obj.content,
      imgUrl: obj.imgUrl,
      pubDate: obj.pubDate,
    });
  });
  return {
    list: newsList,
  };
});