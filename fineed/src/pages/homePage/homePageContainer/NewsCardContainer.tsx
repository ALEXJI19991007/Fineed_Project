import React from "react";
import { List } from "immutable";
import { NewsCard } from "../NewsCard";
import { News } from "../NewsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useRecoilValueLoadable } from "recoil";
import * as Selectors from "../../../selectors/NewsFeedSelector";
import { NewsListFilter } from "../../../components/NewsFilter";

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
  })
);

function NewsCardGrid(props: NewsCardGridProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.newsList.map((news: News, index: number) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
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
      return <div>Loading...</div>;
  }
}
