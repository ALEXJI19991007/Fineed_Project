import * as functions from "firebase-functions";
import { db } from "./index";
import { COMPANY_RSS_URL_MAP, NewsItem } from "./constants";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Parser = require("rss-parser");

exports.companyNewsClear = functions.pubsub
  .schedule("every monday 00:00")
  .timeZone("America/Chicago")
  .onRun(async (_context) => {
    for (let [key, _value] of COMPANY_RSS_URL_MAP) {
      const newsCacheRefArray = db.collection(`news_${key}`).get();
      const batchArray: any[] = [];
      batchArray.push(db.batch());
      let operationCounter = 0;
      let batchIndex = 0;
      (await newsCacheRefArray).forEach((documentSnapshot) => {
        batchArray[batchIndex].delete(documentSnapshot.ref);
        operationCounter++;

        if (operationCounter === 499) {
          batchArray.push(db.batch());
          batchIndex++;
          operationCounter = 0;
        }
      });
      batchArray.push(db.batch());
      const timeStampDocRef = db.collection("time_stamp").doc(`${key}`);
      batchArray[batchIndex].update(timeStampDocRef, { count: 0 });
      batchArray.forEach(async (batch) => await batch.commit());
    }
    return null;
  });

exports.userSubscriptionNumberClear = functions.pubsub
.schedule("every monday 00:00")
.timeZone("America/Chicago")
.onRun(async (_context) => {
  try {
    const userCollection = await db.collection("user").get();
    userCollection.forEach(doc => {
      let curUserSubscription = doc.data().subscription;
      const subscriptions = Object.keys(curUserSubscription);
      subscriptions.forEach((company: string) => {
        curUserSubscription[company] = 0;
      })
      doc.ref.update({
        "subscription": curUserSubscription
      });
    });
  } catch (error) {
    functions.logger.info(error);
  }
})

// Cache company news feed every 15 minutes
exports.companyNewsAccumulate = functions.pubsub
  .schedule("every 15 minutes") // run every 15 minute
  .timeZone("America/Chicago") // time zone: CST
  .onRun(async (_context) => {
    for (let [key, value] of COMPANY_RSS_URL_MAP) {
      await db.runTransaction(async (transaction) => {
        await fetchAndCacheAllCompanyNews(transaction, key, value, true);
      });
    }
    return null;
  });

async function fetchAndCacheAllCompanyNews(
  transaction: FirebaseFirestore.Transaction,
  company: string,
  rssUrl: string,
  needToRead: boolean
) {
  // parser for parsing the rss feed
  const parser: typeof Parser = new Parser();
  // key --> company name
  // value --> rss url
  const timeStampDocRef = db.collection("time_stamp").doc(company);
  let lastTimeStamp;
  if (needToRead) {
    // read the last timestamp
    const timeStampDocSnapshot = await transaction.get(timeStampDocRef);
    // timestamp doc missing - shouldn't be possible
    if (!timeStampDocSnapshot.exists) {
      throw "Fatal: timeStamp document missing.";
    }
    // timestamp doc is empty - sholdn't be possible
    const timeStampData = timeStampDocSnapshot.data();
    if (!timeStampData) {
      throw "Fatal: timeStamp document is empty";
    }
    lastTimeStamp = timeStampData["count"];
  }
  let itemList: NewsItem[] = [];
  const parsedFeed = await parser.parseURL(rssUrl);
  parsedFeed.items.forEach((item: any) => {
    let imgUrl: string = "";
    if (item.content) {
      const contentDom = new JSDOM(item.content);
      const imgTags = contentDom.window.document.getElementsByTagName("img");
      if (imgTags.length > 0) {
        imgUrl = imgTags[0].src;
      }
    }
    const newsItem = {
      link: item.link,
      target: company,
      title: item.title,
      content: item.contentSnippet,
      imgUrl: imgUrl,
      pubDate: item.pubDate,
    };
    itemList.push(newsItem);
  });
  functions.logger.info(itemList);
  let numInserted = 0;
  for (let i = itemList.length - 1; i >= 0; --i) {
    const item: NewsItem = itemList[i];
    const targetCompanyNewsCacheRef = db.collection(`news_${company}`);
    const itemTarget = await targetCompanyNewsCacheRef
      .where("title", "==", item.title)
      .get();
    if (itemTarget.empty) {
      const docEntry = targetCompanyNewsCacheRef.doc();
      ++numInserted;
      const newDocData = {
        id: docEntry.id,
        link: item.link,
        target: item.target,
        title: item.title,
        content: item.content || "",
        imgUrl: item.imgUrl || "",
        pubDate: item.pubDate || "",
        timeStamp: lastTimeStamp + numInserted, //timestamp
      };
      transaction.set(docEntry, newDocData);
    }
  }
  // Update time stamp
  transaction.update(timeStampDocRef, {
    count: lastTimeStamp + numInserted,
  });
}
