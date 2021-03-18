import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { EditProfileForm } from "./EditProfileForm";
import { ProfilePageHeader } from "./ProfilePageHeader";
import { ProfileTab } from "./ProfileTab";
import { getUsername_v2 } from "../../firebase/FirebaseFunction";
import { useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { PinDropSharp } from "@material-ui/icons";
import { ERROR } from "../../atoms/constants";

export function ProfilePage(props: any) {
  const [username, setUsername] = useState("");
  const userId = useRecoilValue(curUserUidAtom);

  const getUserInfo = async () => {
    const getUsernameResp = (await getUsername_v2({ userId: userId })).data;
    if (getUsernameResp.error !== ERROR.NO_ERROR) {
      console.log(getUsernameResp.error);
      return;
    }
    const username = getUsernameResp.resp.username;
    setUsername(username);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <ProfilePageHeader username={username} />
      <ProfileTab username={username} />
    </div>
  );
}
