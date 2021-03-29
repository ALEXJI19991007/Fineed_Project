import { selector } from "recoil";
import { userSubscriptionStatusAtom } from "../atoms/UserSubscriptionStatusAtom";

export type ColorType = "secondary" | "inherit" | "primary" | "disabled" | "action" | "error" | undefined;

export const SubscriptionButtonSelector = selector({
  key: "subscriptionButtonStatus",
  get: ({ get }) => {
    const subscriptionStatus = get(userSubscriptionStatusAtom);
    let buttonColorList: ColorType[] = [];
    for (let status of subscriptionStatus) {
        buttonColorList.push(status ? "secondary" : "action");
    }
    return buttonColorList;
  },
});
