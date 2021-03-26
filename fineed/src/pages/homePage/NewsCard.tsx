import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import fineedDefaultNewsPicture from "../../imageSrc/homepage/FineedDefaultNewsPicture.jpg";
import {
  updateNewsClick_v2,
  updateUserFavorite_v2,
  updateUserHistory_v2,
} from "../../firebase/FirebaseFunction";
import { useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { ERROR } from "../../atoms/constants";

const YAHOONEWSDEFAULTPICTUREURL:string = 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png';

export type News = {
  target: string;
  link: string;
  title: string;
  content: string;
  imgUrl: string;
  pubDate: string;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height: 600,
  },
  title: {
    height: 150,
    overflow: "hidden",
  },
  content: {
    height: 125,
    overflow: "hidden",
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
});

export function NewsCard(props: News) {
  const classes = useStyles();
  const curUid = useRecoilValue(curUserUidAtom);

  const newsOnClick = async () => {
    window.open(props.link, "_blank");
    // isNormalClick == true: it is a click on the news card
    // isNormalClick == false: it is a click on the favorite button.
    const clickData = {
      isNormalClick: true,
      target: props.target,
      link: props.link,
      title: props.title,
      content: props.content,
      imgUrl: props.imgUrl,
      pubDate: props.pubDate,
    };
    // Update click info
    const updateNewsClickResp = (await updateNewsClick_v2(clickData)).data;
    if (updateNewsClickResp.error !== ERROR.NO_ERROR) {
      console.log(updateNewsClickResp.error);
      return;
    }
    // Update history info
    // If user has not logged in, update data into admin user
    const userData = {
      userId: curUid === "" ? "ExHvLJq2sPe5aPKfuPSJ" : curUid,
      newsId: updateNewsClickResp.resp.newsId,
    };

    const updateUserHistoryResp = (await updateUserHistory_v2(userData)).data;
    if (updateUserHistoryResp.error !== ERROR.NO_ERROR) {
      console.log(updateUserHistoryResp.error);
      return;
    }
  };

  const markNewsFavorite = async () => {
    const clickData = {
      isNormalClick: false,
      target: props.target,
      link: props.link,
      title: props.title,
      content: props.content,
      imgUrl: props.imgUrl,
      pubDate: props.pubDate,
    };
    // Update click info
    const updateNewsClickResp = (await updateNewsClick_v2(clickData)).data;
    if (updateNewsClickResp.error !== ERROR.NO_ERROR) {
      console.log(updateNewsClickResp.error);
      return;
    }
    // Update history info
    // If user has not logged in, update data into admin user
    const userData = {
      userId: curUid === "" ? "ExHvLJq2sPe5aPKfuPSJ" : curUid,
      newsId: updateNewsClickResp.resp.newsId,
    };

    const updateUserFavoriteResp = (await updateUserFavorite_v2(userData)).data;
    if (updateUserFavoriteResp.error !== ERROR.NO_ERROR) {
      console.log(updateUserFavoriteResp.error);
      return;
    }
  };
  console.log('here is the url',props.imgUrl)
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={async () => {
          await newsOnClick();
        }}
      >
        <CardMedia
          className={classes.media}
          // TODO - Need to find a new placeholder image in case no image url is present in the feed
          image={(props.imgUrl && props.imgUrl!==YAHOONEWSDEFAULTPICTUREURL) ? props.imgUrl : fineedDefaultNewsPicture}
          title={props.title}
        />
        <CardContent className={classes.title}>
          <Typography
            className={classes.text}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {props.title}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={async () => {
            await markNewsFavorite();
          }}
        >
          Favorite
        </Button>
      </CardActions>
    </Card>
  );
}
