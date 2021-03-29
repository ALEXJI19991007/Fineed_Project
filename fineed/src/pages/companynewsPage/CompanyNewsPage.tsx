import { useRecoilValue } from "recoil";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import { ColorType, SubscriptionButtonSelector } from "../../selectors/SubscriptionButtonSelector";

export function CompanyNewsPage() {
  const userInfo = useRecoilValue(curUserInfoAtom);
  const buttonColorStatus: ColorType[] = useRecoilValue(SubscriptionButtonSelector);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <div>
        <NewsFilterAndSubscriber buttonColorStatus={buttonColorStatus} />
      </div>
      <NewsCardContainer />
    </div>
  );
}
