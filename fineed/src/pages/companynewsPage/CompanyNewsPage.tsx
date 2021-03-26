import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";

export function CompanyNewsPage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);
  const userInfo = useRecoilValue(curUserInfoAtom);

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
      <UserPageHeader userInfo={userInfo} />
      <div>
        <NewsFilterAndSubscriber setFilter={setFilter}/>
      </div>
      <NewsCardContainer />
    </div>
  );
}
