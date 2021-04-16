import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userSubscriptionStatus-persist",
  storage: sessionStorage,
});

// 0. amazon
// 1. apple
// 2. facebook
// 3. google
// 4. microsoft

export const INITIAL_SUBS_LIST: boolean[] = [false, false, false, false, false];

export const userSubscriptionStatusAtom = atom({
  key: "userSubscriptionStatusAtom",
  default: INITIAL_SUBS_LIST,
  effects_UNSTABLE: [persistAtom],
});
