import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userSubscriptionStatus-persist",
  storage: sessionStorage,
});

export type ColorType = "secondary" | "inherit" | "primary" | "disabled" | "action" | "error" | undefined;

// 0. amazon
// 1. apple
// 2. facebook
// 3. google
// 4. microsoft
const subscriptionList: ColorType[] = ["action", "action", "action", "action", "action"];

export const userSubscriptionStatusAtom = atom({
  key: "userSubscriptionStatusAtom",
  default: subscriptionList,
  effects_UNSTABLE: [persistAtom],
});
