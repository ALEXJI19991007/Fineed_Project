import { selector } from "recoil";
import * as NewsAtoms from "../atoms/NewsListFilterAtom";
import * as UserAtoms from "../atoms/FirebaseUserAtom";
import {
  fetchCompanyNews,
  getUserFavorite_v2,
  getUserHistory_v2,
  rssFetchPage,
} from "../firebase/FirebaseFunction";
import { ERROR } from "../atoms/constants";

// The filteredNewsListState internally keeps track of three atom
// dependencies: newsListFilterState, newsListState and newsListPageIndexState
// so that it re-runs if any of those change.
export const filteredNewsListState = selector({
  key: "filteredNewsListState",
  get: async ({ get }) => {
    const filter = get(NewsAtoms.newsListFilterState);
    const userId = get(UserAtoms.curUserUidAtom);
    const pageIndex = get(NewsAtoms.headlinePageIndexState);
    // If we want to fetch user history or favorite
    if (filter.target === "user_history" || filter.target === "user_favorite") {
      return await getUserHistoryOrFavoriteHelper(filter.target, userId);
    } else if (filter.target === "headlines") {
      const rssFetchResp = await rssFetchPage({
        target: "headlines",
        pageIndex: pageIndex,
      });
      return rssFetchResp.data;
    }
    const companyNewsResp = await fetchCompanyNews({ target: filter.target });
    console.log(companyNewsResp.data);
    return companyNewsResp.data;
  },
});

const getUserHistoryOrFavoriteHelper = async (target: string, userId: string) => {
  // TODO: 目前传入的userId为hard-coded
  const userData = {
    userId: userId,
  };
  if (userId === null || userId === "") {
    return;
  }
  const getUserNewsInfoResp =
    target === "user_history"
      ? (await getUserHistory_v2(userData)).data
      : (await getUserFavorite_v2(userData)).data;
  if (getUserNewsInfoResp.error !== ERROR.NO_ERROR) {
    console.log(getUserNewsInfoResp.error);
    return;
  }
  let newsList: Object[] = [];
  getUserNewsInfoResp.resp.newsList.forEach((newsItem: any) => {
    newsList.push({
      target: newsItem.target,
      link: newsItem.link,
      title: newsItem.title,
      content: newsItem.content,
      imgUrl: newsItem.image_url,
      pubDate: newsItem.pub_date,
    });
  });
  return {
    title: "Your Personal News Collection",
    target: target,
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
