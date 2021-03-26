import * as Atoms from "../../atoms/FirebaseUserAtom";
import { NewsState } from "../../atoms/NewsListFilterAtom"
import { SetterOrUpdater, useRecoilValue } from "recoil";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { addUserSubscription } from "../../firebase/FirebaseFunction";
import { ERROR } from "../../atoms/constants";
import { ColorType } from "../../atoms/UserSubscriptionStatusAtom";
import { useState } from "react";

type NewsFilterAndSubscriberProps = {
  setFilter: SetterOrUpdater<NewsState>,
  subscriptionStatus: ColorType[],
  setSubscriptionStatus: SetterOrUpdater<any>,
}

export function NewsFilterAndSubscriber(props: NewsFilterAndSubscriberProps) {
  const userId = useRecoilValue(Atoms.curUserUidAtom);
  const [buttonStatus, setButtonStatus] = useState(props.subscriptionStatus);

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
    let newSubscriptionStatus: ColorType[] = props.subscriptionStatus;
    if (sub === "news_apple") {
      newSubscriptionStatus[0] = "secondary";
    } else if (sub === "news_amazon") {
      newSubscriptionStatus[1] = "secondary";
    } else if (sub === "news_facebook") {
      newSubscriptionStatus[2] = "secondary";
    } else if (sub === "news_google") {
      newSubscriptionStatus[3] = "secondary";
    } else if (sub === "news_microsoft") {
      newSubscriptionStatus[4] = "secondary";
    }
    props.setSubscriptionStatus({subscriptionStatus: newSubscriptionStatus});
    setButtonStatus(newSubscriptionStatus);
  };

  const getColor = (index: number): ColorType => {
    // console.log(props.subscriptionStatus[index]);
    return buttonStatus[index];
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "apple" })}
      >
        Apple
      </Button>
      <IconButton style={{ marginRight: "30px" }}>
        <AddCircleIcon
          fontSize="small"
          color={getColor(0)}
          onClick={() => {
            subscribeOnClick("apple");
          }}
        />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "amazon" })}
      >
        Amazon
      </Button>
      <IconButton style={{ marginRight: "30px" }}>
        <AddCircleIcon
          fontSize="small"
          color={getColor(1)}
          onClick={() => {
            subscribeOnClick("amazon");
          }}
        />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "facebook" })}
      >
        Facebook
      </Button>
      <IconButton style={{ marginRight: "30px" }}>
        <AddCircleIcon
          fontSize="small"
          color={getColor(2)}
          onClick={() => {
            subscribeOnClick("facebook");
          }}
        />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "google" })}
      >
        Google
      </Button>
      <IconButton style={{ marginRight: "30px" }}>
        <AddCircleIcon
          fontSize="small"
          color={getColor(3)}
          onClick={() => {
            subscribeOnClick("google");
          }}
        />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "microsoft" })}
      >
        Microsoft
      </Button>
      <IconButton style={{ marginRight: "30px" }}>
        <AddCircleIcon
          fontSize="small"
          color={getColor(4)}
          onClick={() => {
            subscribeOnClick("microsoft");
          }}
        />
      </IconButton>
    </div>
  );
}
