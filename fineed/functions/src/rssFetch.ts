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

type NewsItem = {
  target?: string;
  link?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  pubDate?: string;
};

exports.rssFetch = functions.https.onCall(async (data, _context) => {
  let timeStampedNewsList: TimeStampedNewsItem[] = [];
  const newsCacheSnapShot = await db.collection("news_cache").get();
  newsCacheSnapShot.forEach((doc) => {
    const docData = doc.data();
    timeStampedNewsList.push({
      target: data.target,
      link: docData.link,
      title: docData.title,
      content: docData.content,
      imgUrl: docData.imgUrl,
      pubDate: docData.pubDate,
      timeStamp: docData.timeStamp,
    });
  });

  // sort newsList by timestamp in descending order
  timeStampedNewsList.sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1);
  // remove timeStamp from the object before sending
  let newsList: NewsItem[] = [];
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
    title: "Fineed -- Give you the most up-to-date financial news",
    list: newsList,
  };
});