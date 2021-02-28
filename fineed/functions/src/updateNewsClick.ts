import * as functions from "firebase-functions";
import {db} from "./index"

exports.updateNewsClick = functions.https.onCall(
    async (data, _context) => {
      try {
        const newsRef = db.collection("news_item");
        const newsTarget = await newsRef.where("link", "==", data.link).get();
        let newsItem;
        if (newsTarget.empty) {
          try {
            const entry = newsRef.doc();
            newsItem = {
              id: entry.id,
              click_count: 1,
              target: data.target,
              content: data.content,
              fav_count: 0,
              image_url: data.imgUrl,
              link: data.link,
              pub_date: data.pubDate,
              title: data.title,
            };
            await entry.set(newsItem);
            return newsItem.id;
          } catch (error) {
            return null;
          }
        } else {
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
            return null;
          }
        }
      } catch (error) {
        return null;
      }
    }
  );