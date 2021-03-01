import * as functions from "firebase-functions";
import * as Atoms from "../../src/atoms/NewsListFilterAtom";
import {db} from "./index"
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Parser = require("rss-parser");

// TODO
// duplicate code - move RssFeed type in NewsFeedSelector.tsx
// to a separate "type" folder
type FeedListArray = {
  list: Atoms.NewsItem[],
};

// Cache rss feed every 15 minutes
exports.rssAccumulate = functions.pubsub
  .schedule('every 15 minutes') // run every 15 minute
  .timeZone('America/Chicago') // time zone: CST
  .onRun((context) => {
    db.runTransaction(async (transaction) => {
      await fetchAndCacheAllFeeds(transaction);
    });
  });

exports.rssClearCache = functions.pubsub
  .schedule('every day 00:00') // clear cache everday 12:00 midnight
  .timeZone('America/Chicago') // time zone: CST
  .onRun(async (content) => {
    db.runTransaction(async (transaction) => {
      // clear the cache
      let cacheRef = db.collection("news_cache");
      let docRefArray = await cacheRef.listDocuments();
      docRefArray.forEach(docRef => {
        transaction.delete(docRef);
      });
      // reset the timestamp document
      const timeStampDocRef = cacheRef.doc("timeStamp");
      transaction.update(timeStampDocRef, {"count": 0});
      // then immediately fetch new feeds
      await fetchAndCacheAllFeeds(transaction);
    });
  });

async function fetchAndCacheAllFeeds(transaction: FirebaseFirestore.Transaction) {
  // parser for parsing the rss feed
  const parser: typeof Parser = new Parser();
  let cacheRef = db.collection("news_cache");

  // fetch rss feeds
  const timeStampDocRef = cacheRef.doc("timeStamp");
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

  const lastTimeStamp = timeStampData["count"];
  let parsedFeedArray: FeedListArray[] = []; // array of FeedList
  let maxFeeds = 0;
  for (let [source, rssURL] of Atoms.RSS_URL_MAP) {
    let itemList: Atoms.NewsItem[] = [];
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
  transaction.update(timeStampDocRef, {"count": lastTimeStamp + numInserted});
}