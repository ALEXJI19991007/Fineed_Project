import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import sampleTeslaNewsImage from "../../imageSrc/homepage/teslaNewsimg.jpg";
import { updateNewsClick, updateUserHistory } from "../../firebase/FirebaseFunction";

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
    maxHeight: 800,
  },
  title: {
    maxHeight: 200,
    overflow: 'hidden',
  },
  content: {
    maxHeight: 200,
    overflow: 'hidden',
  },
  media: {
    height: 200,
  },
  text: {
    wordWrap: "break-word" 
  },
  cardAction: {
    marginTop: 10
  }
});

export function NewsCard(props: News) {
  const classes = useStyles();

  const newsOnClick = async () => {
    window.open(props.link, "_blank");
    const clickData = {
      target: props.target,
      link: props.link,
      title: props.title,
      content: props.content,
      imgUrl: props.imgUrl,
      pubDate: props.pubDate,
    };
    // Update click info
    const updateNewsClickResp = await updateNewsClick(clickData);
    if (updateNewsClickResp.data === null) {
      console.log("Update News Failed");
    }
    // Update history info
    const userData = {
      userId: "ExHvLJq2sPe5aPKfuPSJ",
      newsId: updateNewsClickResp.data
    }
    const updateUserHistoryResp = await updateUserHistory(userData);
    if (updateUserHistoryResp.data === null) {
      console.log("Update User History Failed");
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={newsOnClick}>
        <CardMedia
          className={classes.media}
          // TODO - Need to find a new placeholder image in case no image url is present in the feed
          image={props.imgUrl ? props.imgUrl : sampleTeslaNewsImage}
          title={props.title}
        />
        <CardContent className={classes.title}>
        <Typography className={classes.text} gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
