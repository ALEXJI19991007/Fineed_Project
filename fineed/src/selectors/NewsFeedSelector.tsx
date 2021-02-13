import { selector } from "recoil";
import * as Atoms from "../atoms/NewsListFilterAtom";
import Parser from "rss-parser";

// The filteredNewsListState internally keeps track of two atom dependencies: newsListFilterState
// and newsListState so that it re-runs if either of those change.
const parser: Parser = new Parser();

export const filteredNewsListState = selector({
  key: "filteredTodoListState",
  get: async ({ get }) => {
    const filter = get(Atoms.newsListFilterState);
    let url = Atoms.RSS_URL_MAP.get(`${filter.source}-${filter.company}`);
    if (url === undefined) {
      url = "https://rss.app/feeds/LDMgeOFCAYu4leA3.xml";
    }
    const feed = await parser.parseURL(url);
    // console.log(feed);
    let newsList: Atoms.Item[] = [];
    feed.items.forEach((item) => {
      newsList.push({
        link: item.link,
        title: item.title,
        content: item.contentSnippet,
        imgUrl: "",
        date: item.pubDate,
      });
    });
    return {
      title: feed.description,
      list: newsList,
    };
  },
});
