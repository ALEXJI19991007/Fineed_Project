import { useEffect } from "react";
import { useRecoilState } from "recoil";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";

export function CompanyNewsPage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const currentNewsState = {
      target: "google",
    };
    setFilter(currentNewsState);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UserPageHeader username={"xyz"} />
      <div>
        <NewsFilterAndSubscriber setFilter={setFilter}/>
      </div>
      <NewsCardContainer />
    </div>
  );
}
