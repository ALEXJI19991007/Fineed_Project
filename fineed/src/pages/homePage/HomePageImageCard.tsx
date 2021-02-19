import React, { useEffect, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import HomePageImagePic from "../../imageSrc/homepage/HomePageImagePic.jpg";

export function HomePageImageCard() {
  const scrollY = useScrollPosition(60 /*fps*/);
  const [imgHeight, setImgHeight] = useState(1000);

  useEffect(() => {
    if (scrollY <= 500) {
      setImgHeight(1000 - scrollY);
    } else {
      setImgHeight(300);
    }
  }, [scrollY]);
  return (
    <Card elevation={10}>
      <CardMedia component="img" height={imgHeight} image={HomePageImagePic} />
    </Card>
  );
}
