import { selector } from "recoil";
import * as Atoms from "../atoms/NewsListFilterAtom";
import Parser from "rss-parser";

// The filteredNewsListState internally keeps track of two atom dependencies: newsListFilterState
// and newsListState so that it re-runs if either of those change.
const parser: Parser = new Parser();
// HTML parser specficially for parsing the "content" string field of parsed feed
const contentParser: DOMParser = new DOMParser();

export const filteredNewsListState = selector({
  key: "filteredTodoListState",
  get: async ({ get }) => {
    const filter = get(Atoms.newsListFilterState);
    let url = Atoms.RSS_URL_MAP.get(`${filter.source}-${filter.company}`);
    if (url === undefined) {
      url = "https://rss.app/feeds/LDMgeOFCAYu4leA3.xml";
    }

    const parsedFeed = await parser.parseURL(url);
    let newsList: Atoms.Item[] = [];

    parsedFeed.items.forEach((item) => {
      // parse the content field
      let imgURL: string = "";
      // TODO
      // This solution is high likely not robust
      // It seems like the content field (at least from google rss) generally have a DOM structure as below:
      // <div><img src="/path/to/img"><div>news synopsis</div></div>
      // Not sure other sources have a simliar strcture. If not then we have to decouple this.
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
        companyTag: filter.company,
        sourceTag: filter.source,
        link: item.link,
        title: item.title,
        content: item.contentSnippet,
        imgUrl: imgURL,
        pubDate: item.pubDate,
      });
    });
    console.log(newsList);
    return {
      title: parsedFeed.description,
      list: newsList,
    };
  },
});
