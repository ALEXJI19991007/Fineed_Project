import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const { parse } = require("node-html-parser");
const Parser = require("rss-parser");

admin.initializeApp();
const db = admin.firestore();

export const helloWorld = functions.https.onCall(async (data, _context) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  return "hello from firebase";
});

export const helloJiyu = functions.https.onCall(async (data, _context) => {
  return "hello Jiyu";
});

export const helloYuChang = functions.https.onCall(async (data, _context) => {
  return "hello YuChang";
});

// This is just a demo
export const addEntry = functions.https.onCall(async (data, _context) => {
  try {
    const entry = db.collection("test_entries").doc();
    const entryObject = {
      id: entry.id,
      title: data.title,
      text: data.text,
    };
    entry.set(entryObject);
    return entryObject.id;
  } catch (error) {
    console.log("Holy shit, it is wrong");
    return "wrong";
  }
});

export const updateNewsClick = functions.https.onCall(
  async (data, _context) => {
    try {
      const newsRef = db.collection("news_item");
      const newsTarget = await newsRef.where("link", "==", data.link).get();
      let newsItem;
      if (newsTarget.empty) {
        console.log("New News Object. Execute Write In");
        try {
          const entry = newsRef.doc();
          newsItem = {
            id: entry.id,
            click_count: 1,
            company_tag: data.companyTag,
            content: data.content,
            fav_count: 0,
            image_url: data.imgUrl,
            link: data.link,
            pub_date: data.pubDate,
            source_tag: data.sourceTag,
            title: data.title,
          };
          await entry.set(newsItem);
          return newsItem.id;
        } catch (error) {
          console.log("Add New News Item Failed: ", error);
          return null;
        }
      } else {
        console.log("News Object Found. Execute Update");
        let itemId = newsTarget.docs[0].id;
        // 这边写复杂了，需要修改
        const entry = db.collection("news_item").doc(itemId);
        const currentData = (await entry.get()).data() || {};
        newsItem = {
          ...currentData,
          id: itemId,
          click_count: currentData.click_count + 1,
        };
        try {
          await entry.set(newsItem);
          return newsItem.id;
        } catch (error) {
          console.log("Update News Item Failed: ", error);
          return null;
        }
      }
    } catch (error) {
      console.log("Get News Target Failed: ", error);
      return null;
    }
  }
);

export const updateUserHistory = functions.https.onCall(
  async (data, _context) => {
    try {
      const userEntry = db.collection("user").doc(data.userId);
      const newHistory = userEntry.update({
        history: admin.firestore.FieldValue.arrayUnion(data.newsId),
      });
      return newHistory;
    } catch (error) {
      console.log("Get User Failed");
      return null;
    }
  }
);

export const getUserHistory = functions.https.onCall(async (data, _context) => {
  try {
    const userEntry = db.collection("user").doc(data.userId);
    const userData = (await userEntry.get()).data() || null;
    if (userData === null) {
      return null;
    }
    const userHistory = userData.history;
    const newsHistory: FirebaseFirestore.DocumentData[] = [];
    // Get news objects
    for (let i = 0; i < userHistory.length; ++i) {
      let entry = db.collection("news_item").doc(userHistory[i]);
      let newsData = (await entry.get()).data() || {};
      newsHistory.push(newsData);
    }
    return newsHistory;
  } catch (error) {
    console.log("Get User Failed");
    return null;
  }
});

export const newsCrawler = functions.https.onCall(async (data, _context) => {
  try {
    const root = parse('<ul id="list"><li>Hello World</li></ul>');
    return root.querySelector("#list");
  } catch (error) {
    return error;
  }
});

export const rssFetch = functions.https.onCall(async (data, _context) => {
  const parser: typeof Parser = new Parser();
  const contentParser: DOMParser = new DOMParser();
  const parsedFeed = await parser.parseURL(data.url);
  //let newsList: Atoms.Item[] = [];
  let newsList: Object[] = [];

  parsedFeed.items.forEach((item: any) => {
    // parse the content field
    let imgURL: string = "";
    // TODO
    // This solution is high likely not robust
    // It seems like the content field generally have a DOM structure as:
    // <div><img src="/path/to/img"><div>news synopsis</div></div>
    // Not sure other sources have a simliar strcture.
    if (item.content) {
      const contentHTML = contentParser.parseFromString(
        item.content,
        "text/html"
      );
      const imgTags = contentHTML.getElementsByTagName("img");
      if (imgTags.length > 0) {
        imgURL = imgTags[0].src;
      }
    }

    newsList.push({
      companyTag: data.company,
      sourceTag: data.source,
      link: item.link,
      title: item.title,
      content: item.contentSnippet,
      imgUrl: imgURL,
      pubDate: item.pubDate,
    });
  });
  return {
    title: parsedFeed.description,
    list: newsList,
  };
});
