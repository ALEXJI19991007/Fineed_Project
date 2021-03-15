export const RSS_URL_MAP = new Map([
  ["yahoo-headlines", "https://rss.app/feeds/rTxweizCsIYhjYLw.xml"],
  ["market_watch-headlines", "https://rss.app/feeds/SmHR4u6DBoOLBb6o.xml"],
]);

export const PAGE_SZIE = 40;

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