import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { HomePageImageCard } from "./HomePageImageCard";
import { NewsCardContainer } from "./homePageContainer/NewsCardContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import lightGreen from '@material-ui/core/colors/lightGreen';
import green from '@material-ui/core/colors/green';
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // there are errors after deploy, remove it now
      // backgroundColor: lightGreen[50]
    },
  })
);

const FADETIMEOUT = 1000

export function HomePage() {
  const classes = useStyles();
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);
  const [checked, setChecked] = useState(true);
  const uid = useRecoilValue(curUserUidAtom);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const currentNewsState = {
      target: "headlines",
    }
    setFilter(currentNewsState);
  }, []);

  return (
    <Fade in={checked} timeout={FADETIMEOUT}>
    <div className={classes.root}>
      <HomePageImageCard uid={uid}/>
      <div>
        <NewsCardContainer />
      </div>
    </div>
    </Fade>
  );
}
