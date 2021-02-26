import React, { useEffect } from "react";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { HomePageImageCard } from "./HomePageImageCard";
import { NewsCardContainer } from "./homePageContainer/NewsCardContainer";
import { useRecoilState } from "recoil";

export function HomePage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const currentNewsState = {
      target: "headlines",
      param: "",
    };
    setFilter(currentNewsState);
  }, []);

  return (
    <div>
      <HomePageImageCard />
      <div>
        <NewsCardContainer />
      </div>
    </div>
  );
}
