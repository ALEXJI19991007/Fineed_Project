import { newsListFilterState } from "../../atoms/NewsListFilterAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  addUserSubscription_v2,
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
import { makeStyles,
  ThemeProvider,
  createMuiTheme, } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));


const thm = createMuiTheme({
  palette: {
    primary: { main: "#8FEF6D" }, //green
    secondary: { main: "#FFBE40" }, //orange
  },
});


type NewsFilterAndSubscriberProps = {
  buttonColorStatus: ColorType[];
};

export function NewsFilterAndSubscriber(props: NewsFilterAndSubscriberProps) {
  const classes = useStyles();

  const [subscriptionStatus, setSubscriptionStatus] = useRecoilState(
    userSubscriptionStatusAtom
  );
  // const setSubscriptionStatus = useSetRecoilState(userSubscriptionStatusAtom);
  const [filter, setFilter] = useRecoilState(newsListFilterState);
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
      // console.log(getUserSubscriptionResp.resp.subscriptionList);
      // The list of companies that user subscribes to.
      const subscriptionList: string[] = Object.keys(getUserSubscriptionResp.resp.subscriptionList);
      // The current subscription list (the atom); We need to modify it according to subscriptionList
      let newSubscriptionList: boolean[] = [...subscriptionStatus];
      subscriptionList.forEach((company: string) => {
        const index: number = COMPANY_NUMBER_MAP.get(`news_${company}`) || 0;
        newSubscriptionList[index] = true;
      })
      // for (let sub of subscriptionList) {
      //   const index: number = COMPANY_NUMBER_MAP.get(sub) || 0;
      //   newSubscriptionList[index] = true;
      // }
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
      : (await addUserSubscription_v2(data)).data;
    if (modifySubscriptionResp.error !== ERROR.NO_ERROR) {
      // If an error occurs, we need to roll back our frontend changes
      newSubscriptionStatus[index] = curSubStatus;
      setSubscriptionStatus(newSubscriptionStatus);
      console.log(modifySubscriptionResp.error);
      return;
    }
  };

  const getIconColor = (index: number): ColorType => {
    return props.buttonColorStatus[index];
  };

  const getChipColor = (target: string) => {
    return filter.target === target ? "primary" : "default";
  }

  const getButtonComponent = (target: string) => {
    const newsTarget: string = `news_${target}`;
    const companyShownName: string = COMPANY_COMPANY_SHOWN_NAME_MAP.get(newsTarget) || "C";
    return (
      <>
      <ThemeProvider theme={thm}>
        <Chip
          size="medium"
          // avatar={<Avatar style={{color:'white'}}>{companyShownName.charAt(0)}</Avatar>}
          label={companyShownName}
          clickable
          color={getChipColor(target)}
          onClick={() => setFilter({ target: target })}
          
        />
        <IconButton style={{paddingTop: "6px", marginLeft: "-10px"}} color={getChipColor(target)}>
          <AddCircleIcon
            fontSize="small"
            color={getIconColor(COMPANY_NUMBER_MAP.get(newsTarget) || 0)}
            onClick={() => {
              subscribeOnClick(target);
            }}
          />
        </IconButton>
        </ThemeProvider>
      </>
    );
  };

  return (
    <div className={classes.root}>
      {getButtonComponent("amazon")}
      {getButtonComponent("apple")}
      {getButtonComponent("facebook")}
      {getButtonComponent("google")}
      {getButtonComponent("microsoft")}
    </div>
    
  );
}
