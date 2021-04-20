import { useRecoilState, useRecoilValue } from "recoil";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import { UserPageHeader } from "../../components/UserPageHeader";
import { NewsFilterAndSubscriber } from "./NewsFilterAndSubscriber";
import { curUserInfoAtom } from "../../atoms/UserInfoAtom";
import {
  ColorType,
  SubscriptionButtonSelector,
} from "../../selectors/SubscriptionButtonSelector";
import { useEffect } from "react";
import {
  batchUpdateSubscriptionReadingNumber,
} from "../../firebase/FirebaseFunction";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { ERROR } from "../../atoms/constants";

export function CompanyNewsPage() {
  const [userInfo, setUserInfo] = useRecoilState(curUserInfoAtom);
  const userId = useRecoilValue(curUserUidAtom);
  const buttonColorStatus: ColorType[] = useRecoilValue(
    SubscriptionButtonSelector
  );

  useEffect(() => {
    const updateUserReadingNumber = async () => {
      const data = {
        userId: userId,
      };
      const batchUpdateSubscriptionReadingNumberResp = (await batchUpdateSubscriptionReadingNumber(data)).data;
      if (batchUpdateSubscriptionReadingNumberResp.error !== ERROR.NO_ERROR) {
        console.log(batchUpdateSubscriptionReadingNumberResp.error);
        return;
      }
      let newUserInfo = {...userInfo};
      newUserInfo.subscription = batchUpdateSubscriptionReadingNumberResp.resp;
      setUserInfo(newUserInfo);
    };
    updateUserReadingNumber();
  }, []);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <div style={{ marginTop: "20px" }}>
        <NewsFilterAndSubscriber buttonColorStatus={buttonColorStatus} />
      </div>
      <NewsCardContainer />
    </div>
  );
}
