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
    source: "google",
    company: "tesla",
  },
});

export const RSS_URL_MAP = new Map([
  ["bing-headlines", "https://rss.app/feeds/PRTaw1JYGhmvhpxf.xml"],
  ["google-headlines", "https://rss.app/feeds/LDMgeOFCAYu4leA3.xml"],
  ["yahoo-headlines", "https://rss.app/feeds/fxb0tDF2FeMrZ3c3.xml"],
  ["bing-tesla", "https://rss.app/feeds/UrgWidkFsHlE2Npa.xml"],
  ["google-tesla", "https://rss.app/feeds/hCCLzusFj7cd6FeJ.xml"],
  ["yahoo-tesla", "https://rss.app/feeds/iFXF7jTIhaaGL8zZ.xml"],
  ["bing-google", "https://rss.app/feeds/bivIqUu19jHVAZT7.xml"],
  ["google-google", "https://rss.app/feeds/TC5PRaQmj4XmqDEk.xml"],
  ["yahoo-google", "https://rss.app/feeds/0xtG7pjUpta7EfJx.xml"],
  ["bing-facebook", "https://rss.app/feeds/1ewysg2Ozw9DQ6Tc.xml"],
  ["google-facebook", "https://rss.app/feeds/dTTQtTZEBxFgAVfw.xml"],
  ["yahoo-facebook", "https://rss.app/feeds/TSoQW1zRvaoDHIPD.xml"],
  ["bing-amazon", "https://rss.app/feeds/MA7f8PF3X97sUEWf.xml"],
  ["google-amazon", "https://rss.app/feeds/fmUvupg9Okn0Qj0f.xml"],
  ["yahoo-amazon", "https://rss.app/feeds/JkdstdavLKOLQiUm.xml"],
  ["bing-linkedin", "https://rss.app/feeds/FWpkSCGZu1IPfPGC.xml"],
  ["google-linkedin", "https://rss.app/feeds/2BOah2IqEW7kD6Sh.xml"],
  ["yahoo-linkedin", "https://rss.app/feeds/aIC2gjonFya5f9ZQ.xml"],
  // ["cnn-headlines", "https://rss.app/feeds/zGG8egDOhD9ew9nb.xml"],
  // ["cnn-politics", "https://rss.app/feeds/NRcF5OoiTVkEPonK.xml"],
  // ["cnn-business", "https://rss.app/feeds/jq6vrWXcnqB93oTT.xml"],
  // ["cnn-entertainment", "https://rss.app/feeds/szQNc8el656rUQsZ.xml"],
  // ["cnn-opinions", "https://rss.app/feeds/VLIBTg1ylOuKVEYG.xml"],
  // ["abc-headlines", "https://rss.app/feeds/hCCLzusFj7cd6FeJ.xml"],
  // ["abc-us", "https://rss.app/feeds/8jquWlniHtti2q99.xml"],
  // ["abc-international", "https://rss.app/feeds/HnA00oAqEMZQHgze.xml"],
  // ["abc-politics", "https://rss.app/feeds/eLCGMz7vLjSnE53c.xml"],
  // ["abc-entertainment", "https://rss.app/feeds/Xnx6eqtdZ9rKCUv8.xml"],
  // ["abc-business", "https://rss.app/feeds/i8BEq1dlTvIHoK1R.xml"],
  // ["abc-technology", "https://rss.app/feeds/wERs9qNuDSz6DRb3.xml"],
  // ["abc-sports", "https://rss.app/feeds/OPix0uWprDZHTP1S.xml"],
  // ["abc-health", "https://rss.app/feeds/AtW4Oenc1bICBcjX.xml"],
]);
