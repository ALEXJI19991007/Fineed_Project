import { MyNewsTab } from "./MyNewsTab";
import { UserPageHeader } from "../../components/UserPageHeader";
import { useRecoilValue } from "recoil";
import { curUserInfoAtom } from "../../atoms/UserInfoAtom";

export function MyNewsPage() {
  const userInfo = useRecoilValue(curUserInfoAtom);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <MyNewsTab />
    </div>
  );
}
