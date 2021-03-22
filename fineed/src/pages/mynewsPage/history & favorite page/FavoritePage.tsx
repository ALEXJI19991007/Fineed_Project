import * as Atoms from "../../../atoms/NewsListFilterAtom";
import { NewsCardContainer } from "../../homePage/homePageContainer/NewsCardContainer";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function FavoritePage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);

  // We change the state of the atom when History page is loaded
  useEffect(() => {
    const currentNewsState = {
      target: "user_favorite",
    }
    setFilter(currentNewsState);
  }, []);

  return (
    <div>
      <div>
        <NewsCardContainer />
      </div>
    </div>
  );
}