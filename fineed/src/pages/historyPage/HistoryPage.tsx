import React from "react";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { HomePageImageCard } from "../homePage/HomePageImageCard";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function HistoryPage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);

  // We change the state of the atom when History page is loaded
  useEffect(() => {
    // TODO: company --> userId, for now it is hardcoded, later we need to get userId from session
    const currentNewsState = "user_history";
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
