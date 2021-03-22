import { useEffect, useState } from "react";
import { MyNewsTab } from "./MyNewsTab";
import { UserPageHeader } from "../../components/UserPageHeader";
import { getUsername_v2 } from "../../firebase/FirebaseFunction";
import { useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { ERROR } from "../../atoms/constants";

export function MyNewsPage() {
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
      <UserPageHeader username={username} />
      <MyNewsTab />
    </div>
  );
}
