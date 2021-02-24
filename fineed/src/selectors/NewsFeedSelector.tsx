import { selector } from "recoil";
import * as Atoms from "../atoms/NewsListFilterAtom";
import { getUserHistory, rssFetch } from "../firebase/FirebaseFunction";

// The filteredNewsListState internally keeps track of two atom
// dependencies: newsListFilterState and newsListState so that
// it re-runs if either of those change.
export const filteredNewsListState = selector({
  key: "filteredNewsListState",
  get: async ({ get }) => {
    const filter = get(Atoms.newsListFilterState);
    // If we want to fetch user history
    if (filter.source === "user_history") {
      // TODO: 目前传入的userId为hard-coded
      const userData = {
        userId: filter.company,
      };
      const historyData = await getUserHistory(userData);
      // console.log(historyData.data);
      let newsList: Object[] = [];
      historyData.data.forEach((newsItem: any) => {
        newsList.push({
          companyTag: newsItem.company_tag,
          sourceTag: newsItem.source_tag,
          link: newsItem.link,
          title: newsItem.title,
          content: newsItem.content,
          imgUrl: newsItem.image_url,
          pubDate: newsItem.pub_date,
        });
      });
      return {
        title: "User history",
        list: newsList
      };
    }
    // If we want to fetch news from a particular source
    let url = Atoms.RSS_URL_MAP.get(`${filter.source}-${filter.company}`);
    if (url === undefined) {
      url = "https://rss.app/feeds/LDMgeOFCAYu4leA3.xml";
    }

    const urlData = {
      url: url,
      company: filter.company,
      source: filter.source,
    };
    const feedData = await rssFetch(urlData);
    // console.log(feedData.data);
    return feedData.data;
  },
});
