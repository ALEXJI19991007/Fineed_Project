import * as functions from "firebase-functions";
//import * as Atoms from "../../src/atoms/NewsListFilterAtom";
const Parser = require('rss-parser');

const parser: typeof Parser = new Parser();
const contentParser: DOMParser = new DOMParser();

export const rssFetch = functions.https.onCall(async (data, _context) => {
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