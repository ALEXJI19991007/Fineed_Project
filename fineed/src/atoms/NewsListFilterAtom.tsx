import { atom, RecoilState } from "recoil";

// One news item
export type NewsItem = {
  companyTag?: string;
  sourceTag?: string;
  link?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  pubDate?: string;
};

// This atom is the current showing state
export type NewsState = {
  source: string;
  company: string;
};

export const newsListFilterState: RecoilState<NewsState> = atom({
  key: "newsListFilterState",
  default: {
    source: "all",
    company: "headlines",
  },
});

export const SOURCE_LIST: string[] = ["yahoo", "market_watch"];

export const RSS_URL_MAP = new Map([
  ["all-headlines","https://rss.app/feeds/_xD7y59EooJaxFZRx.xml"],
  ["yahoo-headlines", "https://rss.app/feeds/yFndkcbPTi0PFSYP.xml"],
  ["market_watch-headlines", "https://rss.app/feeds/NLXfVSYlXEEByPqP.xml"],
]);
