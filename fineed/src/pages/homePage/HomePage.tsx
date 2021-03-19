import React, { useEffect, useState } from "react";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { HomePageImageCard } from "./HomePageImageCard";
import { NewsCardContainer } from "./homePageContainer/NewsCardContainer";
import { useRecoilState } from "recoil";
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';

const FADETIMEOUT = 1000

export function HomePage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);
  const [checked, setChecked] = useState(true);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const currentNewsState = {
      target: "headlines",
    }
    setFilter(currentNewsState);
  }, []);

  return (
    <Fade in={checked} timeout={FADETIMEOUT}>
    <div>
      <HomePageImageCard />
      <div>
        <NewsCardContainer />
      </div>
    </div>
    </Fade>
  );
}
