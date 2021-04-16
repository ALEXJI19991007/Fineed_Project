import { useRecoilValue } from "recoil";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";
import { curUserInfoAtom } from "../../atoms/UserInfoAtom";
import { ColorType, SubscriptionButtonSelector } from "../../selectors/SubscriptionButtonSelector";

export function CompanyNewsPage() {
  const userInfo = useRecoilValue(curUserInfoAtom);
  const buttonColorStatus: ColorType[] = useRecoilValue(SubscriptionButtonSelector);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <div style={{marginTop:'20px'}}>
        <NewsFilterAndSubscriber buttonColorStatus={buttonColorStatus} />
      </div>
      <NewsCardContainer />
    </div>
  );
}
