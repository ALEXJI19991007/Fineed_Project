import * as functions from "firebase-functions";
import {db} from "./index"
import {RSS_URL_MAP} from "./constants";
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
  list: NewsItem[],
};

// Cache rss feed every 15 minutes
exports.rssAccumulate = functions.pubsub
  .schedule('every 15 minutes') // run every 15 minute
  .timeZone('America/Chicago') // time zone: CST
  .onRun((context) => {
    return db.runTransaction((transaction) => {
      return fetchAndCacheAllFeeds(transaction, true);
    });
  });

exports.rssClearCache = functions.pubsub
  .schedule('every day 00:00') // clear cache everday 12:00 midnight
  .timeZone('America/Chicago') // time zone: CST
  .onRun(async (content) => {
    return db.runTransaction(async (transaction) => {
      // clear the cache
      let cacheRef = db.collection("news_cache");
      let docRefArray = await cacheRef.listDocuments();
      docRefArray.forEach(docRef => {
        transaction.delete(docRef);
      });
      // reset the timestamp document
      const timeStampDocRef = cacheRef.doc("timeStamp");
      transaction.update(timeStampDocRef, {"count": 0});
      // then immediately fetch new feeds - no need to read lastTimeStamp
      return fetchAndCacheAllFeeds(transaction, false);
    });
  });

// if needToRead == false then we assume that
// the cache is cleared and lastTimeStamp == 0
async function fetchAndCacheAllFeeds(transaction: FirebaseFirestore.Transaction, needToRead: boolean) {
  // parser for parsing the rss feed
  const parser: typeof Parser = new Parser();
  let cacheRef = db.collection("news_cache");

  let lastTimeStamp = 0;
  const timeStampDocRef = cacheRef.doc("timeStamp");
  if(needToRead){
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
    parsedFeedArray.push({list: itemList});
  }
    
  // add feed item to the databse if the db does not yet contain it
  // and timestamp each added item
  let numInserted = 0;
  for(let i = 0;i < maxFeeds;++i) {
    for(let j = 0;j < parsedFeedArray.length;++j) {
      const list = parsedFeedArray[j].list;
      if(i < list.length) {
        const item = list[i];
        if(item.link != undefined){
          const docRef = cacheRef.doc(item.link);
          docRef.get()
          .then((docSnapshot) => {
            // construct a new database entry, use link as id
            // if it does not exist already
            if (!docSnapshot.exists) {
              ++numInserted;
              const newDocData = {
                id: item.link, // feed link as id
                target: item.target,
                title: item.title,
                content: item.content,
                imgUrl: item.imgUrl,
                pubDate: item.pubDate,
                timeStamp: lastTimeStamp + numInserted //timestamp
              };
              transaction.update(docRef, newDocData);
            }
          });
        }
      }
    }
  }

  // finally update the timestamp document
  return transaction.update(timeStampDocRef, {"count": lastTimeStamp + numInserted});
}