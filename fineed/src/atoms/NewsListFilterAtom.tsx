import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "page-index-persist",
  storage: sessionStorage,
});

// One news item
export type NewsItem = {
  target?: string;
  link?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  pubDate?: string;
};

type NewsState = {
  target: string,
}

export const newsListFilterState: RecoilState<NewsState> = atom({
  key: "newsListFilterState",
  default: {
    target: "headlines"
  },
});

export const headlinePageIndexState: RecoilState<number> = atom({
  key: "newsListPageIndexState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});



export const SOURCE_LIST: string[] = ["yahoo", "market_watch"];
