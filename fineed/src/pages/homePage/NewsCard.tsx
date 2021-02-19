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
import { updateNewsClick } from "../../firebase/FirebaseFunction";

export type News = {
  companyTag: string;
  sourceTag: string;
  link: string;
  title: string;
  content: string;
  imgUrl: string;
  pubDate: string;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 600,
  },
  content: {
    maxHeight: 200,
  },
  media: {
    height: 200,
  },
});

export function NewsCard(props: News) {
  const classes = useStyles();

  const redirectToNews = async () => {
    window.open(props.link, "_blank");
    const data = {
      companyTag: props.companyTag,
      sourceTag: props.sourceTag,
      link: props.link,
      title: props.title,
      content: props.content,
      imgUrl: props.imgUrl,
      pubDate: props.pubDate,
    };
    const response = await updateNewsClick(data);
    if (response.data === null) {
      console.log("Firestore Write Failed");
    }
    console.log(response.data);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={redirectToNews}>
        <CardMedia
          className={classes.media}
          // TODO - Need to find a new placeholder image in case no image url is present in the feed
          image={props.imgUrl ? props.imgUrl : sampleTeslaNewsImage}
          title={props.title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
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
