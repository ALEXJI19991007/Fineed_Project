import { selector } from "recoil";
import { ERROR } from "../atoms/constants";
import { curUserUidAtom } from "../atoms/FirebaseUserAtom";
import { curUserInfoAtom } from "../atoms/UserInfoAtom";
import { getSubscriptionUpdateNumbers } from "../firebase/FirebaseFunction";

export const SubsNotificationSelector = selector({
  key: "SubsNotificationSelector",
  get: async ({ get }) => {
    const userInfo = get(curUserInfoAtom);
    const userId = get(curUserUidAtom);
    const subscriptionList = Object.keys(userInfo.subscription);
    const data = {
      userId: userId,
      subscriptionList: subscriptionList,
    };
    const getSubscriptionUpdateNumbersResp = (
      await getSubscriptionUpdateNumbers(data)
    ).data;
    if (getSubscriptionUpdateNumbersResp.error !== ERROR.NO_ERROR) {
      console.log(getSubscriptionUpdateNumbersResp.error);
      return {
        subsList: [],
        subsNotifications: new Map(),
      };
    }
    if (getSubscriptionUpdateNumbersResp.resp === null) {
      return {
        subsList: [],
        subsNotifications: new Map(),
      };
    }
    const updates = getSubscriptionUpdateNumbersResp.resp;
    let notificationsMap: Map<string, number> = new Map();
    Object.keys(updates).map((company: string) => {
      notificationsMap.set(company, updates[company]);
    });
    return {
      subsList: subscriptionList,
      subsNotifications: notificationsMap,
    };
  },
});
