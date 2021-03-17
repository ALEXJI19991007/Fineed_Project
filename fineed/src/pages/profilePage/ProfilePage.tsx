import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {EditProfileForm} from "./EditProfileForm"
import {ProfilePageHeader} from "./ProfilePageHeader"
import {ProfileTab} from "./ProfileTab"
import { getUsername } from "../../firebase/FirebaseFunction";
import { useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { PinDropSharp } from "@material-ui/icons";

export function ProfilePage(props:any) {
  const [username, setUsername] = useState("");
  const userId = useRecoilValue(curUserUidAtom);

  const getUserInfo = async () => {
    const res = await getUsername({userId:userId})
    const data = res.data
    setUsername(data)
    console.log(username)
  }
  useEffect (() => {
    getUserInfo()
  }, [])

    return (
        <div>
        <ProfilePageHeader username={username}/>
        <ProfileTab username={username}/>
        </div>
    
    )
}