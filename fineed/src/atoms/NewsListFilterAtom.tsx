import { atom, RecoilState } from "recoil";

// One news item
export type Item = {
  companyTag?: string;
  sourceTag?: string;
  link?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  pubDate?: string;
};

// This atom is the current showing state
type NewsState = {
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

export const RSS_URL_MAP = new Map([
  ["all-headlines","https://rss.app/feeds/_xD7y59EooJaxFZRx.xml"],
]);
