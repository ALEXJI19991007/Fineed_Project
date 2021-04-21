import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { ERROR } from "../../atoms/constants";
import { useEffect, useState } from "react";
import { Snackbar} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { curUserInfoAtom } from "../../atoms/UserInfoAtom";
import {ShareNewsDialogs} from "./ShareNewsDialog";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const YAHOONEWSDEFAULTPICTUREURL: string = 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png';

export type News = {
  id: string,
  target: string;
  link: string;
  title: string;
  content: string;
  imgUrl: string;
  pubDate: string;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 380,
    height: 520,
  },
  title: {
    height: 80,
    overflow: "hidden",
    margin: theme.spacing(1),
  },
  content: {
    height: 125,
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
}));

export function NewsCard(props: News) {
  const classes = useStyles();
  const curUid = useRecoilValue(curUserUidAtom);
  const [curUserInfo, setCurUserInfo] = useRecoilState(curUserInfoAtom);
  const [sharedNewsID, setSharedNewsID] = useState('');
  const [open, setOpen] = useState(false);
  const [exist, setExist] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const newsOnClick = async () => {
    window.open(props.link, "_blank");
    // isNormalClick == true: it is a click on the news card
    // isNormalClick == false: it is a click on the favorite button.
    const clickData = {
      isNormalClick: true,
      id: props.id,
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
    if (curUserInfo.history.indexOf(props.id) === -1) {
      const newUserHistoryList: string[] = [...curUserInfo.history];
      newUserHistoryList.push(props.id);
      setCurUserInfo({
        ...curUserInfo,
        history: newUserHistoryList,
      })
    }
  };

  const shareNews = async () => {
    setDialogOpen(true);
    let newsId = '';
    const clickData = {
      isNormalClick: true,
      id: props.id,
      target: props.target,
      link: props.link,
      title: props.title,
      content: props.content,
      imgUrl: props.imgUrl,
      pubDate: props.pubDate,
    };
    const updateNewsClickResp = (await updateNewsClick_v2(clickData)).data;
    setSharedNewsID(updateNewsClickResp.resp.newsId);
    if (updateNewsClickResp.error !== ERROR.NO_ERROR) {
      setSharedNewsID('failed to copy news ID ');
    }
    const userData = {
      userId: curUid === "" ? "ExHvLJq2sPe5aPKfuPSJ" : curUid,
      newsId: updateNewsClickResp.resp.newsId,
    };
    const updateUserHistoryResp = (await updateUserHistory_v2(userData)).data;
    if (updateUserHistoryResp.error !== ERROR.NO_ERROR) {
      setSharedNewsID('failed to copy news ID ');
    }
  }

  const markNewsFavorite = async () => {
    if (curUserInfo.favorite.includes(props.id)){
      setExist(true);
      return;
    } else {
      setOpen(true);
    }
    const clickData = {
      isNormalClick: false,
      id: props.id,
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
    if (curUserInfo.favorite.indexOf(props.id) === -1) {
      const newUserFavoriteList: string[] = [...curUserInfo.favorite];
      newUserFavoriteList.push(props.id);
      setCurUserInfo({
        ...curUserInfo,
        favorite: newUserFavoriteList,
      })
    }
  };
  useEffect(() => {
    const el = document.createElement('textarea');
    el.value = sharedNewsID.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }, [sharedNewsID])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCloseWarn = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setExist(false);
  };


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
          image={(props.imgUrl && props.imgUrl !== YAHOONEWSDEFAULTPICTUREURL) ? props.imgUrl : fineedDefaultNewsPicture}
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
        <Button
          size="small"
          color="primary"
          onClick={async () => {
            await shareNews();
          }
          }
        >
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully added news to favorite list.
        </Alert>
      </Snackbar>
      <Snackbar open={exist} autoHideDuration={3000} onClose={handleCloseWarn}>
        <Alert onClose={handleClose} severity="warning">
          News already existed in favorite list.
        </Alert>
      </Snackbar>
      <ShareNewsDialogs link={props.link} open={dialogOpen} 
        handleClose={() => setDialogOpen(false)}/>
    </Card>
  );
}
