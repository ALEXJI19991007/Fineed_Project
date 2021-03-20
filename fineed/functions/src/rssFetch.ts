import * as functions from "firebase-functions";
import { db } from "./index";
import { NewsItem, TimeStampedNewsItem, PAGE_SZIE } from "./constants";

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

// expected data: { pageIndex: number }
exports.rssFetchPage = functions.https.onCall(async (data, _context) => {
  let newsList: NewsItem[] = [];
  // assumption: data.pageIndex is 1-indexed (starts from 1).
  const pageIndex = data.pageIndex - 1;

  const timeStampDocSnapshot = await db.collection("time_stamp")
    .doc("timeStamp").get();
  
  // fetch the count of total number of time stamped feeds
  const timeStampData = 
    timeStampDocSnapshot ? timeStampDocSnapshot.data() : undefined;
  const docCount = timeStampData ? timeStampData["count"] : 0;
  // total number of pages
  const pageCount = Math.ceil(docCount / PAGE_SZIE);

  // query for the page - the latest feed has the largest timestamp
  const cachePageSnapshot = await db.collection("news_cache")
    .orderBy("timeStamp", "desc").startAt(docCount - PAGE_SZIE * pageIndex)
    .endBefore(docCount - PAGE_SZIE * (pageIndex + 1)).get()
  
  // We shouldn't need to sort again since the query result is already ordered
  cachePageSnapshot.forEach((doc) => {
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

  
  return {
    title: "Fineed -- Give you the most up-to-date financial news",
    target: data.target,
    list: newsList,
    pageCount: pageCount,
  };
});
