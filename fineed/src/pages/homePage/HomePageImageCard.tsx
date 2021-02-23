import React, { useEffect, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import HomePageImagePic from "../../imageSrc/homepage/HomePageImagePic.png";
import {HomePageLoginText} from './HomePageLoginText'
import {LoginButton} from './LoginButton'

export function HomePageImageCard() {
  var initialHeight = 800
  const scrollY = useScrollPosition(60 /*fps*/);
  const [imgHeight, setImgHeight] = useState(initialHeight);
  const [scrollState,setScrollState] = useState(false);

  useEffect(() => {
    if (scrollY <= 500 && !scrollState) {
      setImgHeight(initialHeight - scrollY);
    } else {
      //setScrollState(true);
      setImgHeight(300);
    }
  }, [scrollY,scrollState]);
  return (
    <Card elevation={0}>
      <CardMedia component="img" height={imgHeight} image={HomePageImagePic} />
      <HomePageLoginText/>
      <LoginButton/>

    </Card>
  );
}
