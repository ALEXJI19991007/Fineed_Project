import { selector } from "recoil";
import * as Atoms from "../atoms/NewsListFilterAtom";
import { rssFetch } from "../firebase/FirebaseFunction";

// The filteredNewsListState internally keeps track of two atom 
// dependencies: newsListFilterState and newsListState so that 
// it re-runs if either of those change.
export const filteredNewsListState = selector({
  key: "filteredTodoListState",
  get: async ({ get }) => {
    const filter = get(Atoms.newsListFilterState);
    let url = Atoms.RSS_URL_MAP.get(`${filter.source}-${filter.company}`);
    if (url === undefined) {
      url = "https://rss.app/feeds/LDMgeOFCAYu4leA3.xml";
    }

    const urlData = {
      url: url, 
      company: filter.company, 
      source: filter.source
    }
    const feedData = await rssFetch(urlData);
    console.log(feedData.data);
    return feedData.data;
  },
});
