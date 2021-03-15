import { selector } from "recoil";
import * as NewsAtoms from "../atoms/NewsListFilterAtom";
import * as UserAtoms from "../atoms/FirebaseUserAtom";
import { getUserFavorite, getUserHistory, rssFetch, rssFetchPage } from "../firebase/FirebaseFunction";

// The filteredNewsListState internally keeps track of three atom
// dependencies: newsListFilterState, newsListState and newsListPageIndexState
// so that it re-runs if any of those change.
export const filteredNewsListState = selector({
  key: "filteredNewsListState",
  get: async ({ get }) => {
    const filter = get(NewsAtoms.newsListFilterState);
    const userId = get(UserAtoms.curUserUidAtom);
    const pageIndex = get(NewsAtoms.newsListPageIndexState);
    // If we want to fetch user history or favorite
    if (filter.target === "user_history" || filter.target === "user_favorite") {
      return await getUserHistoryOrFavoriteHelper(filter.target, userId);
    }
    const rssFetchResp = await rssFetchPage({target: "headlines", pageIndex: pageIndex});
    return rssFetchResp.data;
  },
});

const getUserHistoryOrFavoriteHelper = async (target: string, userId: string) => {
  // TODO: 目前传入的userId为hard-coded
  const userData = {
    userId: userId,
  };
  const newsData = target === "user_history" ? (await getUserHistory(userData)) : (await getUserFavorite(userData));
  // console.log(historyData.data);
  let newsList: Object[] = [];
  newsData.data.forEach((newsItem: any) => {
    newsList.push({
      target: newsItem.target,
      link: newsItem.link,
      title: newsItem.title,
      content: newsItem.content,
      imgUrl: newsItem.image_url,
      pubDate: newsItem.pub_date,
    });
  });
  const title = target === "user_history" ? "User History" : "User Favorite";
  return {
    title: title,
    list: newsList,
  };
};

// const getNewsFromParticularSourceAndCompany = async (filter: Atoms.NewsState) => {
//   // If we want to fetch news from a particular source
//   let url: string = Atoms.RSS_URL_MAP.get(`${filter.source}-${filter.company}`) || "";

//   const urlData = {
//     url: url,
//     company: filter.company,
//     source: filter.source,
//   };
//   const feedData = await rssFetch(urlData);
//   // console.log(feedData.data);
//   return feedData.data;
// }
