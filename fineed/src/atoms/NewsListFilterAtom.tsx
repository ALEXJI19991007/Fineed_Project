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

export const newsListFilterState: RecoilState<string> = atom({
  key: "newsListFilterState",
  default: "headlines",
});

export const SOURCE_LIST: string[] = ["yahoo", "market_watch"];
