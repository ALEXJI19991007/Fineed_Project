import React, { useState } from "react";
import { List } from "immutable";
import { NewsCard } from "../NewsCard";
import { News } from "../NewsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import * as Selectors from "../../../selectors/NewsFeedSelector";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import { Pagination } from "@material-ui/lab";
import * as NewsAtoms from "../../../atoms/NewsListFilterAtom"

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
      target: myNewsFeed.list[i].target,
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
      {
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.loadingCardMedia}
        />
      }
      <CardContent>
        {
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={20} width="80%" />
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );
}

function NewsCardGridLoading() {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  //generate 8 loading card to demo on the screen.
  const loadingList = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {loadingList.map((news: number, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              <Grow in={checked} timeout={1200}>
              <div className={classes.paper}>
                <NewsCardLoading />
              </div>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function NewsCardGrid(props: NewsCardGridProps) {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {props.newsList.map((news: News, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              <Grow in={checked} timeout={500}>
              <div className={classes.paper}>
                <NewsCard
                  target={news.target}
                  link={news.link}
                  title={news.title}
                  content={news.content}
                  imgUrl={news.imgUrl}
                  pubDate={news.pubDate}
                />
              </div>
              </Grow>
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
            {/* <NewsListFilter /> */}
            <NewsCardGrid newsList={NewsList(myNewsFeed)} />
            {myNewsFeed.target === "headlines" ? <PageDisplay pageCount={myNewsFeed.pageCount}/> : undefined}
          </div>
        </>
      );
    case "hasError":
      return <div>damn...</div>;
    case "loading":
      return (
        <div>
          {/* <NewsListFilter /> */}
          <NewsCardGridLoading />
        </div>
      );
  }
};

type pageDisplayProp = {
  pageCount: number,
}

const PageDisplay = (props: pageDisplayProp) => {
  const [pageIndexState, setPageIndexState] = useRecoilState(NewsAtoms.headlinePageIndexState);

  const handleChange = (_event: any, value: number) => {
    setPageIndexState(value);
  };

  return (
    <Grid container justify = "center">
      <Pagination count={props.pageCount} defaultPage={pageIndexState} onChange={handleChange}/>
    </Grid>);
  }
