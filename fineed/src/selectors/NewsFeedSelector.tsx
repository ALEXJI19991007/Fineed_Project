import { selector } from "recoil";
import * as NewsAtoms from "../atoms/NewsListFilterAtom";
import * as UserAtoms from "../atoms/FirebaseUserAtom";
import { getUserHistory, rssFetch } from "../firebase/FirebaseFunction";

// The filteredNewsListState internally keeps track of two atom
// dependencies: newsListFilterState and newsListState so that
// it re-runs if either of those change.
export const filteredNewsListState = selector({
  key: "filteredNewsListState",
  get: async ({ get }) => {
    const target = get(NewsAtoms.newsListFilterState);
    const userId = get(UserAtoms.curUserUidAtom);
    // If we want to fetch user history
    if (target === "user_history") {
      console.log("Fetch History");
      return await getUserHistoryHelper(userId);
    }
    const rssFetchResp = await rssFetch({target: "headlines"});
    return rssFetchResp.data;
  },
});

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
      target: newsItem.target,
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
