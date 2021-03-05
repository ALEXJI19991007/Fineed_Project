import * as functions from "firebase-functions";
import { db } from "./index";
import { RSS_URL_MAP } from "./constants";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Parser = require("rss-parser");

// TODO
// duplicate code - move types in NewsFeedSelector/NewsFilterAtom
// to a separate "type" folder
type NewsItem = {
  target?: string;
  link?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  pubDate?: string;
};

type FeedListArray = {
  list: NewsItem[];
};

// Cache rss feed every 15 minutes
exports.rssAccumulate = functions.pubsub
  .schedule("every 15 minutes") // run every 15 minute
  .timeZone("America/Chicago") // time zone: CST
  .onRun(async (_context) => {
    await db.runTransaction(async (transaction) => {
      await fetchAndCacheAllFeeds(transaction, true);
    });
    return null;
  });

exports.rssClearCache = functions.pubsub
  .schedule("every day 00:00") // clear cache everday 12:00 midnight
  .timeZone("America/Chicago") // time zone: CST
  .onRun(async (_content) => {
    await db.runTransaction(async (transaction) => {
      // clear the cache
      const newsCacheRef = db.collection("news_cache");
      const docRefArray = await newsCacheRef.listDocuments();
      docRefArray.forEach((docRef) => {
        transaction.delete(docRef);
      });
      const timeStampRef = db.collection("time_stamp");
      // reset the timestamp document
      const timeStampDocRef = timeStampRef.doc("timeStamp");
      transaction.update(timeStampDocRef, { count: 0 });
      // then immediately fetch new feeds
      await fetchAndCacheAllFeeds(transaction, false);
    });
    return null;
  });

async function fetchAndCacheAllFeeds(transaction: FirebaseFirestore.Transaction, needToRead: boolean) {
  // parser for parsing the rss feed
  const parser: typeof Parser = new Parser();
  let timeStampRef = db.collection("time_stamp");

  // fetch rss feeds
  let lastTimeStamp = 0;
  const timeStampDocRef = timeStampRef.doc("timeStamp");
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
  let parsedFeedArray: FeedListArray[] = []; // array of FeedList
  let maxFeeds = 0;
  // Get all feed items.
  for (let [source, rssURL] of RSS_URL_MAP) {
    let itemList: NewsItem[] = [];
    const parsedFeed = await parser.parseURL(rssURL);
    maxFeeds = Math.max(maxFeeds, parsedFeed.items.length);
    // parse the content field of every news item
    // and add it to itemList
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
        target: source,
        title: item.title,
        content: item.contentSnippet,
        imgUrl: imgUrl,
        pubDate: item.pubDate,
      };
      itemList.push(newsItem);
    });
    parsedFeedArray.push({ list: itemList });
  }
  // add feed item to the databse if the db does not yet contain it
  // and timestamp each added item
  let numInserted = 0;
  for (let i = maxFeeds - 1; i >= 0; --i) {
    for (let j = 0; j < parsedFeedArray.length; ++j) {
      const list = parsedFeedArray[j].list;
      if (i < list.length) {
        const item = list[i];
        if (item.link !== undefined) {
          const newCacheRef = db.collection("news_cache");
          const itemTarget = await newCacheRef
            .where("link", "==", item.link)
            .get();
          // construct a new database entry since it does not exist
          if (itemTarget.empty) {
            const docEntry = newCacheRef.doc();
            ++numInserted;
            const newDocData = {
              id: docEntry.id, // feed link as id
              link: item.link,
              target: item.target,
              title: item.title,
              content: item.content,
              imgUrl: item.imgUrl,
              pubDate: item.pubDate,
              timeStamp: lastTimeStamp + numInserted, //timestamp
            };
            transaction.set(docEntry, newDocData);
          }
        }
      }
    }
  }
  // Update time stamp
  transaction.update(timeStampDocRef, {
    count: lastTimeStamp + numInserted,
  });
}
