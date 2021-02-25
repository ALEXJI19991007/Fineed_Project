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
    if (filter.source === "all" && filter.company === "headlines") {
      return await getAllHeadlinesHelper(Atoms.SOURCE_LIST);
    }
    if (filter.source === "user_history") {
      return await getUserHistoryHelper(filter.company);
    }
    return await getNewsFromParticularSourceAndCompany(filter);
  },
});

type NewsList = Atoms.NewsItem[];
type RssFeed = {
  title: string,
  list: NewsList,
}

const getAllHeadlinesHelper = async (sourceList: string[]) => {
  const allFeedData: RssFeed[] = [];
  for (let i = 0; i < sourceList.length; ++i) {
    let source: string = sourceList[i];
    let url: string = Atoms.RSS_URL_MAP.get(`${source}-headlines`) || "";
    let urlData = {
      url: url,
      source: source,
      company: "headlines",
    };
    let feedData = await rssFetch(urlData);
    allFeedData.push(feedData.data);
  }
  console.log(allFeedData);
  const newsList: NewsList = [];
  // 各个News source获取的rss feed交错形成最终的feed
  for (let i = 0; i < 50; ++i) {
    for (let j = 0; j < allFeedData.length; ++j) {
      if (i < allFeedData[j].list.length) {
        newsList.push(allFeedData[j].list[i]);
      }
    }
  }
  return {
    title: "All Financial News Headlines",
    list: newsList,
  };
}

const getUserHistoryHelper = async (userId: string) => {
  // TODO: 目前传入的userId为hard-coded
  const userData = {
    userId: userId,
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
    list: newsList,
  };
};

const getNewsFromParticularSourceAndCompany = async (filter: Atoms.NewsState) => {
  // If we want to fetch news from a particular source
  let url: string = Atoms.RSS_URL_MAP.get(`${filter.source}-${filter.company}`) || "";

  const urlData = {
    url: url,
    company: filter.company,
    source: filter.source,
  };
  const feedData = await rssFetch(urlData);
  // console.log(feedData.data);
  return feedData.data;
}
