import { newsListFilterState } from "../../atoms/NewsListFilterAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  addUserSubscription,
  getUserSubscription,
  removeUserSubscription,
} from "../../firebase/FirebaseFunction";
import {
  ERROR,
  COMPANY_NUMBER_MAP,
  COMPANY_COMPANY_SHOWN_NAME_MAP,
} from "../../atoms/constants";
import { userSubscriptionStatusAtom } from "../../atoms/UserSubscriptionStatusAtom";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { useEffect } from "react";
import { ColorType } from "../../selectors/SubscriptionButtonSelector";

type NewsFilterAndSubscriberProps = {
  buttonColorStatus: ColorType[];
};

export function NewsFilterAndSubscriber(props: NewsFilterAndSubscriberProps) {
  const [subscriptionStatus, setSubscriptionStatus] = useRecoilState(
    userSubscriptionStatusAtom
  );
  // const setSubscriptionStatus = useSetRecoilState(userSubscriptionStatusAtom);
  const setFilter = useSetRecoilState(newsListFilterState);
  const userId = useRecoilValue(curUserUidAtom);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const fetchUserSubscription = async () => {
      const getUserSubscriptionResp = (
        await getUserSubscription({ userId: userId })
      ).data;
      if (getUserSubscriptionResp.error !== ERROR.NO_ERROR) {
        console.log(getUserSubscriptionResp.error);
        return;
      }
      // The list of companies that user subscribes to.
      const subscriptionList: string[] =
        getUserSubscriptionResp.resp.subscriptionList;
      // The current subscription list (the atom); We need to modify it according to subscriptionList
      let newSubscriptionList: boolean[] = [...subscriptionStatus];
      for (let sub of subscriptionList) {
        const index: number = COMPANY_NUMBER_MAP.get(sub) || 0;
        newSubscriptionList[index] = true;
      }
      const currentNewsState = {
        target: "amazon",
      };
      setSubscriptionStatus(newSubscriptionList);
      setFilter(currentNewsState);
    };
    fetchUserSubscription();
    // eslint-disable-next-line
  }, []);

  const subscribeOnClick = async (sub: string) => {
    const data = {
      userId: userId,
      target: sub,
    };
    const index: number = COMPANY_NUMBER_MAP.get(`news_${sub}`) || 0;
    // The current subscription status of one particular company's news
    let curSubStatus: boolean = subscriptionStatus[index];
    let newSubscriptionStatus: boolean[] = [...subscriptionStatus];
    // Reverse the status & Set the new value to the atom
    newSubscriptionStatus[index] = !curSubStatus;
    setSubscriptionStatus(newSubscriptionStatus);
    // Send request to the corresponding backend function
    let modifySubscriptionResp = curSubStatus
      ? (await removeUserSubscription(data)).data
      : (await addUserSubscription(data)).data;
    if (modifySubscriptionResp.error !== ERROR.NO_ERROR) {
      // If an error occurs, we need to roll back our frontend changes
      newSubscriptionStatus[index] = curSubStatus;
      setSubscriptionStatus(newSubscriptionStatus);
      console.log(modifySubscriptionResp.error);
      return;
    }
  };

  const getColor = (index: number): ColorType => {
    return props.buttonColorStatus[index];
  };

  const getButtonComponent = (target: string) => {
    const newsTarget = `news_${target}`;
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilter({ target: target })}
        >
          {COMPANY_COMPANY_SHOWN_NAME_MAP.get(newsTarget)}
        </Button>
        <IconButton>
          <AddCircleIcon
            fontSize="small"
            color={getColor(COMPANY_NUMBER_MAP.get(newsTarget) || 0)}
            onClick={() => {
              subscribeOnClick(target);
            }}
          />
        </IconButton>
      </>
    );
  };

  return (
    <div>
      {getButtonComponent("amazon")}
      {getButtonComponent("apple")}
      {getButtonComponent("facebook")}
      {getButtonComponent("google")}
      {getButtonComponent("microsoft")}
    </div>
  );
}
