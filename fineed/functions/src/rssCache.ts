import * as functions from "firebase-functions";
import * as Atoms from "../../src/atoms/NewsListFilterAtom";
import {db} from "./index"
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Parser = require("rss-parser");

// parser for parsing the rss feed
const parser: typeof Parser = new Parser();
// Cache rss feed every 15 minutes
exports.rssCache = functions.pubsub.schedule('every 15 minutes').onRun(async (context) => {
    // begin batch writes
    let batch = db.batch();
    // clear the cache
    let cacheRef = db.collection("news_cache");
    let docRefArray = await cacheRef.listDocuments();
    docRefArray.forEach(docRef => {
        batch.delete(docRef);
    });
    // fetch rss feeds
    for(let [source, rssURL] of Atoms.RSS_URL_MAP) {
        const parsedFeed = await parser.parseURL(rssURL);

        parsedFeed.items.forEach((item: any) => {
            // parse the content field
            let imgUrl: string = "";
            if (item.content) {
              const contentDom = new JSDOM(item.content);
              const imgTags = contentDom.window.document.getElementsByTagName("img");
              if (imgTags.length > 0) {
                imgUrl = imgTags[0].src;
              }
            }
            // construct a new database entry
            const newEntry = cacheRef.doc();
            const newEntryValue = {
              id: newEntry.id,
              source: source,
              link: item.link,
              title: item.title,
              content: item.contentSnippet,
              imgUrl: imgUrl,
              pubDate: item.pubDate,
            };
            // write the new rss feed entry
            batch.set(newEntry, newEntryValue);
        });
    }
    // commit batch writes
    batch.commit();
});