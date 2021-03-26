import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ProfileTab } from "./ProfileTab";
import { UserPageHeader } from "../../components/UserPageHeader";
import { useRecoilValue } from "recoil";
import { PinDropSharp } from "@material-ui/icons";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";

export function ProfilePage() {
  const userInfo = useRecoilValue(curUserInfoAtom);

  return (
    <div>
      <UserPageHeader userInfo={userInfo} />
      <ProfileTab userInfo={userInfo} />
    </div>
  );
}
