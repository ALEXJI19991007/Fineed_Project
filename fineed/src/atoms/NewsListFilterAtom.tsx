import { atom, RecoilState } from "recoil";

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

export const newsListPageIndexState: RecoilState<number> = atom({
  key: "newsListPageIndexState",
  default: 1,
});

export const SOURCE_LIST: string[] = ["yahoo", "market_watch"];
