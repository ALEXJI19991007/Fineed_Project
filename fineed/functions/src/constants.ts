export const RSS_URL_MAP = new Map([
  ["yahoo-headlines", "https://rss.app/feeds/rTxweizCsIYhjYLw.xml"],
  ["market_watch-headlines", "https://rss.app/feeds/SmHR4u6DBoOLBb6o.xml"],
]);

export const COMPANY_RSS_URL_MAP = new Map([
  ["google", "https://rss.app/feeds/LF8a1g8ehgrPA9Sm.xml"],
  ["facebook", "https://rss.app/feeds/koG5sCB05G0vNtKU.xml"],
  ["apple", "https://rss.app/feeds/bsUftAlJUuq5fIu7.xml"],
  ["microsoft", "https://rss.app/feeds/H8BMqOA9DnhtLXxC.xml"],
  ["amazon", "https://rss.app/feeds/YXEqytNPL8kDpzAq.xml"],
  // ["netflix", "https://rss.app/feeds/PcB7uQCjPLz1DvRw.xml"],
  // ["linkedin", "https://rss.app/feeds/aa4OLhvVwVJJWHqM.xml"],
  // ["goldman_sachs", "https://rss.app/feeds/piEYPen106XDL7nB.xml"],
]);

export const PAGE_SZIE = 40;

export const FEED_MAX_LENGTH = 30;

export type Barrage = {
  uid: string,
  content: string,
  time: number,
  tag: string
}

export type NewsItem = {
  target?: string;
  link?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  pubDate?: string;
};

export type FeedListArray = {
  list: NewsItem[];
};

export type TimeStampedNewsItem = {
  target: string;
  link: string;
  title: string;
  content: string;
  imgUrl: string;
  pubDate: string;
  timeStamp: number;
};

export type Response = {
  resp: object | null;
  error: ERROR | object;
}

export enum ERROR {
  NO_ERROR = "No error",
  UNAUTHENTICATED = "User not signed in",
  UNAUTHORIZED_ACCESS = "Unauthorized access",
  PARAM_ERROR = "Missing required parameter(s)",
  NOT_FOUND = "Requested document not found",
  FIRESTORE_ERROR = "Firestore error",
}