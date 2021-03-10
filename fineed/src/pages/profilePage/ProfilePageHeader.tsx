import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import ProfileHeader from "../../imageSrc/profilepage/profileheader.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import { curUserUidAtom } from '../../atoms/FirebaseUserAtom'
import { useRecoilValue } from "recoil";


const imgCardStyle = makeStyles({
  card: {
    position: 'relative',
  },
  loginCard: {
    position: 'absolute',
  },
  sloganPos: {
    position: 'absolute',
    left: '20px',
    bottom: '490px',
    color: 'black',
    marginBottom: 100,
    fontFamily: "-apple-system",
},
});

export function ProfilePageHeader() {
  const classes = imgCardStyle();
  const curUid = useRecoilValue(curUserUidAtom);

  return (
    <Card elevation={0} style={{height:'250px'}}>
      <CardMedia component="img" image={ProfileHeader}/>
      <Typography variant="h3" 
                  className={classes.sloganPos} >
    Hi, {curUid}.
    </Typography>
    </Card>
  );
}
