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

export const SOURCE_LIST: string[] = ["yahoo", "market_watch"];
