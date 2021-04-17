import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import fineedDefaultNewsPicture from "../imageSrc/homepage/FineedDefaultNewsPicture.jpg";
import { COMPANY_COMPANY_SHOWN_NAME_MAP, ERROR } from "../atoms/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { curUserInfoAtom } from "../atoms/UserInfoAtom";
import { curUserUidAtom } from "../atoms/FirebaseUserAtom";
import { updateSubscriptionReadingNumber } from "../firebase/FirebaseFunction";

export type NotificationCardProps = {
  company: string;
  updateNumber: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 380,
      height: 310,
    },
    title: {
      height: 80,
      overflow: "hidden",
      margin: theme.spacing(1),
    },
    content: {
      height: 40,
      overflow: "hidden",
      wordWrap: "break-word",
      padding: theme.spacing(1),
    },
    media: {
      height: 200,
    },
    text: {
      wordWrap: "break-word",
    },
    cardAction: {
      marginTop: 10,
    },
  })
);

export function NotificationCard(props: NotificationCardProps) {
  const classes = useStyles();
  const userId = useRecoilValue(curUserUidAtom);
  const [userInfo, setUserInfo] = useRecoilState(curUserInfoAtom);

  const newsOnClick = () => {
    console.log("click");
  };

  const deleteNotification = async (company: string) => {
    const data = {
      userId: userId,
      target: company,
    }
    const updateSubscriptionReadingNumberResp = (await updateSubscriptionReadingNumber(data)).data;
    if (updateSubscriptionReadingNumberResp.error !== ERROR.NO_ERROR) {
      console.log(updateSubscriptionReadingNumberResp.error);
      return;
    }
    setUserInfo({
      ...userInfo,
      subscription: {
        ...userInfo.subscription,
        [company]: updateSubscriptionReadingNumberResp.resp[company],
      }
    });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={async () => {
          await newsOnClick();
        }}
      >
        <CardMedia
          className={classes.media}
          image={fineedDefaultNewsPicture}
          // title={props.title}
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            While you are away, there are {props.updateNumber} pieces of news
            from {COMPANY_COMPANY_SHOWN_NAME_MAP.get(`news_${props.company}`)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button
          size="small"
          color="primary"
          onClick={async () => {
            deleteNotification(props.company);
          }}
        >
          Delete Notification
        </Button>
      </CardActions>
    </Card>
  );
}
