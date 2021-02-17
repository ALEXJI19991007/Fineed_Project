import React from "react";
import { List } from "immutable";
import { NewsCard } from "../NewsCard";
import { News } from "../NewsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useRecoilValueLoadable } from "recoil";
import * as Selectors from "../../../selectors/NewsFeedSelector";
import { NewsListFilter } from "../../homePage/NewsFilter";
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

type NewsCardGridProps = {
  newsList: List<News>;
};

//simualte the backend existed data
function NewsList(myNewsFeed: any): List<News> {
  const arr = [];

  //   const sampleNews = {
  //     link: "abc",
  //     title: "Tesla",
  //     content:
  //       "Tesla is a transportation and energy company. It sells vehicles under its ‘Tesla Motors’ division and stationary battery packs for home, commercial and utility-scale projects under its ‘Tesla Energy’ division.",
  //     imgUrl: "not even exist, we should have a web imgUrl",
  //   };
  // we shouldn't use for loop anywhere in our code, since this is only for demo
  for (let i = 0; i < myNewsFeed.list.length; i++) {
    let sampleNews = {
      link: myNewsFeed.list[i].link,
      title: myNewsFeed.list[i].title,
      content: myNewsFeed.list[i].content,
      imgUrl: myNewsFeed.list[i].imgUrl,
      pubDate: myNewsFeed.list[i].pubDate,
    };
    arr.push(sampleNews);
  }
  const data = List<News>(arr);
  return data;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    loadingCard: {
      maxWidth: 400,
      margin: theme.spacing(2),
    },
    loadingCardMedia: {
      height: 300,
    },
  })
);


function NewsCardLoading() {
  const classes = useStyles();
  return (
    <Card className={classes.loadingCard}>
      {/* <CardHeader
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      /> */}
      {<Skeleton animation="wave" variant="rect" className={classes.loadingCardMedia} />}
      <CardContent>
        {
          <React.Fragment>
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" />
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );
}

function NewsCardGridLoading(){
  const classes = useStyles();
  //generate 8 loading card to demo on the screen.
  const loadingList = [1,1,1,1,1,1,1,1];
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {loadingList.map((news: number, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              <div className={classes.paper}>
                <NewsCardLoading/>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function NewsCardGrid(props: NewsCardGridProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {props.newsList.map((news: News, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              <div className={classes.paper}>
                <NewsCard
                  link={news.link}
                  title={news.title}
                  content={news.content}
                  imgUrl={news.imgUrl}
                  pubDate={news.pubDate}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}


export const NewsCardContainer = () => {
  const newsFeedLoadable = useRecoilValueLoadable(
    Selectors.filteredNewsListState
  );

  switch (newsFeedLoadable.state) {
    case "hasValue":
      const myNewsFeed = newsFeedLoadable.contents;
      return (
        <>
          <div>
            <NewsListFilter />
            <NewsCardGrid newsList={NewsList(myNewsFeed)} />
          </div>
        </>
      );
    case "hasError":
      return <div>damn...</div>;
    case "loading":
      return (<div><NewsListFilter /><NewsCardGridLoading/></div>);
  }
}
