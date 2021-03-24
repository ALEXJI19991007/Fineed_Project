import * as functions from "firebase-functions";
import { db } from "./index";
import { NewsItem, TimeStampedNewsItem } from "./constants";

// @param string[] --> company names
// 
exports.fetchCompanyNews = functions.https.onCall(async (data, _context) => {
    let timeStampedNewsList: TimeStampedNewsItem[] = [];
    const newsCacheSnapShot = await db.collection(`news_${data.target}`).get();
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
      title: `Company News -- ${data.target}`,
      list: newsList,
    };
  });