import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {EditProfileForm} from "./EditProfileForm"
import {ProfilePageHeader} from "./ProfilePageHeader"
import {ProfileTab} from "./ProfileTab"

export function ProfilePage() {
    
    return (
        <div>
        <ProfilePageHeader/>
        <ProfileTab />
        </div>
    
    )
}