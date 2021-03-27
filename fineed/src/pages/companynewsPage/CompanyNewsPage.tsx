import { useRecoilValue } from "recoil";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";

export function CompanyNewsPage() {
  const userInfo = useRecoilValue(curUserInfoAtom);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <div>
        <NewsFilterAndSubscriber />
      </div>
      <NewsCardContainer />
    </div>
  );
}
