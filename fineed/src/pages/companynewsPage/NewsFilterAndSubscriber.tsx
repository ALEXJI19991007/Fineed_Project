import { newsListFilterState } from "../../atoms/NewsListFilterAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
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
import {
  ColorType,
  userSubscriptionStatusAtom,
} from "../../atoms/UserSubscriptionStatusAtom";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { useEffect } from "react";

type NewsFilterAndSubscriberProps = {
  buttonColorStatus: ColorType[],
}

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

      // console.log(subscriptionList);
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
    const addUserSubscriptionResp = (await addUserSubscription(data)).data;
    if (addUserSubscriptionResp.error !== ERROR.NO_ERROR) {
      console.log(addUserSubscriptionResp.error);
      return;
    }
    let newSubscriptionStatus: boolean[] = [...subscriptionStatus];
    const index: number = COMPANY_NUMBER_MAP.get(`news_${sub}`) || 0;
    console.log("add: ", index);
    newSubscriptionStatus[index] = true;
    setSubscriptionStatus(newSubscriptionStatus);
  };

  const unsubscribeOnClick = async (sub: string) => {
    const data = {
      userId: userId,
      target: sub,
    };
    const removeUserSubscriptionResp = (await removeUserSubscription(data)).data;
    if (removeUserSubscriptionResp.error !== ERROR.NO_ERROR) {
      console.log(removeUserSubscriptionResp.error);
      return;
    }
    let newSubscriptionStatus: boolean[] = [...subscriptionStatus];
    const index: number = COMPANY_NUMBER_MAP.get(`news_${sub}`) || 0;
    console.log("remove: ", index);
    newSubscriptionStatus[index] = false;
    setSubscriptionStatus(newSubscriptionStatus);
  }

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
        <IconButton style={{ marginRight: "30px" }}>
          <RemoveCircleIcon
            fontSize="small"
            color={getColor(COMPANY_NUMBER_MAP.get(newsTarget) || 0)}
            onClick={() => {
              unsubscribeOnClick(target);
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
