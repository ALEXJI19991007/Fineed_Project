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

// This atom is the current showing state
export type NewsState = {
  target: string;
  param: string;
};

export const newsListFilterState: RecoilState<NewsState> = atom({
  key: "newsListFilterState",
  default: {
    target: "headlines",
    param: "",
  },
});

export const SOURCE_LIST: string[] = ["yahoo", "market_watch"];
