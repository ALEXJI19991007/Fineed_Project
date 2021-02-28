import * as functions from "firebase-functions";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Parser = require("rss-parser");

exports.rssFetch = functions.https.onCall(async (data, _context) => {
    const parser: typeof Parser = new Parser();
    const parsedFeed = await parser.parseURL(data.url);
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
        const contentDom = new JSDOM(item.content);
        const imgTags = contentDom.window.document.getElementsByTagName("img");
        if (imgTags.length > 0) {
          imgURL = imgTags[0].src;
        }
      }
  
      newsList.push({
        target: data.target,
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