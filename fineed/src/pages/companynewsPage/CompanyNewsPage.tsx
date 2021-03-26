import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import { userSubscriptionStatusAtom, ColorType } from "../../atoms/UserSubscriptionStatusAtom";
import { getUserSubscription } from "../../firebase/FirebaseFunction";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { ERROR } from "../../atoms/constants";

export function CompanyNewsPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useRecoilState(userSubscriptionStatusAtom);
  const setFilter = useSetRecoilState(Atoms.newsListFilterState);
  const userInfo = useRecoilValue(curUserInfoAtom);
  const userId = useRecoilValue(curUserUidAtom);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const fetchUserSubscription = async () => {
      const getUserSubscriptionResp = (await getUserSubscription({userId: userId})).data;
      if (getUserSubscriptionResp.error !== ERROR.NO_ERROR) {
        console.log(getUserSubscriptionResp.error);
        return;
      }
      let newSubscriptionList: ColorType[] = subscriptionStatus.subscriptionStatus;
      const subscriptionList: string[] =
        getUserSubscriptionResp.resp.subscriptionList;
      // console.log(subscriptionList);
      for (let sub of subscriptionList) {
        if (sub === "news_apple") {
          newSubscriptionList[0] = "secondary";
        } else if (sub === "news_amazon") {
          newSubscriptionList[1] = "secondary";
        } else if (sub === "news_facebook") {
          newSubscriptionList[2] = "secondary";
        } else if (sub === "news_google") {
          newSubscriptionList[3] = "secondary";
        } else if (sub === "news_microsoft") {
          newSubscriptionList[4] = "secondary";
        }
      }
      const currentNewsState = {
        target: "amazon",
      };
      setSubscriptionStatus({subscriptionStatus: newSubscriptionList});
      setFilter(currentNewsState);
      // console.log(subscriptionStatus.subscriptionStatus);
    };
    fetchUserSubscription();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <div>
        <NewsFilterAndSubscriber setFilter={setFilter} subscriptionStatus={subscriptionStatus.subscriptionStatus} setSubscriptionStatus={setSubscriptionStatus}/>
      </div>
      <NewsCardContainer />
    </div>
  );
}
